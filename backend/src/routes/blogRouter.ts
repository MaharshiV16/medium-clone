import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify } from "hono/jwt";
import { createBlogInput, updateBlogInput } from "@maharshiv16/medium-clone-maharshi";

export const blogRouter = new Hono<{
	Variables: {
		userId: string;
	};
	Bindings: {
		DATABASE_URL: string;
		JWT_SECRET: string;
	};
}>();

blogRouter.use("/*", async (c, next) => {
	const token = c.req.header("authorization");
	if (!token) {
		return c.json({ message: "Unauthorized" });
	}
	const user = await verify(token, c.env.JWT_SECRET);
	if (user) {
		c.set("userId", user.id);
		await next();
	} else {
		return c.json({ message: "Unauthorized" });
	}
});

blogRouter.post("/", async (c) => {
	const body = await c.req.json();
	const { success } = createBlogInput.safeParse(body);
	if (!success) {
		c.status(411);
		return c.json({ message: "Incorrect Inputs" });
	}
	const prisma = new PrismaClient({ datasourceUrl: c.env.DATABASE_URL }).$extends(withAccelerate());

	try {
		const post = await prisma.post.create({
			data: {
				title: body.title,
				content: body.content,
				authorId: c.get("userId"),
			},
		});
		return c.json({ id: post.id });
	} catch (error) {
		return c.json({ error });
	}
});

blogRouter.put("/", async (c) => {
	const body = await c.req.json();
	const { success } = updateBlogInput.safeParse(body);
	if (!success) {
		c.status(411);
		return c.json({ message: "Incorrect Inputs" });
	}
	const prisma = new PrismaClient({ datasourceUrl: c.env.DATABASE_URL }).$extends(withAccelerate());

	try {
		const post = await prisma.post.update({
			where: {
				id: body.id,
			},
			data: {
				title: body.title,
				content: body.content,
			},
		});
		return c.json({ id: post.id });
	} catch (error) {
		return c.json({ error });
	}
});

blogRouter.get("/bulk", async (c) => {
	const prisma = new PrismaClient({ datasourceUrl: c.env.DATABASE_URL }).$extends(withAccelerate());

	try {
		const posts = await prisma.post.findMany();
		if (!posts) {
			return c.json("Invalid Id");
		}
		return c.json({ posts });
	} catch (error) {
		return c.json({ error });
	}
});

// Todo: Add pagination
blogRouter.get("/:id", async (c) => {
	const id = c.req.param("id");
	const prisma = new PrismaClient({ datasourceUrl: c.env.DATABASE_URL }).$extends(withAccelerate());

	try {
		const post = await prisma.post.findUnique({
			where: { id },
		});
		if (!post) {
			return c.json("Invalid Id");
		}
		return c.json({ post });
	} catch (error) {
		return c.json({ error });
	}
});

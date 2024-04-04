import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign, verify } from "hono/jwt";
import zod from "zod";
import { userSignupSchema, userSigninSchema } from "@maharshiv16/medium-clone-maharshi";

export const userRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string;
		JWT_SECRET: string;
	};
}>();

userRouter.post("/signup", async (c) => {
	const body = await c.req.json();
	const { success } = userSignupSchema.safeParse(body);
	if (!success) {
		c.status(411);
		return c.json({ message: "Incorrect Inputs" });
	}
	const prisma = new PrismaClient({ datasourceUrl: c.env.DATABASE_URL }).$extends(withAccelerate());

	try {
		const user = await prisma.user.create({
			data: {
				email: body.email,
				password: body.password,
				name: body.name,
			},
		});

		const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
		return c.json({ jwt });
	} catch (error) {
		return c.json({ error });
	}
});

userRouter.post("/signin", async (c) => {
	const body = await c.req.json();
	const { success } = userSigninSchema.safeParse(body);
	if (!success) {
		c.status(411);
		return c.json({ message: "Incorrect Inputs" });
	}
	const prisma = new PrismaClient({ datasourceUrl: c.env.DATABASE_URL }).$extends(withAccelerate());

	try {
		const user = await prisma.user.findUnique({
			where: {
				email: body.email,
				password: body.password,
			},
		});

		if (!user) {
			c.status(403);
			return c.json({ msg: "Wrong Credentials" });
		}

		const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
		return c.json({ jwt });
	} catch (error) {
		return c.json({ error });
	}
});

import zod from "zod";

export const userSignupSchema = zod.object({
	email: zod.string().email(),
	password: zod.string(),
	name: zod.string().optional(),
});

export type UserSignupType = zod.infer<typeof userSignupSchema>;

export const userSigninSchema = zod.object({
	email: zod.string().email(),
	password: zod.string(),
});

export type UserSigninType = zod.infer<typeof userSigninSchema>;

export const createBlogInput = zod.object({
	title: zod.string(),
	content: zod.string(),
});

export type CreateBlogInput = zod.infer<typeof createBlogInput>;

export const updateBlogInput = zod.object({
	id: zod.string(),
	title: zod.string(),
	content: zod.string(),
});

export type UpdateBlogInput = zod.infer<typeof updateBlogInput>;

import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

export interface Blog {
	id: number;
	author: { name: string | null };
	title: string;
	content: string;
}

export const useBlogs = () => {
	const [loading, setLoading] = useState(true);
	const [blogs, setBlogs] = useState<Blog[]>([]);

	useEffect(() => {
		const getBlogs = async () => {
			const res = await axios({
				url: `${BACKEND_URL}/api/v1/blog/bulk`,
				method: "GET",
				headers: {
					Authorization: localStorage.getItem("authorization"),
				},
			});
			// .posts
			setBlogs(res.data.posts);
			setLoading(false);
		};
		getBlogs();
	}, []);
	return { loading, blogs };
};

export const useBlog = ({ id }: { id: string }) => {
	const [loading, setLoading] = useState(true);
	const [blog, setBlog] = useState<Blog>();

	useEffect(() => {
		const getBlog = async () => {
			const res = await axios({
				url: `${BACKEND_URL}/api/v1/blog/${id}`,
				method: "GET",
				headers: {
					Authorization: localStorage.getItem("authorization"),
				},
			});
			// .posts
			setBlog(res.data.post);
			setLoading(false);
		};
		getBlog();
	}, [id]);
	return { loading, blog };
};

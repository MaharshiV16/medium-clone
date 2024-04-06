import { Link } from "react-router-dom";
import AppBar from "../components/AppBar";
import BlogCard from "../components/BlogCard";
import { useBlogs } from "../hooks";
import BlogSkeleton from "../components/BlogSkeleton";

const Blogs = () => {
	const { loading, blogs } = useBlogs();
	if (loading) {
		return <BlogSkeleton />;
	}
	return (
		<div>
			<AppBar />
			<div className='flex justify-center'>
				<div>
					{blogs.map((blog) => {
						return (
							<Link to={`/blog/${blog.id}`} key={blog.id}>
								<BlogCard
									authorname={blog.author.name || "Anonymous"}
									title={blog.title}
									content={blog.content}
									publishedDate='7th April 2024'
								/>
							</Link>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default Blogs;

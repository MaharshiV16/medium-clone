import { useParams } from "react-router-dom";
import { useBlog } from "../hooks";
import AppBar from "../components/AppBar";
import Avatar from "../components/Avatar";
import BlogSkeleton from "../components/BlogSkeleton";

const Blog = () => {
	const { id } = useParams();
	const { blog, loading } = useBlog({ id: id || "" });

	if (loading) {
		return <BlogSkeleton />;
	}
	return (
		<div>
			<AppBar />
			<div className='flex justify-center'>
				<div className='grid grid-cols-12 py-10 px-36 max-w-screen-2xl w-screen'>
					<div className='grid col-span-8'>
						<div className='text-5xl font-extrabold'>{blog?.title}</div>
						<div className='text-md mt-2 text-slate-400'>Posted On 7th April 2024</div>
						<div className='text-lg mt-4'>{blog?.content}</div>
					</div>
					<div className='grid col-span-4 '>
						<div className='flex items-end flex-col gap-4'>
							<div className='mt-4'>Author</div>
							<Avatar name={blog?.author.name || "Anonymous"} size={10} />
							<div className='text-xl font-bold'>{blog?.author.name || "Anonymous"}</div>
							<div className='text-slate-600 text-right'>New user recently signed up to the app</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Blog;

import Avatar from "./Avatar";

interface BlogCardProps {
	authorname: string;
	title: string;
	content: string;
	publishedDate: string;
}

const BlogCard = ({ authorname, title, content, publishedDate }: BlogCardProps) => {
	return (
		<div className='border-b border-slate-200 p-4 w-screen max-w-2xl lg:max-w-5xl m-4 cursor-pointer'>
			<div className='flex '>
				<Avatar name={authorname} size={6} />
				<div className='font-extralight pl-2 text-sm flex items-center'>{authorname}</div>{" "}
				<div className='pl-2 font-thin text-slate-500 text-sm flex items-center'>{publishedDate}</div>
			</div>
			<div className='text-2xl font-semibold pt-2'>{title}</div>
			<div className='text-md font-light text-slate-600'>{content.slice(0, 100) + "..."}</div>
			<div className='text-xs font-light text-slate-400 pt-4'>{`${Math.ceil(content.length / 100)} min read`}</div>
		</div>
	);
};

export default BlogCard;

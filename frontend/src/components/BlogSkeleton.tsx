import AppBar from "./AppBar";

const BlogSkeleton = () => {
	return (
		<div>
			<AppBar />
			<div className='px-20 py-10 flex flex-col gap-20'>
				<Skeleton />
				<Skeleton />
				<Skeleton />
				<Skeleton />A
			</div>
		</div>
	);
};

const Skeleton = () => {
	return (
		<div className='flex animate-pulse'>
			<div className='flex-shrink-0'>
				<span className='size-12 block bg-gray-200 rounded-full '></span>
			</div>

			<div className='ms-4 mt-2 w-full'>
				<p className='h-4 bg-gray-200 rounded-full '></p>

				<ul className='mt-5 space-y-3'>
					<li className='w-full h-4 bg-gray-200 rounded-full '></li>
					<li className='w-full h-4 bg-gray-200 rounded-full '></li>
					<li className='w-full h-4 bg-gray-200 rounded-full '></li>
					<li className='w-full h-4 bg-gray-200 rounded-full '></li>
				</ul>
			</div>
		</div>
	);
};

export default BlogSkeleton;

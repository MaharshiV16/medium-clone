import Avatar from "./Avatar";
import { Link } from "react-router-dom";

const AppBar = () => {
	return (
		<div className='border-b flex justify-between px-10 py-4 items-center'>
			<Link to={"/blogs"}>
				<div className='font-bold text-2xl cursor-pointer'>Medium</div>
			</Link>
			<div>
				<Link to={"/publish"}>
					<button type='button' className='mr-8 text-white bg-green-600 font-medium rounded-full text-sm px-5 py-2.5'>
						New Blog
					</button>
				</Link>

				<Avatar name='Maharshi' size={10} />
			</div>
		</div>
	);
};

export default AppBar;

import { useState } from "react";
import AppBar from "../components/AppBar";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

const Publish = () => {
	const navigate = useNavigate();
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const handleClick = async () => {
		const res = await axios({
			url: `${BACKEND_URL}/api/v1/blog`,
			method: "POST",
			headers: {
				Authorization: localStorage.getItem("authorization"),
			},
			data: { title, content },
		});
		console.log(res);
		setTitle("");
		setContent("");
		navigate(`/blog/${res.data.id}`);
	};
	return (
		<div>
			<AppBar />
			<div className='flex justify-center'>
				<div className='max-w-screen-lg p-10 w-full'>
					<textarea
						rows={2}
						className='block p-2.5 font-extrabold w-full text-3xl text-gray-900 rounded-lg focus:outline-none resize-none'
						placeholder='Title...'
						onChange={(e) => {
							setTitle(e.target.value);
						}}
						value={title}
					></textarea>
					<textarea
						rows={20}
						className='mt-4 block p-2.5 w-full text-lg text-gray-900 rounded-lg focus:outline-none resize-none'
						placeholder='Content...'
						onChange={(e) => {
							setContent(e.target.value);
						}}
						value={content}
					></textarea>
					<button
						onClick={handleClick}
						type='button'
						className='mt-2 text-white bg-green-600 font-medium rounded-full text-sm px-5 py-2.5'
					>
						Publish
					</button>
				</div>
			</div>
		</div>
	);
};

export default Publish;

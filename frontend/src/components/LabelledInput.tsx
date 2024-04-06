import { ChangeEvent } from "react";

interface LabelledInputType {
	label: string;
	placeholder: string;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
	type?: string;
}

const LabelledInput = ({ label, placeholder, onChange, type }: LabelledInputType) => {
	return (
		<div className='mb-4 min-w-96'>
			<label className='mb-2 text-xl font-semibold'>{label}</label>
			<input
				onChange={onChange}
				type={type || "text"}
				className=' border border-gray-300 text-gray-900 text-lg rounded-lg w-full p-2.5 mt-2'
				placeholder={placeholder}
				required
			/>
		</div>
	);
};

export default LabelledInput;

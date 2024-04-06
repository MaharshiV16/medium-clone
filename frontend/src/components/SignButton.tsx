const SignButton = ({ label, onClick }: { label: string; onClick: () => Promise<void> }) => {
	return (
		<div className='mt-4 min-w-96'>
			<button
				onClick={onClick}
				type='button'
				className=' py-2  w-full text-xl font-medium text-white  bg-black rounded-md capitalize'
			>
				{label}
			</button>
		</div>
	);
};

export default SignButton;

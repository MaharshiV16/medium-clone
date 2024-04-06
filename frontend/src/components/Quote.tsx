const Quote = () => {
	return (
		<div className='bg-slate-200 items-center h-screen flex justify-center flex-col px-20'>
			<div className='text-left text-3xl font-bold mb-5'>
				"The customer I received was exceptional. The support team went above and beyond to address my concerns."
			</div>
			<div className='self-start  text-justify text-xl font-semibold'>Julius Winfield</div>
			<div className='self-start text-justify text-md font-light text-slate-400'>CEO, Acme Inc</div>
		</div>
	);
};

export default Quote;

const NavSearch = ({ color = '#383838' }) => {
	return (
		<svg
			width='24'
			height='24'
			viewBox='0 0 24 24'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
		>
			<path
				d='M20.999 21L16.3438 16.3448L20.999 21ZM2.99902 10.7586C2.99902 6.47365 6.47268 3 10.7576 3C15.0426 3 18.5163 6.47365 18.5163 10.7586C18.5163 15.0436 15.0426 18.5172 10.7576 18.5172C6.47268 18.5172 2.99902 15.0436 2.99902 10.7586Z'
				stroke={color}
				stroke-opacity='0.5'
				stroke-width='1.5'
				stroke-linecap='round'
				stroke-linejoin='round'
			/>
		</svg>
	);
};

export default NavSearch;

const NavMenu = ({ color = '#383838' }) => {
	return (
		<svg
			width='24'
			height='24'
			viewBox='0 0 24 24'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
		>
			<path
				d='M4.75 5.75H19.25'
				stroke={color}
				stroke-opacity='0.5'
				stroke-width='1.5'
				stroke-linecap='round'
				stroke-linejoin='round'
			/>
			<path
				d='M4.75 18.25H19.25'
				stroke={color}
				stroke-opacity='0.5'
				stroke-width='1.5'
				stroke-linecap='round'
				stroke-linejoin='round'
			/>
			<path
				d='M4.75 12H19.25'
				stroke={color}
				stroke-opacity='0.5'
				stroke-width='1.5'
				stroke-linecap='round'
				stroke-linejoin='round'
			/>
		</svg>
	);
};

export default NavMenu;

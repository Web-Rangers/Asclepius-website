const NavHome = ({ color = '#383838' }) => {
	return (
		<svg
			width='24'
			height='24'
			viewBox='0 0 24 24'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
		>
			<path
				d='M5.48277 21H18.5172C19.8885 21 21 19.8885 21 18.5172V9.20693L12 3L3 9.20693V18.5172C3 19.8885 4.11158 21 5.48277 21Z'
				stroke={color}
				stroke-width='1.5'
				stroke-linecap='round'
				stroke-linejoin='round'
			/>
			<path
				d='M9.20618 16.6537C9.20618 15.2824 10.3178 14.1709 11.6889 14.1709H12.3096C13.6808 14.1709 14.7924 15.2824 14.7924 16.6537V20.9985H9.20618V16.6537Z'
				stroke={color}
				stroke-width='1.5'
				stroke-linecap='round'
				stroke-linejoin='round'
			/>
		</svg>
	);
};

export default NavHome;

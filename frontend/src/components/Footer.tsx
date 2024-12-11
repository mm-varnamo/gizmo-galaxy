const Footer = () => {
	const currentYear = new Date().getFullYear();

	return (
		<footer>
			<div className='container'>
				<p>Gizmo-Galaxy &copy; {currentYear}</p>
			</div>
		</footer>
	);
};

export default Footer;

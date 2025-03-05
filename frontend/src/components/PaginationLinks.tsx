import { NavLink } from 'react-router-dom';

interface PaginationLinksProps {
	pages: number;
	activePage: number;
	isAdmin?: boolean;
	keyword?: string;
}

const PaginationLinks = ({
	pages,
	activePage,
	isAdmin = false,
	keyword = '',
}: PaginationLinksProps) => {
	return pages > 1 ? (
		<div>
			{Array.from({ length: pages }, (_, page) => (
				<NavLink
					key={page}
					to={
						!isAdmin
							? keyword
								? `/search/${keyword}/page/${page + 1}`
								: `/page/${page + 1}`
							: `/admin/productlist/${page + 1}`
					}
					className={
						Number(activePage) - 1 === Number(page)
							? 'active-link'
							: 'inactive-link'
					}
				>
					{page + 1}
				</NavLink>
			))}
		</div>
	) : null;
};

export default PaginationLinks;

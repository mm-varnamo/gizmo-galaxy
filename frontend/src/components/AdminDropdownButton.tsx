import { useState } from 'react';
import { Link } from 'react-router-dom';

const AdminDropdownButton = () => {
	const [open, setOpen] = useState(false);

	return (
		<div>
			<button onClick={() => setOpen((prev) => !prev)}>Actions&#129171;</button>
			{open && (
				<div>
					<Link to='/admin/productlist'>Products</Link>
					<Link to='/admin/userlist'>Users</Link>
					<Link to='/admin/orderlist'>Orders</Link>
				</div>
			)}
		</div>
	);
};

export default AdminDropdownButton;

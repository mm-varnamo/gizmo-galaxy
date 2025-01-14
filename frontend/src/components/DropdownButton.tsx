import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface DropdownButtonProps {
	user: string;
	onLogout: () => void;
}

const DropdownButton = ({ user, onLogout }: DropdownButtonProps) => {
	const [open, setOpen] = useState(false);
	const navigate = useNavigate();

	const handleProfileClick = () => {
		navigate('/profile');
		setOpen(false);
	};

	const handleLogoutClick = () => {
		onLogout();
		setOpen(false);
	};

	return (
		<div>
			<button onClick={() => setOpen((prev) => !prev)}>{user}</button>
			{open && (
				<div>
					<button onClick={handleProfileClick}>Profile</button>
					<button onClick={handleLogoutClick}>Logout</button>
				</div>
			)}
		</div>
	);
};

export default DropdownButton;

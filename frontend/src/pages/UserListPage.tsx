import {
	useDeleteUserMutation,
	useGetUsersQuery,
} from '../slices/usersApiSlice';
import { FaTimes, FaTrash, FaEdit, FaCheck } from 'react-icons/fa';
import Message from '../components/Message';
import Loader from '../components/Loader';
import isFetchBaseQueryError from '../utils/fetchErrorHandler';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ApiError } from '../types/apiTypes';

const UserListPage = () => {
	const { data: users, isLoading, error } = useGetUsersQuery();
	const [deleteUser, { isLoading: deleteUserIsLoading }] =
		useDeleteUserMutation();

	const onDeleteHandler = async (userId: string) => {
		if (!window.confirm('Are you sure you want to delete this user?')) return;
		try {
			const response = await deleteUser(userId).unwrap();
			toast.success(response.data.message);
		} catch (error) {
			console.log(error);
			const apiError = error as ApiError;
			toast.error(apiError?.data?.error || apiError.error);
		}
	};

	return (
		<>
			<h1>Users</h1>
			{isLoading ? (
				<Loader loading={isLoading} size={10} />
			) : error && isFetchBaseQueryError(error) ? (
				<Message type='alert'>
					{error.data && typeof error.data === 'object' && 'error' in error.data
						? String(error.data.error)
						: 'Unknown Error'}
				</Message>
			) : (
				users && (
					<table>
						<thead>
							<tr>
								<th>ID</th>
								<th>NAME</th>
								<th>EMAIL</th>
								<th>ADMIN</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{users.map((user) => (
								<tr key={user._id}>
									<td>{user._id}</td>
									<td>{user.name}</td>
									<td>
										<a href={`mailto:${user.email}`}>{user.email}</a>
									</td>
									<td>
										{user.isAdmin ? (
											<FaCheck style={{ color: 'green' }} />
										) : (
											<FaTimes style={{ color: 'red' }} />
										)}
									</td>
									<td>
										<Link to={`/admin/user/${user._id}/edit`}>
											<FaEdit />
										</Link>
									</td>
									<td>
										<button disabled={deleteUserIsLoading}>
											<FaTrash onClick={() => onDeleteHandler(user._id)} />
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				)
			)}
		</>
	);
};

export default UserListPage;

import { USERS_URL } from '../constants';
import { User as UserModel } from '../models/user';
import { apiSlice } from './apiSlice';

export const usersApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		login: builder.mutation({
			query: (data) => ({
				url: `${USERS_URL}/login`,
				method: 'POST',
				body: data,
			}),
		}),
		register: builder.mutation({
			query: (data) => ({
				url: `${USERS_URL}/register`,
				method: 'POST',
				body: data,
			}),
		}),
		logout: builder.mutation<void, void>({
			query: () => ({
				url: `${USERS_URL}/logout`,
				method: 'POST',
			}),
		}),
		profile: builder.mutation({
			query: (data) => ({
				url: `${USERS_URL}/profile`,
				method: 'PUT',
				body: data,
			}),
		}),
		getUsers: builder.query<UserModel[], void>({
			query: () => ({
				url: USERS_URL,
			}),
			keepUnusedDataFor: 5,
			providesTags: ['User'],
		}),
		deleteUser: builder.mutation({
			query: (userId: string) => ({
				url: `${USERS_URL}/${userId}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['User'],
		}),
		getUserDetails: builder.query<UserModel, string>({
			query: (userId) => ({
				url: `${USERS_URL}/${userId}`,
			}),
			keepUnusedDataFor: 5,
		}),
		updateUser: builder.mutation({
			query: (data) => ({
				url: `${USERS_URL}/${data._id}`,
				method: 'PUT',
				body: data,
			}),
			invalidatesTags: ['User'],
		}),
	}),
});

export const {
	useLoginMutation,
	useLogoutMutation,
	useRegisterMutation,
	useProfileMutation,
	useGetUsersQuery,
	useDeleteUserMutation,
	useGetUserDetailsQuery,
	useUpdateUserMutation,
} = usersApiSlice;

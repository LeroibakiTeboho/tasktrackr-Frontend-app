import { apiSlice } from "@/redux/api/apiSlice";
import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";

// Create an adapter for managing users in Redux
const usersAdapter = createEntityAdapter({});
const initialState = usersAdapter.getInitialState();

// Define your API slice with injected endpoints
export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //* | get users endpoint
    getUsers: builder.query({
      query: () => "/users", // API endpoint for fetching users
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError; // Validate the status and result
      },
      transformResponse: (responseData) => {
        // Process the response data
        const loaderUsers = responseData.map((user) => {
          user.id = user._id; // Set the user ID
          return user;
        });

        // Use the adapter to set all users in the state
        return usersAdapter.setAll(initialState, loaderUsers);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "User", id: "LIST" },
            ...result.ids.map((id) => ({ type: "User", id })),
          ];
        } else return [{ type: "User", id: "LIST" }];
      },
    }),

    //* | add user endpoint
    addNewUser: builder.mutation({
      query: (initialUserData) => ({
        url: "/users",
        method: "POST",
        body: {
          ...initialUserData,
        },
      }),
      invalidatesTags: [{ type: "User", id: "LIST" }],
    }),

    //* | update user endpoint
    updateUser: builder.mutation({
      query: (initialUserData) => ({
        url: "/users",
        method: "PATCH",
        body: {
          ...initialUserData,
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "User", id: arg.id }],
    }),

    //* | delete user endpoint
    deleteUser: builder.mutation({
      query: ({ id }) => ({
        url: `/users`,
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "User", id: arg.id }],
    }),
  }),

  overrideExisting: true, 
});

export const {
  useGetUsersQuery,
  useAddNewUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = usersApiSlice;

// returns the query result object
export const selectUsersResult = usersApiSlice.endpoints.getUsers.select();

// create memoried selector

const selectUsersData = createSelector(
  selectUsersResult,
  (userResult) => userResult.data // normalized state object with ids & entities
);

// getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
  selectIds: selectUserIds,
  // Pass in a selector that returns the users slice of state
} = usersAdapter.getSelectors(
  (state) => selectUsersData(state) ?? initialState
);

import { apiSlice } from "@/redux/api/apiSlice"; 
import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";

// Create an adapter for managing users in Redux
const usersAdapter = createEntityAdapter({});
const initialState = usersAdapter.getInitialState();

// Define your API slice with injected endpoints
export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/users", // API endpoint for fetching users
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError; // Validate the status and result
      },
      keepUnusedDataFor: 5, // Keep data for 5 seconds after it's no longer in use
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
  }),
});

export const { useGetUsersQuery } = usersApiSlice;

// returns the query result object
export const selectUsersResult = usersApiSlice.endpoints.getUsers.select();

// create memoried selector

const selectUsersData = createSelector(
    selectUsersResult,
    userResult => userResult.data // normalized state object with ids & entities
)

// getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllUsers,
    selectById: selectUserById,
    selectIds: selectUserIds,
    // Pass in a selector that returns the users slice of state

} = usersAdapter.getSelectors(state => selectUsersData(state) ?? initialState) ;


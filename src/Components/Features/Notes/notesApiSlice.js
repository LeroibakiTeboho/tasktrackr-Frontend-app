import { apiSlice } from "@/redux/api/apiSlice"; //
import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";

// Create an adapter for managing notes in Redux
const notesAdapter = createEntityAdapter({
  sortComparer: (a, b) =>
    a.completed === b.completed ? 0 : a.completed ? 1 : -1,
});
const initialState = notesAdapter.getInitialState();

// Define your API slice with injected endpoints
export const notesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNotes: builder.query({
      query: () => "/notes", // API endpoint for fetching notes
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError; // Validate the status and result
      },
      keepUnusedDataFor: 5, // Keep data for 5 seconds after it's no longer in use
      transformResponse: (responseData) => {
        // Process the response data
        const loaderNotes = responseData.map((note) => {
          note.id = note._d; // Set the note ID
          return note;
        });

        // Use the adapter to set all notes in the state
        return notesAdapter.setAll(initialState, loaderNotes);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Note", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Note", id })),
          ];
        } else return [{ type: "Note", id: "LIST" }];
      },
    }),
    addNewNote: builder.mutation({
      query: (initialNote) => ({
        url: "/notes",
        method: "POST",
        body: {
          ...initialNote,
        },
      }),
      invalidatesTags: [{ type: "Note", id: "LIST" }],
    }),
    updateNote: builder.mutation({
      query: (initialNote) => ({
        url: "/notes",
        method: "PATCH",
        body: {
          ...initialNote,
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Note", id: arg.id }],
    }),
    deleteNote: builder.mutation({
      query: ({ id }) => ({
        url: `/notes`,
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Note", id: arg.id }],
    }),
    addNewNote: builder.mutation({
      query: (initialNote) => ({
        url: "/notes",
        method: "POST",
        body: {
          ...initialNote,
        },
      }),
      invalidatesTags: [{ type: "Note", id: "LIST" }],
    }),
    updateNote: builder.mutation({
      query: (initialNote) => ({
        url: "/notes",
        method: "PATCH",
        body: {
          ...initialNote,
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Note", id: arg.id }],
    }),
    deleteNote: builder.mutation({
      query: ({ id }) => ({
        url: `/notes`,
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Note", id: arg.id }],
    }),
  }),
});

export const {
  useGetNotesQuery,
  useAddNewNoteMutation,
  useUpdateNoteMutation,
  useDeleteNoteMutation,
} = notesApiSlice;

// returns the query result object
export const selectNotesResult = notesApiSlice.endpoints.getNotes.select();

// create memoried selector

const selectNotesData = createSelector(
  selectNotesResult,
  (noteResult) => noteResult.data // normalized state object with ids & entities
);

// getSelectors creates these selector and we rename them with aliases using destructuring
export const {
  selectAll: selectAllNotes,
  selectById: selectNotesById,
  selectIds: selectNotesIds,
  // Pass in a selector that returns the notes slice of state
} = notesAdapter.getSelectors(
  (state) => selectNotesData(state) ?? initialState
);

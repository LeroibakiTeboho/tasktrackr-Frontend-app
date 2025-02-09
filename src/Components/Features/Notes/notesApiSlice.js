import { apiSlice } from "@/redux/api/apiSlice"; // 
import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";

// Create an adapter for managing notes in Redux
const notesAdapter = createEntityAdapter({});
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
  }),
});

export const { useGetNotesQuery } = notesApiSlice;

// returns the query result object
export const selectNotesResult = notesApiSlice.endpoints.getNotes.select();

// create memoried selector

const selectNotesData = createSelector(
    selectNotesResult,
    noteResult => noteResult.data // normalized state object with ids & entities
)

// getSelectors creates these selector and we rename them with aliases using destructuring
export const {
    selectAll: selectAllNotes,
    selectById: selectNotesById,
    selectIds: selectNotesIds,
    // Pass in a selector that returns the notes slice of state

} = notesAdapter.getSelectors(state => selectNotesData(state) ?? initialState) ;
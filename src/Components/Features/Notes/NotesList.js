"use client";
import React, { useState } from "react";
import { useGetNotesQuery } from "./notesApiSlice";
import Note from "./Note";

const NotesList = () => {
  const {
    data: notes,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetNotesQuery();

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  let content;

  if (isLoading) content = <div className="text-center py-4">Loading...</div>;

  if (isError) {
    content = (
      <p className="text-center text-red-600 bg-white p-2 mt-2 rounded-lg shadow-md">
        {error?.data?.message || "An error occurred"}
      </p>
    );
  }

  if (isSuccess) {
    const { ids } = notes;

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentIds = ids.slice(indexOfFirstItem, indexOfLastItem);

    const tableContent = currentIds?.length
      ? currentIds.map((noteId) => <Note key={noteId} noteId={noteId} />)
      : (
          <tr>
            <td colSpan="6" className="text-center py-4">
              No notes found
            </td>
          </tr>
        );

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    content = (
      <div>
        <div className="overflow-x-auto rounded-lg shadow-lg border border-gray-200">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Updated
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Owner
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {tableContent}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-4">
          {Array.from({ length: Math.ceil(ids.length / itemsPerPage) }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => paginate(i + 1)}
              className={`mx-1 px-4 py-2 rounded-lg ${
                currentPage === i + 1
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return <div className="p-4">{content}</div>;
};

export default NotesList;
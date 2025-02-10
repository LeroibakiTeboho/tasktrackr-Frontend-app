"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { selectNotesById } from "./notesApiSlice";

const Note = ({ noteId }) => {
  const note = useSelector((state) => selectNotesById(state, noteId));
  const router = useRouter();

  if (note) {
    const created = new Date(note.createdAt).toLocaleString("en-ZA", {
      day: "numeric",
      month: "long",
    });

    const updated = new Date(note.updatedAt).toLocaleString("en-ZA", {
      day: "numeric",
      month: "long",
    });

    const handleEdit = () => router.push(`/dash/notes/${noteId}`);

    return (
      <tr className="hover:bg-gray-50 transition-colors">
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
          {note.completed ? (
            <span className="text-green-600">Completed</span>
          ) : (
            <span className="text-red-600">Open</span>
          )}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {created}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {updated}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
          {note.title}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {note.username}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          <button
            onClick={handleEdit}
            className="text-indigo-600 hover:text-indigo-900 transition-colors"
          >
            <FontAwesomeIcon icon={faPenToSquare} className="w-5 h-5" />
          </button>
        </td>
      </tr>
    );
  } else return null;
};

export default Note;
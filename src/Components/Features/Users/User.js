"use client";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { selectUserById } from "./usersApiSlice";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

const User = ({ userId }) => {
  const user = useSelector((state) => selectUserById(state, userId));
  const router = useRouter();

  if (user) {
    const handleEdit = () => router.push(`/dash/users/${userId}`);
    const userRolesString = user.roles.toString().replaceAll(",", ", ");
    const cellStatus = user.active ? "" : "bg-gray-100";

    return (
      <tr className={`hover:bg-gray-50 transition-colors ${cellStatus}`}>
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
          {user.username}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {userRolesString}
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

export default User;
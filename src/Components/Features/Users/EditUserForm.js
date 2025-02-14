"use client";
import React, { useEffect, useState } from "react";
import { useDeleteUserMutation, useUpdateUserMutation } from "./usersApiSlice";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { ROLES } from "@/config/roles";

const USER_REGEX = /^[A-z]{3,20}$/;
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/;

const EditUserForm = ({ user }) => {
  const [updateUser, { isLoading, isSuccess, isError, error }] =
    useUpdateUserMutation();

  const [
    deleteUser,
    { isSuccess: isDelSuccess, isError: isDelError, error: delerror },
  ] = useDeleteUserMutation();

  const router = useRouter();

  const [username, setUsername] = useState(user.username);
  const [validUsername, setValidUsername] = useState(false);
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [roles, setRoles] = useState(user.roles);
  const [active, setActive] = useState(user.active);

  useEffect(() => {
    setValidUsername(USER_REGEX.test(username));
  }, [username]);

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
  }, [password]);

  useEffect(() => {
    console.log("isSuccess:", isSuccess, "isDelSuccess:", isDelSuccess);
    if (isSuccess || isDelSuccess) {
      setUsername("");
      setPassword("");
      setRoles([]);
      router.push("/dash/users");
    }
  }, [isSuccess, isDelSuccess, router]);

  const onUsernameChanged = (e) => setUsername(e.target.value);
  const onPasswordChanged = (e) => setPassword(e.target.value);

  const onRolesChanged = (e) => {
    const values = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setRoles(values);
  };

  const onActiveChanged = () => setActive((prev) => !prev);

  const onSaveUserClicked = async (e) => {
    e.preventDefault();
    if (password) {
      await updateUser({ id: user.id, username, password, roles, active });
    } else {
      await updateUser({ id: user.id, username, roles, active });
    }
  };

  const onDeleteUserClicked = async () => {
    await deleteUser({ id: user.id });
  };

  const options = Object.values(ROLES).map((role) => {
    return (
      <option key={role} value={role}>
        {" "}
        {role}
      </option>
    );
  });

  let canSave;
  if (password) {
    canSave =
      [roles.length, validUsername, validPassword].every(Boolean) && !isLoading;
  } else {
    canSave = [roles.length, validUsername].every(Boolean) && !isLoading;
  }

  const errClass = isError || isDelError ? "text-red-600" : "hidden";
  const validUserClass = !validUsername ? "border-red-500" : "border-gray-300";
  const validPwdClass =
    password && !validPassword ? "border-red-500" : "border-gray-300";
  const validRolesClass = !Boolean(roles.length)
    ? "border-red-500"
    : "border-gray-300";

  const errContent = (error?.data?.message || delerror?.data?.message) ?? "";

  const content = (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <p className={`${errClass} mb-4`}>{errContent}</p>

      <form onSubmit={onSaveUserClicked} className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Edit User</h2>
          <div className="flex space-x-4">
            <button
              className={`p-2 rounded-lg ${
                canSave
                  ? "bg-indigo-600 text-white hover:bg-indigo-700"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              } transition-colors`}
              title="Save"
              disabled={!canSave}
            >
              <FontAwesomeIcon icon={faSave} className="w-5 h-5" />
            </button>
            <button
              className="p-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors"
              title="Delete"
              onClick={onDeleteUserClicked}
            >
              <FontAwesomeIcon icon={faTrashCan} className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700"
          >
            Username: <span className="text-gray-500">[3-20 letters]</span>
          </label>
          <input
            id="username"
            name="username"
            type="text"
            autoComplete="off"
            value={username}
            onChange={onUsernameChanged}
            className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${validUserClass}`}
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password: <span className="text-gray-500">[empty = no change]</span>{" "}
            <span className="text-gray-500">[4-12 chars incl. !@#$%]</span>
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={onPasswordChanged}
            className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${validPwdClass}`}
          />
        </div>

        <div>
          <label htmlFor="user-active" className="flex items-center space-x-2">
            <input
              id="user-active"
              name="user-active"
              type="checkbox"
              checked={active}
              onChange={onActiveChanged}
              className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
            <span className="text-sm font-medium text-gray-700">ACTIVE</span>
          </label>
        </div>

        <div>
          <label
            htmlFor="roles"
            className="block text-sm font-medium text-gray-700"
          >
            ASSIGNED ROLES:
          </label>
          <select
            id="roles"
            name="roles"
            multiple={true}
            size="3"
            value={roles}
            onChange={onRolesChanged}
            className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${validRolesClass}`}
          >
            {options}
          </select>
        </div>
      </form>
    </div>
  );

  return content;
};

export default EditUserForm;

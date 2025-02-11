"use client";
import { useAddNewUserMutation } from "@/Components/Features/Users/usersApiSlice";
import { ROLES } from "@/config/roles";
import { faSave, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const USER_REGEX = /^[A-z]{3,20}$/;
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/;

const NewUserForm = () => {
  const [addNewUser, { isLoading, isSuccess, isError, error }] =
    useAddNewUserMutation();

  const router = useRouter();
  const [username, setUsername] = useState("");
  const [validUsername, setValidUsername] = useState(false);
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [roles, setRoles] = useState(["Employee"]);

  useEffect(() => {
    setValidUsername(USER_REGEX.test(username));
  }, [username]);

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
  }, [password]);

  useEffect(() => {
    if (isSuccess) {
      setUsername("");
      setPassword("");
      setRoles([]);
      router.push("/dash/users");
    }
  }, [isSuccess, router]);

  const onUsernameChanged = (e) => setUsername(e.target.value);
  const onPasswordChanged = (e) => setPassword(e.target.value);

  // Handle changes for checkboxes (Roles)
  const onRoleChanged = (e) => {
    const role = e.target.value;
    setRoles((prevRoles) =>
      e.target.checked
        ? [...prevRoles, role]
        : prevRoles.filter((prevRole) => prevRole !== role)
    );
  };

  const canSave =
    [roles.length, validUsername, validPassword].every(Boolean) && !isLoading;

  const onSaveUserClicked = async (e) => {
    e.preventDefault();
    if (canSave) {
      await addNewUser({ username, password, roles });
    }
  };

  const options = Object.values(ROLES).map((role) => {
    return (
      <div key={role} className="flex items-center gap-4">
        <input
          type="checkbox"
          id={role}
          value={role}
          checked={roles.includes(role)}
          onChange={onRoleChanged}
          className="h-4 w-4 border-gray-300 rounded"
        />
        <label htmlFor={role} className="text-sm text-gray-700 px-4">
          {role}
        </label>
      </div>
    );
  });

  const errClass = isError ? "text-red-600" : "hidden";
  const validUserClass = !validUsername ? "border-red-500" : "border-gray-300";
  const validPwdClass = !validPassword ? "border-red-500" : "border-gray-300";

  const content = (
    <div className="w-[500px] p-6 bg-white rounded-lg shadow-md ">
      <p className={`${errClass} mb-4`}>{error?.data?.message}</p>

      <form onSubmit={onSaveUserClicked} className="space-y-6 ">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">New User</h2>
          <button
            className={`p-2 rounded-lg ${
              canSave
                ? "bg-indigo-600 text-white hover:bg-indigo-700"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            } transition-colors`}
            title="Save"
            disabled={!canSave}
          >
            {isLoading ? (
              <FontAwesomeIcon
                icon={faSpinner}
                className="w-5 h-5 animate-spin"
              />
            ) : (
              <FontAwesomeIcon icon={faSave} className="w-5 h-5" />
            )}
          </button>
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
            className={`text-gray-500 mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${validUserClass}`}
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password:{" "}
            <span className="text-gray-500">[4-12 chars incl. !@#$%]</span>
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={onPasswordChanged}
            className={`text-gray-500 mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${validPwdClass}`}
          />
        </div>

        <div>
          <label
            htmlFor="roles"
            className="block text-sm font-medium text-gray-700"
          >
            ASSIGNED ROLES:
          </label>
          <div className="space-y-2">{options}</div>
        </div>
      </form>
    </div>
  );

  return content;
};

export default NewUserForm;

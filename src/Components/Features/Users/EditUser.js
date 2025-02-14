"use client";
import React from "react";
import { useSelector } from "react-redux";
import { selectUserById } from "./usersApiSlice";
import { useParams } from "next/navigation";
import EditUserForm from "./EditUserForm";

const EditUser = () => {
  const params = useParams();
  const { userId } = params;

  console.log("User Id from Params:", userId); // Check if this logs correctly

  const user = useSelector(state => selectUserById(state, userId));
  
  console.log("User Data:", user); // This should display the user data
  if (!user) return <p className="text-center p-4">User not found!</p>;

  return <EditUserForm user={user} />;
};

export default EditUser;

"use client";
import DashFooter from "@/Components/Dashboard/Footer";
import DashHeader from "@/Components/Dashboard/Header";
import UserList from "@/Components/Features/Users/UserList";

import React from "react";

const page = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <DashHeader />
      <main className="flex-grow flex flex-col justify-center overflow-auto px-4 bg-white text-black">
        <UserList />
      </main>
      <DashFooter />
    </div>
  );
};

export default page;


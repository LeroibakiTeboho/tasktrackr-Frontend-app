import DashFooter from "@/Components/Dashboard/Footer";
import DashHeader from "@/Components/Dashboard/Header";
import EditUser from "@/Components/Features/Users/EditUser";
import React from "react";


const page = () => {

  return (
    <div className="flex flex-col min-h-screen">
      <DashHeader />
      <main className="flex-grow flex flex-col justify-center overflow-auto px-4 bg-gray-100 text-black">
        <EditUser />
      </main>
      <DashFooter />
    </div>
  );
};

export default page;


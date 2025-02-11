"use client";
import DashFooter from "@/Components/Dashboard/Footer";
import DashHeader from "@/Components/Dashboard/Header";
import NewUserForm from "@/Components/Features/Users/NewUserForm";



const page = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white text-black">
      {/* <DashHeader />
      <main className="flex-grow flex flex-col justify-center overflow-auto px-4">
        <NewUserForm />
      </main>
      <DashFooter /> */}
      <DashHeader />
      <main className="flex-grow flex flex-col justify-center overflow-auto px-4">
        <NewUserForm />
      </main>
      <DashFooter />
    </div>
  );
};

export default page;

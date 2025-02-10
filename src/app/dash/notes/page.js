"use client";
import DashFooter from "@/Components/Dashboard/Footer";
import DashHeader from "@/Components/Dashboard/Header";
import NotesList from "@/Components/Features/Notes/NotesList";
import React from "react";

const page = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <DashHeader />
      <main className="flex-grow flex flex-col justify-center overflow-auto px-4 bg-white text-black">
        <NotesList />
      </main>
      <DashFooter />
    </div>
  );
};

export default page;

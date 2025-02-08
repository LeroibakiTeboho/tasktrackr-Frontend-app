"use client";
import { faTachometer } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const DashFooter = () => {
  const pathname = usePathname();
  const [formattedDate, setFormattedDate] = useState("");

  // Format the date only on the client to avoid hydration errors
  useEffect(() => {
    const date = new Date();
    const formatted = new Intl.DateTimeFormat("en-ZA", {
      dateStyle: "full",
      timeStyle: "long",
    }).format(date);
    setFormattedDate(formatted);
  }, []);

  let _status = "", _user = "";
  if (pathname === "/dash") {
    _status = "Status:";
    _user = "Current User:";
  }

  return (
    <footer className="bg-black text-white p-8">
      <p>{_user}</p>
      <p>{_status}</p>
      {pathname !== "/auth/login" && <p>{formattedDate}</p>}
    </footer>
  );
};

export default DashFooter;

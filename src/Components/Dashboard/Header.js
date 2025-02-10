"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const DashHeader = () => {
  const pathname = usePathname();

  let title, link;
  if (pathname === "/auth/login") {
    title = "taskTrackr App";
    link = "/auth/login";
  } else if (pathname === "/dash") {
    title = "Dashboard";
    link = "/dash";
  } else if (pathname === "/dash/notes") {
    title = "TaskTrackr Notes";
    link = "/dash/notes";
  } else if (pathname === "/dash/users") {
    title = "TaskTrackr Users";
    link = "/dash/users";
  } else {
    title = "Change title of the page";
  }

  return (
    <header className="navbar flex flex-row justify-between items-center text-white bg-black h-24 px-4">
      <div>
        <Link href={link}>
          <h1 className="text-3xl font-extrabold text-indigo-600">TaskTrackr</h1>
          {/* <h1 className="text-3xl font-extrabold text-indigo-600">{title}</h1> */}
        </Link>
      </div>
      {/* Hide the navigation if on login page */}
      {pathname !== "/auth/login" && (
        <nav>
          <ul className="menu menu-horizontal px-1">
          <li >
              <Link className="text-indigo-600 active:bg-gray-800" href="/dash">Dashboard</Link>
            </li>
            <li>
              <Link href="/dash/notes">View Notes</Link>
            </li>
            <li>
              <details>
                <summary>Settings</summary>
                <ul className="bg-base-100 rounded-t-none p-2">
                  <li>
                    <Link className="active:bg-gray-800"  href="/dash/users">Users</Link>
                  </li>
                  <li>
                    <Link href="/auth/login">Logout</Link>
                  </li>
                </ul>
              </details>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default DashHeader;


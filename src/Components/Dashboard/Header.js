"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

const DashHeader = () => {
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState(null);

  // Function to toggle dropdown
  const toggleDropdown = (dropdownName) => {
    setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
  };

  return (
    <header className="navbar flex flex-row justify-between items-center text-white bg-black h-24 px-4">
      {/* Logo */}
      <div>
        <Link href="/dash">
          <h1 className="text-3xl font-extrabold text-indigo-600">TaskTrackr</h1>
        </Link>
      </div>

      {/* Hide the navigation if on login page */}
      {pathname !== "/auth/login" && (
        <nav>
          <ul className="px-1 flex flex-row gap-4">
            {/* View Notes Link */}
            <li>
              <Link href="/dash/users">Users</Link>
            </li>
            <li>
              <Link href="/dash/users/add">AddUsers</Link>
            </li>
            <li>
              <Link href="/dash/notes">Notes</Link>
            </li>    
            <li>
              <Link href="/dash/notes/add">Add Notes</Link>
            </li>   
            <li>
              <Link  href="/auth/login"> <span className="text-red-800 hover:text-red-700 duration-100 ">Logout</span></Link>
            </li>

            {/* Settings Dropdown 1 */}
            {/* <li>
              <details
                open={openDropdown === "settings1"}
                onToggle={() => toggleDropdown("settings1")}
              >
                <summary>Settings 1</summary>
                <ul className="bg-base-100 rounded-t-none p-2">
                  <li>
                    <Link className="active:bg-gray-800" href="/dash/users">
                      Users
                    </Link>
                  </li>
                  <li>
                    <Link href="/auth/login">Logout</Link>
                  </li>
                </ul>
              </details>
            </li> */}

            {/* Settings Dropdown 2 */}
            {/* <li>
              <details
                open={openDropdown === "settings2"}
                onToggle={() => toggleDropdown("settings2")}
              >
                <summary>Settings 2</summary>
                <ul className="bg-base-100 rounded-t-none p-2">
                  <li>
                    <Link className="active:bg-gray-800" href="/dash/users">
                      Users
                    </Link>
                  </li>
                  <li>
                    <Link href="/auth/login">Logout</Link>
                  </li>
                </ul>
              </details>
            </li> */}
          </ul>
        </nav>
      )}
    </header>
  );
};

export default DashHeader;

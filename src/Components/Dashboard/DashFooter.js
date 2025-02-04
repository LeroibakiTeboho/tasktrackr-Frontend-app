"use client";
import { faHouse, faTachometer } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

const DashFooter = () => {
  // const router = useRouter();
  const pathname = usePathname();

  // const onGoHomeClicked = () => router.push("/dash");

  // let goHomeButton = null;
  // if (pathname !== "/dash") {
  //   goHomeButton = (
  //     <button className="btn btn-primary my-2 "  title="Home" onClick={onGoHomeClicked}>
  //       <FontAwesomeIcon icon={faTachometer} />
  //       <h2>Dashboard</h2>
  //     </button>
  //   );
  // }

  const date = new Date(); // Ensure date is a Date object
  const today = new Intl.DateTimeFormat("en-ZA", {
    dateStyle: "full",
    timeStyle: "long",
  }).format(date);

  let _status, _user;

  if (pathname === "/auth/login") {
  } else if (pathname === "/dash") {
    _status = "Status:";
    _user = "Current User:";
  } else {
  }

  return (
    <footer className="bg-black text-white p-8">
      {/* {goHomeButton} */}
      <p>{_user}</p>
      <p>{_status}</p>
      {pathname !== "/auth/login" && <p>{today}</p>}
    </footer>
  );
};

export default DashFooter;

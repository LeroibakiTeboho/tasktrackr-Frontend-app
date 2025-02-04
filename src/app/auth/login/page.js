// "use client";
// import DashFooter from "@/Components/Dashboard/DashFooter";
// import DashHeader from "@/Components/Dashboard/DashHeader";
// import React from "react";

// const page = () => {
//   return (
//     <div className="flex flex-col min-h-screen bg-white text-black">
//       <DashHeader />
//       <main className="flex-grow flex flex-col justify-center overflow-auto px-4">
//         <h1>Login Page</h1>
//       </main>
//       <DashFooter />
//     </div>
//   );
// };

// export default page;

"use client";
import DashFooter from "@/Components/Dashboard/DashFooter";
import DashHeader from "@/Components/Dashboard/DashHeader";
import React from "react";

const page = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white text-black">
      <DashHeader />
      <main className="flex-grow flex flex-col justify-center overflow-auto px-4">
        <h1>Login Page</h1>
      </main>
      <DashFooter />
    </div>
  );
};

export default page;

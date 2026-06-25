import { Sidebar } from "@/components/shared/Sidebar";
import React from "react";

const DashboardLayout = ({ children }) => {
  return (
    <div>
      <nav>iam a navabar</nav>
      <Sidebar />
      <main>{children}</main>
    </div>
  );
};

export default DashboardLayout;

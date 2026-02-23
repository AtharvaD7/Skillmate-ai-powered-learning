"use client";
import React, { useState, useEffect } from "react";
import DashboardHeader from "./_components/DashboardHeader";
import SideBar from "./_components/SideBar";
import { CourseCountContext } from "../_context/CourseCountContext";

function DashboardLayout({ children }) {
  const [totalCourse, setTotalCourse] = useState(0);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    if (window.innerWidth < 768) {
      setCollapsed(true);
    }
  }, []);

  return (
    <CourseCountContext.Provider value={{ totalCourse, setTotalCourse }}>
      <div className="flex min-h-screen w-full bg-white">
        {/* Sidebar */}
        <aside
          className={`block transition-all duration-300 border-r border-slate-200 bg-white ${
            collapsed ? "w-[80px]" : "w-[220px]"
          }`}
        >
          <SideBar collapsed={collapsed} setCollapsed={setCollapsed} />
        </aside>

        {/* Main content wrapper */}
        <div className="flex-1 flex flex-col w-full overflow-x-hidden">
          <DashboardHeader />
          <main className="p-4 md:p-8 max-w-screen-2xl mx-auto w-full">
            {children}
          </main>
        </div>
      </div>
    </CourseCountContext.Provider>
  );
}

export default DashboardLayout;

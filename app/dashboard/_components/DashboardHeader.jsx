"use client";
import React, { useState } from "react";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
import { useRouter, usePathname } from "next/navigation";
import { Home, LayoutDashboard, ArrowLeft, Search } from "lucide-react";

function DashboardHeader({ showLogo = true }) {
  const router = useRouter();
  const pathname = usePathname();

  const isDashboardPage = pathname === "/dashboard";
  const isPageJs = pathname === "/dashboard/page";
  const hideBackAndLogo = ["/dashboard/upgrade", "/dashboard/profile"].includes(pathname);

  const [hoveredIcon, setHoveredIcon] = useState(null);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const data = ["React", "Next.js", "JavaScript", "Node.js", "TailwindCSS", "Clerk Auth"];

  const handleSearch = () => {
    const filteredResults = data.filter((item) =>
      item.toLowerCase().includes(searchQuery.toLowerCase())
    );
    console.log("Filtered Results:", filteredResults);
  };

  let timeout;

  const handleMouseEnter = (icon) => {
    setHoveredIcon(icon);
    timeout = setTimeout(() => {
      setTooltipVisible(true);
    }, 300);
  };

  const handleMouseLeave = () => {
    clearTimeout(timeout);
    setTooltipVisible(false);
  };

  return (
    <div className="p-5 shadow-md flex items-center justify-between relative">
      {/* Left Section */}
      <div className="flex gap-4 items-center">
        {!isDashboardPage && !isPageJs && !hideBackAndLogo && (
          <div
            onMouseEnter={() => handleMouseEnter("Back")}
            onMouseLeave={handleMouseLeave}
            className="relative"
          >
            <ArrowLeft
              className="w-6 h-6 cursor-pointer text-gray-700 hover:text-black"
              onClick={() => router.back()}
            />
            {tooltipVisible && hoveredIcon === "Back" && (
              <span className="absolute bg-black text-white text-xs rounded-md px-2 py-1 top-8 left-1/2 -translate-x-1/2">
                Back
              </span>
            )}
          </div>
        )}

        {/* Search Bar */}
        {isDashboardPage && (
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}

        {/* Logo */}
        {showLogo && !isDashboardPage && !hideBackAndLogo && (
          <div className="flex items-center gap-2">
            <Image src="/cleanlogo.svg" alt="logo" width={40} height={40} />
            <h2 className="font-bold text-2xl">SkillMate</h2>
          </div>
        )}
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {isDashboardPage ? (
          <div
            onMouseEnter={() => handleMouseEnter("Home")}
            onMouseLeave={handleMouseLeave}
            className="relative"
          >
            <Home
              className="w-6 h-6 cursor-pointer text-gray-700 hover:text-black"
              onClick={() => router.push("/")}
            />
            {tooltipVisible && hoveredIcon === "Home" && (
              <span className="absolute bg-black text-white text-xs rounded-md px-2 py-1 top-8 left-1/2 -translate-x-1/2">
                Home
              </span>
            )}
          </div>
        ) : !isPageJs && (
          <div
            onMouseEnter={() => handleMouseEnter("Dashboard")}
            onMouseLeave={handleMouseLeave}
            className="relative"
          >
            <LayoutDashboard
              className="w-6 h-6 cursor-pointer text-gray-700 hover:text-black"
              onClick={() => router.push("/dashboard")}
            />
            {tooltipVisible && hoveredIcon === "Dashboard" && (
              <span className="absolute bg-black text-white text-xs rounded-md px-2 py-1 top-8 left-1/2 -translate-x-1/2">
                Dashboard
              </span>
            )}
          </div>
        )}
        <UserButton />
      </div>
    </div>
  );
}

export default DashboardHeader;

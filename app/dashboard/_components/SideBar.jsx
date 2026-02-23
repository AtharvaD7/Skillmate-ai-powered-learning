"use client";
import React, { useContext } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Rocket,
  UserCircle,
  ArrowLeftFromLine,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import { CourseCountContext } from "@/app/_context/CourseCountContext";
import { toast } from "sonner";

function SideBar({ collapsed, setCollapsed }) {
  const { totalCourse } = useContext(CourseCountContext);
  const path = usePathname();
  const maxCredits = 5;
  const creditsUsedUp = totalCourse >= maxCredits;

  const MenuList = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { name: "Upgrade", icon: Rocket, path: "/dashboard/upgrade" },
    { name: "Profile", icon: UserCircle, path: "/dashboard/profile" },
  ];

  const handleCreateClick = () => {
    if (creditsUsedUp) toast("Upgrade to create more!");
  };

  return (


    <div
      className={`group/sidebar h-screen shadow-md p-4 relative transition-all duration-300 flex flex-col ${collapsed ? "w-[80px]" : "w-[220px]"
        }`}
    >


      {/* Arrow + Logo Section */}
      <div className="relative">
        {/* Collapse Button */}
        <div
          className={`${collapsed ? "flex justify-center mt-3.5" : "absolute top-1 right-1 mt-3"
            }`}
        >
          <button
            className="opacity-0 group-hover/sidebar:opacity-100 transition-opacity"
            onClick={() => setCollapsed(!collapsed)}
          >
            <ArrowLeftFromLine
              className={`transition-transform duration-200 ${collapsed ? "rotate-180" : ""
                }`}
            />
          </button>
        </div>

        {/* Logo */}
        {!collapsed && (
          <div className="flex gap-2 items-center mt-2">
            <Image src={"/cleanlogo.svg"} alt="logo" width={32} height={32} />
            <h2 className="font-bold text-xl">SkillMate</h2>
          </div>
        )}
      </div>

      {/* Create New Button */}
      <div className="mt-10">
        <div className="relative group">
          <Link href={creditsUsedUp ? "#" : "/create"} onClick={handleCreateClick}>
            <Button className="w-full cursor-pointer" disabled={creditsUsedUp}>
              {!collapsed ? "+ Create New" : "+"}
            </Button>
          </Link>

          {collapsed && (
            <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white text-xs rounded px-2 py-1 whitespace-nowrap z-50">
              Create New
            </div>
          )}
        </div>
      </div>

      {/* Menu Items */}
      <div className="mt-6 flex-1">
        {MenuList.map((menu, index) => (
          <Link
            key={index}
            href={menu.path}
            className={`relative group flex gap-5 items-center p-3 hover:bg-slate-200 rounded-lg cursor-pointer mt-3 ${path === menu.path ? "bg-blue-100" : ""
              }`}
          >
            <span>{React.createElement(menu.icon)}</span>

            {!collapsed && <h2>{menu.name}</h2>}

            {collapsed && (
              <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white text-xs rounded px-2 py-1 whitespace-nowrap z-50">
                {menu.name}
              </div>
            )}
          </Link>
        ))}
      </div>

      {/* Bottom Credits Section */}
      <div
        className={`absolute bottom-10 ${collapsed ? "w-full flex justify-center" : "w-[85%]"
          }`}
      >
        {!collapsed ? (
          <div className="border p-3 bg-slate-100 rounded-lg w-full">
            <h2 className="text-lg mb-2">Available Credits: {maxCredits}</h2>
            <Progress value={(totalCourse / maxCredits) * 100} />
            <h2 className="text-sm">
              {totalCourse} Out of {maxCredits} Credits Used
            </h2>
            <Link
              href={"/dashboard/upgrade"}
              className="text-blue-600 text-xs mt-3 block"
            >
              Upgrade to create more
            </Link>
          </div>
        ) : (
          <div className="relative group flex flex-col items-center">
            <div className="h-[60px] w-[8px] rounded-full bg-slate-200 overflow-hidden relative">
              <div
                className="absolute left-0 bottom-0 bg-blue-500 w-full transition-all duration-300"
                style={{ height: `${(totalCourse / maxCredits) * 100}%` }}
              />
            </div>

            {/* Tooltip */}
            <div className="absolute bottom-14 text-xs text-white bg-black px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
              {totalCourse} / {maxCredits} used
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SideBar;

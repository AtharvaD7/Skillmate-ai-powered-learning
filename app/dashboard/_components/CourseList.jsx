"use client";
import { useUser } from "@clerk/nextjs";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import CourseCardItem from "./CourseCardItem";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { CourseCountContext } from "@/app/_context/CourseCountContext";

function CourseList() {
  const { user, isLoaded } = useUser(); // ⬅️ use isLoaded from Clerk
  const [courseList, setCourseList] = useState([]);
  const [loading, setLoading] = useState(false);
  const { totalCourse, setTotalCourse } = useContext(CourseCountContext);

  useEffect(() => {
    if (isLoaded && user) {
      GetCourseList();
    }
  }, [user, isLoaded]);

  const GetCourseList = async () => {
    setLoading(true);
    try {
      const result = await axios.post("/api/courses", {
        createdBy: user?.primaryEmailAddress?.emailAddress,
      });

      console.log("Fetched Courses:", result.data.result);

      if (Array.isArray(result.data.result)) {
        setCourseList(result.data.result);
        setTotalCourse(result.data.result.length);
      } else {
        console.error("API returned unexpected data:", result.data);
        setCourseList([]);
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
      setCourseList([]);
    }
    setLoading(false);
  };

  return (
    <div className="mt-10">
      <h2 className="font-bold text-2xl flex justify-between items-center">
        Your Study Material
        {courseList.length > 0 && (
          <Button
            variant="outline"
            onClick={GetCourseList}
            className="border-blue-700 text-blue-700"
          >
            <RefreshCw className="mr-2 h-4 w-4" /> Refresh
          </Button>
        )}
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 mt-2 gap-5">
        {!isLoaded || loading ? (
          // shimmer loading
          [1, 2, 3, 4, 5, 6].map((_, index) => (
            <div
              key={index}
              className="h-56 w-full bg-slate-200 rounded-lg animate-pulse"
            ></div>
          ))
        ) : courseList.length > 0 ? (
          // show courses
          courseList.map((course) => (
            <CourseCardItem key={course.courseId} course={course} />
          ))
        ) : (
          // show empty message
          <div className="flex flex-col items-center col-span-full mt-16">
            <Image
              src="/empty1.png"
              alt="No Courses Available"
              width={60}
              height={60}
              className="mt-4 opacity-50"
            />
            <p className="p-5 text-gray-500 text-sm">
              No content found… Did Thanos snap away your curiosity?
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default CourseList;

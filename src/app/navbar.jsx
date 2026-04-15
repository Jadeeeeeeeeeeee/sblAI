"use client";

import React from "react";

export default function Navbar() {
  return (
    <div className="bg-gray-400 h-16 w-full flex items-center px-2">

      {/* logo */}
      <div className="ml-1 w-12 sm:w-14 h-full bg-black" />

      {/* nav links */}
      <div className="ml-4 flex flex-row items-center h-full gap-3 sm:gap-6">

        <a href="/WorkoutGenerator" className="px-2 sm:px-4 h-full flex items-center justify-center">
          <h1 className="text-[85%] sm:text-[110%] whitespace-nowrap">
            Generate Workout
          </h1>
        </a>

        <a href="#" className="px-2 sm:px-4 h-full flex items-center justify-center">
          <h1 className="text-[85%] sm:text-[110%] whitespace-nowrap">
            SBL Form Advice
          </h1>
        </a>

      </div>
    </div>
  );
}
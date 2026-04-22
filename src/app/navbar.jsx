"use client";

import React, { useState } from "react";

export default function Navbar() {

  const [isGenWorkout, setGenWorkout] = useState(true);

  return (
    <div className="bg-black h-16 w-full flex items-center px-2">

      {/* logo
      <img src="/sbl_ai.png" className="rounded-full ml-1 w-12 sm:w-14" /> */}

      {/* nav links */}
      <div className="ml-4 flex flex-row items-center h-full gap-3 sm:gap-6">

        <a href="/WorkoutGenerator" className={`navbar_button px-2 sm:px-4 h-full flex items-center justify-center`}>
          <h1 className="text-[85%]  sm:text-[110%] whitespace-nowrap">
            home
          </h1>
        </a>

        <a href="/questionere" className="px-2 navbar_button sm:px-4 h-full flex items-center justify-center">
          <h1 className="text-[85%] sm:text-[110%] whitespace-nowrap">
            Generate Workout
          </h1>
        </a>

        

      </div>
    </div>
  );
}
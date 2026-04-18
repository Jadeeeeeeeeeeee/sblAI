"use client"

import { useWorkout } from "../context/workoutContext"
import { useEffect } from "react";
import Day from "../components/day";
import { useRouter } from "next/navigation";

export default function finishedWorkout() {
    const { workoutData } = useWorkout()
    const router = useRouter();
    
    const result = workoutData?.result;

    useEffect(() => {
        if (!result) {
            router.replace("/questionere");
        }
    }, [result, router]);

    if (!result) return null;
    return(<>
    <div className="h-full w-full flex justify-center">
<div className="w-auto flex sm:flex-row flex-col sm:mt-10 mt-14 gap-4 sm:gap-2 items-stretch">
            {result.days.map((day, i) => (
                <Day key={i} dayNum={i}></Day>
            ))}
        </div>
    </div>
    </>);
}
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
        <div className="h-fit w-auto flex sm:flex-row flex-col gap-2">
            {result.days.map((day, i) => (
                <Day key={i} dayNum={i}></Day>
            ))}
        </div>
    </div>
    </>);
}
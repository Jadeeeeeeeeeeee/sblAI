"use client"

import { useWorkout } from "../context/workoutContext"
import Day from "../components/day";

export default function finishedWorkout() {
    const { workoutData } = useWorkout()
    
    const result = workoutData?.result;

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
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
    <div className="flex w-[50%] sm:w-[20%] flex-col items-center">
            <h1 className="text-3xl text-center">name: {result.split_name}</h1>
            <div className="text-l flex w-[100%] flex-row">
            <h3 className="mr-auto">rep range: {result.rep_range}</h3>
            <h3>sets per exercise {result.set_amount}</h3>
            </div>
        </div>
    <div className="h-full w-full flex justify-center">
<div className="flex flex-wrap justify-center mt-14 sm:mt-10 gap-4 w-full">
            {result.days.map((day, i) => (
                <Day key={i} dayNum={i}></Day>
            ))}
        </div>
    </div>
    </>);
}
"use client"

import { useState,useEffect } from "react"
import { useWorkout } from "../context/workoutContext";
import { useRouter } from "next/navigation";


export default function questionere(){
    const {setWorkoutData} = useWorkout();
    const [splitName, setSplitName] = useState("");
    const [days, setDays] = useState(0);
    const [duration, setDuration] = useState(0);
    const [splitPreference, setSplitPreference] = useState("no prefrence");
    const [customPreferences, setCustomPreferences] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();


    async function SendParse() {
    if (splitName !== "" && duration != 0 && days != 0) {

        setLoading(true)
        const res = await fetch('/api/generate', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                splitName,
                days,
                duration,
                splitPreference,
                customPreferences
            }),
        });

        const data = await res.json();
        setWorkoutData(data);        
                  router.replace("/finishedWorkout");
    }}

    return(<>
<div className={`absolute inset-0 bg-white/50 z-50 pointer-events-none transition-opacity duration-300 ${loading ? "opacity-100" : "opacity-0"}`}></div>    <div className="h-full w-[75%] flex flex-col gap-2 ">
        <h1 className="mt-20 text-2xl sm:text-4xl">Workout generator:</h1>
        
        <div className="flex flex-col w-2/5" >
            <h3>enter split name:</h3>
            <input 
                type="text" 
                value={splitName} 
                onChange={(e) => setSplitName(e.target.value)} 
                className="rounded-2xl p-1 focus:outline-none border w-full" 
            />
        </div>

        <div className=" flex flex-row w-2/5 items-center" >
            <h3>how many time do you want to workout a week?</h3>
            <input 
                max={7} 
                min={1} 
                type="number" 
                value={days}
                onChange={(e) => setDays(Number(e.target.value))}
                className="rounded-2xl border ml-auto w-10 h-10 text-center" 
            />
        </div>

        <div className=" flex flex-row w-2/5 items-center" >
            <h3>how much time should each workout be? (in hours use x. for minutes)</h3>
            <input 
                max={4} 
                min={0} 
                type="number" 
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="rounded-2xl border w-10 h-10 ml-auto text-center" 
            />
        </div>

        <div className=" flex flex-row w-2/5 items-center" >
            <h3>split prefrence (optional)</h3>
            <select 
                value={splitPreference}
                onChange={(e) => setSplitPreference(e.target.value)}
                className="w-fit h-10 ml-auto border"
            >
                <option value="no prefrence">no prefrence</option>
                <option value="PPL">PPL</option>
                <option value="FBEOD">FBEOD</option>
                <option value="A/P">antiror postieror</option>
            </select>
        </div>

        <div className="flex flex-col w-2/5" >
            <h3>custom prefrences (optional for example if you want a specific exercise to be inclouded)</h3>
            <input 
                type="text" 
                value={customPreferences}
                onChange={(e) => setCustomPreferences(e.target.value)}
                className="p-1 rounded-2xl border focus:outline-none w-full" 
            />
        </div>

        <button onClick={SendParse} className="w-40 p-2 rounded-2xl bg-blue-500 hover:cursor-pointer  hover:bg-blue-300 transition-colors">
            Generate
        </button>
    </div>
    </>)
}
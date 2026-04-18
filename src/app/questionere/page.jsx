"use client"

import { useState,useEffect } from "react"
import { useWorkout } from "../context/workoutContext";
import { useRouter } from "next/navigation";


export default function questionere(){
    const {setWorkoutData} = useWorkout();
    const [splitName, setSplitName] = useState("");
    const [days, setDays] = useState("");
    const [duration, setDuration] = useState("");
    const [splitPreference, setSplitPreference] = useState("no prefrence");
    const [customPreferences, setCustomPreferences] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const [splitOpen, setSplitOpen] = useState(false);

const options = [
    { value: "no prefrence", label: "no prefrence" },
    { value: "PPL", label: "PPL" },
    { value: "FBEOD", label: "FBEOD" },
    { value: "A/P", label: "anterior posterior" },
];

    async function SendParse() {
    if (splitName !== "" && Number(duration) != 0 && Number(days) != 0) {

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
<div className={`absolute inset-0 bg-white/50 z-50 pointer-events-none transition-opacity duration-300 ${loading ? "opacity-100" : "opacity-0"}`}></div>   
 <div className="h-full w-[75%] flex flex-col gap-2 ">
        <h1 className="mt-20 text-2xl sm:text-4xl green_gradient_text">Workout generator:</h1>
        
        <div className="flex flex-col w-full sm:w-2/5" >
            <h3>enter split name:</h3>
            <input 
                type="text" 
                value={splitName} 
                onChange={(e) => setSplitName(e.target.value)} 
                className="rounded-2xl indent-2 p-1 focus:outline-none border w-full" 
            />
        </div>

        <div className=" flex flex-row w-full sm:w-2/5 items-center" >
            <h3>how many time do you want to workout a week?</h3>
            <input 
    max={6} 
    min={1} 
    type="number" 
    value={days}
    onChange={(e) => setDays(e.target.value)}
    className="rounded-2xl border ml-auto w-10 h-10 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" 
/>
        </div>

        <div className=" flex flex-row w-full sm:w-2/5 items-center" >
            <h3>how much time should each workout be? (in hours use x. for minutes)</h3>
            <input 
    max={4} 
    min={1} 
    type="number" 
    value={duration}
    onChange={(e) => setDuration(e.target.value)}
    className="rounded-2xl border w-10 h-10 ml-auto text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" 
/>
        </div>

        <div className=" flex flex-row w-full sm:w-2/5 items-center" >
            <h3>split prefrence (optional)</h3>
            <div className="relative ml-auto">
    <button
        onClick={() => setSplitOpen(!splitOpen)}
        className="w-40 h-10 border rounded-2xl bg-black text-white px-3 flex items-center justify-between"
    >
        {options.find(o => o.value === splitPreference)?.label}
        <span>{splitOpen ? "▲" : "▼"}</span>
    </button>

    {splitOpen && (
        <div className="absolute right-0 mt-1 w-40 bg-black text-white rounded-xl overflow-hidden z-10 border border-black">
            {options.map(o => (
                <div
                    key={o.value}
                    onClick={() => { setSplitPreference(o.value); setSplitOpen(false); }}
                    className={`px-3 py-2 cursor-pointer hover:bg-gray-700 ${splitPreference === o.value ? "bg-black" : ""}`}
                >
                    {o.label}
                </div>
            ))}
        </div>
    )}
</div>
        </div>

        <div className="flex flex-col w-full sm:w-2/5" >
            <h3>custom prefrences (optional for example if you want a specific exercise to be inclouded)</h3>
            <input 
                type="text" 
                value={customPreferences}
                onChange={(e) => setCustomPreferences(e.target.value)}
                className="p-1 indent-2 rounded-2xl border focus:outline-none w-full" 
            />
        </div>

        <button disabled={loading} onClick={SendParse} className="w-40 p-2 rounded-2xl green_bg_button hover:cursor-pointer   transition-colors">
            Generate
        </button>
    </div>
    </>)
}
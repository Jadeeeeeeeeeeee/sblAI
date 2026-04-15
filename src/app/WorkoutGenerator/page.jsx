"use client"
import { useRouter } from "next/navigation";



export default function WorkoutGenerator(){
      const router = useRouter();

      function goToQuestionere(){
            router.replace("/questionere");
    }
    return(<>
    <div className="h-full w-full flex flex-col items-center">
            <h1 className="text-l sm:text-4xl bold mt-40">Science based workout generator</h1>
            <h2 className="w-[50%] text-center">Our ai workout generator has been trained about science based lifting and has been optimized to create the most optimized workouts customized for you</h2>
            <button onClick={goToQuestionere} className="bg-blue-500 hover:cursor-pointer mt-8 hover:bg-blue-300 transition-colors p-4 text text-l bold rounded-3xl"> create your personlized workout</button>
    </div>
    </>)
}
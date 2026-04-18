"use client"
import { useRouter } from "next/navigation";



export default function WorkoutGenerator(){
      const router = useRouter();

      function goToQuestionere(){
            router.replace("/questionere");
    }
    return(<>
    <div className="h-full w-full flex flex-col items-center">
            <h1 className="text-2xl sm:text-6xl green_gradient_text bold mt-40">Science based workout generator</h1>
            <h2 className="w-[80%] sm:w-[50%] sm:text-2xl text-sm text-white text-m text-center">Our ai workout generator has been trained about science based lifting and has been optimized to create the most optimized workouts customized for you</h2>
            <button onClick={goToQuestionere} className="green_bg hover:cursor-pointer mt-8 hover:bg-blue-300 transition-colors p-4 text text-l bold rounded-3xl"> create your personlized workout</button>
    </div>
    </>)
}
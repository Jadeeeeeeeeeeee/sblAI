
import { useWorkout } from "../context/workoutContext";

export default function Day({ dayNum }) {
    const { workoutData } = useWorkout();
    const day = workoutData.result.days[dayNum];

    return (
        <div className="w-[240px]">
  <div className=" border rounded-xl h-full p-1">
    <h1 className="text-3xl text-center">day:{dayNum  + 1}: {day.day_name}</h1>
    <div className="text-xl w-58 h-auto border-t flex flex-col">
      {day.exercises.map((exercise, i) => (
        <div key={i}>
          <h3 className="flex flex-row gap-1"><p className="green_text">{i + 1}.</p> <p className="">{exercise.name}</p></h3>
        </div>
      ))}
    </div>
  </div>
</div>
    );
}
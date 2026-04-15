import { useWorkout } from "../context/workoutContext";

export default function Day({ dayNum }) {
    const { workoutData } = useWorkout();
    const day = workoutData.result.days[dayNum];

    return (
        <div className="h-full border rounded-xl">
            <h1 className="text-xl text-center">{day.day_name}</h1>
            <div className="text-xs w-58 h-80 border-t flex flex-col">
                {day.exercises.map((exercise, i) => (
                    <div key={i}>
                        <h1>{exercise.name} {exercise.sets}x{exercise.reps}</h1>
                        <h4>{exercise.notes}</h4>
                    </div>
                ))}
            </div>
        </div>
    );
}
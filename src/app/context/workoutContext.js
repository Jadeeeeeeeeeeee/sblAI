"use client"

import { createContext, useContext, useState } from "react"

const WorkoutContext = createContext(null)

export function WorkoutProvider({ children }) {
  const [workoutData, setWorkoutData] = useState(null)

  return (
    <WorkoutContext.Provider value={{ workoutData, setWorkoutData }}>
      {children}
    </WorkoutContext.Provider>
  )
}

export function useWorkout() {
  return useContext(WorkoutContext)
}
import Navbar from "./navbar.jsx";
import "./globals.css"
import { WorkoutProvider } from "./context/workoutContext.js";
export const metadata = {
  title: "SblAI",
  description: "ai creator for sbl workout rotuines",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`h-full`}>
      <body className="min-h-screen flex bg-black flex-col items-center">
        <WorkoutProvider>
           <Navbar ></Navbar>
           {children}
        </WorkoutProvider>
      </body>
    </html>
  );
}

import HabitCard from "../../components/habits/HabitCard";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "axios";
import backendUrl from "../../api/Constanceapi";

export default function AllHabitsPage() {
  const navigate = useNavigate();
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleNavigate = () => {
    navigate("/dashboard");
  };

  // Fetch all habits
  useEffect(() => {
    const fetchHabits = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/habits`, {
          withCredentials: true,
        });
        console.log(response.data);
        setHabits(response.data.data);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchHabits();
  }, []);

  const handleDelete = (id) => {
    setHabits((prev) => prev.filter((habit) => habit.id !== id));
  };

  if (loading) return <p className="text-white">Loading habits...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="min-h-screen bg-background gradient-bg text-white px-6 py-6 pb-28">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Your Habits</h1>

        <button
          onClick={handleNavigate}
          className="px-4 py-2 bg-neutral-900 border border-neutral-700 rounded-xl text-sm hover:bg-neutral-800 transition-all">
          Dashboard
        </button>
      </div>

      {/* Habit Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {habits?.map((habit) => (
          <motion.div
            key={habit.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}>
            <HabitCard
              habit={habit}
              onDelete={() => handleDelete(habit.id)}
            />
          </motion.div>
        ))}
      </div>

      {/* Floating Add Habit Button */}
      <button
        onClick={() => navigate("/add-habit")}
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-500 active:scale-95 text-white w-14 h-14 rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.4)] backdrop-blur-md transition-all duration-300">
        <span className="text-3xl font-bold leading-none">+</span>
      </button>
    </motion.div>
  );
}

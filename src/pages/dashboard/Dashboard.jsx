import React, { useEffect, useState } from "react";
import axios from "axios";
import backendUrl from "../../api/Constanceapi";
import HabitCard from "../../components/habits/HabitCard";
import Spinner from "../../components/common/Spinner";
import { motion } from "framer-motion";

export default function Dashboard() {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHabits = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/habits`, {
          withCredentials: true,
        });

        setHabits(response.data.data || []);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load habits.");
      } finally {
        setLoading(false);
      }
    };

    fetchHabits();
  }, []);

  // Handler to remove habit from state after deletion
  const handleDelete = (habitId) => {
    setHabits((prev) =>
      prev.filter((habit) => habit.id !== habitId && habit._id !== habitId)
    );
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <Spinner />
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center flex-col justify-center text-red-400 text-lg bg-black">
        <p>Error: {error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-red-600/80 hover:bg-red-600 rounded-xl">
          Retry
        </button>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#0B0B0B] text-gray-100 px-4 sm:px-6 lg:px-16 py-10 pb-24">
      {/* HEADER */}
      <div className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          Your Habits
        </h1>
        <p className="text-gray-500 mt-1">
          Track your daily progress & stay consistent ✨
        </p>
      </div>

      {/* MAIN CONTENT */}
      {habits.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-20 text-gray-400">
          <div className="text-6xl mb-4">🧩</div>
          <p className="text-xl font-light">No habits found</p>
          <p className="text-gray-500 text-sm mt-1">
            Start building your daily routine.
          </p>
        </div>
      ) : (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}>
          {habits.map((habit) => (
            <HabitCard
              key={habit.id || habit._id}
              habit={habit}
              onDelete={handleDelete} // Pass the delete handler
            />
          ))}
        </motion.div>
      )}
    </div>
  );
}

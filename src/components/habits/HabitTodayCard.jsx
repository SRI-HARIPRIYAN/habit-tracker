import React, { useState, useEffect } from "react";
import { HiCheckCircle } from "react-icons/hi";
import { categoryIcons } from "../../utils/categoryIcons";
import axios from "axios";
import backendUrl from "../../api/Constanceapi";

export default function HabitTodayCard({ habit, onStatusChange }) {
  const Icon = categoryIcons[habit.category];
  const [status, setStatus] = useState(habit.habitStatus);

  useEffect(() => {
    // Sync if parent habit changes
    setStatus(habit.habitStatus);
  }, [habit.habitStatus]);

  const updateStatus = async (newStatus) => {
    setStatus(newStatus); // Update UI immediately

    try {
      await axios.put(
        `${backendUrl}/api/habits/${habit.id}`,
        { status: newStatus },
        { withCredentials: true }
      );

      // Notify parent
      onStatusChange(habit.id, newStatus);
    } catch (error) {
      console.error("Error updating habit:", error);
      setStatus(habit.habitStatus); // Revert if error
    }
  };

  return (
    <div
      className="bg-[#121212]/80 backdrop-blur-xl rounded-2xl border border-gray-800/60 
      p-5 flex items-center justify-between shadow-lg 
      hover:shadow-purple-900/20 transition-all duration-300">
      {/* LEFT */}
      <div className="flex items-center gap-4">
        <div
          className={`w-12 h-12 rounded-xl border flex items-center justify-center ${
            status === "COMPLETED"
              ? "bg-green-500/20 border-green-500/40 text-green-400"
              : status === "SKIPPED"
              ? "bg-red-500/20 border-red-500/40 text-red-400"
              : "bg-gray-800/60 border-gray-700 text-gray-500"
          }`}>
          <Icon className="w-6 h-6" />
        </div>

        <span
          className={`font-medium text-lg ${
            status === "COMPLETED"
              ? "text-gray-100"
              : status === "SKIPPED"
              ? "text-gray-400"
              : "text-gray-500"
          }`}>
          {habit.name}
        </span>
      </div>

      {/* RIGHT */}
      {status === "COMPLETED" ? (
        <HiCheckCircle className="w-8 h-8 text-green-400" />
      ) : status === "SKIPPED" ? (
        <span className="text-red-400 font-medium">Skipped</span>
      ) : (
        <div className="flex gap-2">
          <button
            onClick={() => updateStatus("COMPLETED")}
            className="px-4 py-2 rounded-xl bg-purple-600/20 border border-purple-500/40 
            text-purple-300 hover:bg-purple-600/30 active:scale-95 transition-all">
            Mark Completed
          </button>
          <button
            onClick={() => updateStatus("SKIPPED")}
            className="px-4 py-2 rounded-xl bg-red-600/20 border border-red-500/40 
            text-red-300 hover:bg-red-600/30 active:scale-95 transition-all">
            Skip
          </button>
        </div>
      )}
    </div>
  );
}

import React from "react";
import { useNavigate } from "react-router-dom";
import Profile from "../../components/common/Profile";
import logo from "../../assets/newLogo.png";

export default function Navbar({ todayStats }) {
  const navigate = useNavigate();

  const handleNavigate = () => navigate("/dashboard");

  return (
    <div
      className="flex justify-between items-center px-4 py-3 
      bg-background backdrop-blur-xl border border-neutral-800 
    shadow-md shadow-black/20">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        <img
          src={logo}
          alt="Habit Tracker Logo"
          className="w-12 h-12 object-contain rounded-lg shadow-md"
        />

        <div>
          <h3 className="text-xl font-bold tracking-wide text-white">
            Habit Tracker
          </h3>

          {todayStats && (
            <p className="text-xs text-neutral-400 mt-1">
              Completed: {todayStats.completed} • Pending: {todayStats.pending}
            </p>
          )}
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        <button
          onClick={handleNavigate}
          className="px-4 py-2 bg-neutral-900/90 border border-neutral-700 
          rounded-xl text-sm text-white hover:bg-neutral-800 transition-all">
          Dashboard
        </button>

        <Profile />
      </div>
    </div>
  );
}

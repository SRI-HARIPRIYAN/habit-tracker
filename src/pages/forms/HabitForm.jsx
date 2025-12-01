import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa";
import { createHabit } from "../../api/habit";
import HabitNameInput from "./HabitNameInput";
import FrequencySelector from "./FrequencySelector";
import WeeklyDaysSelector from "./WeeklyDaysSelector";
import CategoryGrid from "./CategoryGrid";

const dayMap = [
  "SUNDAY",
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
];

const HabitForm = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState("daily");
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const containerRef = useRef(null);

  const [selectedCategory, setSelectedCategory] = useState("health");

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    frequency: "daily",
    days: [], // daily default → all days
    category: "Health",
  });

  const [validationErrors, setValidationErrors] = useState({
    name: false,
    days: false,
  });

  const validateForm = () => {
    const errors = {
      name: formData.name.trim() === "",
      days:
        formData.frequency === "weekly" &&
        (!formData.days || formData.days.length === 0),
    };
    setValidationErrors(errors);
    return !errors.name && !errors.days;
  };

  const handleFrequencyChange = (freq) => {
    setActive(freq);
    setFormData((prev) => ({
      ...prev,
      frequency: freq,
      days: freq === "daily" ? [...dayMap] : [],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Auto-convert weekly → daily if all 7 days selected
    const isAllDaysSelected =
      formData.frequency === "weekly" && formData.days.length === 7;

    const finalFrequency = isAllDaysSelected
      ? "DAILY"
      : formData.frequency.toUpperCase();

    const finalDays = isAllDaysSelected ? [...dayMap] : formData.days;

    const payload = {
      name: formData.name.trim(),
      description: formData.description.trim() || "",
      category: formData.category.toUpperCase(),
      frequency: finalFrequency,
      days: finalDays,
    };

    try {
      await createHabit(payload);
      console.log("Habit Created →", payload);
      navigate("/"); // Redirect to home
    } catch (error) {
      console.error("Failed to create habit", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0b] via-[#0f0f12] to-[#0a0a0b] text-white relative overflow-hidden">
      <div className="max-w-lg mx-auto px-5 pt-8 pb-16 relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <button
            onClick={() => window.history.back()}
            className="p-3 rounded-2xl bg-white/5 border border-white/10">
            <FaChevronLeft className="text-xl text-gray-300" />
          </button>
          <h1 className="text-2xl font-bold text-white">Create New Habit</h1>
          <div className="w-12" />
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-8">
          {/* Habit Name */}
          <HabitNameInput
            formData={formData}
            setFormData={setFormData}
            validationErrors={validationErrors}
          />

          {/* Frequency Selector */}
          <FrequencySelector
            active={active}
            setActive={setActive}
            formData={formData}
            setFormData={setFormData}
            indicatorStyle={indicatorStyle}
            setIndicatorStyle={setIndicatorStyle}
            containerRef={containerRef}
            handleFrequencyChange={handleFrequencyChange}
          />

          {/* Weekly Days Selector */}
          {formData.frequency === "weekly" && (
            <WeeklyDaysSelector
              formData={formData}
              setFormData={setFormData}
              validationErrors={validationErrors}
              setActive={setActive}
              handleFrequencyChange={handleFrequencyChange}
            />
          )}

          {/* Category */}
          <CategoryGrid
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            setFormData={setFormData}
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-6 mt-12 rounded-3xl font-bold text-xl bg-gradient-to-r from-indigo-500 to-purple-600">
            Create Habit
          </button>
        </form>
      </div>
    </div>
  );
};

export default HabitForm;

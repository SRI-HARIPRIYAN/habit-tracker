import React from "react";

const fullDayMap = [
  "SUNDAY",
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
];

const daysOfWeek = ["S", "M", "T", "W", "T", "F", "S"];

const WeeklyDaysSelector = ({
  formData,
  setFormData,
  validationErrors,
  setActive,
  handleFrequencyChange,
}) => {
  return (
    <div className="space-y-5">
      <label className="text-sm text-gray-300">Repeat on</label>

      <div className="flex justify-center gap-4">
        {daysOfWeek.map((day, index) => {
          const fullDay = fullDayMap[index];
          const selected = formData.days.includes(fullDay);

          return (
            <button
              key={index}
              type="button"
              onClick={() => {
                setFormData((prev) => {
                  let newDays = selected
                    ? prev.days.filter((d) => d !== fullDay)
                    : [...prev.days, fullDay];

                  // Auto-switch to DAILY if user selects all 7
                  if (newDays.length === 7) {
                    setActive("daily");
                    handleFrequencyChange("daily");
                    newDays = [...fullDayMap];
                  }

                  return { ...prev, days: newDays };
                });
              }}
              className={`w-14 h-14 rounded-full flex items-center justify-center text-lg font-bold ${
                selected
                  ? "bg-purple-600 text-white"
                  : "bg-white/5 border border-white/10 text-gray-400"
              }`}>
              {day}
            </button>
          );
        })}
      </div>

      {validationErrors.days && (
        <p className="text-red-400 text-sm text-center">
          Choose at least one day
        </p>
      )}
    </div>
  );
};

export default WeeklyDaysSelector;

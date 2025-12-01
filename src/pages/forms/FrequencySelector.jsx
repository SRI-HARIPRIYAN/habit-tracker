import { FaRegCalendarDays } from "react-icons/fa6";
import { FaRegCalendarAlt } from "react-icons/fa";

const options = [
  {
    id: "daily",
    label: "Daily",
    icon: <FaRegCalendarAlt className="text-xl" />,
  },
  {
    id: "weekly",
    label: "Weekly",
    icon: <FaRegCalendarDays className="text-xl" />,
  },
];

const FrequencySelector = ({ active, setActive, formData, setFormData }) => {
  return (
    <div className="space-y-3">
      <label className="text-sm text-gray-300 font-medium">How often?</label>

      <div className="flex gap-3">
        {options.map((opt) => {
          const isActive = active === opt.id;

          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => {
                setActive(opt.id);
                setFormData((prev) => ({
                  ...prev,
                  frequency: opt.id,
                  days: opt.id === "daily" ? [] : prev.days,
                }));
              }}
              className={`flex-1 flex flex-col items-center justify-center gap-1 py-3 rounded-2xl font-semibold transition-all duration-300
                ${
                  isActive
                    ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg"
                    : "bg-white/5 border border-white/20 text-gray-400 hover:bg-white/10"
                }`}>
              {opt.icon}
              <span className="text-sm">{opt.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default FrequencySelector;

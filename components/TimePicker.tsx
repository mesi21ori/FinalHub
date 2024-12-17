import { useState, useEffect, useRef } from "react";

interface TimePickerProps {
  label: string;
  name: string;
  value?: string; // Optional value prop
  onChange: (value: string) => void;
  require?: boolean; // Add this prop to make the asterisk conditional
}

const TimePicker: React.FC<TimePickerProps> = ({
  label,
  name,
  value = "00:00:00",
  onChange,
  require = false,
}) => {
  const [time, setTime] = useState<string>(value); // Default to "00:00:00"
  const [dropdownOpen, setDropdownOpen] = useState<"hours" | "minutes" | "seconds" | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Sync time with the passed value prop when it changes
  useEffect(() => {
    setTime(value);
  }, [value]);

  // Generate the options (0-23 for hours, 0-59 for minutes and seconds)
  const generateOptions = (range: number) =>
    Array.from({ length: range }, (_, i) => i.toString().padStart(2, "0"));

  const handleTimeChange = (unit: "hours" | "minutes" | "seconds", newValue: string) => {
    const [hours, minutes, seconds] = time.split(":");
    const updatedTime = {
      hours: unit === "hours" ? newValue : hours,
      minutes: unit === "minutes" ? newValue : minutes,
      seconds: unit === "seconds" ? newValue : seconds,
    };

    const newTime = `${updatedTime.hours}:${updatedTime.minutes}:${updatedTime.seconds}`;
    setTime(newTime);
    onChange(newTime);
    setDropdownOpen(null); // Close dropdown after selection
  };

  // Split the current time or fallback to "00:00:00"
  const [hours, minutes, seconds] = time.split(":");

  // Render the dropdown with values
  const renderDropdown = (
    unit: "hours" | "minutes" | "seconds",
    options: string[],
    currentValue: string
  ) => (
    <div
      className={`absolute top-full mt-1 left-0 w-20 max-h-32 overflow-y-auto bg-[#E5E5CB] text-[#3C2A21] rounded-md shadow-md z-50 ${dropdownOpen === unit ? "block" : "hidden"}`}
    >
      {options.map((option) => (
        <div
          key={option}
          onClick={() => handleTimeChange(unit, option)}
          className={`cursor-pointer p-2 text-center ${
            option === currentValue ? "bg-[#D5CEA3] text-[#3C2A21]" : "hover:bg-[#f6f5ec]"
          }`}
        >
          {option}
        </div>
      ))}
    </div>
  );

  // Close the dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setDropdownOpen(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle scroll issues
  useEffect(() => {
    const handleScroll = () => {
      setDropdownOpen(null); // Close dropdown when scrolling
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div ref={containerRef} className="flex flex-col mb-4 relative">
      <div className="flex items-center mb-2">
        {/* Label with conditional asterisk */}
        <label className="block text-md text-[#3a2f2c] font-medium ml-1">
          {label}
          {require && <span className="text-red-700 text-2xl leading-none ml-1">*</span>}
        </label>
      </div>
      <div className="relative inline-flex items-center space-x-6 p-2 border border-[#3C2A21] rounded-md bg-[#E5E5CB] text-[#3C2A21] custom-scrollbar">
        {/* Hours */}
        <div className="relative text-center">
          <span className="block text-sm font-bold">Hrs</span>
          <div
            className="cursor-pointer w-16 p-1 rounded-md bg-[#D5CEA3] text-[#3C2A21] text-center"
            onClick={() => setDropdownOpen(dropdownOpen === "hours" ? null : "hours")}
          >
            {hours}
          </div>
          {renderDropdown("hours", generateOptions(24), hours)}
        </div>

        {/* Minutes */}
        <div className="relative text-center">
          <span className="block text-sm font-bold">Min</span>
          <div
            className="cursor-pointer w-16 p-1 rounded-md bg-[#D5CEA3] text-[#3C2A21] text-center"
            onClick={() => setDropdownOpen(dropdownOpen === "minutes" ? null : "minutes")}
          >
            {minutes}
          </div>
          {renderDropdown("minutes", generateOptions(60), minutes)}
        </div>

        {/* Seconds */}
        <div className="relative text-center">
          <span className="block text-sm font-bold">Sec</span>
          <div
            className="cursor-pointer w-16 p-1 rounded-md bg-[#D5CEA3] text-[#3C2A21] text-center"
            onClick={() => setDropdownOpen(dropdownOpen === "seconds" ? null : "seconds")}
          >
            {seconds}
          </div>
          {renderDropdown("seconds", generateOptions(60), seconds)}
        </div>
      </div>
    </div>
  );
};

export default TimePicker;
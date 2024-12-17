import React, { useState, useRef, useEffect } from "react";

interface EthiopianDatePickerProps {
  label: string;
  name: string;
  error?: string;
  value: string; // This prop can be used for controlled components.
  onChange: (date: string) => void; // Function to handle date change
  required?: boolean; // Optional prop to indicate if the field is required
}

const EthiopianDatePicker: React.FC<EthiopianDatePickerProps> = ({
  label,
  name,
  value,
  onChange,
  required = false,
}) => {
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [isMonthDropdownOpen, setMonthDropdownOpen] = useState(false);
  const [isDayDropdownOpen, setDayDropdownOpen] = useState(false);

  const months = [
    "Meskerem",
    "Tikimt",
    "Hidar",
    "Tahisas",
    "Tir",
    "Yekatit",
    "Megabit",
    "Miyazya",
    "Ginbot",
    "Sene",
    "Hamle",
    "Nehase",
    "Pagumē",
  ];

  const getDaysInMonth = (month: number | null) => {
    if (month === null) return [];
    return month === 12
      ? Array.from({ length: 6 }, (_, i) => i + 1) // 6 days in Pagumē
      : Array.from({ length: 30 }, (_, i) => i + 1); // 30 days in other months
  };

  const updateDate = (year: number | null, month: number | null, day: number | null) => {
    if (year !== null && month !== null && day !== null) {
      // Fixed the string formatting to correctly use template literals.
      const formattedDate = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
      onChange(formattedDate); // Call the parent's onChange function
    }
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const year = e.target.value ? parseInt(e.target.value, 10) : null;
    setSelectedYear(year);
    // If month and day are selected, update the date immediately
    if (year !== null && selectedMonth !== null && selectedDay !== null) {
      updateDate(year, selectedMonth, selectedDay);
    }
  };

  const monthDropdownRef = useRef<HTMLDivElement>(null);
  const dayDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        monthDropdownRef.current &&
        !monthDropdownRef.current.contains(event.target as Node)
      ) {
        setMonthDropdownOpen(false);
      }
      if (
        dayDropdownRef.current &&
        !dayDropdownRef.current.contains(event.target as Node)
      ) {
        setDayDropdownOpen(false);
      }
    };

    if (value === "") {
      // Reset the internal state of DatePicker when value is empty
      setSelectedYear(null);
      setSelectedMonth(null);
      setSelectedDay(null);
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [value]);

  // Define the missing functions
  const handleMonthSelect = (month: number) => {
    setSelectedMonth(month);
    setMonthDropdownOpen(false);
    setSelectedDay(null); // Reset day upon month change
    if (selectedYear !== null) {
      updateDate(selectedYear, month, null);
    }
  };

  const handleDaySelect = (day: number) => {
    setSelectedDay(day);
    setDayDropdownOpen(false);
    if (selectedYear !== null && selectedMonth !== null) {
      updateDate(selectedYear, selectedMonth, day);
    }
  };

  return (
    <div className="flex flex-col mb-4 sticky top-0 z-10">
      <label htmlFor={name} className="block text-[#3a2f2c] mb-2 font-medium">
        {label}
        {required && <span className="text-red-700 text-2xl ml-1">*</span>}
      </label>
      <div className="flex space-x-2">
        {/* Year Input */}
        <input
          type="number"
          value={selectedYear || ""}
          onChange={handleYearChange}
          placeholder="Year"
          className="p-2 border border-[#3C2A21] rounded-md bg-[#E5E5CB] text-[#3C2A21] w-20"
        />

        {/* Custom Month Dropdown */}
        <div className="relative" ref={monthDropdownRef}>
          <button
            onClick={() => setMonthDropdownOpen(!isMonthDropdownOpen)}
            className="p-2 border border-[#3C2A21] rounded-md bg-[#E5E5CB] text-[#3C2A21] w-32 flex items-center justify-between"
          >
            {selectedMonth !== null ? months[selectedMonth] : "Month"}
            <span className="ml-2">&#9662;</span> {/* Downward caret */}
          </button>
          {isMonthDropdownOpen && (
            <div
              className="absolute mt-2 bg-[#E5E5CB] border border-[#3C2A21] rounded-md z-10 w-32 max-h-56 overflow-y-scroll custom-scrollbar"
              style={{ scrollbarWidth: "thin" }}
            >
              {months.map((month, index) => (
                <div
                  key={index}
                  className={`p-2 hover:bg-[#D5CEA3] text-[#3C2A21] cursor-pointer ${
                    selectedMonth === index && "bg-[#D5CEA3]"
                  }`}
                  onClick={() => handleMonthSelect(index)}
                >
                  {month}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Custom Day Dropdown */}
        <div className="relative" ref={dayDropdownRef}>
          <button
            onClick={() => setDayDropdownOpen(!isDayDropdownOpen)}
            className="p-2 border border-[#3C2A21] rounded-md bg-[#E5E5CB] text-[#3C2A21] w-20 flex items-center justify-between"
            disabled={selectedMonth === null} // Disable if no month is selected
          >
            {selectedDay !== null ? selectedDay : "Day"}
            <span className="ml-2">&#9662;</span> {/* Downward caret */}
          </button>
          {isDayDropdownOpen && (
            <div
              className="absolute mt-2 bg-[#E5E5CB] border border-[#3C2A21] rounded-md z-10 w-20 max-h-56 overflow-y-scroll custom-scrollbar"
              style={{ scrollbarWidth: "thin" }}
            >
              {getDaysInMonth(selectedMonth).map((day) => (
                <div
                  key={day}
                  className={`p-2 hover:bg-[#D5CEA3] text-[#3C2A21] cursor-pointer ${
                    selectedDay === day && "bg-[#D5CEA3]"
                  }`}
                  onClick={() => handleDaySelect(day)}
                >
                  {day}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EthiopianDatePicker;

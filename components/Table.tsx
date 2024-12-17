import React from "react";

interface TableProps<T> {
  headers: string[]; // Headers for the table
  data: T[]; // Generic data type for rows
  renderRow: (row: T) => React.ReactNode; // Function to render a row
}

const CustomTable = <T,>({ headers, data, renderRow }: TableProps<T>) => {
  return (
    <div className="overflow-x-auto custom-scrollbar">
      <table className="min-w-full border-separate" style={{ borderSpacing: "1px 1px" }}>
        <thead>
          <tr className="bg-[#3C2A21] text-[#E5E5CB]">
            {headers.map((header, index) => (
              <th
                key={index}
                className="p-2 text-left border border-gray-300 whitespace-nowrap"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr
              key={index}
              className="text-[#3C2A21] bg-[#D5CEA3] hover:bg-[#c4b8a0] transition-colors"
            >
              {renderRow(row)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomTable;
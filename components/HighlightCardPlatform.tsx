import React from "react";

interface HighlightItem {
  value: string | number;
  label: string;
}

interface HighlightsProps {
  highlights: HighlightItem[]; // Array of highlight items
}

const Highlights: React.FC<HighlightsProps> = ({ highlights }) => {
  return (
    <section className="bg-[#f7f4f0] rounded-lg shadow p-4 glow-effect">
      <h2 className="text-xl font-semibold text-[#3a2f2c] mb-4">Highlights</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {highlights.map((highlight, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center p-4 rounded-md bg-[#f7f4f0] shadow-lg glow-effect"
          >
            <p className="text-lg font-bold text-[#3a2f2c]">{highlight.value}</p>
            <p className="text-sm text-[#3a2f2c]">{highlight.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Highlights;
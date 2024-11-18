"use client";

import React, { useState } from 'react';
import Image from 'next/image';

interface Testimonial {
  id: number;
  name: string;
  position: string;
  image: string;
  text: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Hannah Schmitt',
    position: 'Lead Designer',
    image: '/images/p1.jpg',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cursus nibh mauris, nec turpis orci lectus maecenas.',
  },
  {
    id: 2,
    name: 'John Doe',
    position: 'Project Manager',
    image: '/images/p2.jpg',
    text: 'Suspendisse sed magna eget nibh in turpis. Consequat dui diam lacus arcu.',
  },
  {
    id: 3,
    name: 'Alice Johnson',
    position: 'Software Engineer',
    image: '/images/p3.jpg',
    text: 'Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes.',
  },
  {
    id: 4,
    name: 'Michael Smith',
    position: 'Product Owner',
    image: '/images/p1.jpg',
    text: 'Nullam id dolor id nibh ultricies vehicula ut id elit. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.',
  },
  {
    id: 5,
    name: 'Emma Brown',
    position: 'UX Researcher',
    image: '/images/p2.jpg',
    text: 'Curabitur blandit tempus porttitor. Integer posuere erat a ante venenatis dapibus posuere velit aliquet.',
  },
  {
    id: 6,
    name: 'James Wilson',
    position: 'Marketing Specialist',
    image: '/images/p3.jpg',
    text: 'Vestibulum id ligula porta felis euismod semper. Nullam quis risus eget urna mollis ornare vel eu leo.',
  },
];

const TestimonialSlider: React.FC = () => {
  const [indexOrder, setIndexOrder] = useState<number[]>(testimonials.map((_, index) => index));

  const handleNext = () => {
    setIndexOrder((prevOrder) => [...prevOrder.slice(1), prevOrder[0]]);
  };

  const handlePrev = () => {
    setIndexOrder((prevOrder) => [prevOrder[prevOrder.length - 1], ...prevOrder.slice(0, -1)]);
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div
        className="relative flex items-center justify-center bg-[#D5CEA3] bg-opacity-20 rounded-lg overflow-hidden shadow-xl py-10 px-4 md:py-24 md:px-8"
        style={{ width: '90%', maxWidth: '800px', height: '450px' }}
      >
        {/* Smoother circles around the testimonial cards */}
        <div className="absolute inset-0 flex justify-center items-center">
          {Array.from({ length: 30 }).map((_, index) => (
            <div
              key={index}
              className="bg-[#3C2A21] rounded-full"
              style={{
                width: `${Math.random() * 25 + 10}px`, // Random size between 10px and 35px
                height: `${Math.random() * 25 + 10}px`,
                position: 'absolute',
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.3 + 0.2, // Random opacity between 0.2 and 0.5
                transform: `translate(-50%, -50%) rotate(${Math.random() * 360}deg)`,
                filter: 'blur(2px)', // Blur effect
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)', // Optional shadow for smoother appearance
              }}
            />
          ))}
        </div>

        <button
          className="bg-[#3C2A21] text-white py-2 px-4 rounded-full shadow-md hover:bg-opacity-80 transition-all absolute z-30 w-10 h-10 md:w-12 md:h-12"
          style={{
            top: '50%',
            left: '4%', // Add a gap from the left corner
            transform: 'translateY(-50%)',
          }}
          onClick={handlePrev}
        >
          &lt;
        </button>

        <div
          className="relative w-full flex flex-col items-center justify-center"
          style={{ marginTop: '50px', marginBottom: '50px' }}
        >
          {indexOrder.map((testimonialIndex, layerIndex) => {
            const testimonial = testimonials[testimonialIndex];
            const isFront = layerIndex === 0;

            return (
              <div
                key={testimonial.id}
                className={`absolute transition-all duration-700 ease-in-out transform ${isFront ? 'z-20 opacity-100' : 'opacity-70'}`}
                style={{
                  transform: `translateX(${(layerIndex - 1) * 20}px)`,
                  zIndex: testimonials.length - layerIndex,
                  width: '90%', // Use percentage for width to be responsive
                  maxWidth: '400px',
                  height: '280px',
                  pointerEvents: isFront ? 'auto' : 'none',
                  marginBottom: '20px',
                }}
              >
                <div
                  className={`rounded-lg shadow-xl p-4 ${isFront ? 'bg-[#E5E5CB]' : 'bg-[#D5CEA3]'}`}
                  style={{ height: '100%' }}
                >
                  <div
                    className="flex justify-center items-center"
                    style={{ width: '80px', height: '80px', margin: '0 auto', borderRadius: '50%', overflow: 'hidden' }}
                  >
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      width={80}
                      height={80}
                      className="rounded-full mb-2 shadow-md"
                    />
                  </div>
                  <h3 className="text-lg font-bold text-center text-[#3C2A21]">
                    {testimonial.name}
                  </h3>
                  <p className="text-gray-500 text-center italic text-sm">
                    {testimonial.position}
                  </p>
                  <p className="text-gray-700 text-center mt-2 text-sm" style={{ minHeight: '40px' }}>
                    {testimonial.text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <button
          className="bg-[#3C2A21] text-white py-2 px-4 rounded-full shadow-md hover:bg-opacity-80 transition-all absolute z-30 w-10 h-10 md:w-12 md:h-12"
          style={{
            top: '50%',
            right: '4%', // Add a gap from the right corner
            transform: 'translateY(-50%)',
          }}
          onClick={handleNext}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default TestimonialSlider;

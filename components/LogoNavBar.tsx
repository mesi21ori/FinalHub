'use client'; // Ensure this is a Client Component

import Image from 'next/image'; // Ensure you import Image from next/image

const LogoNavBar: React.FC = () => {
  return (
    <header className="bg-[#3a2f2c] text-white  py-2 px-4  fixed top-0 left-0 w-full z-50">
      <nav className="flex justify-between items-center px-4">
        {/* Logo Section */}
        <div className="flex items-center">
          <Image
            src="/images/logo.png" // Path to your logo
            alt="Ethiopian Shield Logo"
            width={30} // Smaller logo width
            height={30} // Smaller logo height
            className="mr-1"
          />
          <span className="text-xs font-bold">Heritage Hub</span>
        </div>

        {/* Back to Home Button */}
        <button
          onClick={() => (window.location.href = '/')} // Navigate to the home page
          className="text-xs font-normal underline"
        >
          Back to Home
        </button>
      </nav>
    </header>
  );
};

export default LogoNavBar;
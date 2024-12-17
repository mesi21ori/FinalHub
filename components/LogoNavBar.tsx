'use client'; // Ensure this is a Client Component

import { usePathname } from 'next/navigation'; // Import usePathname from next/navigation

const LogoNavBar: React.FC = () => {
  const pathname = usePathname(); // Get the current pathname

  // Safely handle possible null for pathname
  const isAuthPage = pathname?.startsWith("/auth") || false;
  const isDashboardPage = pathname?.startsWith("/dashboard") || false;
  const isUploaderDashboardPage = pathname?.startsWith("/uploader-dashboard") || false;

  return (
    <header className="bg-[#3a2f2c] text-white p-3 fixed top-0 left-0 w-full z-50">
      <nav className="flex items-center justify-between">
        {/* Logo */}
        <div className="text-xl font-bold">
          Logo
        </div>

        {/* Back to Home buttons for specific routes */}
        {isAuthPage && (
          <button
            onClick={() => window.location.href = '/'} // Navigate to the home page
            className="text-base font-normal underline" // Decreased font size, normal weight, and underlined text
          >
            Back to Home
          </button>
        )}
        {isDashboardPage && (
          <button
            onClick={() => window.location.href = '/'} // Navigate to the home page
            className="text-base font-normal underline" // Decreased font size, normal weight, and underlined text
          >
            Back to Home
          </button>
        )}
        {isUploaderDashboardPage && (
          <button
            onClick={() => window.location.href = '/'} // Navigate to the home page
            className="text-base font-normal underline" // Decreased font size, normal weight, and underlined text
          >
            Back to Home
          </button>
        )}
      </nav>
    </header>
  );
};

export default LogoNavBar;




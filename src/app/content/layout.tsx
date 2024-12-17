// "use client";

// import React, { ReactNode } from "react";

// interface LayoutProps {
//   children: ReactNode;
// }

// const Layout: React.FC<LayoutProps> = ({ children }) => {
//   return (
//     <div className="min-h-screen bg-[#F7F6E9] w-full flex flex-col">
//       {/* Ensure full width and vertical stacking */}
//       <main className="flex-1 w-full px-4 sm:px-8 lg:px-16 mt-8">{children}</main>
//       {/* Add responsive padding for smaller and larger screens */}
//     </div>
//   );
// };

// export default Layout;


"use client";

import React, { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#F7F6E9] w-full flex flex-col">
      {/* Ensure full width and vertical stacking */}
      <main className="flex-1 w-full px-4 sm:px-8 lg:px-16 mt-8">{children}</main>
      {/* Add responsive padding for smaller and larger screens */}
    </div>
  );
};

export default Layout;
// "use client";

// import React, { useEffect, useState } from "react";
// import { FaArchive, FaGlobe, FaHandshake, FaResearchgate, FaAward } from "react-icons/fa";
// import { motion } from "framer-motion";
// import LoadingSpinner from "../../../../components/LoadingSpinner";
// import router from "next/router";

// const WhyContributePage: React.FC = () => {
//   const [loading, setLoading] = useState<boolean>(true);

//   // Simulating data loading with a timeout (replace this with your data fetching logic)
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setLoading(false); // Set loading to false after the content has loaded
//     }, 2000); // 2 seconds delay to simulate loading

//     return () => clearTimeout(timer); // Cleanup on unmount
//   }, []);

//   // Smooth scroll for anchor links
//   useEffect(() => {
//     const handleScroll = () => {
//       document.body.style.scrollBehavior = "smooth";
//     };
//     window.addEventListener("load", handleScroll);
//     return () => window.removeEventListener("load", handleScroll);
//   }, []);

//   // Handle the "Get Started" button click to navigate to JoinRequestPage
//   const handleGetStarted = () => {
//     setLoading(true); // Set loading to true to show spinner
//     setTimeout(() => {
//       router.push("/register/join-request"); // Correct usage of router.push
//     }, 500); // 500ms delay before navigating to allow the spinner to show up
//   };

//   return (
//     <>
//       {loading ? (
//         <LoadingSpinner />
//       ) : (
//         <div className="text-[#3C2A21] p-8 max-w-5xl mx-auto">
//           {/* Header Section */}
//           <header className="text-center mb-12">
//             <motion.h1
//               className="text-4xl font-extrabold mb-4"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ duration: 1 }}
//             >
//               Why Collaborate with <span className="text-[#A68A74]">Heritage Hub?</span>
//             </motion.h1>
//             <motion.p
//               className="text-lg leading-relaxed"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ duration: 1, delay: 0.2 }}
//             >
//               Together, let’s preserve and share Ethiopia’s extraordinary cultural and historical heritage
//               with the world. Join a platform that values your contribution and amplifies its impact.
//             </motion.p>
//           </header>
// {/* Benefits Section */}
//           <section className="mb-12">
//             <h2 className="text-3xl font-semibold mb-6 text-center">Benefits of Collaboration</h2>
//             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//               <motion.div
//                 className="flex flex-col items-center p-6 bg-[#F5F5F5] rounded-lg shadow-lg hover:shadow-2xl transition-all"
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ duration: 1, delay: 0.3 }}
//               >
//                 <FaArchive size={40} className="text-[#3C2A21] mb-4 hover:text-[#A68A74] transition-all" />
//                 <h3 className="text-xl font-bold">Preservation</h3>
//                 <p className="text-center">Digitally archive and safeguard your valuable historical materials for future generations.</p>
//               </motion.div>
//               <motion.div
//                 className="flex flex-col items-center p-6 bg-[#F5F5F5] rounded-lg shadow-lg hover:shadow-2xl transition-all"
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ duration: 1, delay: 0.4 }}
//               >
//                 <FaGlobe size={40} className="text-[#3C2A21] mb-4 hover:text-[#A68A74] transition-all" />
//                 <h3 className="text-xl font-bold">Global Reach</h3>
//                 <p className="text-center">Showcase your collections to a worldwide audience of enthusiasts and researchers.</p>
//               </motion.div>
//               <motion.div
//                 className="flex flex-col items-center p-6 bg-[#F5F5F5] rounded-lg shadow-lg hover:shadow-2xl transition-all"
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ duration: 1, delay: 0.5 }}
//               >
//                 <FaHandshake size={40} className="text-[#3C2A21] mb-4 hover:text-[#A68A74] transition-all" />
//                 <h3 className="text-xl font-bold">Revenue Sharing</h3>
//                 <p className="text-center">Earn income through premium subscriptions and researcher access fees.</p>
//               </motion.div>
//               <motion.div
//                 className="flex flex-col items-center p-6 bg-[#F5F5F5] rounded-lg shadow-lg hover:shadow-2xl transition-all"
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ duration: 1, delay: 0.6 }}
//               >
//                 <FaResearchgate size={40} className="text-[#3C2A21] mb-4 hover:text-[#A68A74] transition-all" />
//                 <h3 className="text-xl font-bold">Support for Research</h3>
//                 <p className="text-center">Enable groundbreaking studies by granting researchers controlled access to your resources.</p>
//               </motion.div>
//               <motion.div
//                 className="flex flex-col items-center p-6 bg-[#F5F5F5] rounded-lg shadow-lg hover:shadow-2xl transition-all"
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ duration: 1, delay: 0.7 }}
//               >
//                 <FaAward size={40} className="text-[#3C2A21] mb-4 hover:text-[#A68A74] transition-all" />
//                 <h3 className="text-xl font-bold">Cultural Recognition</h3>
//                 <p className="text-center">Position your institution as a key player in preserving Ethiopia’s heritage.</p>
//               </motion.div>
//             </div>
//           </section>
// {/* What We Offer Section */}
//           <section className="mb-12">
//             <motion.h2
//               className="text-3xl font-semibold mb-6 text-center"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ duration: 1, delay: 0.8 }}
//             >
//               What We Offer
//             </motion.h2>
//             <motion.p
//               className="text-lg leading-relaxed mb-6 text-center"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ duration: 1, delay: 1 }}
//             >
//               As a partner, you'll gain access to a variety of tools and services designed to make managing, preserving,
//               and sharing your collections effortless. Plus, enjoy exclusive opportunities for revenue-sharing and
//               cultural recognition.
//             </motion.p>
//             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//               <motion.div
//                 className="flex flex-col items-center p-6 bg-[#F5F5F5] rounded-lg shadow-lg hover:shadow-2xl transition-all"
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ duration: 1, delay: 1.2 }}
//               >
//                 <FaArchive size={40} className="text-[#3C2A21] mb-4 hover:text-[#A68A74] transition-all" />
//                 <h3 className="text-xl font-bold">Comprehensive Tools</h3>
//                 <p className="text-center">Easily upload, manage, and track your materials with user-friendly features.</p>
//               </motion.div>
//               <motion.div
//                 className="flex flex-col items-center p-6 bg-[#F5F5F5] rounded-lg shadow-lg hover:shadow-2xl transition-all"
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ duration: 1, delay: 1.3 }}
//               >
//                 <FaResearchgate size={40} className="text-[#3C2A21] mb-4 hover:text-[#A68A74] transition-all" />
//                 <h3 className="text-xl font-bold">Real-Time Analytics</h3>
//                 <p className="text-center">Track the performance and impact of your collections with detailed insights.</p>
//               </motion.div>
//               <motion.div
//                 className="flex flex-col items-center p-6 bg-[#F5F5F5] rounded-lg shadow-lg hover:shadow-2xl transition-all"
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ duration: 1, delay: 1.4 }}
//               >
//                 <FaAward size={40} className="text-[#3C2A21] mb-4 hover:text-[#A68A74] transition-all" />
//                 <h3 className="text-xl font-bold">Secure Storage</h3>
//                 <p className="text-center">Rest assured that your contributions are safely stored with the latest technologies.</p>
//               </motion.div>
//             </div>
//           </section>

// {/* Call to Action Section */}
//           <section className="text-center">
//             <motion.h2
//               className="text-3xl font-semibold mb-4"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ duration: 1, delay: 1.2 }}
//             >
//               Ready to Join Us?
//             </motion.h2>
//             <motion.p
//               className="text-lg leading-relaxed mb-6"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ duration: 1, delay: 1.4 }}
//             >
//               Become part of a mission to preserve Ethiopia’s history and share its rich heritage with the world.
//               Start collaborating with Heritage Hub today!
//             </motion.p>
//             <motion.button
//               className="bg-[#3C2A21] text-white py-3 px-8 rounded-full text-md font-bold transition-all shadow-md"
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               transition={{ duration: 0.2 }}
//               onClick={handleGetStarted}
//             >
//               Get Started ...
//             </motion.button>
//           </section>
//         </div>
//       )}
//     </>
//   );
// };

// export default WhyContributePage;


"use client";

import React, { useEffect, useState } from "react";
import { FaArchive, FaGlobe, FaHandshake, FaResearchgate, FaAward } from "react-icons/fa";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation"; // Adjust the import to use next/navigation
import LoadingSpinner from "../../../../components/LoadingSpinner";

const WhyContributePage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter(); // Initialize router here; ensure you import from next/navigation

  // Simulating data loading with a timeout (replace this with your data fetching logic)
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // Set loading to false after the content has loaded
    }, 2000); // 2 seconds delay to simulate loading

    return () => clearTimeout(timer); // Cleanup on unmount
  }, []);

  // Smooth scroll for anchor links
  useEffect(() => {
    const handleScroll = () => {
      document.body.style.scrollBehavior = "smooth";
    };
    window.addEventListener("load", handleScroll);
    return () => window.removeEventListener("load", handleScroll);
  }, []);

  // Handle the "Get Started" button click to navigate to JoinRequestPage
  const handleGetStarted = () => {
    setLoading(true); // Set loading to true to show spinner
    setTimeout(() => {
      router.push("/register/join-request"); // Correctly use router.push to navigate
    }, 500); // 500ms delay before navigating to allow the spinner to show up
  };

  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="text-[#3C2A21] p-8 max-w-5xl mx-auto">
          {/* Header Section */}
          <header className="text-center mb-12">
            <motion.h1
              className="text-4xl font-extrabold mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              Why Collaborate with <span className="text-[#A68A74]">Heritage Hub?</span>
            </motion.h1>
            <motion.p
              className="text-lg leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              Together, let’s preserve and share Ethiopia’s extraordinary cultural and historical heritage
              with the world. Join a platform that values your contribution and amplifies its impact.
            </motion.p>
          </header>
          {/* Benefits Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-semibold mb-6 text-center">Benefits of Collaboration</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Benefit Items */}
              <motion.div
                className="flex flex-col items-center p-6 bg-[#F5F5F5] rounded-lg shadow-lg hover:shadow-2xl transition-all"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
              >
                <FaArchive size={40} className="text-[#3C2A21] mb-4 hover:text-[#A68A74] transition-all" />
                <h3 className="text-xl font-bold">Preservation</h3>
                <p className="text-center">Digitally archive and safeguard your valuable historical materials for future generations.</p>
              </motion.div>
              <motion.div
                className="flex flex-col items-center p-6 bg-[#F5F5F5] rounded-lg shadow-lg hover:shadow-2xl transition-all"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.4 }}
              >
                <FaGlobe size={40} className="text-[#3C2A21] mb-4 hover:text-[#A68A74] transition-all" />
                <h3 className="text-xl font-bold">Global Reach</h3>
                <p className="text-center">Showcase your collections to a worldwide audience of enthusiasts and researchers.</p>
              </motion.div>
              <motion.div
                className="flex flex-col items-center p-6 bg-[#F5F5F5] rounded-lg shadow-lg hover:shadow-2xl transition-all"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
              >
                <FaHandshake size={40} className="text-[#3C2A21] mb-4 hover:text-[#A68A74] transition-all" />
                <h3 className="text-xl font-bold">Revenue Sharing</h3>
                <p className="text-center">Earn income through premium subscriptions and researcher access fees.</p>
              </motion.div>
              <motion.div
                className="flex flex-col items-center p-6 bg-[#F5F5F5] rounded-lg shadow-lg hover:shadow-2xl transition-all"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.6 }}
              >
                <FaResearchgate size={40} className="text-[#3C2A21] mb-4 hover:text-[#A68A74] transition-all" />
                <h3 className="text-xl font-bold">Support for Research</h3>
                <p className="text-center">Enable groundbreaking studies by granting researchers controlled access to your resources.</p>
              </motion.div>
              <motion.div
                className="flex flex-col items-center p-6 bg-[#F5F5F5] rounded-lg shadow-lg hover:shadow-2xl transition-all"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.7 }}
              >
                <FaAward size={40} className="text-[#3C2A21] mb-4 hover:text-[#A68A74] transition-all" />
                <h3 className="text-xl font-bold">Cultural Recognition</h3>
                <p className="text-center">Position your institution as a key player in preserving Ethiopia’s heritage.</p>
              </motion.div>
            </div>
          </section>
          {/* What We Offer Section */}
          <section className="mb-12">
            <motion.h2
              className="text-3xl font-semibold mb-6 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              What We Offer
            </motion.h2>
            <motion.p
              className="text-lg leading-relaxed mb-6 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
            >
              As a partner, you'll gain access to a variety of tools and services designed to make managing, preserving,
              and sharing your collections effortless. Plus, enjoy exclusive opportunities for revenue-sharing and
              cultural recognition.
            </motion.p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <motion.div
                className="flex flex-col items-center p-6 bg-[#F5F5F5] rounded-lg shadow-lg hover:shadow-2xl transition-all"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.2 }}
              >
                <FaArchive size={40} className="text-[#3C2A21] mb-4 hover:text-[#A68A74] transition-all" />
                <h3 className="text-xl font-bold">Comprehensive Tools</h3>
                <p className="text-center">Easily upload, manage, and track your materials with user-friendly features.</p>
              </motion.div>
              <motion.div
                className="flex flex-col items-center p-6 bg-[#F5F5F5] rounded-lg shadow-lg hover:shadow-2xl transition-all"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.3 }}
              >
                <FaResearchgate size={40} className="text-[#3C2A21] mb-4 hover:text-[#A68A74] transition-all" />
                <h3 className="text-xl font-bold">Real-Time Analytics</h3>
                <p className="text-center">Track the performance and impact of your collections with detailed insights.</p>
              </motion.div>
              <motion.div
                className="flex flex-col items-center p-6 bg-[#F5F5F5] rounded-lg shadow-lg hover:shadow-2xl transition-all"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.4 }}
              >
                <FaAward size={40} className="text-[#3C2A21] mb-4 hover:text-[#A68A74] transition-all" />
                <h3 className="text-xl font-bold">Secure Storage</h3>
                <p className="text-center">Rest assured that your contributions are safely stored with the latest technologies.</p>
              </motion.div>
            </div>
          </section>

          {/* Call to Action Section */}
          <section className="text-center">
            <motion.h2
              className="text-3xl font-semibold mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
            >
              Ready to Join Us?
            </motion.h2>
            <motion.p
              className="text-lg leading-relaxed mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.4 }}
            >
              Become part of a mission to preserve Ethiopia’s history and share its rich heritage with the world.
              Start collaborating with Heritage Hub today!
            </motion.p>
            <motion.button
              className="bg-[#3C2A21] text-white py-3 px-8 rounded-full text-md font-bold transition-all shadow-md"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
              onClick={handleGetStarted}
            >
              Get Started ...
            </motion.button>
          </section>
        </div>
      )}
    </>
  );
};

export default WhyContributePage; 
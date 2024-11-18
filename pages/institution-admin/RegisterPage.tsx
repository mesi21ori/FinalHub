// //pages/institutionadmin/register_institution admin
// "use client";
// import Link from "next/link";
// import { useState } from "react";
// import '../../src/app/globals.css';

// interface RegisterPageProps {
//   onSubmit: (data: any) => void;
//   onBack: () => void;
// }



// export default function RegisterPage({ onSubmit, onBack }: RegisterPageProps) {
//   const [adminFirstName, setFirstName] = useState('');
//   const [adminLastName, setLastName] = useState('');
//   const [adminUsername, setUsername] = useState('');
//   const [adminPassword, setPassword] = useState('');
//   const [adminEmail, setEmail] = useState("");
//   const [agreed, setAgreed] = useState(false);

//   if (!adminFirstName || !adminLastName || !adminUsername || !adminPassword || !adminEmail) {
//     console.error("All fields must be filled out");
//     return; // Prevent submission if fields are empty
//   }

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     onSubmit({
//       adminFirstName,
//       adminLastName,
//       adminUsername,
//       adminPassword,
//       adminEmail,
//       agreed,
//     });
//   };

//   return (
//     <div className="min-h-screen bg-[#E5E5CB] flex items-center justify-center p-4">
//       {/* Header with Logo and Institution Name */}
//       <div className="absolute top-0 left-0 w-full flex justify-between items-center bg-[#3C2A21] p-4">
//         <div className="text-[#D5CEA3] font-bold text-lg">Logo</div>
//       </div>

//       {/* Back Button */}
//       <button
//         onClick={onBack}
//         className="absolute top-4 right-4 text-[#D5CEA3] bg-[#3C2A21] py-1 px-3 rounded-md"
//       >
//         Back
//       </button>

//       {/* Form Heading */}
//       <h1 className="text-lg md:text-xl font-bold text-center text-[#3C2A21] mb-8">
//         Add the Admin information to finish Your Join Request!
//       </h1>

//       {/* Form */}
//       <form
//         onSubmit={handleSubmit}
//         className="w-full max-w-3xl bg-[#E5E5CB] p-4 md:p-6 rounded-lg shadow-md flex flex-col md:flex-row gap-8"
//       >
//         {/* Left Side: Basic Info Fields */}
//         <div className="w-full md:w-1/2 flex flex-col items-center">
//           <div className="w-full mt-4 space-y-4">
//             <div>
//               <label htmlFor="firstName" className="block text-[#3C2A21]">First Name</label>
//               <input
//                 type="text"
//                 id="firstName"
//                 value={adminFirstName}
//                 onChange={(e) => setFirstName(e.target.value)}
//                 className="mt-1 block w-full p-2 border border-[#3C2A21] rounded-md bg-transparent focus:outline-none"
//                 placeholder="Your first name"
//                 required
//               />
//             </div>
//             <div>
//               <label htmlFor="lastName" className="block text-[#3C2A21]">Last Name</label>
//               <input
//                 type="text"
//                 id="lastName"
//                 value={adminLastName}
//                 onChange={(e) => setLastName(e.target.value)}
//                 className="mt-1 block w-full p-2 border border-[#3C2A21] rounded-md bg-transparent focus:outline-none"
//                 placeholder="Your last name"
//                 required
//               />
//             </div>
//             <div>
//               <label htmlFor="email" className="block text-[#3C2A21]"> Email</label>
//               <input
//                 type="text"
//                 id="email"
//                 value={adminEmail}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="mt-1 block w-full p-2 border border-[#3C2A21] rounded-md bg-transparent focus:outline-none"
//                 placeholder="Your  email"
//                 required
//               />
//             </div>
//           </div>
//         </div>

// {/* Right Side: Username, Password, and Agreement */}
//         <div className="w-full md:w-1/2">
//           <div className="space-y-4">
//             <div>
//               <label htmlFor="username" className="block text-[#3C2A21]">Username</label>
//               <input
//                 type="text"
//                 id="username"
//                 value={adminUsername}
//                 onChange={(e) => setUsername(e.target.value)}
//                 className="mt-1 block w-full p-2 border border-[#3C2A21] rounded-md bg-transparent focus:outline-none"
//                 placeholder="Username"
//                 required
//               />
//             </div>
//             <div>
//               <label htmlFor="password" className="block text-[#3C2A21]">Password</label>
//               <input
//                 type="password"
//                 id="password"
//                 value={adminPassword}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="mt-1 block w-full p-2 border border-[#3C2A21] rounded-md bg-transparent focus:outline-none"
//                 placeholder="Password"
//                 required
//               />
//             </div>
//             <div className="flex items-center">
//               <input
//                 type="checkbox"
//                 id="agree"
//                 checked={agreed}
//                 onChange={(e) => setAgreed(e.target.checked)}
//                 className="mr-2 appearance-none h-4 w-4 border border-[#3C2A21] rounded-sm checked:bg-[#3C2A21] focus:outline-none"
//               />
//               <label htmlFor="agree" className="text-[#3C2A21]">
//                 I agree to the <Link href="/terms" className="text-[#D5CEA3] underline">terms & policy</Link>
//               </label>
//             </div>
//           </div>

//           <button
//             type="submit"
//             className={`w-full py-2 px-6 mt-4 rounded-md ${
//               agreed ? 'bg-[#3C2A21] text-white' : 'bg-[#D5CEA3] text-[#3C2A21]'
//             } transition-colors`}
//             disabled={!agreed}
//           >
//             Register
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }


"use client";
import Link from "next/link";
import { useState } from "react";
import '../../src/app/globals.css';

interface RegisterPageProps {
  onSubmit: (data: any) => void;
  onBack: () => void;
}

export default function RegisterPage({ onSubmit, onBack }: RegisterPageProps) {
  const [adminFirstName, setFirstName] = useState('');
  const [adminLastName, setLastName] = useState('');
  const [adminUsername, setUsername] = useState('');
  const [adminPassword, setPassword] = useState('');
  const [adminEmail, setEmail] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminUsername || !adminPassword || !adminEmail) {
      setErrorMessage("All fields must be filled out");
      return; // Prevent submission if fields are empty
    }
    setErrorMessage(""); // Clear any previous error message
    onSubmit({
      adminUsername,
      adminPassword,
      adminEmail,
      agreed,
    });
  };

  return (
    <div className="min-h-screen bg-[#E5E5CB] flex items-center justify-center p-4">
      <div className="absolute top-0 left-0 w-full flex justify-between items-center bg-[#3C2A21] p-4">
        <div className="text-[#D5CEA3] font-bold text-lg">Logo</div>
      </div>

      <button onClick={onBack} className="absolute top-4 right-4 text-[#D5CEA3] bg-[#3C2A21] py-1 px-3 rounded-md">
        Back
      </button>

      <h1 className="text-lg md:text-xl font-bold text-center text-[#3C2A21] mb-8">
        Add the Admin information to finish Your Join Request!
      </h1>

      {errorMessage && <div className="text-red-500">{errorMessage}</div>}

      <form onSubmit={handleSubmit} className="w-full max-w-3xl bg-[#E5E5CB] p-4 md:p-6 rounded-lg shadow-md flex flex-col md:flex-row gap-8">
        {/* Left Side: Basic Info Fields */}
        <div className="w-full md:w-1/2 flex flex-col items-center">
          <div className="w-full mt-4 space-y-4">
            <div>
              <label htmlFor="email" className="block text-[#3C2A21]">Email</label>
              <input
                type="email"
                id="email"
                value={adminEmail}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full p-2 border border-[#3C2A21] rounded-md bg-transparent focus:outline-none"
                placeholder="Your email"
                required
              />
            </div>
          </div>
        </div>

        {/* Right Side: Username, Password, and Agreement */}
        <div className="w-full md:w-1/2">
          <div className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-[#3C2A21]">Username</label>
              <input
                type="text"
                id="username"
                value={adminUsername}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1 block w-full p-2 border border-[#3C2A21] rounded-md bg-transparent focus:outline-none"
                placeholder="Username"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-[#3C2A21]">Password</label>
              <input
                type="password"
                id="password"
                value={adminPassword}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full p-2 border border-[#3C2A21] rounded-md bg-transparent focus:outline-none"
                placeholder="Password"
                required
              />
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="agree"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mr-2 appearance-none h-4 w-4 border border-[#3C2A21] rounded-sm checked:bg-[#3C2A21] focus:outline-none"
                required
              />
              <label htmlFor="agree" className="text-[#3C2A21]">
                I agree to the <Link href="/terms" className="text-[#D5CEA3] underline">terms & policy</Link>
              </label>
            </div>
          </div>

          <button
            type="submit"
            className={`w-full py-2 px-6 mt-4 rounded-md ${agreed ? 'bg-[#3C2A21] text-white' : 'bg-[#D5CEA3] text-[#3C2A21]'}`}
            disabled={!agreed}
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
}

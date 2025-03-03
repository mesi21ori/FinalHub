// import type { NextApiRequest, NextApiResponse } from "next";
// import { PrismaClient } from "@prisma/client";
// import { getSession } from "next-auth/react";

// const prisma = new PrismaClient();

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//     if (req.method !== "POST") {
//       return res.status(405).json({ message: "Method not allowed" });
//     }
  
//     try {
//       const { institutionId, firstName, lastName, email, gender, username, password, role } = req.body;
  
//       if (!institutionId) {
//         return res.status(400).json({ message: "Institution ID is required" });
//       }
  
//       const institution = await prisma.institution.findUnique({
//         where: { id: institutionId },
//       });
  
//       if (!institution) {
//         return res.status(404).json({ message: "Institution not found" });
//       }
  
//       const newStaff = await prisma.user.create({
//         data: {
//           firstName,
//           lastName,
//           email,
//           gender,
//           username,
//           password,
//           role,
//           institution: {
//             connect: { id: institutionId },
//           },
//         },
//       });
  
//       return res.status(201).json({ message: "Staff member created successfully", staff: newStaff });
//     } catch (error: unknown) {
//       if (error instanceof Error) {
//         console.error("Error creating staff member:", error.message);
//         return res.status(500).json({ message: "Internal server error", error: error.message });
//       } else {
//         console.error("Unexpected error:", error);
//         return res.status(500).json({ message: "An unknown error occurred" });
//       }
//     }
//   }
  

// import type { NextApiRequest, NextApiResponse } from "next";
// import { PrismaClient } from "@prisma/client";
// import { getSession } from "next-auth/react";

// const prisma = new PrismaClient();

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method !== "POST") {
//     return res.status(405).json({ message: "Method not allowed" });
//   }

//   try {
//     const { institutionId, firstName, lastName, email, gender, username, password, role } = req.body;

//     // Validate input fields
//     if (!institutionId) {
//       return res.status(400).json({ message: "Institution ID is required" });
//     }
//     if (!firstName || !lastName || !email || !username || !password || !role) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     // Check if the institution exists
//     const institution = await prisma.institution.findUnique({
//       where: { id: institutionId },
//     });

//     if (!institution) {
//       return res.status(404).json({ message: "Institution not found" });
//     }

//     // Check if email or username already exist
//     const existingEmail = await prisma.user.findUnique({
//       where: { email },
//     });

//     if (existingEmail) {
//       return res.status(400).json({ message: "Email is already taken" });
//     }

//     const existingUsername = await prisma.user.findUnique({
//       where: { username },
//     });

//     if (existingUsername) {
//       return res.status(400).json({ message: "Username is already taken" });
//     }

//     // Create the new staff member
//     const newStaff = await prisma.user.create({
//       data: {
//         firstName,
//         lastName,
//         email,
//         gender,
//         username,
//         password,
//         role,
//         institution: {
//           connect: { id: institutionId },
//         },
//       },
//     });

//     return res.status(201).json({ message: "Staff member created successfully", staff: newStaff });
//   } catch (error: unknown) {
//     if (error instanceof Error) {
//       console.error("Error creating staff member:", error.message);
//       return res.status(500).json({ message: "Internal server error", error: error.message });
//     } else {
//       console.error("Unexpected error:", error);
//       return res.status(500).json({ message: "An unknown error occurred" });
//     }
//   }
// }

import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt"; // Import bcrypt for hashing passwords

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { institutionId, firstName, lastName, email, gender, username, password, role } = req.body;

    // Validate input fields
    if (!institutionId) {
      return res.status(400).json({ message: "Institution ID is required" });
    }
    if (!firstName || !lastName || !email || !username || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if the institution exists
    const institution = await prisma.institution.findUnique({
      where: { id: institutionId },
    });

    if (!institution) {
      return res.status(404).json({ message: "Institution not found" });
    }

    // Check if email or username already exist
    const existingEmail = await prisma.user.findUnique({
      where: { email },
    });

    if (existingEmail) {
      return res.status(400).json({ message: "Email is already taken" });
    }

    const existingUsername = await prisma.user.findUnique({
      where: { username },
    });

    if (existingUsername) {
      return res.status(400).json({ message: "Username is already taken" });
    }

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds (adjust as needed)

    // Create the new staff member
    const newStaff = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        gender,
        username,
        password: hashedPassword, // Store the hashed password
        role,
        institution: {
          connect: { id: institutionId },
        },
      },
    });

    return res.status(201).json({ message: "Staff member created successfully", staff: newStaff });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error creating staff member:", error.message);
      return res.status(500).json({ message: "Internal server error", error: error.message });
    } else {
      console.error("Unexpected error:", error);
      return res.status(500).json({ message: "An unknown error occurred" });
    }
  }
}

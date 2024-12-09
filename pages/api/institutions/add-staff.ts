// pages/api/institutions/add-staff.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const {firstName ,lastName , gender,phoneNumber,username, email, role, password, institutionId } = req.body;

  try {
    // Validate input
    if (!username || !email || !role || !password || !institutionId) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    // Check if the institution exists
    const institution = await prisma.institution.findUnique({
      where: { id: institutionId },
    });

    if (!institution) {
      return res.status(404).json({ message: 'Institution not found' });
    }

    // Check if username or email already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { username },
          { email },
        ],
      },
    });

    if (existingUser) {
      if (existingUser.username === username) {
        return res.status(400).json({ message: 'Username is already in use' });
      }
      if (existingUser.email === email) {
        return res.status(400).json({ message: 'Email is already in use' });
      }
    }

    // Create a hashed password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new staff member
    const staff = await prisma.user.create({
      data: {
        firstName,
        lastName, 
        gender,
        phoneNumber,
        username,
        email,
        role,
        password: hashedPassword,
        institutionId,
      },
    });

    res.status(201).json(staff);
  } catch (error) {
    console.error('Error adding staff:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

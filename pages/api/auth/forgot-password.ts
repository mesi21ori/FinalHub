// pages/api/auth/forgot-password.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

const prisma = new PrismaClient();
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("Received request for forgot password");

  if (req.method !== 'POST') {
    console.log("Invalid request method: ", req.method);
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email } = req.body;
  console.log("User email from request body:", email);
// Check if the required environment variables are set 
  try {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS || !process.env.JWT_SECRET || !process.env.NEXT_PUBLIC_URL) {
      console.error("Missing environment variables for email, JWT secret, or URL.");
      return res.status(500).json({ message: 'Internal server error' });
    }

     //find the user by email
    const user = await prisma.user.findUnique({ where: { email } });
    console.log("User found in database:", user);
    if (!user) {
      console.log("No user found with that email");
      return res.status(200).json({ message: 'If the email exists, a reset link will be sent.' });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
    console.log("Generated JWT token for reset:", token);

    // Set up the email transporter 
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Construct the reset URL
    const resetUrl = `${process.env.NEXT_PUBLIC_URL}/reset-password?token=${token}`;
    console.log("Constructed reset URL:", resetUrl);

     // Define the email options 
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: 'Password Reset',
      text: `Click here to reset your password: ${resetUrl}`,
    };
    console.log("Sending email to:", user.email);

     // Send the email using the transporter
    await transporter.sendMail(mailOptions);
    console.log("Reset email sent successfully");

    res.status(200).json({ message: 'If the email exists, a reset link will be sent.' });
  } catch (error) {
    console.error("Error occurred during password reset:", error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

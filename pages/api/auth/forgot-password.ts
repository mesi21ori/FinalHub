// // pages/api/auth/forgot-password.ts
// import type { NextApiRequest, NextApiResponse } from 'next';
// import { PrismaClient } from '@prisma/client';
// import jwt from 'jsonwebtoken';
// import nodemailer from 'nodemailer';

// const prisma = new PrismaClient();
// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   console.log("Received request for forgot password");

//   if (req.method !== 'POST') {
//     console.log("Invalid request method: ", req.method);
//     return res.status(405).json({ message: 'Method not allowed' });
//   }

//   const { email } = req.body;
//   console.log("User email from request body:", email);
// // Check if the required environment variables are set 
//   try {
//     if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS || !process.env.JWT_SECRET || !process.env.NEXT_PUBLIC_URL) {
//       console.error("Missing environment variables for email, JWT secret, or URL.");
//       return res.status(500).json({ message: 'Internal server error' });
//     }

//      //find the user by email
//     const user = await prisma.user.findUnique({ where: { email } });
//     console.log("User found in database:", user);
//     if (!user) {
//       console.log("No user found with that email");
//       return res.status(200).json({ message: 'If the email exists, a reset link will be sent.' });
//     }

//     const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
//     console.log("Generated JWT token for reset:", token);

//     // Set up the email transporter 
//     const transporter = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//       },
//     });

//     // Construct the reset URL
//     const resetUrl = `${process.env.NEXT_PUBLIC_URL}/reset-password?token=${token}`;
//     console.log("Constructed reset URL:", resetUrl);

//      // Define the email options 
//     const mailOptions = {
//       from: process.env.EMAIL_USER,
//       to: user.email,
//       subject: 'Password Reset',
//       text: `Click here to reset your password: ${resetUrl}`,
//     };
//     console.log("Sending email to:", user.email);

//      // Send the email using the transporter
//     await transporter.sendMail(mailOptions);
//     console.log("Reset email sent successfully");

//     res.status(200).json({ message: 'If the email exists, a reset link will be sent.' });
//   } catch (error) {
//     console.error("Error occurred during password reset:", error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// }


// // pages/api/auth/forgot-password.ts
// import type { NextApiRequest, NextApiResponse } from 'next';
// import { PrismaClient } from '@prisma/client';
// import jwt from 'jsonwebtoken';
// import nodemailer from 'nodemailer';

// const prisma = new PrismaClient();

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   console.log("Received request for forgot password");

//   if (req.method !== 'POST') {
//     console.log("Invalid request method: ", req.method);
//     return res.status(405).json({ message: 'Method not allowed' });
//   }

//   const { email } = req.body;
//   console.log("User email from request body:", email);

//   try {
//     if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS || !process.env.JWT_SECRET || !process.env.NEXT_PUBLIC_URL) {
//       console.error("Missing environment variables for email, JWT secret, or URL.");
//       return res.status(500).json({ message: 'Internal server error' });
//     }

//     // Find the user by email
//     const user = await prisma.user.findUnique({ where: { email } });
//     console.log("User found in database:", user);

//     // If user is not found, send a descriptive message
//     if (!user) {
//       console.log("No user found with that email");
//       return res.status(200).json({
//         message: 'No account associated with this email. Please check the email address or register for an account.'
//       });
//     }

//     const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
//     console.log("Generated JWT token for reset:", token);

//     // Set up the email transporter
//     const transporter = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//       },
//     });

//     // Construct the reset URL
//     const resetUrl = `${process.env.NEXT_PUBLIC_URL}/auth/reset-password?token=${token}`;
//     console.log("Constructed reset URL:", resetUrl);

//     // Define the email options with HTML content and your logo
    
//     const mailOptions = {
//       from: process.env.EMAIL_USER,
//       to: user.email,
//       subject: 'Password Reset',
//       html: `
//         <!DOCTYPE html>
//         <html lang="en">
//         <head>
//           <meta charset="UTF-8">
//           <meta name="viewport" content="width=device-width, initial-scale=1.0">
//           <title>Password Reset Request</title>
//           <style>
//             body {
//               font-family: Arial, sans-serif;
//               background-color: #E5E5CB; /* Background color */
//               margin: 0;
//               padding: 0;
//               text-align: center;
//             }
//             .container {
//               width: 100%;
//               max-width: 600px;
//               background-color: #ffffff;
//               margin: 30px auto;
//               padding: 20px;
//               border-radius: 8px;
//               box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
//             }
//             .header {
//               display: flex;
//               align-items: center;
//               justify-content: flex-start;  /* Align to the left */
//               margin-bottom: 20px;
//             }
//             .header .logo {
//               width: 100px; /* Adjust size as needed */
//               height: 100px;
//               display: flex;
//               align-items: center;
//               justify-content: center;
//               border: 1px solid #ccc;
//               margin-right: 20px; /* Space between logo and institution name */
//             }
//             .header .logo img {
//               max-width: 100%;
//               max-height: 100%;
//             }
//             .header .institution-name {
//               font-size: 20px;
//               font-weight: bold;
//               color: #3C2A21; /* Main heading color */
//               display: flex;
//               align-items: center;  /* Vertically center the text */
//               margin-top: 40px;  /* Move the text down by 10px */
//             }
//             h2 {
//               color: #3C2A21; /* Main heading color */
//             }
//             p {
//               font-size: 16px;
//               color: #3e251c; /* Text color */
//             }
//             .button {
//               display: inline-block;
//               background-color: #3C2A21; /* Button color */
//               color: white;
//               font-size: 16px;
//               font-weight: bold;
//               padding: 12px 24px;
//               text-decoration: none;
//               border-radius: 5px;
//               margin-top: 20px;
//             }
//             .footer {
//               font-size: 14px;
//               color: #999;
//               margin-top: 30px;
//             }
//           </style>
//         </head>
//         <body>
//           <div class="container">
//             <!-- Header Section -->
//             <div class="header">
//               <div class="logo">
//                 <!-- Replace with actual logo -->
//                 <img src="cid:logo" alt="Logo" />
//               </div>
//               <div class="institution-name">
//                 Heritage Hub
//               </div>
//             </div>
    
//             <h2>Password Reset Request</h2>
//             <p>Hello ${user.firstName},</p>
//             <p>We received a request to reset your password. If you requested this change, please click the button below to reset your password:</p>
            
//             <a href="${resetUrl}" class="button">Reset My Password</a>
            
//             <p>If you didn’t request a password reset, please ignore this email or contact our support team if you have any concerns.</p>
    
//             <div class="footer">
//               <p>Thank you for using our service!</p>
//               <p>If you have any questions, feel free to contact us at support@yourdomain.com</p>
//             </div>
//           </div>
//         </body>
//         </html>
//       `,
//       attachments: [
//         {
//           filename: 'logo.png',  // replace with your logo file
//           path: 'public/images/logo.png',  // use a full path to your logo image file
//           cid: 'logo',  // This must match the "cid:logo" used in the <img> tag
//         },
//       ],
//     };
    
//     console.log("Sending email to:", user.email);

//     // Send the email using the transporter
//     await transporter.sendMail(mailOptions);
//     console.log("Reset email sent successfully");

//     res.status(200).json({ message: 'If the email exists, a reset link will be sent.' });
//   } catch (error) {
//     console.error("Error occurred during password reset:", error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// }



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

  try {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS || !process.env.JWT_SECRET || !process.env.NEXT_PUBLIC_URL) {
      console.error("Missing environment variables for email, JWT secret, or URL.");
      return res.status(500).json({ message: 'Internal server error: Missing environment variables' });
    }

    // Find the user by email
    const user = await prisma.user.findUnique({ where: { email } });
    console.log("User found in database:", user);

    // If user is not found, send a descriptive message
    if (!user) {
      console.log("No user found with that email");
      return res.status(200).json({
        message: 'No account associated with this email. Please check the email address or register for an account.'
      });
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
    const resetUrl = `${process.env.NEXT_PUBLIC_URL}/auth/reset-password?token=${token}`;
    console.log("Constructed reset URL:", resetUrl);

    // Define the email options with HTML content and your logo
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: 'Password Reset',
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Password Reset Request</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #E5E5CB;
              margin: 0;
              padding: 0;
              text-align: center;
            }
            .container {
              width: 100%;
              max-width: 600px;
              background-color: #ffffff;
              margin: 30px auto;
              padding: 20px;
              border-radius: 8px;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }
            h2 {
              color: #3C2A21;
            }
            p {
              font-size: 16px;
              color: #3e251c;
            }
            .button {
              display: inline-block;
              background-color: #3C2A21;
              color: white;
              font-size: 16px;
              font-weight: bold;
              padding: 12px 24px;
              text-decoration: none;
              border-radius: 5px;
              margin-top: 20px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h2>Password Reset Request</h2>
            <p>Hello ${user.firstName},</p>
            <p>We received a request to reset your password. If you requested this change, please click the button below to reset your password:</p>
            <a href="${resetUrl}" class="button">Reset My Password</a>
            <p>If you didn’t request a password reset, please ignore this email or contact our support team.</p>
          </div>
        </body>
        </html>
      `,
    };

    console.log("Sending email to:", user.email);

    // Send the email using the transporter
    await transporter.sendMail(mailOptions);
    console.log("Reset email sent successfully");

    res.status(200).json({ message: 'Check your the email, a reset link will be sent.' });
  } catch (error) {
    console.error("Error occurred during password reset:", error);
    if (error instanceof Error) {
      res.status(500).json({ message: 'Internal server error: ' + error.message });
    } else {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}

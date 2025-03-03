// import { NextApiRequest, NextApiResponse } from 'next';
// import prisma from '../../../lib/prisma';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method !== 'PUT') {
//     return res.status(405).json({ message: 'Method not allowed' });
//   }

//   const { requestId, reviewerId } = req.body;

//   if (!requestId || !reviewerId) {
//     return res.status(400).json({ message: 'Request ID and Reviewer ID are required' });
//   }

//   try {
//     // Ensure `req.url` is safely handled in case it's undefined
//     const status = req.url?.includes('accept') ? 'APPROVED' : 'REJECTED';

//     // Update the access request in the database
//     const updatedRequest = await prisma.accessRequest.update({
//       where: { id: requestId },
//       data: {
//         status: status,
//         reviewerId: parseInt(reviewerId, 10), // Convert reviewerId to an integer
//       },
//     });

//     res.status(200).json(updatedRequest);
//   } catch (error) {
//     console.error('Error updating request:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// }


import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';
import nodemailer from 'nodemailer';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { requestId, reviewerId } = req.body;

  if (!requestId || !reviewerId) {
    return res.status(400).json({ message: 'Request ID and Reviewer ID are required' });
  }

  try {
    // Set status to 'APPROVED'
    const status = 'APPROVED';

    // Update the access request in the database
    const updatedRequest = await prisma.accessRequest.update({
      where: { id: requestId },
      data: {
        status: status,
        reviewerId: parseInt(reviewerId, 10),
      },
    });

    // Get the user associated with the request
    const user = await prisma.user.findUnique({
      where: { id: updatedRequest.userId },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Set up email transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Define the subject and email content
    const subject = 'Your application has been APPROVED';
    const message = `Your application has been ACCEPTED. You can now access the requested content.`;

    // Construct the email content with HTML and logo
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: subject,
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Application Status Update</title>
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
            img.logo {
              width: 120px;
              margin-bottom: 20px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <img src="https://yourlogourl.com/logo.png" alt="Logo" class="logo">
            <h2>Application Status Update</h2>
            <p>Hello ${user.firstName},</p>
            <p>${message}</p>
          </div>
        </body>
        </html>
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Request status updated and email sent successfully' });
  } catch (error) {
    console.error('Error updating request or sending email:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

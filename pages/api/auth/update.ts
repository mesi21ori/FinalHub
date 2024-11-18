import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma'; // Ensure this path is correct
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key'; // Replace with your JWT secret

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'PUT') {  // Ensure this line is checking for 'PUT'
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        try {
            const decoded = jwt.verify(token, SECRET_KEY) as { userId: string };

            const { userId } = decoded;
            const { email, username, password } = req.body;

            // Hash new password if provided
            let hashedPassword;
            if (password) {
                hashedPassword = await bcrypt.hash(password, 10);
            }

            const updatedUser = await prisma.user.update({
                where: { id: Number(userId) },
                data: {
                    email,
                    username,
                    ...(password && { password: hashedPassword }),
                },
            });

            res.status(200).json({ message: 'User updated successfully', user: updatedUser });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });  // This handles methods other than 'PUT'
    }
}

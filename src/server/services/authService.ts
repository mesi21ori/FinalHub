// /src/server/services/authService.ts
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function validateUserCredentials(username: string, password: string) {
  const user = await prisma.user.findUnique({
    where: { username },
    include: { institution: true },
  });
  
  if (!user) return null;

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) return null;

  return user;
}

export function generateJwtToken(user: any): string {
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    throw new Error('JWT_SECRET is missing');
  }

  return jwt.sign(
    {
      id: user.id,
      role: user.role,
      email: user.email,
    },
    jwtSecret,
    { expiresIn: '1h' }
  );
}

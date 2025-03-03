// /src/server/controllers/authController.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { validateUserCredentials, generateJwtToken } from '../services/authService';

export async function signIn(req: NextApiRequest, res: NextApiResponse) {
  const { username, password } = req.body;
  const user = await validateUserCredentials(username, password);

  if (!user) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  const token = generateJwtToken(user);

  res.setHeader('Set-Cookie', `token=${token}; HttpOnly; Secure; Path=/`);
  res.status(200).json({
    role: user.role,
    institutionStatus: user.institution?.registrationStatus || null,
    institutionId: user.institutionId,
    id: user.id,
    email: user.email,
    isActive: user.isActive,
  });
}

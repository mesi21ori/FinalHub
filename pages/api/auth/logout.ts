import { NextApiRequest, NextApiResponse } from 'next';
import { serialize } from 'cookie';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    // Clear the token cookie
    const tokenCookie = serialize('token', '', {
      maxAge: -1,  // Setting maxAge to -1 removes the cookie
      path: '/',    // Ensure the path matches where the cookie is set
      httpOnly: true, // Helps prevent client-side JavaScript from accessing the cookie
      sameSite: 'strict', // Helps prevent CSRF attacks
    });

    res.setHeader('Set-Cookie', tokenCookie);
    res.status(200).json({ message: 'Logged out successfully' });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}

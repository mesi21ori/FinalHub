// import jwt from 'jsonwebtoken';

// const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key';

// export function verifyToken(token: string) {
//     try {
//         return jwt.verify(token, SECRET_KEY);
//     } catch (error) {
//         return null;
//     }
// }


import jwt, { JwtPayload } from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key';

/**
 * Verifies a JWT token and returns the decoded payload if valid.
 * @param token - The JWT token to verify.
 * @returns The decoded JWT payload if valid, or null if invalid or expired.
 */
export function verifyToken(token: string): JwtPayload | null {
  console.log('Verifying token:', token);  // Log the token for debugging

  try {
    // Verify the token with the secret key
    const decoded = jwt.verify(token, SECRET_KEY) as JwtPayload;
    
    // Optionally, you can validate the decoded payload further (e.g., check for 'userId' property)
    if (!decoded.userId) {
      throw new Error('Invalid token payload');
    }

    return decoded;
  } catch (error) {
    // Log the error for debugging purposes
    if (error instanceof Error) {
      console.error('Token verification failed:', error.message);
    } else {
      console.error('Token verification failed:', error);
    }

    // Return null if the token is invalid, expired, or malformed
    return null;
  }
}

import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key';

export function verifyToken(token: string) {
    try {
        return jwt.verify(token, SECRET_KEY);
    } catch (error) {
        return null;
    }
}
// utils/auth.ts
// import jwt from 'jsonwebtoken';

// const JWT_SECRET = process.env.JWT_SECRET as string;

// export function verifyToken(token: string): jwt.JwtPayload | null {
//   try {
//     return jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;
//   } catch (error) {
//     return null;
//   }
// }

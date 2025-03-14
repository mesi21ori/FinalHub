
// types/next-auth.d.ts
import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string; // Add the `id` field
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role: string; // Add custom role field
      institutionId: number; // Add custom institutionId field
    };
  }
}

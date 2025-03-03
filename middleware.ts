//middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const verifyToken = (token: string) => {
  try {
    const decoded = JSON.parse(atob(token.split('.')[1])); 
    return decoded;
  } catch (e) {
    throw new Error('Invalid token');
  }
};

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;
  console.log('Token:', token); 


  if (!token) {
    return NextResponse.redirect(new URL('/auth/sign-in', req.url)); 
  }

  try {
    const decoded = verifyToken(token);
    console.log('Decoded:', decoded);

    const { pathname } = req.nextUrl;



    if (pathname.startsWith('/uploader-dashboard') && decoded.role !== 'UPLOADER') {

      return NextResponse.redirect(new URL('/auth/sign-in', req.url)); 
    }
    
    if (pathname.startsWith('/dashboard') && decoded.role !== 'PLATFORM_ADMIN') {

      return NextResponse.redirect(new URL('/auth/sign-in', req.url)); 
    }

    if (pathname.startsWith('/dashboard/overview') && decoded.role !== 'PLATFORM_ADMIN') {
    
      return NextResponse.redirect(new URL('/auth/sign-in', req.url)); 
    }

    if (pathname.startsWith('/reviewer-dashboard') && decoded.role !== 'REVIEWER') {

      return NextResponse.redirect(new URL('/auth/sign-in', req.url));
    }

    if (pathname.startsWith('/content') && decoded.role !== 'PUBLIC_USER' && decoded.role !== 'PREMIUM_USER' && decoded.role !== 'RESEARCHER_USER') {
  
      return NextResponse.redirect(new URL('/auth/sign-in', req.url)); 
    }

    if (pathname.startsWith('/admin') && decoded.role !== 'PLATFORM_ADMIN') {
     
      return NextResponse.redirect(new URL('/auth/sign-in', req.url)); 
    }

  } catch (error) {
    console.error('JWT Error:', error);
    
    return NextResponse.redirect(new URL('/auth/sign-in', req.url));
  }

  return NextResponse.next();
}


export const config = {
  matcher: ['/uploader-dashboard/:path*', '/reviewer-dashboard/:path*', '/content/:path*', '/admin/:path*' , '/dashboard/:path*', '/dashboard/overview:path*'],
};

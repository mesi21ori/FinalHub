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
    return NextResponse.redirect(new URL('/signin', req.url));
  }

  try {
    const decoded = verifyToken(token);
    console.log('Decoded:', decoded);

    const { pathname } = req.nextUrl;

    // if (pathname.startsWith('/admin') && decoded.role !== 'PLATFORM_ADMIN') {
    //   return NextResponse.redirect(new URL('/unauthorized', req.url));
    // }

    if (pathname.startsWith('/admin') && decoded.role !== '') {
      return NextResponse.redirect(new URL('/unauthorized', req.url));
    }

    if (pathname.startsWith('/content') && decoded.role !== 'PUBLIC_USER' && decoded.role !== 'PREMIUM_USER') {
      return NextResponse.redirect(new URL('/unauthorized', req.url));
  }  

  } catch (error) {
    console.error('JWT Error:', error); 
    return NextResponse.redirect(new URL('/signin', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [ '/uploader/:path*', '/reviewer/:path*', '/content/:path*'],
};
// '/admin/:path*', '/admin/:path*',




//corret the permission 
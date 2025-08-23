import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const token = request.cookies.get('authToken');
    const role = request.cookies.get('role');

    // If user doesn't have a token, redirect to home
    if (!token) {
        // Only redirect if not already on the home page
        if (pathname !== '/') {
            return NextResponse.redirect(new URL('/', request.url));
        }
        return NextResponse.next();
    }

    // If user has a token but tries to access home page, redirect based on role
    if (pathname === '/') {
        if (role?.value === 'lawyer') {
            return NextResponse.redirect(new URL('/lawyer', request.url));
        } else if (role?.value === 'practitioner') {
            return NextResponse.redirect(new URL('/practitioner', request.url));
        }
    }

    // Role-based route protection
    if (pathname.startsWith('/lawyer')) {
        if (role?.value !== 'lawyer') {
            // Redirect to appropriate dashboard or show error
            if (role?.value === 'practitioner') {
                return NextResponse.redirect(new URL('/practitioner', request.url));
            }
            return NextResponse.redirect(new URL('/unauthorized', request.url));
        }
    }

    if (pathname.startsWith('/practitioner')) {
        if (role?.value !== 'practitioner') {
            // Redirect to appropriate dashboard or show error
            if (role?.value === 'lawyer') {
                return NextResponse.redirect(new URL('/lawyer', request.url));
            }
            return NextResponse.redirect(new URL('/unauthorized', request.url));
        }
    }

    return NextResponse.next();
}
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    
    const token = request.cookies.get('authToken');
    const role = request.cookies.get('role');
    
    // If accessing lawyer routes
    if (pathname.startsWith('/lawyer')) {
        if (!token || !role) {
            return NextResponse.redirect(new URL('/', request.url));
        }
        if (role.value !== 'lawyer') {
            return NextResponse.redirect(new URL('/practitioner', request.url));
        }
    }
    
    // If accessing practitioner routes
    if (pathname.startsWith('/practitioner')) {
        if (!token || !role) {
            return NextResponse.redirect(new URL('/', request.url));
        }
        if (role.value !== 'practitioner') {
            return NextResponse.redirect(new URL('/lawyer', request.url));
        }
    }
    
    return NextResponse.next();
}
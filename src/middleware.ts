import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl
    const token = request.cookies.get('authToken')
    const role = request.cookies.get('role')
    if (pathname.startsWith('/lawyer') || pathname.startsWith('/practitioner')) {
        if (!token && !role) {
            return NextResponse.redirect(new URL('/', request.url));
        }
        if (role?.value === 'lawyer') {
            return NextResponse.redirect(new URL('/lawyer', request.url));
        }
        if (role?.value === 'practitioner') {
            return NextResponse.redirect(new URL('/practitioner', request.url));
        }
    }
}
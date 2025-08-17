import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl
    if (pathname.startsWith('/lawyer') || pathname.startsWith('/practitioner')) {
        const token = request.cookies.get('authToken')
        if (!token) {
            return NextResponse.redirect(new URL('/', request.url));
        }
    }
}
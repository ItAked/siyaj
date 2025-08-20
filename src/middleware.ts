import { NextRequest, NextResponse } from "next/server";
import { getToken } from "./utils/auth";

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl
    if (pathname.startsWith('/lawyer') || pathname.startsWith('/practitioner')) {
        const token = getToken()
        if (!token) {
            return NextResponse.redirect(new URL('/', request.url));
        }
    }
}
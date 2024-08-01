import { updateSession } from "@/supabase/middleware";
import { NextRequest, NextResponse } from "next/server";

//cookies에 있는 로그인 확인 토큰
const LOGIN_KEY = "sb-yqoupynehwgshtspamuf-auth-token";

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const pathname = url.pathname;

  // 쿠키 가져옴
  const hasTravelType = request.cookies.get("hasTravelType");

  // 홈 진입 시
  if (pathname === "/") {
    if (!hasTravelType) {
      url.pathname = "/onboard";
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  // 비회원 접근 시 막아야되는 페이지
  if (pathname === "/my") {
    if (
      !request.cookies.get(LOGIN_KEY) &&
      !request.cookies.get(`${LOGIN_KEY}.0`)
    ) {
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  // 로그인한 유저가 로그인 페이지 접근 시
  if (pathname === "/login") {
    if (
      request.cookies.get(LOGIN_KEY) ||
      request.cookies.get(`${LOGIN_KEY}.0`)
    ) {
      url.pathname = "/";
      return NextResponse.redirect(url);
    } else {
      return NextResponse.next();
    }
  }

  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};

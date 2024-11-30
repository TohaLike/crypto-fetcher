import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export default function middleware(request: NextRequest) {
  const cookie = request.cookies.get("refreshToken") ? request.cookies.get("refreshToken") : null;

  console.log(!cookie)

  if (cookie) {
    return NextResponse.redirect(new URL("/home", request.url));
  } 



  // if (!cookie) {
  //   return NextResponse.redirect(new URL("/", request.url));
  // }
}

export const config = {
  matcher: "/",
};

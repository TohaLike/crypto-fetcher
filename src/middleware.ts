import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { useProfile } from "./hooks/useProfile";
import { useSearchParams } from "next/navigation";

// This function can be marked `async` if using `await` inside
export default function middleware(request: NextRequest) {
  // const searchParams = useSearchParams();
  // const search = searchParams.get("res");

  // const url = request.nextUrl.searchParams.get("res")

  // const { profileData } = useProfile({ params: request.nextUrl.searchParams.get("res") });

  // console.log(request.nextUrl.pathname, "1")

  // if (request.nextUrl.pathname === "/messages") {
  //   return NextResponse.redirect(new URL("/home", request.url));
  // }
}

// See "Matching Paths" below to learn more
// export const config = {
//   matcher: "/about/:path*",
// };

import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
//   const token = request.cookies.get("auth_token");
//   console.log("*&&&&&&&&&&&&&&&&&&&&&&&&" + token);
//   if (!token) {
//     return NextResponse.redirect(new URL("/user/login", request.url));
//   }
//   return NextResponse.next();
// }

// export const config = {
//   matcher: [
//     "/admin/:path*",
//     "/client/:path*",
//     "/manager/:path*",
//     "/member/:path*",
//   ],
};

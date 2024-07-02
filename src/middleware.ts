/** @format */

import { type NextRequest, NextResponse } from "next/server";
import { runWithAmplifyServerContext } from "./amplify/utils/amplifyServerUtils";
import { fetchAuthSession } from "aws-amplify/auth/server";

export async function middleware(request: NextRequest) {
  if (
    request.nextUrl.pathname === "/" ||
    request.nextUrl.pathname === "/main"
  ) {
    return NextResponse.redirect(new URL("/main/dashboard", request.url));
  }

  const response = NextResponse.next();

  const authenticated = await runWithAmplifyServerContext({
    nextServerContext: { request, response },
    operation: async (contextSpec) => {
      try {
        const session = await fetchAuthSession(contextSpec, {
          forceRefresh: false,
        });

        const expiredDateJWT: any = session?.tokens?.idToken?.payload.exp;

        const isValid = expiredDateJWT <= Date.now() ? true : false;

        return !!isValid;
      } catch (error) {
        console.log(error);
      }
      return false;
    },
  });

  if (config.matcher.includes(request.nextUrl.pathname) && !authenticated) {
    return NextResponse.redirect(new URL("/main/signin", request.url));
  }

  return response;
}

export const config = {
  matcher: [
    "/",
    "/main",
    "/main/dashboard",
    "/main/vendorProfile",
    "/main/product",
  ],
};

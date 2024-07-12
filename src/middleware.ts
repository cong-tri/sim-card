/** @format */

import { type NextRequest, NextResponse } from "next/server";
import { runWithAmplifyServerContext } from "./amplify/utils/amplifyServerUtils";
import { fetchAuthSession } from "aws-amplify/auth/server";

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/user", request.url));
  }

  const response = NextResponse.next();

  const authenticated = await runWithAmplifyServerContext({
    nextServerContext: { request, response },
    operation: async (contextSpec) => {
      try {
        const session = await fetchAuthSession(contextSpec);
        return !!session?.tokens?.idToken;
      } catch (error) {
        // console.log(error);
      }
      return false;
    },
  });

  if (config.matcher.includes(request.nextUrl.pathname) && !authenticated) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  return response;
}

export const config = {
  matcher: ["/", "/user"]
};

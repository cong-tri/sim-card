/** @format */

import { type NextRequest, NextResponse } from "next/server";
import { runWithAmplifyServerContext } from "./amplify/utils/amplifyServerUtils";
import { fetchAuthSession } from "aws-amplify/auth/server";
import { getSession } from "./app/lib/session";

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/main/dashboard", request.url));
  }

  const response = NextResponse.next();

  const listSession: any = await getSession();
  
  let cookieByClient: any = request.cookies.get("Authenticate")?.value;  
  cookieByClient = cookieByClient !== undefined ? JSON.parse(cookieByClient) : {};

  const session = listSession.find(
    (session: any) =>
      session.sessionID ===
      (Object.keys(cookieByClient).length !== 0 ? cookieByClient.sessionID : 0)
  );

  const validByCookie = validateTokenByCookie(
    session !== undefined ? session : {},
    cookieByClient !== undefined ? cookieByClient : {}     
  );
  
  const authenticated = await runWithAmplifyServerContext({
    nextServerContext: { request, response },
    operation: async (contextSpec) => {
      try {
        const session = await fetchAuthSession(contextSpec);

        return (
          session.tokens?.accessToken !== undefined &&
          session.tokens?.idToken !== undefined
        );
      } catch (error) {
        console.log(error);
        return false;
      }
    }
  });

  if (!authenticated){
    return NextResponse.redirect(new URL("/main/signin", request.url));
  };

 if (
    config.matcher.includes(request.nextUrl.pathname) &&
    validByCookie === false
  ) {
    return NextResponse.redirect(new URL("/main/signin", request.url));
  }

  return response
}

export const config = {
  matcher: ["/", "/main/dashboard", "/main/vendorProfile", "/main/product"],
};

// for compare 2 token by cookie
const validateTokenByCookie = (session: any, cookieByClient: any) => {
  if (
    Object.keys(session).length === 0 &&
    Object.keys(cookieByClient).length === 0
  )
    return false;
  else if (!session?.sessionID && !cookieByClient?.sessionID) return false;
  else if (!session?.token && !cookieByClient?.token) return false;
  else if (session?.sessionID !== cookieByClient?.sessionID) return false;
  else if (session?.token !== cookieByClient?.token) return false;
  else return true;
};


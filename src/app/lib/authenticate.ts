/** @format */

"use server";

import { cookies } from "next/headers";
import { createSession } from "./session";

const fs = require("fs");

export async function authenticate(username: string, password: string) {
  if (!username || !password) return;

  if (username !== "congtri" && password !== "12345") {
    return {
      status: 400,
      message: "Username or password is not valid",
    };
  } else {
    const sessionID: number = Math.round(Math.random() * (100 - 1) + 1);
    const token: string = `Authorize Successfully ${sessionID}`;

    createSession(sessionID, token);

    return {
      status: 200,
      message: "Successful",
      path: "/dashboard",
      session: {
        sessionID,
        token,
      },
    };
  }
}

export async function logout() {
  let sessions: any = require("../../../session.json");

  let cookieClient: any = cookies().get("Authenticate")?.value;
  cookieClient = cookieClient ? JSON.parse(cookieClient) : {};

  const index: number = sessions.findIndex(
    (session: any) =>
      session.sessionID ===
      (Object.keys(cookieClient).length !== 0 ? cookieClient.sessionID : null)
  );

  if (index !== -1) {
    sessions.splice(index, 1);
    fs.writeFileSync(
      "./session.json",
      JSON.stringify(sessions, null, 4),
      "utf8"
    );

    cookies().delete("Authenticate");
    return {
      status: 200,
      message: "Sign Out Successful",
      path: "/signin",
    }; 
  } else {
    return {
      status: 400,
      message: "Sign Out Unsuccessful",
    }; 
  }
}

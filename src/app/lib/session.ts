/** @format */

"use server";

const fs = require("fs");

let session: any = require("../../../session.json");

export async function createSession(
  sessionID: number,
  token: string,
  user: any
) {
  session.push({
    sessionID,
    token,
    user,
    createDate: new Date(),
  });
  fs.writeFileSync("./session.json", JSON.stringify(session, null, 4), "utf8");
}

export async function getSession() {
  return session;
}

export async function deleteSession() {
  session = [];
  fs.writeFileSync("./session.json", JSON.stringify(session, null, 4), "utf8");
}

export async function getUserToStoreSession(user: any) {
  const sessionID: number = Math.round(Math.random() * (100 - 1) + 1);
  const token: string = `Authorize Successfully ${sessionID}`;

  if (Object.keys(user).length !== 0) {
    createSession(sessionID, token, user);

    return {
      sessionID,
      token,
    };
  } else return null;
}

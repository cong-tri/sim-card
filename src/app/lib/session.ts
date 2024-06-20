/** @format */

"use server";

const fs = require("fs");

let session: any = require("../../../session.json");

export async function createSession(sessionID: number, token: string) {

  session.push({
    sessionID,
    token,
    createDate: new Date(),
  });
  fs.writeFileSync("./session.json", JSON.stringify(session, null, 4), "utf8");
}

export async function getSession() { 
  return session;
}

export async function deleteSession() {
  session = []
  fs.writeFileSync("./session.json", JSON.stringify(session, null, 4), "utf8");
}

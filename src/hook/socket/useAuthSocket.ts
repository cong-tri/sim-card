"use client";

import { useEffect } from "react";
import { getCookie } from "typescript-cookie";
import useManagerSocket from "./useManagerSocket";

const useAuthSocket = (idToken: string) => {
  const manager = useManagerSocket();

  if (!manager) {
    return;
  }

  const authSocket = manager.socket("/auth", {
    auth: {
      token: idToken !== "" ? idToken : "",
    },
  });
  return authSocket;
};

export default useAuthSocket;

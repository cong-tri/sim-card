import { useEffect, useState } from "react";

import { Manager, Socket } from "socket.io-client";
import { fetchAuthSession } from "aws-amplify/auth";

export type SocketError = Error & { event: string };

export const useSocketIO = (
  manager: Manager,
  namespace: string
): Socket | undefined => {
  const [client, setClient] = useState<Socket>();

  useEffect(() => {
    fetchAuthSession().then((session) => {
      const socket = manager.socket(`/${namespace}`, {
        auth: { token: session?.tokens?.idToken?.toString() as string },
      });
      setClient(socket);
    });
  }, [manager, namespace]);

  useEffect(() => {
    client &&
      client
        .on("disconnect_exception", (msg: string) => {
          console.error("Disconnected: " + msg);
        })
        .on("connect_error", (err) => {
          console.error(err.message);
        });
  }, [client]);
  
  return client;
};

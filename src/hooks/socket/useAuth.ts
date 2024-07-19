"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Manager, Socket } from "socket.io-client";
import { useSocketIO } from "./useSocket";
import { Qrcode } from "@/types/types";

export const useAuth = (manager: Manager) => {
  const socket = useSocketIO(manager, "auth");

  const [client, setClient] = useState<Socket>(socket as Socket);

  useEffect(() => {
    socket?.connect();
    socket?.on("connect", () => {
      if (socket.connected) {
        // console.log("Connection >>", socket.connected);
        setClient(socket);
      }
    });
    
    // disconnect_exception: server socket io api of ccsidd extends
    socket?.on("disconnect_exception", (err: string) => {
      console.log("err >>", err);
    });
  }, [socket]);

  useQuery({
    queryKey: ["qrcode"],
    queryFn: async () => {
      const qrCodeAsync: Promise<Qrcode> = new Promise((resolve) => {
        client.emit("qrcode", (data: any) => resolve(data.qrcode));
      });
      const data: Qrcode = await qrCodeAsync;
      return data;
    },
    enabled: !!client,
    staleTime: 1000 * 60 * 60 * 24,
  });
};

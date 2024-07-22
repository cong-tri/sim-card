// "use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Manager, Socket } from "socket.io-client";
import { useSocketIO } from "./useSocket";
import { Qrcode } from "@/types/types";

export const useAuth = (manager: Manager) => {
  const socket = useSocketIO(manager, "auth");

  const [qrcode, setQrcode] = useState<Qrcode>();
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

  useEffect(() => {
    const getQrcode = async () => {
      const qrCodeAsync: Promise<Qrcode> = new Promise((resolve) => {
        if (!client) return;
        client.emit("qrcode", (data: any) => {
          if(!data) return
          resolve(data.qrcode)});
      });

      const data = await qrCodeAsync;
      setQrcode(data);

      if (!qrcode) return;
      else return qrcode;
    };
    getQrcode();
  }, [client, qrcode]);

  useQuery({
    queryKey: ["qrcode"],
    queryFn: () => {
      if (!qrcode) return;
      else return qrcode;
    },
    enabled: !!qrcode,
    staleTime: 1000 * 60 * 60 * 24,
  });
};

export function callQueryQrcode() {}

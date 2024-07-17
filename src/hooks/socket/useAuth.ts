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

    // socket?.emit("challenge", {
    //   token:
    //     "e8b12e55ea73039b000c2bb2aaddc545.22addb6afd552dc75c003a29a57d5f81414af32d6114ca0ef0ea50baf42ec7db109e44922c1542c092185a956c0666763be19a830a85f262cf335f1ba040eef5db8e937687898e02a21bb6796561ba6a863d518cfe701b9dae3611f7a6d3d1cd86a3f5316cd005721a040a3c4e0db45c61c28ef8f8766de6c5aa8a6d1d348395d1acd15d56dee4a197eff8b44feb178592eff95b59ccbb62d21c941e2e2fa391",
    // });
    // socket?.on("challenge", (data: any) => {
    //   console.log(data);
    // });
    
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

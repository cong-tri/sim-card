"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Manager, Socket } from "socket.io-client";
import { useSocketIO } from "./useSocket";
import { Transaction } from "@/types/types";

export const useTransaction = (manager: Manager) => {
  const socket = useSocketIO(manager, "transaction");

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
    queryKey: ["transaction"],
    queryFn: async () => {
      const qrCodeAsync: Promise<Transaction[]> = new Promise((resolve) => {
        client.emit("info", {
          fromDate: "2024-07-11",
          toDate: "2024-07-20",
        });
        client.on("info", (data: Transaction[]) => resolve(data));
      });
      const data = await qrCodeAsync;
      return data;
    },
    enabled: !!client,
    staleTime: 1000 * 60 * 60 * 24,
  });
};

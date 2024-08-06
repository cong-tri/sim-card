import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Manager } from "socket.io-client";
import { useSocketIO } from "./useSocket";
import { Qrcode } from "@/types/types";

const queryKey = "qrcode";

export const useAuth = (manager: Manager) => {

  const namespace: string = "auth";
  const socket = useSocketIO(manager, namespace);

  useEffect(() => {
    socket?.connect();
    socket?.on("connect", () => {
      // if (socket.connected) console.log("Connection >>", socket.connected);
    });

    if (!socket) return;

    // disconnect_exception: server socket io api of ccsidd extends
    socket.on("disconnect_exception", (err: string) => {
      console.log("err >>", err);
    });
  }, [socket]);

  const { data } = useQuery({
    queryKey: [queryKey],
    queryFn: async () => {
      // promise function for await get data qrcode from query 'qrcode'
      const qrCodeAsync: Promise<Qrcode> = new Promise((resolve) => {
        if (!socket) return;
        socket.emit(queryKey, { tokenOnly: true }, (data: any) => {
          if (!data) return;
          resolve(data.qrcode);
        });
      });
      const data = await qrCodeAsync;
      return data;
    },
    staleTime: Infinity,
    enabled: !!socket,
  });
  return { qrcode: data };
};


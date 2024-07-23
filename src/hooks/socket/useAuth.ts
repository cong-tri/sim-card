import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Manager, Socket } from "socket.io-client";
import { useSocketIO } from "./useSocket";
import { Qrcode } from "@/types/types";

const queryKey = "qrcode";

export const useAuth = (manager: Manager) => {
  const namespace: string = "auth";
  const socket = useSocketIO(manager, namespace);

  const [client, setClient] = useState<Socket>(socket as Socket);
  const [qrcode, setQrcode] = useState<Qrcode>();

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
      // promise function for await get data qrcode from query 'qrcode'
      const qrCodeAsync: Promise<Qrcode> = new Promise((resolve) => {
        if (!client) return;
        client.emit(queryKey, { tokenOnly: true }, (data: any) => {
          if (!data) return;
          resolve(data.qrcode);
        });
      });

      const data = await qrCodeAsync;
      setQrcode(data);

      if (!qrcode) return;
    };
    getQrcode();
  }, [client, qrcode]);

  useQuery({
    queryKey: [queryKey],
    queryFn: () => {
      if (!qrcode) return;
      else return qrcode;
    },
    enabled: !!qrcode,
  });
};

export const useGetQrcodeQuery = () => {
  const queryClient = useQueryClient();
  const [qrcode, setQrcode] = useState<Qrcode>();

  const getQrcodeQuery = async () => {
    const qrCodeAsync: Promise<Qrcode> = new Promise((resolve) => {
      const data: any = queryClient.getQueryData([queryKey]);
      if (!data) return;
      resolve(data as Qrcode);
    });
    const data = await qrCodeAsync;
    if (!data) return;
    setQrcode(data);
  };
  getQrcodeQuery();

  if (!qrcode) return;
  else return qrcode;
};

export const useCallQrcodeQuery = () => {
  const queryClient = useQueryClient();
  const callQuery = async () => {
    await queryClient.prefetchQuery({ queryKey: [queryKey] });
  };
  callQuery();
};

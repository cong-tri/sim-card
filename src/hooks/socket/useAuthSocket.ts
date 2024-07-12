"use client";
import { useEffect, useState } from "react";
import useManagerSocket from "./useManagerSocket";
// import { useQueryClient } from "@tanstack/react-query";

const useAuthSocket = (idToken: string, eventName: string) => {
  // const queryClient = useQueryClient();
  const manager = useManagerSocket();

  const [qrcode, setQRcode] = useState<any>({});

  useEffect(() => {
    if (!manager) return;
    
    const authSocket = manager.socket("/auth", {
      auth: {
        token: idToken ? idToken : "",
      },
    });

    authSocket.connect();

    if (authSocket.connected) console.log("true");

    authSocket.emit(eventName, (res: any) => {
      const data: any = res?.qrcode;
      setQRcode(data);
      authSocket.disconnect();
    });

    // disconnect_exception: server socket io api of ccsidd extends
    authSocket.on("disconnect_exception", (err) => {
      // console.log('err >>', err);
    });
  }, [eventName, idToken, manager]);

};

export default useAuthSocket;

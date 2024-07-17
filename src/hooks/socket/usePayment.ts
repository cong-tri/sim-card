"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Manager, Socket } from "socket.io-client";
import { useSocketIO } from "./useSocket";

export const usePayment = (manager: Manager) => {
  const socket = useSocketIO(manager, "payment");

  const [client, setClient] = useState<Socket>(socket as Socket);

  useEffect(() => {
    socket?.connect();
    socket?.on("connect", () => {
      if (socket.connected) {
        console.log("Connection >>", socket.connected);
        setClient(socket);
      }
    });

    // socket?.emit(
    //   "purchase",
    //   {
    //     appId: "com.ccsidd.rtonesg_android",
    //     productId: "com.ccsidd.rtonesg_android.simcard.sg_basic_plan",
    //     paymentMethod: "e-wallet",
    //     merchant:
    //       "5a2a9eb2d5a4bd30916e472b3016653d.ba4085d3beb087956a951efaf1e9d1285306222a2e30e8b933e52affb10d214be973a4e01ada032bf13f0a3a83e22419d965d64b7909464ac1c46a3f6c8bc295dd754d5986a477e2ac567f4d844d20dff1d9ce3b7a50190f1bd40dbaa4e51a25.eyJzdWIiOiI0YmQ2MzU1ZC05ZmQ5LTQ4NTItYjZmYy05MTA3NmRiOGU4NDkiLCJ6b25laW5mbyI6IlZOIiwiY29nbml0bzpncm91cHMiOlsibWVyY2hhbnQiXSwiZW1haWxfdmVyaWZpZWQiOnRydWUsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC5hcC1zb3V0aGVhc3QtMS5hbWF6b25hd3MuY29tXC9hcC1zb3V0aGVhc3QtMV9qdmVIZnNKNVkiLCJwaG9uZV9udW1iZXJfdmVyaWZpZWQiOnRydWUsImNvZ25pdG86dXNlcm5hbWUiOiJ2LXItMTcxODk1NTE5MjU1MCIsImdpdmVuX25hbWUiOiJUcmkiLCJsb2NhbGUiOiJWTk0iLCJvcmlnaW5fanRpIjoiNmU1MjM4ODUtMTNiMS00ZTRiLWI1NjUtODg0YTRkMzZjMGEzIiwiY29nbml0bzpyb2xlcyI6WyJhcm46YXdzOmlhbTo6ODc5Njg1NDA3NTYwOnJvbGVcL2Rldi1jY3MtYXV0aC1Vc2VyQXV0aFJvbGUtSTFQTTBLVElHOUZRIl0sImF1ZCI6IjV1azRkYzJxNzZmM2FxaTZsZ290YWNkMTk1IiwiZXZlbnRfaWQiOiI1MDkxOWJiYS1kOTExLTRlYzctOTgxMS1mYzZiNGIyMGM0NzciLCJ0b2tlbl91c2UiOiJpZCIsImF1dGhfdGltZSI6MTcyMTIwNTc3NiwicGhvbmVfbnVtYmVyIjoiKzg0MzI2MDM0NTYxIiwiZXhwIjoxNzIxMjEyOTc2LCJpYXQiOjE3MjEyMDU3NzYsImZhbWlseV9uYW1lIjoiRGFvIENvbmciLCJqdGkiOiIzZWI2MmRhYS1iZjIxLTQzNGQtOGRkMy1kMDcwZTRiMmZhZWMiLCJlbWFpbCI6ImRhb2Nvbmd0cmkyMDAzMTYwOUBnbWFpbC5jb20ifQ.o89Dt2f26SVSoHi1hTxDK6_Exk7EERALsIPu7hHluOJL7FzqWFJ54Oswu75p0gXag0_G-j_O9aeA7xX5MR27ScTSQzrf-o-KTpv-YPhlECj_qMivyvk5YmuYIiria9KAAPhQmA_6msJQ3u06HTS4dKh9ehGxygvHnpdSreHkTSVthiqSiA8VPHwnXg9ijUzqeP2DppYWn0k9IeG2jpiIAvBFlFXv735IeymkJlMer62mVXnMFyukwNm2yYjd7lA9jVeyz1H6og8CS2Epo76pFVusgIIeUTZ5ZyMzqvZ4lCxWN_Jc5ZtsUH6MsoxpApozm7-rZjzspZrJXIpNa9On0A",
    //   },
    //   (values: any) => {
    //     console.log(values);
    //   }
    // );
    // socket?.on("exception", (msg: any) => {
    //   console.log(msg);
    // });

    // disconnect_exception: server socket io api of ccsidd extends
    socket?.on("disconnect_exception", (err: string) => {
      console.log("err >>", err);
    });
  }, [socket]);

  //   useQuery({
  //     queryKey: ["transaction"],
  //     queryFn: async () => {
  //       const qrCodeAsync: Promise<Transaction[]> = new Promise((resolve) => {
  //         client.emit("info", {
  //           id: "666863229c4962324ceab295",
  //         });
  //         client.on("info", (data: Transaction[]) => resolve(data));
  //       });
  //       const data = await qrCodeAsync;
  //       return data;
  //     },
  //     enabled: !!client,
  //     staleTime: 1000 * 60 * 60 * 24,
  //   });
};

import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Manager } from "socket.io-client";
import { useSocketIO } from "./useSocket";
import { Transaction } from "@/types/types";

const queryKey = "transaction";

var list: Transaction[]

export const useTransaction = (manager: Manager) => {
  const namespace: string = "transaction";
  const socket = useSocketIO(manager, namespace);
  const [transaction, setTransaction] = useState<Transaction[]>();
  
  const renderCount = useRef(0);

  useEffect(() => {
    socket?.connect();
    socket?.on("connect", () => {
      // if (socket.connected) console.log("Connection >>", socket.connected);
    });

    if (!socket) return;
  
    socket.on("info", (data: Transaction[]) => {
      if (!data) return;

      renderCount.current++;

      if (renderCount.current === 1) {
        list = data
      }

      const combinedList = [...list, ...data];
      const uniqueList = combinedList.filter(
        (item, index, self) => index === self.findIndex((t) => t.id === item.id)
      );
      
      setTransaction(uniqueList);
    });

    // disconnect_exception: server socket io api of ccsidd extends
    socket.on("disconnect_exception", (err: string) => {
      console.log("err >>", err);
    });
  }, [socket]);

  useQuery({
    queryKey: [queryKey],
    queryFn: () => {
      // date range not exceeded 10 days
      // Get the current date and time
      const currentDate = new Date();

      // Calculate the date 10 days ago
      const tenDaysAgo = new Date();
      tenDaysAgo.setDate(currentDate.getDate() - 10);

      if (!socket) return;

      socket.emit("info", {
        fromDate: tenDaysAgo,
        toDate: currentDate,
      });

      // socket.emit("info", {
      //   fromDate: "2024-07-17",
      //   toDate: "2024-07-26",
      // });

      // return transaction;
    },
    staleTime: Infinity,
    enabled: !!socket,
  });

  return {transaction};
};


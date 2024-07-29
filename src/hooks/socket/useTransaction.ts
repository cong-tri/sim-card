import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Manager, Socket } from "socket.io-client";
import { useSocketIO } from "./useSocket";
import { Transaction } from "@/types/types";

const queryKey = "transaction";

export const useTransaction = (manager: Manager) => {
  const namespace: string = "transaction";
  const socket = useSocketIO(manager, namespace);

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
    queryKey: [queryKey],
    queryFn: async () => {
      // date range not exceeded 10 days
      // Get the current date and time
      const currentDate = new Date();

      // Calculate the date 10 days ago
      const tenDaysAgo = new Date();
      tenDaysAgo.setDate(currentDate.getDate() - 10);
      
      // promise function for await get data transaction from query 'transaction'
      const transactionAsync: Promise<Transaction[]> = new Promise(
        (resolve) => {
          if (!client) return;
          client.emit("info", {
            fromDate: tenDaysAgo,
            toDate: currentDate,
          });
          client.on("info", (data: Transaction[]) => {
            if (!data) return;
            resolve(data);
          });
        }
      );
      const data = await transactionAsync;
      console.log(data);

      if (!data) return;
      return data;
    },
    refetchInterval: 1000 * 10,
    staleTime: Infinity,
    enabled: !!client,
  });
};

export const useGetTransactionQuery = () => {
  // console.log("test get transaction query >>");
  
  const queryClient = useQueryClient();
  const [transaction, setTransaction] = useState<Transaction[]>();

  const getTransactionQuery = async () => {
    // await queryClient.prefetchQuery({ queryKey: [queryKey] });

    // promise function for await get data transaction from query 'transaction'
    const transactionAsync: Promise<Transaction[]> = new Promise((resolve) => {
      const data: any = queryClient.getQueryData([queryKey]);
      if (!data) return;
      // console.log(data);

      resolve(data as Transaction[]);
    });
    const data = await transactionAsync;
    if (!data) return;
    setTransaction(data);
  };
  getTransactionQuery();

  if (!transaction) return;
  else return transaction;
};

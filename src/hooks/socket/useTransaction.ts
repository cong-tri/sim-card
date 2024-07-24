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
  const [transaction, setTransaction] = useState<Transaction[]>();

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
    const getTransaction = async () => {
      // promise function for await get data transaction from query 'transaction'
      const transactionAsync: Promise<Transaction[]> = new Promise(
        (resolve) => {
          if (!client) return;
          client.emit("info", {
            fromDate: "2024-07-16",
            toDate: "2024-07-25",
          });
          client.on("info", (data: Transaction[]) => {
            if (!data) return;
            resolve(data);
          });
        }
      );
      const data = await transactionAsync;
      setTransaction(data);

      if (!transaction) return;
    };
    getTransaction();
  }, [client, transaction]);

  useQuery({
    queryKey: [queryKey],
    queryFn: async () => {
      // if (!transaction) return;
      // else return transaction;
      const transactionAsync: Promise<Transaction[]> = new Promise(
        (resolve) => {
          if (!client) return;
          client.emit("info", {
            fromDate: "2024-07-16",
            toDate: "2024-07-25",
          });
          client.on("info", (data: Transaction[]) => {
            if (!data) return;
            resolve(data);
          });
        }
      );
      const data = await transactionAsync;
      setTransaction(data);

      if (!transaction) return;
      else return transaction
    },
    enabled: !!client,
  });
};

export const useGetTransactionQuery = () => {
  const queryClient = useQueryClient();
  const [transaction, setTransaction] = useState<Transaction[]>();

  const getTransactionQuery = async () => {
    // promise function for await get data transaction from query 'transaction'
    const transactionAsync: Promise<Transaction[]> = new Promise((resolve) => {
      const data: any = queryClient.getQueryData([queryKey]);
      if (!data) return;
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

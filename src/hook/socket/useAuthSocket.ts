"use client";

import { useEffect } from "react";
import { getCookie } from "typescript-cookie";
import useManagerSocket from "./useManagerSocket";

const useAuthSocket = () => {
  const manager = useManagerSocket();

  if (!manager) {
    return;
  }

  const idToken =
    "eyJraWQiOiJZSVNMUytwdTgxRGxhTnd6UGhwbGdcL0o4KzRuRytXUTlcL1JLUlhOODB4S3c9IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiI0YmQ2MzU1ZC05ZmQ5LTQ4NTItYjZmYy05MTA3NmRiOGU4NDkiLCJjb2duaXRvOmdyb3VwcyI6WyJtZXJjaGFudCJdLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmFwLXNvdXRoZWFzdC0xLmFtYXpvbmF3cy5jb21cL2FwLXNvdXRoZWFzdC0xX2p2ZUhmc0o1WSIsInBob25lX251bWJlcl92ZXJpZmllZCI6dHJ1ZSwiY29nbml0bzp1c2VybmFtZSI6InYtci0xNzE4OTU1MTkyNTUwIiwiZ2l2ZW5fbmFtZSI6IlRyaSIsIm9yaWdpbl9qdGkiOiJiYTJiZTk5YS1mN2U3LTRjYzYtYmZlMS00NzEyMmEzMThkYmEiLCJjb2duaXRvOnJvbGVzIjpbImFybjphd3M6aWFtOjo4Nzk2ODU0MDc1NjA6cm9sZVwvZGV2LWNjcy1hdXRoLVVzZXJBdXRoUm9sZS1JMVBNMEtUSUc5RlEiXSwiYXVkIjoiNXVrNGRjMnE3NmYzYXFpNmxnb3RhY2QxOTUiLCJldmVudF9pZCI6ImY0MDAyYzVlLWFlZmYtNDAzNS05NGVmLWYwZDA3ZjQ3ZDlkMSIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNzIwNDk2Mjc3LCJwaG9uZV9udW1iZXIiOiIrODQzMjYwMzQ1NjEiLCJleHAiOjE3MjA1MDM0NzcsImlhdCI6MTcyMDQ5NjI3NywiZmFtaWx5X25hbWUiOiJEYW8gQ29uZyIsImp0aSI6IjQ3NzkxMTJkLTIxYWEtNDBjNC1hOTkzLWEwYmViMDZlYjhjYSIsImVtYWlsIjoiZGFvY29uZ3RyaTIwMDMxNjA5QGdtYWlsLmNvbSJ9.yu4b8a02dmHY_jJxQkLLyNnERczyLQ227aTVPE8re5xYaSFLs0nMz5atvdXAm0HZREwb5Wk9BKnJ0Kp2F6ful_Og19SU4aiDDgizKOcSKHb26L5pu0hgJJj_W1A0tAfP6cYJs6LEfvUzJScXL6RtHiXDrNr6cuhTXHw1eMa4arUEfXndOpQgf7CyPmXaTkO0KdTedt8SvJw5d1_YimhR5fVMbA7JL5iFiNFOCAU3nIAOA3gCwEF_Nsnm6QZIrwzy2wruyoHtg9i9iUq04PCJdaFtVQNPDeBVp_wrKb3OYPSyzGOVZzwxiCu5vWMfr1VJAB_DPxeyArBA_asSlsNndg";

  const authSocket = manager.socket("/auth", {
    auth: {
      token: idToken ? idToken : "",
    },
  });
  return authSocket;
};

export default useAuthSocket;

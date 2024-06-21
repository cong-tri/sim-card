"use client";
import React from "react";
import { useRouter } from "next/navigation";

export default function LogoutButton({ logoutAction }: any) {
  const router = useRouter();

  return (
    <form action={logoutAction}>
      <button type="submit" className="border-0 bg-transparent">
        Sign Out
      </button>
    </form>
  );
}

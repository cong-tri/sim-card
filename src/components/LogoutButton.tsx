"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { message } from "antd";

export default function LogoutButton({ logout }: any) {
  const router = useRouter();

  const logoutAction = async () => {
    const result = await logout();
    console.log(result);

    if (result.status === 200) {
      message.success(result.message);

      setTimeout(() => {
        router.push(result.path);
      }, 2000);
    } else {
      message.error(result.message);
      return
    }
  };
  return (
    <form action={logoutAction}>
      <button type="submit" className="border-0 bg-transparent">
        Sign Out
      </button>
    </form>
  );
}

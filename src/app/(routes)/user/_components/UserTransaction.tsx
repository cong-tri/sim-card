import React from "react";
import Statistics from "./_componentsTransaction/Statistics";
import Analytics from "./_componentsTransaction/Analytics";

export default function UserTransaction() {
  return (
    <>
      <div className="my-8">
        <Statistics />
        <Analytics />
      </div>
    </>
  );
}

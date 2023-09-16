import { Separator } from "@/components/ui/separator";
import React from "react";

function TrendComp() {
  return (
    <>
      <div className="flex space-x-2 items-center">
        <span>⚡️🔥</span>
        <h2 className="tracking-wide text-lg font-nothing">
          Trending Resources
        </h2>
      </div>
      <Separator className="my-2" />
      <div>{/* WORK TODO - GET ALL TRENDING ITEMS. */}</div>
    </>
  );
}

export default TrendComp;

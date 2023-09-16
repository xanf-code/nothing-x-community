import { Separator } from "@/components/ui/separator";
import { getPublishedResources } from "@/lib/resources";
import React from "react";
import Resource from "../products/Resource";
import Image from "next/image";

async function TrendComp() {
  const publishedResources = await getPublishedResources();
  return (
    <>
      <div className="flex space-x-2 items-center">
        <span>⚡️🔥</span>
        <h2 className="tracking-wide text-lg font-nothing">
          Trending Resources
        </h2>
        <Image src={"/hot2x.webp"} height={11} width={30} />
      </div>
      <Separator className="my-3" />
      {publishedResources.map((resource, index) => (
        <Resource key={index} resource={resource} />
      ))}
    </>
  );
}

export default TrendComp;

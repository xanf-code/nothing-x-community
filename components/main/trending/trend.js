import { Separator } from "@/components/ui/separator";
import { getPublishedResources } from "@/lib/resources";
import React from "react";
import Resource from "../products/Resource";
import Image from "next/image";

async function TrendComp() {
  const publishedResources = await getPublishedResources();
  return (
    <div>
      <div className="flex space-x-2 items-center">
        <h2 className="tracking-wide text-lg font-nothing font-extrabold">
          ⚡️🔥 Trending Resources
        </h2>
        <Image src={"/hot2x.webp"} height={11} width={30} />
      </div>
      <Separator className="my-3" />
      {publishedResources.map((resource, index) => (
        <Resource key={index} resource={resource} />
      ))}
    </div>
  );
}

export default TrendComp;

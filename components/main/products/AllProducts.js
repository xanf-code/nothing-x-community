import { getResourcesByProduct } from "@/lib/resources";
import { resourceStatus } from "@/utils/constants";
import React from "react";
import Resource from "./Resource";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

async function AllProducts({ pkey }) {
  const publishedResources = await getResourcesByProduct(
    pkey,
    resourceStatus.PUBLISHED,
    1,
    3,
    "",
    "",
    "approved"
  );

  let title;
  switch (pkey) {
    case "Nothing Phone 1":
      title = "🔥📱 Nothing Phone (1)";
      break;
    case "Nothing Phone 2":
      title = "🔥📱 Nothing Phone (2)";
      break;
    case "Nothing Ear 1":
      title = "🔥🎧 Nothing Ear (1)";
      break;
    case "Nothing Ear 2":
      title = "🔥🎧 Nothing Ear (2)";
      break;
    case "Nothing Ear Stick":
      title = "🔥🔊 Nothing Ear Stick";
      break;
    default:
      title = "Default Title";
      break;
  }

  return (
    <div className="mt-4">
      <div className="flex justify-between items-center">
        <div className="flex space-x-2 items-center">
          <h2 className="tracking-wide text-lg font-nothing font-extrabold">
            {title}
          </h2>
        </div>
        <Link
          href={{
            pathname: "/resource",
            query: {
              product: pkey,
              page: 1,
              order: "approved",
            },
          }}
        >
          <p className="text-sm hover:underline hover:underline-offset-2 text-blue-600">
            see more... 👉
          </p>
        </Link>
      </div>
      <Separator className="my-3" />
      {publishedResources.map((resource, index) => (
        <Resource key={index} resource={resource} />
      ))}
    </div>
  );
}

export default AllProducts;

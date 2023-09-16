import { getResourcesByProduct } from "@/lib/resources";
import { products, resourceStatus } from "@/utils/constants";
import React from "react";
import Resource from "./Resource";
import Link from "next/link";

async function AllProducts({ pkey }) {
  const publishedResources = await getResourcesByProduct(
    pkey,
    resourceStatus.PUBLISHED,
    1,
    3,
    "",
    ""
  );

  let title;
  switch (pkey) {
    case "Nothing Phone 1":
      title = "Nothing Phone (1)";
      break;
    case "Nothing Phone 2":
      title = "Nothing Phone (2)";
      break;
    case "Nothing Ear 1":
      title = "Nothing Ear (1)";
      break;
    case "Nothing Ear 2":
      title = "Nothing Ear (2)";
      break;
    case "Nothing Ear Stick":
      title = "Nothing Ear Stick";
      break;
    default:
      title = "Default Title";
      break;
  }

  return (
    <div className="mt-4">
      <div className="flex justify-between">
        <div className="flex space-x-2 items-center">
          <span>🔥📱</span>
          <h2 className="tracking-wide text-lg font-nothing">{title}</h2>
        </div>
        <Link
          href={{
            pathname: "/resource",
            query: {
              product: pkey,
              page: 1,
            },
          }}
        >
          <p>View all</p>{" "}
        </Link>
      </div>
      <hr className="w-full border-1 border-gray-700 mb-4 mt-2" />
      {publishedResources.map((resource, index) => (
        <Resource key={index} resource={resource} />
      ))}
    </div>
  );
}

export default AllProducts;

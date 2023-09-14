import { getResourcesByProduct } from "@/lib/resources";
import { products, resourceStatus } from "@/utils/constants";
import React from "react";
import Resource from "./Resource";

async function PhoneOne() {
  const publishedResources = await getResourcesByProduct(
    products.PHONE_1,
    resourceStatus.PUBLISHED
  );

  return (
    <>
      <div className="flex space-x-2 items-center">
        <span>🔥📱</span>
        <h2 className="tracking-wide text-lg font-nothing">
          Nothing Phone (1)
        </h2>
      </div>
      <hr className="w-full border-1 border-gray-700 my-2" />
      {publishedResources.map((resource, index) => (
        <Resource key={index} resource={resource} />
      ))}
    </>
  );
}

export default PhoneOne;

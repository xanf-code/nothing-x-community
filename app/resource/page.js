import Resource from "@/components/main/products/Resource";
import { getResourcesByProduct } from "@/lib/resources";
import { resourceStatus, resourceTypes } from "@/utils/constants";
import Link from "next/link";
import { TriangleRightIcon, TriangleLeftIcon } from "@radix-ui/react-icons";
import { Badge } from "@/components/ui/badge";

export default async function page({ searchParams }) {
  const page = searchParams.page ?? 1;
  const limit = searchParams.limit ?? 2;
  const product = searchParams.product ?? "Nothing Phone 1";
  const resourceType = searchParams.type ? searchParams.type.split(",") : [];
  const query = searchParams.q ?? "";

  const publishedResources = await getResourcesByProduct(
    product,
    resourceStatus.PUBLISHED,
    Number(page),
    limit,
    resourceType,
    query
  );

  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex space-x-2">
          <span>🔥📱</span>
          <h2 className="tracking-wide text-lg font-nothing">
            All {product} resources
          </h2>
        </div>
        <div className="flex">
          <Link
            href={{
              pathname: "/resource",
              query: {
                product: product,
                page: Number(page) > 1 ? Number(page) - 1 : 1,
                ...(resourceType.length > 0
                  ? { type: resourceType.join(",") }
                  : {}),
                ...(query ? { q: query } : {}),
              },
            }}
          >
            <TriangleLeftIcon className="h-8 w-8" />
          </Link>
          <p className="items-center flex">{page}</p>
          <Link
            href={{
              pathname: "/resource",
              query: {
                product: product,
                page: Number(page) + 1,
                ...(resourceType.length > 0
                  ? { type: resourceType.join(",") }
                  : {}),
                ...(query ? { q: query } : {}),
              },
            }}
          >
            <TriangleRightIcon className="h-8 w-8" />
          </Link>
        </div>
      </div>
      <hr className="w-full border-1 border-gray-700 mb-2 mt-2" />
      <div className="space-x-4 justify-start flex mb-4">
        {Object.keys(resourceTypes).map((resourceKey) => (
          <Link
            key={resourceKey}
            href={{
              pathname: "/resource",
              query: {
                product: product,
                page: 1,
                ...(query ? { q: query } : {}),
                type: resourceTypes[resourceKey],
              },
            }}
          >
            <Badge className={"select-none"} variant="secondary">
              {resourceTypes[resourceKey]}
            </Badge>
          </Link>
        ))}
      </div>
      {publishedResources.map((resource, index) => (
        <Resource key={index} resource={resource} />
      ))}
    </div>
  );
}

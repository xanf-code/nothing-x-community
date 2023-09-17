import Resource from "@/components/main/products/Resource";
import { getResourcesByProduct } from "@/lib/resources";
import { resourceStatus, resourceTypes } from "@/utils/constants";
import Link from "next/link";
import { TriangleRightIcon, TriangleLeftIcon } from "@radix-ui/react-icons";
import { Separator } from "@/components/ui/separator";
import SortDrop from "@/components/main/dropdown/SortDrop";
import ResourceDrop from "@/components/main/dropdown/ResourceDrop";

export default async function page({ searchParams }) {
  const page = searchParams.page ?? 1;
  const limit = searchParams.limit ?? 10;
  const product = searchParams.product ?? "Nothing Phone 1";
  const resourceType = searchParams.type ? searchParams.type.split(",") : [];
  const query = searchParams.q ?? "";
  const order = searchParams.order ?? "approved";

  const publishedResources = await getResourcesByProduct(
    product,
    resourceStatus.PUBLISHED,
    Number(page),
    limit,
    resourceType,
    query,
    order
  );

  return (
    <div className="flex flex-col">
      <div>
        <div className="flex justify-between items-center">
          <div className="flex space-x-2">
            <span>🔥📱</span>
            <h2 className="tracking-wide text-lg font-nothing">
              {product} resources
            </h2>
          </div>
        </div>
        <Separator className="my-2" />
        <div className="space-x-4 justify-between flex my-6">
          <ResourceDrop />
          <SortDrop />
        </div>
        {publishedResources.map((resource, index) => (
          <Resource key={index} resource={resource} />
        ))}
      </div>
      <div className="flex justify-center">
        <Link
          href={{
            pathname: "/resource",
            query: {
              product: product,
              page: Number(page) > 1 ? Number(page) - 1 : 1,
              ...(resourceType.length > 0
                ? { type: resourceType.join(",") }
                : {}),
              ...(order ? { order: order } : "approved"),
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
              ...(order ? { order: order } : "approved"),
              ...(query ? { q: query } : {}),
            },
          }}
        >
          <TriangleRightIcon className="h-8 w-8" />
        </Link>
      </div>
    </div>
  );
}

import Resource from "@/components/main/products/Resource";
import { getResourcesByProduct } from "@/lib/resources";
import { resourceStatus, resourceTypes } from "@/utils/constants";
import Link from "next/link";
import { TriangleRightIcon, TriangleLeftIcon } from "@radix-ui/react-icons";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { capitalizeFirstLetter } from "@/lib/utils";

export default async function page({ searchParams }) {
  let placeholder;
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
          <Select>
            <SelectTrigger className="w-[180px] shadow-none font-nothing">
              <SelectValue
                placeholder={
                  resourceType.includes("WALLPAPERS")
                    ? "📱 Wallpapers"
                    : resourceType.includes("GUIDE")
                    ? "📖 Guides"
                    : resourceType.includes("RANDOM")
                    ? "🪄 Random"
                    : resourceType.includes("CUSTOM ROMS")
                    ? "🖥️ Custom Roms"
                    : resourceType.includes("ACCESSORIES")
                    ? "🪛 Accessories"
                    : "🔥 All"
                }
              />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {Object.keys(resourceTypes).map((resourceKey) => (
                  <Link
                    className="flex flex-col"
                    key={resourceKey}
                    href={{
                      pathname: "/resource",
                      query: {
                        product: product,
                        page: page,
                        ...(query ? { q: query } : {}),
                        type: resourceTypes[resourceKey],
                      },
                    }}
                  >
                    <p className="select-none cursor-cell p-2 text-sm font-nothing">
                      {capitalizeFirstLetter(resourceTypes[resourceKey])}
                    </p>
                  </Link>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-[180px] shadow-none font-nothing">
              <SelectValue
                placeholder={
                  order == "approved" ? "🔥🕣 Recent" : "⚡️👀 Most Viewed"
                }
              />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <Link
                  href={{
                    pathname: "/resource",
                    query: {
                      product: product,
                      page: page,
                      ...(query ? { q: query } : {}),
                      ...(resourceType.length > 0
                        ? { type: resourceType.join(",") }
                        : {}),
                      order: "approved",
                    },
                  }}
                >
                  <p className="select-none cursor-cell p-2 text-sm font-nothing">
                    🔥🕣 Recent
                  </p>
                </Link>

                <Link
                  href={{
                    pathname: "/resource",
                    query: {
                      product: product,
                      page: 1,
                      ...(query ? { q: query } : {}),
                      ...(resourceType.length > 0
                        ? { type: resourceType.join(",") }
                        : {}),
                      order: "clicks",
                    },
                  }}
                >
                  <p className="select-none cursor-cell p-2 text-sm font-nothing">
                    ⚡️👀 Most Viewed
                  </p>
                </Link>
              </SelectGroup>
            </SelectContent>
          </Select>
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
  );
}

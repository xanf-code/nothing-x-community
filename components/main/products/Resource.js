"use client";

import { createClick, createVote } from "@/app/_actions";
import { Badge } from "@/components/ui/badge";
import { formatNumberToShort, timeAgo } from "@/lib/utils";
import Avatar from "boring-avatars";
import Link from "next/link";
import {
  ArrowUpIcon,
  ArrowDownIcon,
  ClockIcon,
  EyeOpenIcon,
} from "@radix-ui/react-icons";
import { SelectSeparator } from "@/components/ui/select";

function Resource({ resource }) {
  const timestamp = new Date(resource.approved).getTime();
  const fullName = resource.firstName + " " + resource.lastName;

  async function actionClick() {
    await createClick(resource.id);
  }

  return (
    <>
      <div className="flex items-center">
        <div className="space-y-3 flex-1 ml-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2.5">
              <Avatar size={20} name={fullName} variant="beam" square={false} />
              <p className="text-xs select-none font-nothing">{fullName}</p>
            </div>
            <div className="flex space-x-1.5 items-center mr-2">
              <EyeOpenIcon className="h-3.5 w-3.5" />
              <p className="font-nothing text-xs">
                {formatNumberToShort(resource.clicks)}
              </p>
            </div>
          </div>
          <Link target="_blank" key={resource.id} href={resource.resourceLink}>
            <p
              className="cursor-cell leading-tight hover:underline underline-offset-2 mt-2 select-none text-left mr-2"
              onClick={actionClick}
            >
              {resource.resourceName}
            </p>
          </Link>
          <div className="flex space-x-4 justify-between">
            <Badge className={"select-none"} variant="secondary">
              {resource.resourceType}
            </Badge>
            <div className="flex items-center space-x-1 select-none pr-2">
              <ClockIcon className="h-3.5 w-3.5" />
              <p className="text-xs font-light">{timeAgo(timestamp)}</p>
            </div>
          </div>
        </div>
      </div>
      <SelectSeparator className="my-4 last:hidden" />
    </>
  );
}

export default Resource;

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
import wretch from "wretch";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { SelectSeparator } from "@/components/ui/select";

function Resource({ resource }) {
  const { toast } = useToast();
  const upVotes = Number(resource.upVotes);
  const timestamp = new Date(resource.approved).getTime();
  const fullName = resource.firstName + " " + resource.lastName;

  async function actionClick() {
    await createClick(resource.id);
  }

  async function postAction(id, action) {
    const res = await createVote(id, action);
    if (res == "OK") {
      toast({
        description: "Vote submitted 👍🔥",
      });
    } else if (res == "ERROR") {
      toast({
        title: "Vote not submitted 🛑",
        description: "Try again later after some time",
        variant: "destructive",
      });
    } else {
      toast({
        description: "Server Error 🛑",
        variant: "destructive",
      });
    }
  }

  return (
    <>
      <div className="flex items-center">
        <div className="flex flex-col items-center pr-3 sm:pr-4">
          <div
            className="cursor-pointer select-none"
            onClick={() => postAction(resource.id, "up")}
          >
            <ArrowUpIcon className="h-6 w-6 text-green-500" />
          </div>
          <p className="items-center flex text-sm font-nothing py-1 select-none">
            {upVotes}
          </p>
          <div
            className="cursor-pointer select-none"
            onClick={() => postAction(resource.id, "down")}
          >
            <ArrowDownIcon className="h-6 w-6 rotate-0 text-red-500" />
          </div>
        </div>
        <div className="space-y-3 flex-1">
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
      <SelectSeparator className="my-4" />
    </>
  );
}

export default Resource;

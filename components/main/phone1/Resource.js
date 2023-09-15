"use client";

import { computeLikes, createClick } from "@/app/_actions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { timeAgo } from "@/lib/utils";
import { ClockIcon, LapTimerIcon } from "@radix-ui/react-icons";
import Avatar from "boring-avatars";
import Link from "next/link";
import { ArrowUpIcon, ArrowDownIcon } from "@radix-ui/react-icons";
import axios from "axios";
import { useState } from "react";

function Resource({ resource }) {
  const upVotes = Number(resource.upVotes);
  const downVotes = Number(resource.downVotes);

  const finalCount = upVotes + downVotes;

  const [likes, setlikes] = useState(finalCount);
  const timestamp = new Date(resource.approved).getTime();
  const fullName = resource.firstName + " " + resource.lastName;

  async function actionClick() {
    console.log("Resource ID", resource.id);
    await createClick(resource.id);
  }

  async function postAction(id, action) {
    const response = await axios.post(`/api/action?id=${id}&action=${action}`);
    if (response.status === 200) {
      const updatedVote = await computeLikes(id);
      setlikes(updatedVote);
      console.log("Request was successful.");
    } else if (response.status === 401) {
      console.error("Request Unsuccessful.");
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
            <ArrowUpIcon className="h-6 w-6 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          </div>
          <p className="items-center flex text-sm font-nothing py-1 select-none">
            {likes}
          </p>
          <div
            className="cursor-pointer select-none"
            onClick={() => postAction(resource.id, "down")}
          >
            <ArrowDownIcon className="h-6 w-6 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          </div>
        </div>
        <div className="space-y-3 flex-1">
          <div className="flex items-center space-x-1">
            <Avatar size={20} name={fullName} variant="beam" square={false} />
            <p className="text-xs font-light select-none">{fullName}</p>
          </div>
          <Link target="_blank" key={resource.id} href={resource.resourceLink}>
            <p
              className="cursor-cell leading-tight hover:underline underline-offset-2 mt-2 select-none"
              onClick={actionClick}
            >
              {resource.resourceName}
            </p>
          </Link>
          <div className="flex space-x-4 justify-between">
            <Badge className={"select-none"} variant="secondary">
              {resource.resourceType}
            </Badge>
            <div className="flex items-center space-x-1 select-none">
              <ClockIcon className="h-3.5 w-3.5" />
              <p className="text-xs font-light">{timeAgo(timestamp)}</p>
            </div>
          </div>
        </div>
      </div>
      <hr className="w-full my-4" />
    </>
  );
}

export default Resource;

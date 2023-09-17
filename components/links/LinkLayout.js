import { Link1Icon } from "@radix-ui/react-icons";
import Link from "next/link";
import React from "react";

export default function LinkLayout({ link, name }) {
  return (
    <div className="flex space-x-3 items-center hover:underline underline-offset-2">
      <Link1Icon className="h-4 w-4" />
      <Link target="_blank" href={link} className="cursor-cell select-none">
        <p className="font-nothing text-sm">{name}</p>
      </Link>
    </div>
  );
}

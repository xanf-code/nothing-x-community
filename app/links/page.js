"use client";
import Header from "@/components/links/Header";
import Telegram from "@/components/links/Telegram";
import Xda from "@/components/links/Xda";
import { SelectSeparator } from "@/components/ui/select";

export default function page() {
  return (
    <div className="flex flex-col space-y-6">
      <div className="telegram">
        <Header name="🔗🔥 Telegram Links" />
        <SelectSeparator className="my-2" />
        <Telegram />
      </div>
      <div className="xda">
        <Header name="🔗🔥 XDA Links" />
        <SelectSeparator className="my-2" />
        <Xda />
      </div>
    </div>
  );
}

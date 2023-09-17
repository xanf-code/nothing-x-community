import React from "react";
import LinkLayout from "./LinkLayout";

export default function Telegram() {
  return (
    <div className="flex flex-col space-y-4">
      <LinkLayout
        link="https://t.me/NothingPhone1"
        name="Nothing Phone (1) Global"
      />
      <LinkLayout
        link="https://t.me/NothingPhone2"
        name="Nothing Phone (2) Global"
      />
      <LinkLayout
        link="https://t.me/Nothing_Phone_Discussion"
        name="Nothing Phone Community"
      />
      <LinkLayout
        link="https://t.me/NothingPhonePhotography"
        name="Nothing Phone (1) Photography"
      />
      <LinkLayout
        link="https://t.me/NothingPhone2Photography"
        name="Nothing Phone (2) Photography"
      />
    </div>
  );
}

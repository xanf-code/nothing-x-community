import React from "react";

export default function Header({ name }) {
  return (
    <div className="flex justify-between items-center">
      <div className="flex space-x-2">
        <h2 className="tracking-wide text-lg font-nothing">{name}</h2>
      </div>
    </div>
  );
}

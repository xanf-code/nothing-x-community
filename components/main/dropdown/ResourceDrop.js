"use client";
import { resourceTypes } from "@/utils/constants";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export default function ResourceDrop() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSelectChange = (e) => {
    const selectedValue = e.target.value;

    if (selectedValue === "All") {
      const currentQuery = Object.fromEntries(searchParams);
      delete currentQuery.type;
      const updatedQuery = new URLSearchParams(currentQuery).toString();
      const href = `${pathname}?${updatedQuery}`;
      router.push(href);
    } else {
      const currentQuery = Object.fromEntries(searchParams);
      currentQuery.type = selectedValue;
      const updatedQuery = new URLSearchParams(currentQuery).toString();
      const href = `${pathname}?${updatedQuery}`;
      router.push(href);
    }
  };

  const namer = (resName) => {
    if (resName == "WALLPAPERS") {
      return "📱 Wallpapers";
    } else if (resName == "GUIDE") {
      return "📖 Guides";
    } else if (resName == "RANDOM") {
      return "🪄 Random";
    } else if (resName == "CUSTOM ROMS") {
      return "🖥️ Custom Roms";
    } else if (resName == "ACCESSORIES") {
      return "🪛 Accessories";
    } else {
      return resName;
    }
  };

  return (
    <div>
      <select
        onChange={handleSelectChange}
        value={searchParams.get("type") || "All"}
        className="p-1 rounded-md"
      >
        <option value="All">🦴 All</option>
        {Object.keys(resourceTypes).map((resourceKey) => (
          <option key={resourceKey} value={resourceKey}>
            {namer(resourceTypes[resourceKey])}
          </option>
        ))}
      </select>
    </div>
  );
}

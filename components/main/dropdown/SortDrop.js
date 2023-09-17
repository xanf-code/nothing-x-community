"use client";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export default function SortDrop() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSelectChange = (e) => {
    const selectedValue = e.target.value;

    const currentQuery = Object.fromEntries(searchParams);

    currentQuery.order = selectedValue;

    const updatedQuery = new URLSearchParams(currentQuery).toString();

    const href = `${pathname}?${updatedQuery}`;

    router.push(href);
  };

  return (
    <div>
      <select
        className="p-1 rounded-md bg-white dark:bg-gray-900"
        onChange={handleSelectChange}
        value={searchParams.get("order") || "approved"}
      >
        <option value="approved">🕣 Recent</option>
        <option value="clicks">👀 Most Viewed</option>
      </select>
    </div>
  );
}

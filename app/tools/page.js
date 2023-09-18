import { products } from "@/utils/constants";
import Link from "next/link";

export const metadata = {
  title: "Links and Tools | Nothing Resources",
  description: "All nothing product resources at one stop.",
};

export default function page() {
  return (
    <div>
      {Object.keys(products).map((productKey, i) => (
        <div className="mt-4 first:mt-0">
          <Link key={i} href={`/tools/${products[productKey]}`}>
            <div className="flex space-x-2 items-center">
              <span>👉</span>
              <h1 className="font-nothing hover:underline hover:underline-offset-2 cursor-cell select-none hover:text-blue-500">
                {products[productKey]}
              </h1>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}

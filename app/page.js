import PhoneOne from "@/components/main/phone1/PhoneOne";
import TrendComp from "@/components/main/trending/trend";

export default function Home() {
  return (
    <div className="flex flex-col">
      <TrendComp />
      <PhoneOne />
    </div>
  );
}

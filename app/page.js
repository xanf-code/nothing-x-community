import PhoneOne from "@/components/main/phone1/PhoneOne";
import TrendComp from "@/components/main/trending/trend";
import { RocketIcon } from "@radix-ui/react-icons";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function Home() {
  return (
    <div className="flex flex-col">
      <div className="mb-6">
        <Alert>
          <RocketIcon className="h-4 w-4" />
          <AlertTitle>Heads up! This is a Beta Release Version 0.1</AlertTitle>
          <AlertDescription>
            Welcome, we're continuously improving our website. Some features may
            not be stable.
          </AlertDescription>
        </Alert>
      </div>
      <TrendComp />
      <PhoneOne />
    </div>
  );
}

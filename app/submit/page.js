"use client";
import SubmitForm from "@/components/submit/form";
import { RocketIcon } from "@radix-ui/react-icons";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

function SubmitFormPage() {
  return (
    <div>
      <div className="mb-6">
        <Alert>
          <RocketIcon className="h-4 w-4" />
          <AlertTitle>Heads up! This is a Beta Release Version 0.1</AlertTitle>
          <AlertDescription>
            The resource submission form is still in beta mode. Some features
            may not be stable.
          </AlertDescription>
        </Alert>
      </div>
      <SubmitForm />
    </div>
  );
}

export default SubmitFormPage;

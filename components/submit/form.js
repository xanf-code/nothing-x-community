import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";

import {
  ACCEPTED_FILE_TYPES,
  MAX_FILE_SIZE,
  products,
  resourceTypes,
} from "@/utils/constants";
import { getLinkForResource } from "@/lib/submit/submit";

function SubmitForm() {
  const [isSubmittingForm, setIsSubmittingForm] = useState(false);
  const [selectedOption, setSelectedOption] = useState("URL");
  const [selectedFile, setSelectedFile] = useState(null);

  const commonSchema = z.object({
    firstName: z.string().min(2).max(20),
    lastName: z.string().min(2).max(20),
    emailID: z.string().email(),
    productName: z.string(),
    resourceName: z.string().min(5).max(30),
    resourceType: z.string(),
  });

  const urlSchema = commonSchema.extend({
    resourceLink: z
      .string()
      .min(1)
      .refine(
        (value) => selectedOption === "URL" || value === "",
        "Link is required."
      ),
  });

  const fileSchema = commonSchema.extend({
    resourceFile: z
      .any()
      .refine((files) => files?.length == 1, "File is required.")
      .refine(
        (files) => files?.[0]?.size <= MAX_FILE_SIZE,
        `Max file size is 5MB.`
      )
      .refine(
        (files) => ACCEPTED_FILE_TYPES.includes(files?.[0]?.type),
        ".jpg, .jpeg, .png and .webp files are accepted."
      ),
  });

  const selectedSchema = selectedOption === "URL" ? urlSchema : fileSchema;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: zodResolver(selectedSchema) });

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const submitData = async (formBody) => {
    try {
      setIsSubmittingForm(true);
      try {
        if (selectedOption === "File" && selectedFile != null) {
          const link = await getLinkForResource(selectedFile, formBody);
          formBody.resourceLink = link;
        }
      } catch (err) {
        console.log("Error is File URL selection", err);
      } finally {
        delete formBody.resourceFile;
      }

      const response = await axios.post("/api/resources", formBody, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        console.log("Request was successful.");
      } else if (response.status === 401) {
        console.error("Request Unsuccessful.");
      }
      reset();
    } catch (error) {
      console.error("Server Error", error);
    } finally {
      setIsSubmittingForm(false);
    }
  };

  return (
    <div>
      <form
        className="flex flex-col p-6 rounded-lg space-y-2"
        onSubmit={handleSubmit(submitData)}
      >
        <label className="text-lg">First Name:</label>
        <input
          type="text"
          {...register("firstName")}
          className="font-nothing px-3 py-2 rounded-md mt-1 outline-dotted"
        />
        {errors.firstName && (
          <span className="text-red-500">{errors.firstName.message}</span>
        )}

        <label className="text-lg">Last Name:</label>
        <input
          type="text"
          {...register("lastName")}
          className="font-nothing  px-3 py-2 rounded-md mt-1 outline-dotted"
        />
        {errors.lastName && (
          <span className="text-red-500">{errors.lastName.message}</span>
        )}

        <label className="text-lg">Email ID:</label>
        <input
          type="text"
          {...register("emailID")}
          className="font-nothing outline-dotted px-3 py-2 rounded-md mt-1"
        />
        {errors.emailID && (
          <span className="text-red-500">{errors.emailID.message}</span>
        )}

        <label className="text-lg">Product Name:</label>
        <select
          {...register("productName")}
          className="font-nothing outline-dotted px-3 py-2 rounded-md mt-1"
        >
          {Object.keys(products).map((productKey) => (
            <option key={productKey} value={products[productKey]}>
              {products[productKey]}
            </option>
          ))}
        </select>
        {errors.productName && (
          <span className="text-red-500">{errors.productName.message}</span>
        )}

        <label className="text-lg">Resource Name:</label>
        <input
          type="text"
          {...register("resourceName")}
          className="outline-dotted font-nothing px-3 py-2 rounded-md mt-1"
        />
        {errors.resourceName && (
          <span className="text-red-500">{errors.resourceName.message}</span>
        )}

        <label className="text-lg">Resource Type:</label>
        <select
          {...register("resourceType")}
          className="outline-dotted font-nothing px-3 py-2 rounded-md mt-1"
        >
          {Object.keys(resourceTypes).map((resourceKey) => (
            <option key={resourceKey} value={resourceTypes[resourceKey]}>
              {resourceTypes[resourceKey]}
            </option>
          ))}
        </select>
        {errors.resourceType && (
          <span className="text-red-500">{errors.resourceType.message}</span>
        )}

        <label className="text-lg">What are you uploading?</label>
        <select
          onChange={handleOptionChange}
          value={selectedOption}
          className="outline-dotted font-nothing px-3 py-2 rounded-md mt-1"
        >
          <option value="URL">URL</option>
          <option value="File">File</option>
        </select>

        {selectedOption === "URL" ? (
          <>
            <label className="text-lg">Resource Link:</label>
            <input
              type="text"
              {...register("resourceLink")}
              className="outline-dotted font-nothing px-3 py-2 rounded-md mt-1"
            />
            {errors.resourceLink && (
              <span className="text-red-500">
                {errors.resourceLink.message}
              </span>
            )}
          </>
        ) : (
          <>
            <label className="text-lg">Resource File:</label>
            <input
              type="file"
              {...register("resourceFile")}
              name="resourceFile"
              onChange={handleFileChange}
              className="px-3 py-2 rounded-md mt-1"
            />
          </>
        )}

        <input
          type="submit"
          disabled={isSubmittingForm}
          value={isSubmittingForm ? "Submitting..." : "Submit"}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-md cursor-cell"
        />
      </form>
    </div>
  );
}

export default SubmitForm;

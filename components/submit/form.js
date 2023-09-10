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

  const schema = z.object({
    firstName: z.string().min(2).max(20),
    lastName: z.string().min(2).max(20),
    emailID: z.string().email(),
    productName: z.string(),
    resourceName: z.string().min(5).max(30),
    resourceType: z.string(),
    resourceLink: z.string().min(1),
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

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: zodResolver(schema) });

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    console.log(selectedFile);
  };

  const submitData = async (formBody) => {
    try {
      console.log(selectedOption);
      setIsSubmittingForm(true);

      try {
        if (selectedOption === "File" && selectedFile) {
          const link = await getLinkForResource(selectedFile);
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
      <form className="flex flex-col" onSubmit={handleSubmit(submitData)}>
        <label>First Name:</label>
        <input type="text" {...register("firstName")} />
        {errors.firstName && (
          <span className="text-red-500">{errors.firstName.message}</span>
        )}

        <label>Last Name:</label>
        <input type="text" {...register("lastName")} />
        {errors.lastName && (
          <span className="text-red-500">{errors.lastName.message}</span>
        )}

        <label>Email ID:</label>
        <input type="text" {...register("emailID")} />
        {errors.emailID && (
          <span className="text-red-500">{errors.emailID.message}</span>
        )}

        <label>Product Name:</label>
        <select {...register("productName")}>
          {Object.keys(products).map((productKey) => (
            <option key={productKey} value={products[productKey]}>
              {products[productKey]}
            </option>
          ))}
        </select>
        {errors.productName && (
          <span className="text-red-500">{errors.productName.message}</span>
        )}

        <label>Resource Name:</label>
        <input type="text" {...register("resourceName")} />
        {errors.resourceName && (
          <span className="text-red-500">{errors.resourceName.message}</span>
        )}

        <label>Resource Type:</label>
        <select {...register("resourceType")}>
          {Object.keys(resourceTypes).map((resourceKey) => (
            <option key={resourceKey} value={resourceTypes[resourceKey]}>
              {resourceTypes[resourceKey]}
            </option>
          ))}
        </select>
        {errors.resourceType && (
          <span className="text-red-500">{errors.resourceType.message}</span>
        )}

        <label>What are you uploading?</label>
        <select onChange={handleOptionChange} value={selectedOption}>
          <option value="URL">URL</option>
          <option value="File">File</option>
        </select>

        {selectedOption === "URL" ? (
          <>
            <label>Resource Link:</label>
            <input type="text" {...register("resourceLink")} />
            {errors.resourceLink && (
              <span className="text-red-500">
                {errors.resourceLink.message}
              </span>
            )}
          </>
        ) : (
          <>
            <label>Resource File:</label>
            <input
              type="file"
              {...register("resourceFile")}
              name="File"
              onChange={handleFileChange}
            />
          </>
        )}

        <input
          type="submit"
          disabled={isSubmittingForm}
          value={isSubmittingForm ? "Submitting..." : "Submit"}
        />
      </form>
    </div>
  );
}

export default SubmitForm;

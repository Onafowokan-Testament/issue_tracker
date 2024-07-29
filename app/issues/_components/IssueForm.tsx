"use client";

import { Button, Callout, TextArea, TextField, Text } from "@radix-ui/themes";

import "easymde/dist/easymde.min.css";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import createIssueSchema from "@/app/validationSchema";
import { z } from "zod";
import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";
import { Issue } from "@prisma/client";
import SimpleMDE from "react-simplemde-editor";

type IssueFormData = z.infer<typeof createIssueSchema>;
// const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
//   ssr: false,
// });

interface Prop {
  issue?: Issue;
}

const IssueForm = ({ issue }: Prop) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(createIssueSchema),
  });

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  return (
    <div className="max-w-xl my-5">
      {error && (
        <Callout.Root color="red">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form
        className="space-y-3 max-w-xl"
        onSubmit={handleSubmit(async (data) => {
          try {
            setIsLoading(true);
            if (issue) await axios.put("/api/issues/" + issue.Id, data);
            else await axios.post("/api/issues", data);
            router.push("/issues");
            router.refresh();
          } catch (error) {
            setIsLoading(false);
            setError("An unexpected error occured");
          }
        })}
      >
        <TextField.Root
          placeholder="Title"
          defaultValue={issue?.title}
          className="my-5"
          {...register("title")}
        ></TextField.Root>
        {errors.title && <ErrorMessage>{errors.title.message}</ErrorMessage>}

        <Controller
          name="description"
          defaultValue={issue?.description}
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} className=" my-0" />
          )}
        />
        {errors.description && (
          <ErrorMessage>{errors.description.message}</ErrorMessage>
        )}

        <Button
          className="space-y-0
        "
          disabled={isLoading}
        >
          {issue ? "Update" : "Submit"}
          {isLoading && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default IssueForm;

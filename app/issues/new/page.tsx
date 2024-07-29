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

type IssueForm = z.infer<typeof createIssueSchema>;
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

const createNewIssue = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueForm>({
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
            await axios.post("/api/issues", data);
            router.push("/issues");
          } catch (error) {
            setIsLoading(false);
            setError("An unexpected error occured");
          }
        })}
      >
        <TextField.Root
          placeholder="Title"
          className="my-5"
          {...register("title")}
        ></TextField.Root>
        {errors.title && <ErrorMessage>{errors.title.message}</ErrorMessage>}

        <Controller
          name="description"
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
          Create new Issue
          {isLoading && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default createNewIssue;

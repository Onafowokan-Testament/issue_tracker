"use client";

import { Button, Callout, TextArea, TextField, Text } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import createIssueSchema from "@/app/validationSchema";
import { z } from "zod";

type IssueForm = z.infer<typeof createIssueSchema>;

const createNewIssue = () => {
  const router = useRouter();

  const [error, setError] = useState("");

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema),
  });

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
            await axios.post("/api/issues", data);
            router.push("/issues");
            console.log(data);
          } catch (error) {
            setError("An unexpected error occured");
          }
        })}
      >
        <TextField.Root
          placeholder="Title"
          className="my-5"
          {...register("title")}
        ></TextField.Root>
        {errors.title && (
          <Text color="red" as="p">
            {errors.title.message}
          </Text>
        )}

        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} className=" my-0" />
          )}
        />
        {errors.description && (
          <Text color="red" as="p">
            {errors.description.message}
          </Text>
        )}

        <Button
          className="space-y-0
        "
        >
          Create new Issue
        </Button>
      </form>
    </div>
  );
};

export default createNewIssue;

"use client";

import { Button, Callout, TextArea, TextField } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
interface IssueForm {
  title: string;
  description: string;
}

const createNewIssue = () => {
  const router = useRouter();

  const [error, setError] = useState("");

  const { register, control, handleSubmit } = useForm<IssueForm>();

  return (
    <div className="max-w-xl mt-5">
      {error && (
        <Callout.Root color="red">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form
        className="space-y-5 max-w-xl"
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

        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />

        <Button>Create new Issue</Button>
      </form>
    </div>
  );
};

export default createNewIssue;

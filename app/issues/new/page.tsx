"use client";

import { Button, TextArea, TextField } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
interface IssueForm {
  title: string;
  description: string;
}

const createNewIssue = () => {
  const router = useRouter();

  const { register, control, handleSubmit } = useForm<IssueForm>();

  return (
    <form
      className="space-y-5 max-w-xl"
      onSubmit={handleSubmit((data) => {
        axios.post("/api/issues", data);
        router.push("/issues");
        console.log(data);
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
  );
};

export default createNewIssue;

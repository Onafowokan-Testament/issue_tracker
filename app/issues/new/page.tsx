"use client";

import { Button, TextArea, TextField } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

const createNewIssue = () => {
  return (
    <div className="space-y-5 max-w-xl">
      <TextField.Root placeholder="Title" className="my-5"></TextField.Root>
      <SimpleMDE placeholder="Description" />

      <Button>Create new Issue</Button>
    </div>
  );
};

export default createNewIssue;

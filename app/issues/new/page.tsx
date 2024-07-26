import { Button, TextArea, TextField } from "@radix-ui/themes";
import React from "react";

const createNewIssue = () => {
  return (
    <div className="space-y-5 max-w-xl">
      <TextField.Root placeholder="Title" className="my-5"></TextField.Root>
      <TextArea placeholder="Description" />

      <Button>Create new Issue</Button>
    </div>
  );
};

export default createNewIssue;

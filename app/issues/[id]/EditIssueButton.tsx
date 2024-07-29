import { Button, Link } from "@radix-ui/themes";
import React from "react";

const EditIssueButton = ({ issueId }: { issueId: number }) => {
  return (
    <Button color="blue">
      <Link href={`/issues/${issueId}/edit`}>Edit</Link>
    </Button>
  );
};

export default EditIssueButton;

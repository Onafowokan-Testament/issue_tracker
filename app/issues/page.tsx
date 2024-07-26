import React from "react";
import { Button } from "@radix-ui/themes";
import Link from "next/link";

const IssueTracker = () => {
  return (
    <Link href={"/issues/new"}>
      <Button>Create new issue</Button>
    </Link>
  );
};

export default IssueTracker;

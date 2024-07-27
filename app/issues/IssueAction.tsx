import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

const IssueAction = () => {
  return (
    <div className="mb-5">
      <Link href={"/issues/new"}>
        <Button>Create new issue</Button>
      </Link>
    </div>
  );
};

export default IssueAction;

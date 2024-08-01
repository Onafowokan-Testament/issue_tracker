import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import IssueFilter from "./issueFilter";

const IssueAction = () => {
  return (
    <Flex justify={"between"}>
      <IssueFilter></IssueFilter>
      <div className="mb-5">
        <Link href={"/issues/new"}>
          <Button>Create new issue</Button>
        </Link>
      </div>
    </Flex>
  );
};

export default IssueAction;

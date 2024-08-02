import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import React, { Suspense } from "react";
import IssueFilter from "./issueFilter";

const IssueAction = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Flex justify={"between"}>
        <IssueFilter></IssueFilter>
        <div className="mb-5">
          <Link href={"/issues/new"}>
            <Button>Create new issue</Button>
          </Link>
        </div>
      </Flex>
    </Suspense>
  );
};

export default IssueAction;

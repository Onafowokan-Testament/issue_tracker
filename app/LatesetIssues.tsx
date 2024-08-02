import prisma from "@/prisma/clients";
import { Avatar, Card, Flex, Heading, Table } from "@radix-ui/themes";

import React from "react";
import { createDeflate } from "zlib";
import Link from "next/link";
import StatusIssueBadge from "./components/StatusIssueBadge";

const LatesetIssues = async () => {
  const issues = await prisma.issue.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
    include: {
      assignedUser: true,
    },
  });
  return (
    <Card>
      <Heading size={"4"} mb={"5"}>
        Latest Issues
      </Heading>
      <Table.Root>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.Id}>
              <Table.Cell>
                <Flex justify={"between"}>
                  <Flex direction={"column"} align={"start"} gap={"2"}>
                    <Link href={`/issues/ ${issue.Id}`}>{issue.title}</Link>
                    <StatusIssueBadge status={issue.status} />
                  </Flex>
                  {issue.assignedUserId && (
                    <Avatar
                      size={"2"}
                      radius="full"
                      src={issue.assignedUser!.image!}
                      fallback=" ?"
                    />
                  )}
                </Flex>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Card>
  );
};

export default LatesetIssues;

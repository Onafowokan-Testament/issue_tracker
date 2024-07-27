import React from "react";
import { Button, Table } from "@radix-ui/themes";
import Link from "next/link";
import prisma from "@/prisma/client";
import { Status } from "@prisma/client";
import delay from "delay";
import StatusIssueBadge from "../components/StatusIssueBadge";
import IssueAction from "./IssueAction";

const IssueTracker = async () => {
  const issues = await prisma.issue.findMany();

  await delay(2000);
  return (
    <div>
      <IssueAction></IssueAction>
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className=" hidden md:table-cell">
              Status
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className=" hidden md:table-cell">
              Created
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.Id}>
              <Table.Cell>
                <Link href={`/issues/${issue.Id}`}>{issue.title}</Link>
                <div className="block md:hidden">{issue.status}</div>
              </Table.Cell>
              <Table.Cell className=" hidden md:table-cell">
                <StatusIssueBadge status={issue.status}></StatusIssueBadge>
              </Table.Cell>
              <Table.Cell className=" hidden md:table-cell">
                {issue.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export default IssueTracker;

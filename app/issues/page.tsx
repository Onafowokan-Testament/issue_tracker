import React from "react";
import { Button, Table } from "@radix-ui/themes";
import prisma from "@/prisma/client";
import { Issue, Status } from "@prisma/client";
import delay from "delay";
import StatusIssueBadge from "../components/StatusIssueBadge";
import IssueAction from "./IssueAction";
import Link from "../components/Link";
import classNames from "classnames";
import NextLink from "next/link";
import { FaArrowUp } from "react-icons/fa6";
import Pagination from "../components/Pagination";
import { Metadata } from "next";

const IssueTracker = async ({
  searchParams,
}: {
  searchParams: { status: Status; orderBy: keyof Issue; page: string };
}) => {
  const statuses = Object.values(Status);

  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const orderByField = searchParams.orderBy || "createdAt";

  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;
  const issues = await prisma.issue.findMany({
    where: { status: status },
    orderBy: {
      [orderByField]: "desc",
    },

    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const issueSize = await prisma.issue.count({ where: { status: status } });

  // const select = status ? status : " ";
  // const query = select === "all" ? "" : `?status=${status}`;

  // /issues?status=?
  const headers: {
    label: string;
    value: keyof Issue;
    classNames?: string;
  }[] = [
    { label: "Issue", value: "title", classNames: "" },
    { label: "Status", value: "status", classNames: " hidden md:table-cell" },
    {
      label: "Created",
      value: "createdAt",
      classNames: " hidden md:table-cell",
    },
  ];
  await delay(2000);
  return (
    <div>
      <IssueAction></IssueAction>
      <Table.Root variant="surface" className="my-5">
        <Table.Header>
          <Table.Row>
            {headers.map((header) => (
              <Table.ColumnHeaderCell
                key={header.label}
                className={header.classNames}
              >
                <NextLink
                  href={{ query: { ...searchParams, orderBy: header.value } }}
                >
                  {header.label}
                </NextLink>
                {header.value === searchParams.orderBy && (
                  <FaArrowUp className="inline"></FaArrowUp>
                )}
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.Id}>
              <Table.Cell>
                <Link href={`/issues/${issue.Id}`}>{issue.title}</Link>
                <div className="block md:hidden">
                  {" "}
                  <StatusIssueBadge status={issue.status}></StatusIssueBadge>
                </div>
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
      <Pagination
        pageSize={pageSize}
        currentPage={page}
        itemCount={issueSize}
      ></Pagination>
    </div>
  );
};

export default IssueTracker;

export const metadata: Metadata = {
  title: "Issue Tracker --issue list",
  description: "List of all issues",
};

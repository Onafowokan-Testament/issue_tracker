import { Status } from "@prisma/client";
import { Card, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

interface Props {
  open: number;
  inProgress: number;
  closed: number;
}
const IssueSummary = ({ open, inProgress, closed }: Props) => {
  const statuses: { label: string; value: number; status: Status }[] = [
    { label: "OpenIssues", value: open, status: "OPEN" },
    { label: "in-Progress Issues", value: inProgress, status: "IN_PROGRESS" },
    { label: "closed Issues", value: closed, status: "CLOSED" },
  ];
  return (
    <Flex gap={"4"}>
      {statuses.map((status) => (
        <Card key={status.label}>
          <Flex direction={"column"} gap={"1"}>
            <Link
              className="text-sm font-medium"
              href={`/issues?status=${status.status}`}
            >
              {status.label}
            </Link>
            <Text size={"5"} className="font-bold">
              {status.value}
            </Text>
          </Flex>
        </Card>
      ))}
    </Flex>
  );
};

export default IssueSummary;

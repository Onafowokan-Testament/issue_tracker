import StatusIssueBadge from "@/app/components/StatusIssueBadge";
import prisma from "@/prisma/client";
import { Flex, Heading, Text } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import React from "react";
import { number } from "zod";

interface Props {
  params: {
    id: string;
  };
}

const page = async ({ params }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: { Id: parseInt(params.id) },
  });

  if (!issue) notFound();

  return (
    <div>
      <Heading> {issue.title}</Heading>
      <Flex className="space-x-3 " my="2">
        <StatusIssueBadge status={issue.status}></StatusIssueBadge>
        <Text>{issue.createdAt.toDateString()}</Text>
      </Flex>

      <Card>
      <p> {issue.description}</p>
      <Card>

    </div>
  );
};

export default page;

import prisma from "@/prisma/clients";
import { Box, Button, Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";
import DeleteIssueButton from "./DeleteIssueButton";
import { getServerSession } from "next-auth";
import OptionAuth from "@/app/auth/optionAuth";
import AssignIssue from "./AssignIssue";
import { Metadata } from "next";
import { cache } from "react";

interface Props {
  params: {
    id: string;
  };
}

const fetchUser = cache((IssueId: string) =>
  prisma.issue.findUnique({
    where: { Id: IssueId },
  })
);

const page = async ({ params }: Props) => {
  const session = await getServerSession(OptionAuth);
  const issue = await fetchUser(params.id);

  if (!issue) notFound();

  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap={"5"}>
      <Box className="md:col-span-4">
        <IssueDetails issue={issue}></IssueDetails>
      </Box>

      {session && (
        <Box>
          <Flex direction="column" gap={"4"} className="max-w-full">
            <AssignIssue issue={issue}></AssignIssue>
            <EditIssueButton issueId={issue.Id} />
            <DeleteIssueButton issueId={issue.Id} />
          </Flex>
        </Box>
      )}
    </Grid>
  );
};

export default page;

export async function generateMetadata({ params }: Props) {
  const issue = await fetchUser(params.id);

  return {
    title: issue?.title,
    description: "Details of issue" + issue?.status,
  };
}

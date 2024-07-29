import StatusIssueBadge from "@/app/components/StatusIssueBadge";
import prisma from "@/prisma/client";
import { Box, Button, Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";
import DeleteIssueButton from "./DeleteIssueButton";

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
    <Grid columns={{ initial: "1", sm: "5" }} gap={"5"}>
      <Box className="md:col-span-4">
        <IssueDetails issue={issue}></IssueDetails>
      </Box>
      <Box>
        <Flex direction="column" gap={"4"} className="max-w-full">
          <EditIssueButton issueId={issue.Id} />
          <DeleteIssueButton issueId={issue.Id} />
        </Flex>
      </Box>
    </Grid>
  );
};

export default page;

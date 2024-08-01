import Image from "next/image";
import Pagination from "./components/Pagination";
import LatesetIssues from "./LatesetIssues";
import IssueSummary from "./IssueSummary";
import prisma from "@/prisma/client";
import IssueChart from "./IssueChart";
import { Flex, Grid } from "@radix-ui/themes";
import { Metadata } from "next";

interface Props {
  searchParams: {
    page: string;
  };
}

export default async function Home({ searchParams }: Props) {
  const open = await prisma.issue.count({
    where: { status: "OPEN" },
  });
  const closed = await prisma.issue.count({
    where: { status: "CLOSED" },
  });
  const in_progress = await prisma.issue.count({
    where: { status: "IN_PROGRESS" },
  });
  return (
    <Grid columns={{ initial: "1", md: "2" }} gap={"5"}>
      <Flex direction="column" gap={"5"}>
        <IssueSummary
          open={open}
          closed={closed}
          inProgress={in_progress}
        ></IssueSummary>

        <IssueChart
          open={open}
          closed={closed}
          inProgress={in_progress}
        ></IssueChart>
      </Flex>
      <LatesetIssues />
    </Grid>
  );
}

export const metadata:Metadata ={
  title: 'Issue Tracker --Dashboard',
  description:'View a summary of project issues'
}

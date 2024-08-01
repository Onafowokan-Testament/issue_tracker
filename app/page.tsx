import Image from "next/image";
import Pagination from "./components/Pagination";
import LatesetIssues from "./LatesetIssues";
import IssueSummary from "./IssueSummary";
import prisma from "@/prisma/client";
import IssueChart from "./IssueChart";

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
    <>
      <IssueChart
        open={open}
        closed={closed}
        inProgress={in_progress}
      ></IssueChart>
    </>
  );
}

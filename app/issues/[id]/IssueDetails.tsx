import StatusIssueBadge from "@/app/components/StatusIssueBadge";
import { Issue } from "@prisma/client";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import ReactMarkdown from "react-markdown";

const IssueDetails = ({ issue }: { issue: Issue }) => (
  <div>
    {" "}
    <Heading> {issue.title}</Heading>
    <Flex className="space-x-3 " my="2">
      <StatusIssueBadge status={issue.status}></StatusIssueBadge>
      <Text>{issue.createdAt.toDateString()}</Text>
    </Flex>
    <Card className="prose max-w-full" mt={"4"}>
      <ReactMarkdown>{issue.description}</ReactMarkdown>
    </Card>
  </div>
);

export default IssueDetails;
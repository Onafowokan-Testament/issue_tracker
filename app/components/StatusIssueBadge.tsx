import { Status } from "@prisma/client";
import { Badge } from "@radix-ui/themes";
import React from "react";

//status: label, colour

const statusMap: Record<
  Status,
  { label: string; colour: "red" | "green" | "violet" }
> = {
  OPEN: { label: "Open", colour: "red" },
  CLOSED: { label: "Closed", colour: "green" },
  IN_PROGRESS: { label: "In Progress", colour: "violet" },
};

interface Prop {
  status: Status;
}
const StatusIssueBadge = ({ status }: Prop) => {
  return (
    <Badge color={statusMap[status].colour}> {statusMap[status].label}</Badge>
  );
};

export default StatusIssueBadge;

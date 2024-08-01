import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import React from "react";

const statuses: { label: string; value?: Status | null }[] = [
  { label: "All", value: null },
  { label: "Open", value: "OPEN" },
  { label: "Closed", value: "CLOSED" },
  { label: "In_Progress", value: "IN_PROGRESS" },
];

const IssueFilter = () => {
  return (
    <div>
      <Select.Root>
        <Select.Trigger placeholder="Filter by status..."></Select.Trigger>

        <Select.Content>
          {statuses.map((status) => (
            <Select.Item key={status.value} value={status.value || "all"}>
              {status.label}
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Root>
    </div>
  );
};

export default IssueFilter;

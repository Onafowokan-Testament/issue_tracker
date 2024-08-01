"use client";

import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import React from "react";

const statuses: { label: string; value?: Status | null }[] = [
  { label: "All", value: null },
  { label: "Open", value: "OPEN" },
  { label: "Closed", value: "CLOSED" },
  { label: "In_Progress", value: "IN_PROGRESS" },
];

const IssueFilter = () => {
  const router = useRouter();
  return (
    <div>
      <Select.Root
        onValueChange={(status) => {
          const select = status ? status : " ";
          const query = select === "all" ? "" : `?status=${status}`;
          router.push("/issues" + query);
        }}
      >
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

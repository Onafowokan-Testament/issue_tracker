"use client";

import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

const statuses: { label: string; value?: Status | null }[] = [
  { label: "All", value: null },
  { label: "Open", value: "OPEN" },
  { label: "Closed", value: "CLOSED" },
  { label: "In_Progress", value: "IN_PROGRESS" },
];

const IssueFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  return (
    <div>
      <Select.Root
        defaultValue={searchParams.get("status") || " "}
        onValueChange={(status) => {
          const params = new URLSearchParams();
          if (status) params.append("status", status);
          if (searchParams.get("orderBy"))
            params.append("orderBy", searchParams.get("orderBy")!);

          const select = status ? status : " ";
          const query = select === "all" ? "" : `?status=${status}`;
          const url = params.size ? "?" + params.toString() : "";
          router.push("/issues" + url);
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

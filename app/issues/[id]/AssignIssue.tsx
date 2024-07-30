"use client";

import { Issue, User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Skeleton from "react-loading-skeleton";

interface Prop {
  issue: Issue;
}
const AssignIssue = ({ issue }: Prop) => {
  const {
    data: users,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["users"],
    queryFn: () => axios.get<User[]>("/api/users/").then((res) => res.data),
    staleTime: 60 * 1000,
    retry: 3,
  });

  if (isLoading) return <Skeleton></Skeleton>;
  if (error) return null;
  return (
    <Select.Root
      defaultValue={issue.assignedUserId || " "}
      onValueChange={(userId) => {
        axios.put(`/api/issues/${issue.Id}`, {
          assignedUserId: userId || null,
        });
      }}
    >
      <Select.Trigger placeholder="Assign..." />

      <Select.Content>
        <Select.Group>
          <Select.Label>users</Select.Label>
          {/* <Select.Item value="">Unassigned</Select.Item> */}
          {users?.map((user) => (
            <Select.Item value={user.id} key={user.id}>
              {user.name}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default AssignIssue;

import { Select } from "@radix-ui/themes";
import React from "react";

const AssignIssue = ({ id }: { id: number }) => {
  return (
    <Select.Root>
      <Select.Trigger placeholder="Assign..." />

      <Select.Content>
        <Select.Group>
          <Select.Label>users</Select.Label>
          <Select.Item value="user 1">User 1</Select.Item>
          <Select.Item value="user 2">User 2</Select.Item>
          <Select.Item value="user 3">User 3</Select.Item>
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default AssignIssue;

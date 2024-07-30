"use client";

import { User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import axios from "axios";
import React, { useEffect, useState } from "react";

const AssignIssue = async ({ id }: { id: number }) => {
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    const fetch_users = async () => {
      const data = (await axios.get<User[]>("/api/users")).data;
      setUsers(data);
    };
    fetch_users();
  }, []);
  return (
    <Select.Root>
      <Select.Trigger placeholder="Assign..." />

      <Select.Content>
        <Select.Group>
          <Select.Label>users</Select.Label>
          {users.map((user) => (
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

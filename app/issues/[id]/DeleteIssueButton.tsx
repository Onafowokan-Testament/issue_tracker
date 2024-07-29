"use client";

import { AlertDialog, Button, Flex, Spinner } from "@radix-ui/themes";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

import React, { useState } from "react";

interface Props {
  issueId: number;
}

const DeleteIssueButton = ({ issueId }: Props) => {
  const [isError, setIsError] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();
  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button color="red" disabled={isDeleting}>
            Delete
            {isDeleting && <Spinner />}
          </Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content maxWidth="450px">
          <AlertDialog.Title>confirm delete</AlertDialog.Title>
          <AlertDialog.Description size="2">
            Are you sure you want to delete this item? This action is
            irrevocable
          </AlertDialog.Description>

          <Flex gap="3" mt="4" justify="end">
            <AlertDialog.Cancel>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button
                variant="solid"
                color="red"
                onClick={async () => {
                  try {
                    setIsDeleting(true);
                    await axios.delete("/api/issues/" + issueId);
                    router.push("/issues");
                    router.refresh();
                  } catch (error) {
                    setIsDeleting(false);
                    setIsError(true);
                  }
                }}
              >
                Delete
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>

      <AlertDialog.Root open={isError}>
        <AlertDialog.Content maxWidth="450px">
          <AlertDialog.Title>Error</AlertDialog.Title>
          <AlertDialog.Description size="2">
            There was an issue deleting this issue
          </AlertDialog.Description>
          <AlertDialog.Cancel>
            <Button
              variant="soft"
              color="gray"
              mt={"5"}
              onClick={() => setIsError(false)}
            >
              OK
            </Button>
          </AlertDialog.Cancel>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  );
};

export default DeleteIssueButton;

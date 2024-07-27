import React, { ReactNode } from "react";
import { Text } from "@radix-ui/themes";

const ErrorMessage = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      {" "}
      <Text color="red" as="p">
        {children}
      </Text>
    </div>
  );
};

export default ErrorMessage;

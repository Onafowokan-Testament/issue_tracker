import React, { ReactNode } from "react";
import NextLink from "next/link";
import { Link as RadixLink } from "@radix-ui/themes";

interface Prop {
  href: string;
  children: ReactNode;
}
const Link = ({ href, children }: Prop) => {
  return (
    <div>
      <NextLink href={href} passHref legacyBehavior>
        <RadixLink>{children}</RadixLink>
      </NextLink>
    </div>
  );
};

export default Link;

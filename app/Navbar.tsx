"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBug, FaBugSlash } from "react-icons/fa6";
import classnames from "classnames";
import { useSession } from "next-auth/react";
import { Box, Flex, Container } from "@radix-ui/themes";

const Navbar = () => {
  const { status, data: session } = useSession();
  const NavLinks = [
    {
      label: "Dashboard",
      href: "/",
    },
    { label: "Issues", href: "/issues" },
  ];

  const currentPath = usePathname();
  return (
    <nav className="border-b   py-3  px-5 mb-5 ">
      <Container>
        <Flex justify={"between"}>
          <Flex align={"center"} gap={"3"}>
            <Link href={"/"}>
              <FaBug />
            </Link>

            <ul className="flex space-x-5">
              {NavLinks.map((navlink) => (
                <li>
                  <Link
                    href={navlink.href}
                    className={classnames({
                      "text-zinc-500": currentPath !== navlink.href,
                      "text-zinc-900": currentPath === navlink.href,
                      "hover:text-zinc-300": true,
                      "transition-colors": true,
                    })}
                  >
                    {" "}
                    {navlink.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Flex>
          <Box>
            {status === "authenticated" && (
              <Link href={"/api/auth/signout"}>Logout</Link>
            )}

            {status === "unauthenticated" && (
              <Link href={"/api/auth/signin"}>Login</Link>
            )}
          </Box>
        </Flex>
      </Container>
    </nav>
  );
};

export default Navbar;

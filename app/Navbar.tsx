"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBug, FaBugSlash } from "react-icons/fa6";
import classnames from "classnames";

const Navbar = () => {
  const NavLinks = [
    {
      label: "Dashboard",
      href: "/",
    },
    { label: "Issues", href: "/issues" },
  ];

  const currentPath = usePathname();
  return (
    <nav className="flex space-x-5 border-b h-14 items-center  px-5 mb-5">
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
    </nav>
  );
};

export default Navbar;

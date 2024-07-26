import Link from "next/link";
import React from "react";
import { FaBug, FaBugSlash } from "react-icons/fa6";

const Navbar = () => {
  return (
    <nav className="flex space-x-5 border-b h-14 items-center  px-5 ">
      <Link href={"/"}>
        <FaBug />
      </Link>

      <ul className="flex space-x-5">
        <li>
          <Link
            href={"/"}
            className=" text-zinc-500 hover:text-zinc-800 transition-colors"
          >
            {" "}
            Dashboard
          </Link>
        </li>
        <li>
          <Link
            href={"/"}
            className=" text-zinc-500 hover:text-zinc-800 transition-colors"
          >
            Issues
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

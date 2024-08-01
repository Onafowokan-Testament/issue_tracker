import { Button, Flex, Text } from "@radix-ui/themes";
import React from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { IoChevronBackOutline, IoChevronForwardSharp } from "react-icons/io5";
import {
  MdOutlineKeyboardDoubleArrowLeft,
  MdOutlineKeyboardDoubleArrowRight,
} from "react-icons/md";

interface Prop {
  pageSize: number;
  currentPage: number;
  itemCount: number;
}

const Pagination = ({ pageSize, currentPage, itemCount }: Prop) => {
  const total_page = Math.ceil(itemCount / pageSize);
  if (total_page <= 1) return null;
  return (
    <Flex align={"center"} className="space-x-3">
      <Text size={"2"}>
        Page {currentPage} of {total_page}{" "}
      </Text>

      <Button color="gray" variant="soft" disabled={currentPage === 1}>
        <MdOutlineKeyboardDoubleArrowLeft />
      </Button>
      <Button color="gray" variant="soft" disabled={currentPage === 1}>
        <IoChevronBackOutline />
      </Button>

      <Button color="gray" variant="soft" disabled={currentPage === total_page}>
        <IoChevronForwardSharp />
      </Button>

      <Button color="gray" variant="soft" disabled={currentPage === total_page}>
        <MdOutlineKeyboardDoubleArrowRight />
      </Button>
    </Flex>
  );
};

export default Pagination;

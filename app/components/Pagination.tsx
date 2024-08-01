"use client";
import { Button, Flex, Text } from "@radix-ui/themes";
import { useParams, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
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
  const router = useRouter();
  const search_params = useSearchParams();

  const total_page = Math.ceil(itemCount / pageSize);
  if (total_page <= 1) return null;

  const changePage = (page: number) => {
    const params = new URLSearchParams(search_params);

    params.set("page", page.toString());
    router.push("?" + params.toString());
  };

  return (
    <Flex align={"center"} className="space-x-3 my-5">
      <Text size={"2"}>
        Page {currentPage} of {total_page}{" "}
      </Text>

      <Button
        color="gray"
        variant="soft"
        disabled={currentPage === 1}
        onClick={() => changePage(1)}
      >
        <MdOutlineKeyboardDoubleArrowLeft />
      </Button>
      <Button
        color="gray"
        variant="soft"
        disabled={currentPage === 1}
        onClick={() => changePage(currentPage - 1)}
      >
        <IoChevronBackOutline />
      </Button>

      <Button
        color="gray"
        variant="soft"
        disabled={currentPage === total_page}
        onClick={() => changePage(currentPage + 1)}
      >
        <IoChevronForwardSharp />
      </Button>

      <Button
        color="gray"
        variant="soft"
        disabled={currentPage === total_page}
        onClick={() => changePage(total_page)}
      >
        <MdOutlineKeyboardDoubleArrowRight />
      </Button>
    </Flex>
  );
};

export default Pagination;

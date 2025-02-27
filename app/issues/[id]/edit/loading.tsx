import { TextField } from "@radix-ui/themes";
import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const loading = () => {
  return (
    <div className="max-w-xl">
      <Skeleton />
      <Skeleton height={50} />
    </div>
  );
};

export default loading;

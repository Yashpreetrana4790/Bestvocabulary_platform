"use client";

import React from "react";
import { Button } from "../ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { formUrlQuery } from "@/lib/helper";

const Pagination = ({ pageNumber, total }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleNavigation = (direction) => {
    const nextPageNumber = direction === "next" ? pageNumber + 1 : pageNumber - 1;

    if (nextPageNumber <= 0 || nextPageNumber > total) return;

    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: "page",
      value: nextPageNumber.toString(),
    });

    router.push(newUrl, { scroll: false });
  };


  return (
    <div className="flex w-full items-center justify-center gap-2 my-5">
      <Button
        disabled={pageNumber === 1}
        onClick={() => handleNavigation("prev")}
      >
        <p className="body-medium text-white dark:text-black">Prev</p>
      </Button>
      <div className="flex items-center justify-center rounded-md bg-primary-500 px-3.5 py-2">
        <p className="body-semibold bg-gray-200 py-1  px-3 rounded-sm text-black">{pageNumber}</p>
      </div>
      <Button
        disabled={pageNumber === total}
        onClick={() => handleNavigation("next")}
      >
        <p className="body-medium  text-white dark:text-black">Next</p>
      </Button>
    </div>
  );
};

export default Pagination;

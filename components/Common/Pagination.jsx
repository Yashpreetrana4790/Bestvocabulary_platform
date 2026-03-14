"use client";

import React, { Suspense } from "react";
import { Button } from "../ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { formUrlQuery } from "@/lib/helper";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({ pageNumber, totalpage }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const total = totalpage || 1;

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

  const goToPage = (page) => {
    if (page < 1 || page > total) return;
    
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: "page",
      value: page.toString(),
    });

    router.push(newUrl, { scroll: false });
  };

  // Generate page numbers to show
  const getPageNumbers = () => {
    const pages = [];
    const showPages = 5;
    let start = Math.max(1, pageNumber - Math.floor(showPages / 2));
    let end = Math.min(total, start + showPages - 1);
    
    if (end - start + 1 < showPages) {
      start = Math.max(1, end - showPages + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  if (total <= 1) return null;

  return (
    <Suspense>
      <div className="flex flex-col items-center gap-4 py-8 border-t bg-muted/20">
        <div className="flex items-center gap-2">
          {/* Previous Button */}
          <Button
            variant="outline"
            size="icon"
            disabled={pageNumber === 1}
            onClick={() => handleNavigation("prev")}
            className="h-10 w-10 rounded-lg"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          {/* First Page */}
          {getPageNumbers()[0] > 1 && (
            <>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => goToPage(1)}
                className="h-10 w-10 rounded-lg"
              >
                1
              </Button>
              {getPageNumbers()[0] > 2 && (
                <span className="px-2 text-muted-foreground">...</span>
              )}
            </>
          )}

          {/* Page Numbers */}
          {getPageNumbers().map((page) => (
            <Button
              key={page}
              variant={pageNumber === page ? "default" : "ghost"}
              size="icon"
              onClick={() => goToPage(page)}
              className={`h-10 w-10 rounded-lg ${
                pageNumber === page ? "pointer-events-none" : ""
              }`}
            >
              {page}
            </Button>
          ))}

          {/* Last Page */}
          {getPageNumbers()[getPageNumbers().length - 1] < total && (
            <>
              {getPageNumbers()[getPageNumbers().length - 1] < total - 1 && (
                <span className="px-2 text-muted-foreground">...</span>
              )}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => goToPage(total)}
                className="h-10 w-10 rounded-lg"
              >
                {total}
              </Button>
            </>
          )}

          {/* Next Button */}
          <Button
            variant="outline"
            size="icon"
            disabled={pageNumber === total}
            onClick={() => handleNavigation("next")}
            className="h-10 w-10 rounded-lg"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Page Info */}
        <p className="text-sm text-muted-foreground">
          Page {pageNumber} of {total}
        </p>
      </div>
    </Suspense>
  );
};

export default Pagination;

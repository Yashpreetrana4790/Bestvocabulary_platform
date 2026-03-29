"use client";

import React, { Suspense } from "react";
import { Button } from "../ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { formUrlQuery } from "@/lib/helper";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({ pageNumber, totalpage, totalItems, pageSize = 12 }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const total = totalpage || 1;

  const navigate = (nextPage) => {
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: "page",
      value: nextPage.toString(),
    });
    router.push(newUrl, { scroll: false });
    // Scroll to top of results for better UX
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleNavigation = (direction) => {
    const nextPageNumber = direction === "next" ? pageNumber + 1 : pageNumber - 1;
    if (nextPageNumber <= 0 || nextPageNumber > total) return;
    navigate(nextPageNumber);
  };

  const goToPage = (page) => {
    if (page < 1 || page > total) return;
    navigate(page);
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

  const startItem = totalItems != null ? (pageNumber - 1) * pageSize + 1 : null;
  const endItem = totalItems != null ? Math.min(pageNumber * pageSize, totalItems) : null;
  const rangeLabel = totalItems != null && startItem != null && endItem != null
    ? `${startItem}–${endItem} of ${totalItems.toLocaleString()}`
    : null;

  return (
    <Suspense>
      <nav
        className="flex flex-col items-center gap-3 py-6 border-t bg-muted/20"
        aria-label="Pagination"
      >
        <div className="flex items-center gap-1.5">
          <Button
            variant="outline"
            size="icon"
            disabled={pageNumber === 1}
            onClick={() => handleNavigation("prev")}
            className="h-9 w-9 rounded-lg shrink-0"
            aria-label="Previous page"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <div className="flex items-center gap-1 flex-wrap justify-center max-w-[min(100%,420px)] sm:max-w-none">
            {getPageNumbers()[0] > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => goToPage(1)}
                  className="h-9 w-9 rounded-lg"
                  aria-label="Go to page 1"
                >
                  1
                </Button>
                {getPageNumbers()[0] > 2 && (
                  <span className="px-1 text-muted-foreground text-sm" aria-hidden="true">…</span>
                )}
              </>
            )}

            {getPageNumbers().map((page) => (
              <Button
                key={page}
                variant={pageNumber === page ? "default" : "ghost"}
                size="icon"
                onClick={() => goToPage(page)}
                className={`h-9 w-9 rounded-lg ${pageNumber === page ? "pointer-events-none" : ""}`}
                aria-label={pageNumber === page ? `Current page, page ${page}` : `Go to page ${page}`}
                aria-current={pageNumber === page ? "page" : undefined}
              >
                {page}
              </Button>
            ))}

            {getPageNumbers()[getPageNumbers().length - 1] < total && (
              <>
                {getPageNumbers()[getPageNumbers().length - 1] < total - 1 && (
                  <span className="px-1 text-muted-foreground text-sm" aria-hidden="true">…</span>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => goToPage(total)}
                  className="h-9 w-9 rounded-lg"
                  aria-label={`Go to page ${total}`}
                >
                  {total}
                </Button>
              </>
            )}
          </div>

          <Button
            variant="outline"
            size="icon"
            disabled={pageNumber === total}
            onClick={() => handleNavigation("next")}
            className="h-9 w-9 rounded-lg shrink-0"
            aria-label="Next page"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <p className="text-sm text-muted-foreground" aria-live="polite">
          {rangeLabel ?? `Page ${pageNumber} of ${total}`}
        </p>
      </nav>
    </Suspense>
  );
};

export default Pagination;

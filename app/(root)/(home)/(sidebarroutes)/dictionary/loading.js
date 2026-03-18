import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import LoadingWordFact from "@/components/LoadingWordFact";

const Loading = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-gradient-to-b from-muted/20 to-background">
        <div className="max-w-6xl mx-auto px-4 py-6 md:py-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-muted animate-pulse shrink-0" />
            <div>
              <div className="h-6 w-32 bg-muted rounded animate-pulse mb-2" />
              <div className="h-4 w-48 bg-muted/50 rounded animate-pulse" />
            </div>
          </div>
          {/* Search Bar Skeleton */}
          <div className="h-14 bg-muted/30 rounded-2xl animate-pulse" />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Breadcrumb Skeleton */}
        <div className="h-5 w-48 bg-muted/30 rounded animate-pulse mb-5" />

        {/* Word Cards Skeleton Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 12 }).map((_, index) => (
            <div key={index} className="h-40 rounded-xl bg-muted/30 animate-pulse" />
          ))}
        </div>

        {/* Pagination Skeleton */}
        <div className="flex justify-center mt-10">
          <div className="h-10 w-24 bg-muted/30 rounded-md mx-2 animate-pulse" />
          <div className="h-10 w-24 bg-muted/30 rounded-md mx-2 animate-pulse" />
        </div>

        <div className="mt-8 max-w-xl">
          <LoadingWordFact variant="card" />
        </div>
      </div>
    </div>
  );
};

export default Loading;

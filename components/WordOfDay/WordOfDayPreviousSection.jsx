"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import "react-day-picker/style.css";
import { format, startOfDay, isAfter, startOfMonth } from "date-fns";
import { CalendarDays, ChevronRight, History } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { capitalizeString } from "@/lib/otherutil";
import { cn } from "@/lib/utils";

const RECENT_COUNT = 5;

function dayKey(d) {
  return format(startOfDay(new Date(d)), "yyyy-MM-dd");
}

function startOfToday() {
  return startOfDay(new Date());
}

export default function WordOfDayPreviousSection({ history = [] }) {
  const router = useRouter();

  const { recentItems, wodDates, wordByDayKey, oldestWodMonth } = useMemo(() => {
    const map = new Map();
    const dates = [];

    for (const item of history) {
      const wordData = item?.word;
      if (!wordData?.word || !item?.date) continue;
      const key = dayKey(item.date);
      if (!map.has(key)) {
        map.set(key, wordData.word);
        dates.push(startOfDay(new Date(item.date)));
      }
    }

    const recentItems = history
      .slice(1, 1 + RECENT_COUNT)
      .filter((item) => item?.word?.word);

    const oldest =
      dates.length > 0
        ? new Date(Math.min(...dates.map((d) => d.getTime())))
        : null;

    return {
      recentItems,
      wodDates: dates,
      wordByDayKey: map,
      oldestWodMonth: oldest ? startOfMonth(oldest) : undefined,
    };
  }, [history]);

  if (!history?.length) return null;

  const hasOlderInFetched = history.length > 1 + RECENT_COUNT;
  const showCalendar = wordByDayKey.size > 0;

  return (
    <div className="mb-8">
      <div className="flex flex-col gap-2 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center shrink-0">
            <History className="h-5 w-5 text-violet-600 dark:text-violet-400" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">Previous Words</h2>
            <p className="text-sm text-muted-foreground">
              Last {RECENT_COUNT} days below.
              {hasOlderInFetched
                ? " Use the calendar for earlier dates."
                : showCalendar
                  ? " Use the calendar to open any past word we have on file."
                  : ""}
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-3 mb-8">
        {recentItems.length === 0 && (
          <p className="text-sm text-muted-foreground rounded-2xl border border-dashed bg-muted/20 px-4 py-6 text-center">
            No earlier words in your history feed yet. When the API returns past dates, they&apos;ll show here. You can
            still use the calendar below for any loaded dates.
          </p>
        )}
        {recentItems.map((item, idx) => {
          const wordData = item.word;
          if (!wordData) return null;

          const date = new Date(item.date);
          const formattedHistoryDate = new Intl.DateTimeFormat("en-US", {
            weekday: "short",
            day: "numeric",
            month: "short",
          }).format(date);

          return (
            <Link
              key={item._id || `${item.date}-${idx}`}
              href={`/word/${encodeURIComponent(wordData.word.toLowerCase())}`}
              className="flex items-center justify-between p-3 sm:p-4 rounded-2xl border bg-card hover:bg-muted/50 hover:border-primary/20 transition-all group gap-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 min-w-0">
                <span className="text-xs sm:text-sm text-muted-foreground sm:min-w-[80px]">
                  {formattedHistoryDate}
                </span>
                <div className="flex items-center gap-2 min-w-0">
                  <span className="font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                    {capitalizeString(wordData.word)}
                  </span>
                  {wordData.pronunciation && (
                    <span className="text-xs sm:text-sm text-muted-foreground font-mono truncate hidden min-[400px]:inline">
                      {wordData.pronunciation}
                    </span>
                  )}
                </div>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0" />
            </Link>
          );
        })}
      </div>

      {showCalendar ? (
        <div
          className="rounded-2xl border border-primary/15 bg-card/80 p-4 sm:p-6 shadow-sm scroll-mt-6"
          id="wod-past-calendar"
        >
          <div className="flex items-start gap-3 mb-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <CalendarDays className="h-5 w-5" aria-hidden />
            </div>
            <div>
              <h3 className="text-base font-semibold text-foreground">Past words — calendar</h3>
              <p className="text-sm text-muted-foreground mt-0.5 leading-relaxed">
                Dates with a word of the day show a dot under the number. Tap or click a highlighted day to open that
                word.
              </p>
            </div>
          </div>
          <div className="flex justify-center sm:justify-start overflow-x-auto">
            <Calendar
              mode="single"
              defaultMonth={new Date()}
              startMonth={oldestWodMonth}
              endMonth={new Date()}
              modifiers={{ hasWod: wodDates }}
              modifiersClassNames={{
                hasWod: cn(
                  "relative font-medium",
                  "after:absolute after:bottom-0.5 after:left-1/2 after:h-1 after:w-1 after:-translate-x-1/2 after:rounded-full after:bg-primary",
                ),
              }}
              disabled={(date) => {
                const d = startOfDay(date);
                if (isAfter(d, startOfToday())) return true;
                return !wordByDayKey.has(dayKey(date));
              }}
              onSelect={(date) => {
                if (!date) return;
                const key = dayKey(date);
                const word = wordByDayKey.get(key);
                if (word) {
                  router.push(`/word/${encodeURIComponent(word.toLowerCase())}`);
                }
              }}
              className="rounded-md"
            />
          </div>
        </div>
      ) : (
        <p className="text-sm text-muted-foreground text-center py-4">
          Calendar becomes available when at least one word is linked to a date.
        </p>
      )}
    </div>
  );
}

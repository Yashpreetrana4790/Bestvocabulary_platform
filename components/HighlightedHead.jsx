
import { Separator } from "@radix-ui/react-dropdown-menu"
import { CalendarDays } from "lucide-react"

export function HighlightedHead() {
  return (
    <div
      className="inline-flex items-center rounded-lg bg-muted px-3 py-2 text-sm font-medium"
    >
      <CalendarDays size={24} /> <Separator className="mx-2 h-4" orientation="vertical" />{" "}
      <span className="sm:hidden"> Word of the Day</span>
      <span className="hidden sm:inline text-black">
        Word of the Day
      </span>
      <Separator className="mx-2 h-4" orientation="vertical" />
      <span className="text-primary italic">    23 feb 2024</span>
    </div>
  )
}

"use client";

import type { ComponentProps } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";
import { fr } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export type CalendarProps = ComponentProps<typeof DayPicker>;

function Calendar({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) {
  return (
    <DayPicker
      locale={fr}
      showOutsideDays={showOutsideDays}
      className={cn("p-2", className)}
      classNames={{
        months: "flex flex-col sm:flex-row gap-4",
        month: "space-y-3",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "font-serif text-base capitalize",
        nav: "space-x-1 flex items-center",
        nav_button: cn(buttonVariants({ variant: "ghost", size: "icon" }), "h-9 w-9"),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse",
        head_row: "flex",
        head_cell: "w-10 text-[10px] uppercase tracking-widest text-ivory/40 font-normal",
        row: "flex w-full mt-1",
        cell: "h-10 w-10 text-center text-sm p-0 relative",
        day: "h-10 w-10 cursor-pointer rounded-none hover:bg-ivory/8 aria-selected:opacity-100",
        day_selected: "bg-gold text-ink hover:bg-gold hover:text-ink",
        day_today: "text-gold",
        day_outside: "text-ivory/25",
        day_disabled: "text-ivory/20 line-through cursor-not-allowed",
        day_range_middle: "aria-selected:bg-gold/20 aria-selected:text-ivory",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: () => <ChevronLeft className="h-4 w-4" />,
        IconRight: () => <ChevronRight className="h-4 w-4" />,
      }}
      {...props}
    />
  );
}

Calendar.displayName = "Calendar";

export { Calendar };

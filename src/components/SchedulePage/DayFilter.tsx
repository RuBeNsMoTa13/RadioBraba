import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getDayName } from "@/lib/utils";

interface DayFilterProps {
  activeDay: number;
  onChange: (day: number) => void;
}

export function DayFilter({ activeDay, onChange }: DayFilterProps) {
  // Create array of days for the filter
  const days = Array.from({ length: 7 }, (_, i) => ({
    value: i,
    label: getDayName(i)
  }));
  
  return (
    <div className="flex flex-wrap gap-2">
      {days.map((day) => (
        <Button
          key={day.value}
          onClick={() => onChange(day.value)}
          variant={activeDay === day.value ? "default" : "outline"}
          className={cn(
            "rounded-full",
            activeDay === day.value && "bg-primary text-white"
          )}
        >
          {day.label}
        </Button>
      ))}
    </div>
  );
}
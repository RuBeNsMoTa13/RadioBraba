import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getDayName } from "@/lib/utils";

interface DayFilterProps {
  activeDay: number;
  onChange: (day: number) => void;
}

export function DayFilter({ activeDay, onChange }: DayFilterProps) {
  const days = Array.from({ length: 7 }, (_, i) => ({
    value: i,
    label: getDayName(i) // Ou getDayName(i, true) para abreviações
  }));

  return (
    // Adicionando overflow-x-auto e whitespace-nowrap para scroll horizontal
    <div className="flex overflow-x-auto whitespace-nowrap gap-2 p-2 scrollbar-hide"> {/* scrollbar-hide é uma classe comum do Tailwind para esconder a barra de rolagem */}
      {days.map((day) => (
        <Button
          key={day.value}
          onClick={() => onChange(day.value)}
          variant={activeDay === day.value ? "default" : "outline"}
          className={cn(
            "rounded-full shrink-0", // shrink-0 evita que os botões encolham
            activeDay === day.value && "bg-primary text-white"
          )}
        >
          {day.label}
        </Button>
      ))}
    </div>
  );
}
import { StatCounter } from "./StatCounter";
import { cn } from "@/lib/utils";

export function StatsBand({
  stats,
  className,
}: {
  stats: { value: string; label: string }[];
  className?: string;
}) {
  return (
    <div className={cn("grid grid-cols-2 gap-6 sm:grid-cols-4", className)}>
      {stats.map((s) => (
        <StatCounter key={s.label} value={s.value} label={s.label} />
      ))}
    </div>
  );
}

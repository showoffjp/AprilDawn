import { cn } from "@/lib/utils";

export function Badge({
  children,
  className,
  tone = "dawn",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "dawn" | "ink" | "amber";
}) {
  const tones = {
    dawn: "bg-dawn-100 text-dawn-700",
    ink: "bg-ink/5 text-ink",
    amber: "bg-amber-100 text-amber-700",
  } as const;
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

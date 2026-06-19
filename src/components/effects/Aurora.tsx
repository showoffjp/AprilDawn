import { cn } from "@/lib/utils";

/** Drifting gradient "aurora" — a premium animated background layer. */
export function Aurora({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className,
      )}
    >
      <div className="animate-blob1 absolute left-[-10%] top-[-20%] h-[55vh] w-[55vh] rounded-full bg-dawn-300/45 blur-3xl" />
      <div className="animate-blob2 absolute right-[-12%] top-[-10%] h-[50vh] w-[50vh] rounded-full bg-amber-300/45 blur-3xl" />
      <div className="animate-blob3 absolute bottom-[-25%] left-[25%] h-[55vh] w-[55vh] rounded-full bg-dusk-400/40 blur-3xl" />
    </div>
  );
}

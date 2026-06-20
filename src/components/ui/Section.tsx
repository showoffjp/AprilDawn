import { cn } from "@/lib/utils";
import { Container } from "./Container";
import { type BackdropVariant } from "@/components/effects/AnimatedBackdrop";

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-dawn-600">
      <span className="h-px w-6 bg-dawn-400/70" aria-hidden="true" />
      {children}
    </span>
  );
}

export function Section({
  id,
  className,
  children,
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
  /**
   * Legacy per-section tint. Intentionally ignored: the whole site now sits on
   * one continuous, always-moving gradient field (see `SiteBackground`) so
   * sections are transparent windows onto it rather than separate color blocks.
   */
  backdrop?: BackdropVariant;
}) {
  return (
    <section id={id} className={cn("py-16 sm:py-24", className)}>
      <Container>{children}</Container>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  center,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  center?: boolean;
}) {
  return (
    <div className={cn("max-w-2xl", center && "mx-auto text-center")}>
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
        {title}
      </h2>
      {intro ? (
        <p className="mt-4 text-lg leading-relaxed text-ink-soft">{intro}</p>
      ) : null}
    </div>
  );
}

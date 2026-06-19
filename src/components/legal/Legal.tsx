import { Container } from "@/components/ui/Container";

export function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <Container className="py-16 sm:py-20">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-display text-4xl font-semibold tracking-tight">
          {title}
        </h1>
        <p className="mt-2 text-sm text-ink-soft">Last updated {updated}</p>
        <div className="mt-8 space-y-6 text-ink-soft leading-relaxed [&_h2]:mt-10 [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-ink [&_li]:ml-5 [&_li]:list-disc [&_strong]:text-ink">
          {children}
        </div>
        <p className="mt-12 rounded-2xl bg-cream-deep p-4 text-xs text-ink-soft ring-1 ring-ink/10">
          This is template language provided for a starter project and is{" "}
          <strong>not legal advice</strong>. Have a qualified attorney review and
          adapt these policies before launch.
        </p>
      </div>
    </Container>
  );
}

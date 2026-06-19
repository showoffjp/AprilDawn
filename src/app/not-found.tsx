import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Aurora } from "@/components/effects/Aurora";

export default function NotFound() {
  return (
    <section className="bg-sunrise bg-grain relative overflow-hidden">
      <Aurora />
      <Container className="relative flex min-h-[70vh] flex-col items-center justify-center py-24 text-center">
        <div className="text-6xl">🌅</div>
        <h1 className="mt-6 font-display text-4xl font-semibold tracking-tight">
          This memory wandered off.
        </h1>
        <p className="mt-3 max-w-md text-ink-soft">
          The page you&apos;re looking for isn&apos;t here — but your memories are
          safe. Let&apos;s get you back to making something beautiful.
        </p>
        <div className="mt-8 flex gap-3">
          <Button href="/">Back home</Button>
          <Button href="/services" variant="ghost">
            Browse services
          </Button>
        </div>
      </Container>
    </section>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { services, getService } from "@/lib/services";
import { fromPrice } from "@/lib/utils";

export function generateStaticParams() {
  // Only generate detail pages for services without a bespoke top-level page.
  return services.filter((s) => !s.href).map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return { title: "Service not found" };
  return {
    title: service.name,
    description: service.summary,
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  return (
    <>
      <section className={`bg-gradient-to-br ${service.gradient}`}>
        <Container className="py-16 sm:py-20">
          <Link
            href="/services"
            className="text-sm font-medium text-ink/70 hover:text-ink"
          >
            ← All services
          </Link>
          <div className="mt-6 flex items-start gap-4">
            <span className="text-6xl" aria-hidden="true">
              {service.emoji}
            </span>
            <div>
              <h1 className="font-display text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
                {service.name}
              </h1>
              <p className="mt-2 text-lg font-medium text-ink/80">
                {service.tagline}
              </p>
            </div>
          </div>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink/80">
            {service.summary}
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Button href="/upload">Start this project</Button>
            <Button href="/pricing" variant="ghost">
              See pricing
            </Button>
            {service.turnaround ? (
              <Badge tone="ink">⏱ {service.turnaround}</Badge>
            ) : null}
            {typeof service.startingPrice === "number" &&
            service.startingPrice > 0 ? (
              <Badge>💎 {fromPrice(service.startingPrice)}</Badge>
            ) : null}
          </div>
        </Container>
      </section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="font-display text-2xl font-semibold">
              What you get
            </h2>
            <div className="mt-6 space-y-6">
              {service.details.map((d) => (
                <div key={d.title}>
                  <h3 className="font-medium text-ink">{d.title}</h3>
                  <p className="mt-1 text-ink-soft leading-relaxed">{d.body}</p>
                </div>
              ))}
            </div>

            {service.faqs && service.faqs.length > 0 ? (
              <div className="mt-12">
                <h2 className="font-display text-2xl font-semibold">
                  Good to know
                </h2>
                <dl className="mt-6 space-y-5">
                  {service.faqs.map((f) => (
                    <div key={f.q}>
                      <dt className="font-medium text-ink">{f.q}</dt>
                      <dd className="mt-1 text-ink-soft">{f.a}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ) : null}
          </div>

          <aside className="space-y-6">
            <div className="rounded-3xl bg-cream-deep p-6 ring-1 ring-ink/10">
              <h3 className="font-semibold text-ink">Highlights</h3>
              <ul className="mt-4 space-y-2.5 text-sm text-ink-soft">
                {service.heroPoints.map((p) => (
                  <li key={p} className="flex items-start gap-2">
                    <span className="mt-0.5 text-dawn-500">✓</span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>

            {service.examples && service.examples.length > 0 ? (
              <div className="rounded-3xl bg-white p-6 ring-1 ring-ink/10">
                <h3 className="font-semibold text-ink">People have made…</h3>
                <ul className="mt-4 space-y-2.5 text-sm text-ink-soft">
                  {service.examples.map((e) => (
                    <li key={e} className="flex items-start gap-2">
                      <span className="mt-0.5">✨</span>
                      {e}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            <div className="rounded-3xl bg-ink p-6 text-cream">
              <h3 className="font-display text-lg font-semibold">
                Ready when you are
              </h3>
              <p className="mt-2 text-sm text-cream/80">
                Free proofs. 100% happiness guarantee. Your originals always
                come home.
              </p>
              <Button href="/upload" className="mt-4 w-full" variant="primary">
                Start now
              </Button>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}

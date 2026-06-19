import Link from "next/link";
import { footerNav, site } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { Logo } from "./Logo";
import { NewsletterForm } from "./NewsletterForm";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-ink/10 bg-cream-deep">
      <Container className="py-14">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_2fr]">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-4 text-sm leading-relaxed text-ink-soft">
              {site.longTagline}
            </p>
            <div className="mt-5 flex flex-wrap gap-3 text-sm">
              <a className="text-ink-soft hover:text-ink" href={site.social.instagram}>Instagram</a>
              <a className="text-ink-soft hover:text-ink" href={site.social.facebook}>Facebook</a>
              <a className="text-ink-soft hover:text-ink" href={site.social.tiktok}>TikTok</a>
              <a className="text-ink-soft hover:text-ink" href={site.social.youtube}>YouTube</a>
              <a className="text-ink-soft hover:text-ink" href={site.social.pinterest}>Pinterest</a>
            </div>
            <div className="mt-6">
              <p className="text-sm font-semibold text-ink">
                A little sunrise in your inbox
              </p>
              <div className="mt-3">
                <NewsletterForm />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {footerNav.map((group) => (
              <div key={group.title}>
                <h3 className="text-sm font-semibold text-ink">{group.title}</h3>
                <ul className="mt-4 space-y-2.5">
                  {group.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="text-sm text-ink-soft transition-colors hover:text-ink"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 border-t border-ink/10 pt-6">
          <p className="text-xs leading-relaxed text-ink-soft">
            <strong className="font-semibold text-ink">Affiliate disclosure:</strong>{" "}
            As an Amazon Associate, AprilDawn earns from qualifying purchases.
            Some links on this site are affiliate links, which means we may earn
            a commission at no extra cost to you.
          </p>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-ink-soft">
              © {new Date().getFullYear()} {site.name}. Made with love for the
              memories that matter.
            </p>
            <div className="flex flex-wrap gap-4 text-xs text-ink-soft">
              <Link href="/legal/privacy" className="hover:text-ink">Privacy</Link>
              <Link href="/legal/terms" className="hover:text-ink">Terms</Link>
              <Link href="/legal/content" className="hover:text-ink">Content &amp; rights</Link>
              <Link href="/contact" className="hover:text-ink">Contact</Link>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}

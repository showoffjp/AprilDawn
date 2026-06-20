import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ContactForm } from "@/components/contact/ContactForm";
import { Aurora } from "@/components/effects/Aurora";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Talk to a real person at AprilDawn about digitizing, restoration, printing, the Living Wall, Memory Mail, or occasion gifting. Fully remote, free consultations.",
};

export default function ContactPage() {
  return (
    <section className="bg-sunrise bg-grain relative overflow-hidden">
      <Aurora />
      <div className="relative">
        <Section>
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <SectionHeading
                eyebrow="Contact"
                title="Talk to a real person"
                intro="Tell us what you've got — a single photo or a lifetime of boxes — and we'll map out the perfect plan with free proofs. Want us to design or restore it for you? Just ask and we'll pair you with a specialist."
              />
              <dl className="mt-8 space-y-5 text-sm">
                <div>
                  <dt className="font-semibold text-ink">📧 Email</dt>
                  <dd className="text-ink-soft">{site.email}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-ink">📞 Phone</dt>
                  <dd className="text-ink-soft">{site.phone}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-ink">📦 Mail-in</dt>
                  <dd className="text-ink-soft">{site.mailingAddress}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-ink">💬 Care team</dt>
                  <dd className="text-ink-soft">{site.supportEmail}</dd>
                </div>
              </dl>
            </div>
            <ContactForm />
          </div>
        </Section>
      </div>
    </section>
  );
}

import Link from "next/link";
import { type Story } from "@/lib/stories";

export function StoryCard({ story }: { story: Story }) {
  return (
    <Link
      href={`/stories/${story.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-soft ring-1 ring-ink/10 transition hover:-translate-y-1 hover:shadow-soft-lg"
    >
      <div
        className={`relative flex h-40 items-center justify-center bg-gradient-to-br text-5xl ${story.gradient}`}
      >
        <span aria-hidden="true">{story.emoji}</span>
        <span className="absolute left-3 top-3 rounded-full bg-white/80 px-2.5 py-1 text-xs font-semibold text-ink backdrop-blur-sm">
          {story.category}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-lg font-semibold leading-snug">
          {story.title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">
          {story.excerpt}
        </p>
        <div className="mt-4 flex items-center justify-between text-xs text-ink-soft">
          <span>{story.readMins} min read</span>
          <span className="font-semibold text-dawn-600 transition group-hover:translate-x-0.5">
            Read →
          </span>
        </div>
      </div>
    </Link>
  );
}

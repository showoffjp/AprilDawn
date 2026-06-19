import Link from "next/link";
import { type Story } from "@/lib/stories";
import { MemoryScene, sceneVariants } from "@/components/art/MemoryScene";

export function StoryCard({ story }: { story: Story }) {
  const variant =
    sceneVariants[
      story.slug.split("").reduce((a, c) => a + c.charCodeAt(0), 0) %
        sceneVariants.length
    ];

  return (
    <Link
      href={`/stories/${story.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-soft ring-1 ring-ink/10 transition hover:-translate-y-1 hover:shadow-soft-lg"
    >
      <div className="relative h-40 overflow-hidden">
        <MemoryScene
          variant={variant}
          uid={story.slug}
          className="transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-full bg-white/85 px-2.5 py-1 text-xs font-semibold text-ink backdrop-blur-sm">
          {story.emoji} {story.category}
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

import Link from "next/link";
import { MemoryScene } from "@/components/art/MemoryScene";
import { type Collection, collectionProducts } from "@/lib/collections";

export function CollectionCard({ collection }: { collection: Collection }) {
  const count = collectionProducts(collection).length;
  return (
    <Link
      href={`/collections/${collection.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-soft ring-1 ring-ink/10 transition hover:-translate-y-1 hover:shadow-soft-lg"
    >
      <div className="relative h-40 overflow-hidden">
        <MemoryScene
          variant={collection.scene}
          uid={`col-${collection.slug}`}
          className="transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/45 via-ink/5 to-transparent" />
        <span
          aria-hidden="true"
          className="absolute left-4 top-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/90 text-2xl shadow-sm ring-1 ring-ink/10 backdrop-blur"
        >
          {collection.emoji}
        </span>
        <span className="absolute bottom-3 right-4 rounded-full bg-black/55 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-sm">
          {count} gifts
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-xl font-semibold tracking-tight">
          {collection.title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">
          {collection.tagline}
        </p>
        <span className="mt-4 text-sm font-semibold text-dawn-600 transition group-hover:translate-x-0.5">
          Explore the collection →
        </span>
      </div>
    </Link>
  );
}

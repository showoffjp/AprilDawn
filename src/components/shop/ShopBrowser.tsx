"use client";

import { useMemo, useState } from "react";
import { ProductCard } from "@/components/cards/ProductCard";
import { cn } from "@/lib/utils";
import type { Product, ProductCategory } from "@/lib/products";

type Filter = "All" | "Bestsellers" | ProductCategory;

/** Searchable, category-filterable product browser for the shop. */
export function ShopBrowser({
  products,
  categories,
}: {
  products: Product[];
  categories: ProductCategory[];
}) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("All");

  const chips: Filter[] = ["All", "Bestsellers", ...categories];

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((p) => {
      if (filter === "Bestsellers" && !p.bestseller) return false;
      if (filter !== "All" && filter !== "Bestsellers" && p.category !== filter) {
        return false;
      }
      if (!q) return true;
      return (
        p.name.toLowerCase().includes(q) ||
        p.blurb.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      );
    });
  }, [products, query, filter]);

  return (
    <div>
      <div className="rounded-3xl bg-white p-4 ring-1 ring-ink/10 sm:p-5">
        <label htmlFor="shop-search" className="sr-only">
          Search the shop
        </label>
        <input
          id="shop-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products — mug, canvas, socks, cake…"
          className="h-11 w-full rounded-xl border border-ink/15 bg-cream px-4 text-sm focus:border-dawn-400 focus:outline-none"
        />
        <div className="mt-3 flex flex-wrap gap-2">
          {chips.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setFilter(c)}
              aria-pressed={filter === c}
              className={cn(
                "rounded-full px-3.5 py-1.5 text-sm font-medium ring-1 transition",
                filter === c
                  ? "bg-dawn-500 text-white ring-dawn-500"
                  : "bg-cream text-ink-soft ring-ink/10 hover:text-ink",
              )}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <p className="mt-5 text-sm text-ink-soft">
        {filtered.length} {filtered.length === 1 ? "item" : "items"}
        {filter !== "All" ? ` in ${filter}` : ""}
        {query.trim() ? ` matching “${query.trim()}”` : ""}
      </p>

      {filtered.length > 0 ? (
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {filtered.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      ) : (
        <div className="mt-4 rounded-3xl bg-white p-10 text-center ring-1 ring-ink/10">
          <div className="text-4xl">🔍</div>
          <p className="mt-3 font-medium text-ink">No products match</p>
          <p className="mt-1 text-sm text-ink-soft">
            Try a different word or category.
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setFilter("All");
            }}
            className="mt-4 rounded-full bg-dawn-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-dawn-600"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}

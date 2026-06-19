import Link from "next/link";

/** Slim promo bar above the header. */
export function TopBar() {
  return (
    <div className="bg-dusk text-white">
      <div className="mx-auto flex max-w-6xl items-center justify-center gap-2 px-4 py-2 text-center text-xs sm:text-sm">
        <span aria-hidden="true">✨</span>
        <span>
          Free proofs on every order — upload in seconds or{" "}
          <Link href="/upload" className="font-semibold underline underline-offset-2">
            mail in your shoebox
          </Link>
          .
        </span>
      </div>
    </div>
  );
}

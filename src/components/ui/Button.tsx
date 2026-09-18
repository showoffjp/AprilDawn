import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "light" | "gloss";
type Size = "sm" | "md" | "lg";

const base =
  "relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium transition duration-200 will-change-transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-dawn-400 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none disabled:hover:scale-100";

const variants: Record<Variant, string> = {
  primary:
    "bg-dawn-500 text-white hover:bg-dawn-600 shadow-sm shadow-dawn-500/30",
  secondary:
    "bg-ink text-cream hover:bg-ink/90",
  ghost:
    "bg-transparent text-ink hover:bg-ink/5 ring-1 ring-inset ring-ink/15",
  light:
    "bg-white/15 text-white hover:bg-white/25 ring-1 ring-inset ring-white/30 backdrop-blur",
  // Gradient + gloss + sheen (see .btn-gloss in globals.css).
  gloss:
    "btn-gloss overflow-hidden text-white ring-1 ring-inset ring-white/25 shadow-lg shadow-dawn-500/35 hover:shadow-xl hover:shadow-dawn-500/45",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-sm",
  lg: "h-13 px-8 text-base",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
};

export function Button({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: CommonProps & {
  href?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const classes = cn(base, variants[variant], sizes[size], className);
  // The gloss variant paints pseudo-element layers over the surface; lift the
  // label above them so it stays fully legible as the sheen passes.
  const content =
    variant === "gloss" ? (
      <span className="relative z-10 inline-flex items-center gap-2">
        {children}
      </span>
    ) : (
      children
    );

  if (href) {
    const external = href.startsWith("http");
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
        >
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button className={classes} {...rest}>
      {content}
    </button>
  );
}

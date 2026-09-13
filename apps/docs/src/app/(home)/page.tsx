import {
  ArrowRight,
  BookOpen,
  Box,
  Check,
  Code2,
  Layers3,
  PackageCheck,
  Sparkles,
  Terminal,
} from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  const stats = [
    { label: "Registry items", value: "18" },
    { label: "Doc sections", value: "8" },
    { label: "Install command", value: "1" },
  ];

  const features = [
    {
      icon: PackageCheck,
      title: "Registry-first",
      description:
        "Package UI, hooks, blocks, pages, files, and fonts from one clean catalog.",
    },
    {
      icon: BookOpen,
      title: "Docs that sell the work",
      description:
        "Every package gets usage notes, install commands, previews, and source.",
    },
    {
      icon: Layers3,
      title: "Built to extend",
      description:
        "Add new registry types without rebuilding the whole docs experience.",
    },
  ];

  return (
    <main className="min-h-[calc(100svh-var(--header-height))] overflow-hidden bg-background text-foreground">
      <section className="relative min-h-[calc(100svh-var(--header-height))] overflow-hidden border-b">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,color-mix(in_oklab,var(--foreground)_8%,transparent)_1px,transparent_1px),linear-gradient(to_bottom,color-mix(in_oklab,var(--foreground)_8%,transparent)_1px,transparent_1px)] bg-[size:42px_42px]" />
        <div className="absolute inset-x-0 top-0 h-48 bg-linear-to-b from-background to-transparent" />
        <div className="relative mx-auto grid min-h-[calc(100svh-var(--header-height))] w-full max-w-7xl items-center gap-10 px-6 py-12 lg:grid-cols-[0.9fr_1.1fr] lg:py-16">
          <div className="max-w-2xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border bg-background/80 px-3 py-1 text-sm font-medium text-muted-foreground shadow-sm backdrop-blur">
              <Sparkles className="size-3.5 text-emerald-500" />
              Fresh registry docs, ready to ship
            </div>
            <h1 className="text-5xl font-semibold leading-[1.02] tracking-normal text-balance sm:text-6xl lg:text-7xl">
              Registry Docs Kit
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
              A sharp launchpad for publishing installable shadcn packages with
              beautiful docs, searchable examples, source previews, and a
              registry feed that stays in sync.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/docs"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-foreground px-5 text-sm font-medium text-background shadow-sm transition-colors hover:bg-foreground/90"
              >
                Open docs <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/docs/ui"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-md border bg-background/80 px-5 text-sm font-medium shadow-sm backdrop-blur transition-colors hover:bg-muted"
              >
                Browse UI <Box className="size-4" />
              </Link>
            </div>
            <div className="mt-10 grid max-w-xl grid-cols-3 gap-3">
              {stats.map((stat) => (
                <div key={stat.label} className="border-l pl-4">
                  <div className="text-2xl font-semibold">{stat.value}</div>
                  <div className="mt-1 text-xs leading-5 text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-2xl lg:max-w-none">
            <div className="absolute -inset-6 rotate-1 rounded-lg border border-emerald-500/20 bg-emerald-500/5" />
            <div className="relative overflow-hidden rounded-lg border bg-background/92 shadow-2xl backdrop-blur">
              <div className="flex items-center justify-between border-b px-4 py-3">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <Terminal className="size-4 text-emerald-500" />
                  registry.json
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="size-2 rounded-full bg-rose-400" />
                  <span className="size-2 rounded-full bg-amber-400" />
                  <span className="size-2 rounded-full bg-emerald-400" />
                </div>
              </div>
              <div className="grid gap-0 md:grid-cols-[0.86fr_1.14fr]">
                <div className="border-b p-4 md:border-r md:border-b-0">
                  <div className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
                    Published
                  </div>
                  <div className="mt-4 space-y-2">
                    {[
                      "button",
                      "card",
                      "hero-section",
                      "use-mobile",
                      "font-inter",
                    ].map((item) => (
                      <div
                        key={item}
                        className="flex items-center justify-between rounded-md border bg-muted/30 px-3 py-2 text-sm"
                      >
                        <span>{item}</span>
                        <Check className="size-4 text-emerald-500" />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <div className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
                      Preview
                    </div>
                    <Code2 className="size-4 text-sky-500" />
                  </div>
                  <div className="rounded-md border bg-neutral-950 p-4 font-mono text-xs leading-6 text-neutral-200">
                    <div className="text-emerald-300">
                      npx shadcn@latest add \
                    </div>
                    <div className="pl-4 text-sky-200">
                      https://your-site.com/r/button.json
                    </div>
                    <div className="mt-5 text-neutral-500">
                      # generated output
                    </div>
                    <div className="text-neutral-300">
                      components/ui/button.tsx
                    </div>
                    <div className="text-neutral-300">lib/utils.ts</div>
                    <div className="text-neutral-300">app/global.css</div>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <div className="rounded-md border p-3">
                      <div className="text-xs text-muted-foreground">Build</div>
                      <div className="mt-1 text-sm font-medium text-emerald-600 dark:text-emerald-400">
                        Passing
                      </div>
                    </div>
                    <div className="rounded-md border p-3">
                      <div className="text-xs text-muted-foreground">
                        Export
                      </div>
                      <div className="mt-1 text-sm font-medium">
                        Static-ready
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-14">
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-lg border bg-background p-5"
            >
              <feature.icon className="size-5 text-sky-500" />
              <h2 className="mt-4 text-lg font-semibold">{feature.title}</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

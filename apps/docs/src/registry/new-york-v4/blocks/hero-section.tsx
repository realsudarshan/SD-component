import { Button } from "@/registry/new-york-v4/ui/button";

export function HeroSection() {
  return (
    <section className="flex flex-col items-center justify-center py-20 text-center">
      <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
        Build Better UI Components
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
        A collection of accessible, customizable, and beautiful React components
        built with Radix UI and Tailwind CSS.
      </p>
      <div className="mt-8 flex gap-4">
        <Button size="lg">Get Started</Button>
        <Button variant="outline" size="lg">
          View Components
        </Button>
      </div>
    </section>
  );
}

import Link from "next/link";
import { registry } from "@/registry";

const typeLabels: Record<string, string> = {
  "registry:ui": "UI Components",
  "registry:component": "Components",
  "registry:block": "Blocks",
  "registry:hook": "Hooks",
  "registry:lib": "Libraries",
  "registry:page": "Pages",
  "registry:file": "Files",
  "registry:base": "Base",
  "registry:font": "Fonts",
  "registry:example": "Examples",
};

export function RegistryList() {
  const groupedItems = registry.items.reduce(
    (acc, item) => {
      if (item.type === "registry:style") return acc;

      const type = item.type;
      if (!acc[type]) {
        acc[type] = [];
      }
      acc[type].push(item);
      return acc;
    },
    {} as Record<string, typeof registry.items>
  );

  return (
    <div className="space-y-8">
      {Object.entries(groupedItems).map(([type, items]) => (
        <div key={type}>
          <h2 className="mb-4 text-2xl font-bold">{typeLabels[type] || type}</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {items.map((item) => {
              const isPage = type === "registry:page";
              let href: string;

              if (isPage) {
                href = item.name === "landing-page" ? "/preview/landing-page" : `/preview/${item.name}`;
              } else if (type === "registry:ui" || type === "registry:component") {
                href = `/docs/components/${item.name}`;
              } else if (type === "registry:block") {
                href = `/docs/blocks/${item.name}`;
              } else if (type === "registry:hook") {
                href = `/docs/hooks/${item.name}`;
              } else if (type === "registry:lib") {
                href = `/docs/lib/${item.name}`;
              } else {
                href = `/docs/${item.name}`;
              }

              return (
                <Link
                  key={item.name}
                  href={href}
                  target={isPage ? "_blank" : undefined}
                  rel={isPage ? "noopener noreferrer" : undefined}
                  className="rounded-lg border p-4 hover:bg-muted/50 transition-colors"
                >
                  <h3 className="font-semibold">{item.name}</h3>
                  {item.description && (
                    <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                      {item.description}
                    </p>
                  )}
                  {isPage && (
                    <span className="mt-2 inline-block text-xs text-primary">
                      Opens in new tab →
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

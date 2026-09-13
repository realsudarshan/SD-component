"use client";

import { ChevronDown, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { getRegistryItemHref, registryTypeLabels } from "@/lib/registry-types";
import { registry } from "@/registry";

export function RegistryList({ type: selectedType }: { type?: string }) {
  const [collapsedCategories, setCollapsedCategories] = useState<
    Record<string, boolean>
  >({});

  const groupedItems = registry.items.reduce(
    (acc, item) => {
      if (selectedType && item.type !== selectedType) return acc;

      const type = item.type;
      if (!acc[type]) {
        acc[type] = [];
      }
      acc[type].push(item);
      return acc;
    },
    {} as Record<string, typeof registry.items>,
  );

  const toggleCategory = (type: string) => {
    setCollapsedCategories((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  const itemGridClassName = selectedType
    ? "grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3"
    : "grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";

  const itemClassName = selectedType
    ? "rounded-md border px-3 py-2 hover:bg-muted/50 transition-colors"
    : "rounded-lg border p-3 hover:bg-muted/50 transition-colors";

  return (
    <div className="space-y-4">
      {Object.entries(groupedItems).map(([type, items]) => {
        const isCollapsed = collapsedCategories[type];
        const hasItems = items.length > 0;

        if (!hasItems) return null;

        return (
          <div key={type} className="border rounded-lg">
            <button
              type="button"
              onClick={() => toggleCategory(type)}
              className="flex w-full items-center justify-between p-4 text-left hover:bg-muted/50 transition-colors"
            >
              <h2 className="text-lg font-semibold">
                {registryTypeLabels[type] || type}
              </h2>
              <span className="text-muted-foreground">
                {isCollapsed ? (
                  <ChevronRight className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </span>
            </button>
            {!isCollapsed && (
              <div className="p-4 pt-0">
                <div className={itemGridClassName}>
                  {items.map((item) => {
                    const isPage = type === "registry:page";
                    const href = getRegistryItemHref(type, item.name);

                    return (
                      <Link
                        key={item.name}
                        href={href}
                        target={isPage ? "_blank" : undefined}
                        rel={isPage ? "noopener noreferrer" : undefined}
                        className={itemClassName}
                      >
                        <h3 className="text-sm font-medium">{item.name}</h3>
                        {item.description && (
                          <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
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
            )}
          </div>
        );
      })}
    </div>
  );
}

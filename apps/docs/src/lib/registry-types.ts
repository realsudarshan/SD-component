import { registry } from "@/registry";

export const registryTypeLabels: Record<string, string> = {
  "registry:style": "Styles",
  "registry:ui": "UI",
  "registry:component": "Components",
  "registry:block": "Blocks",
  "registry:hook": "Hooks",
  "registry:lib": "Libraries",
  "registry:page": "Pages",
  "registry:file": "Files",
  "registry:font": "Fonts",
};

export const registryTypeRoutes: Record<string, string> = {
  "registry:style": "/docs/styles",
  "registry:ui": "/docs/ui",
  "registry:component": "/docs/components",
  "registry:block": "/docs/blocks",
  "registry:hook": "/docs/hooks",
  "registry:lib": "/docs/lib",
  "registry:page": "/docs/pages",
  "registry:file": "/docs/files",
  "registry:font": "/docs/fonts",
};

export function getRegistryTypeHref(type: string) {
  return registryTypeRoutes[type] ?? "/docs";
}

export function getRegistryItemHref(type: string, name: string) {
  if (type === "registry:page") {
    return name === "landing-page"
      ? "/preview/landing-page"
      : `/preview/${name}`;
  }

  if (type === "registry:example") {
    return `/r/${name}.json`;
  }

  if (type === "registry:style") {
    return name === "index"
      ? "/docs/styles/registry-index"
      : `${getRegistryTypeHref(type)}/${name}`;
  }

  return `${getRegistryTypeHref(type)}/${name}`;
}

export function getRegistryNavItems() {
  type RegistryItemType = (typeof registry.items)[number]["type"];
  const types = new Set(registry.items.map((item) => item.type));

  return Object.entries(registryTypeRoutes)
    .filter(([type]) => types.has(type as RegistryItemType))
    .map(([type, href]) => ({
      href,
      label: registryTypeLabels[type] ?? type,
    }));
}

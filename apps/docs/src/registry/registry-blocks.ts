import type { Registry } from "shadcn/schema";

export const blocks: Registry["items"] = [
  {
    name: "hero-section",
    type: "registry:block",
    title: "Hero Section",
    description: "A modern hero section with call-to-action buttons",
    registryDependencies: ["button"],
    files: [
      {
        path: "blocks/hero-section.tsx",
        type: "registry:component",
      },
    ],
  },
];

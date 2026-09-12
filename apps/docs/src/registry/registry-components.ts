import type { Registry } from "shadcn/schema";

export const components: Registry["items"] = [
  {
    name: "project-card",
    type: "registry:component",
    registryDependencies: ["card", "badge", "button"],
    files: [
      {
        path: "components/project-card.tsx",
        type: "registry:component",
      },
    ],
  },
];

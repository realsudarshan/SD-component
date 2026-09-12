import type { Registry } from "shadcn/schema";

export const hooks: Registry["items"] = [
  {
    name: "use-mobile",
    type: "registry:hook",
    title: "Use Mobile",
    description: "A hook for detecting mobile screen size",
    files: [
      {
        path: "hooks/use-mobile.ts",
        type: "registry:hook",
      },
    ],
  },
  {
    name: "use-toggle",
    type: "registry:hook",
    title: "Use Toggle",
    description: "A hook for managing boolean toggle state",
    files: [
      {
        path: "hooks/use-toggle.ts",
        type: "registry:hook",
      },
    ],
  },
  {
    name: "use-media-query",
    type: "registry:hook",
    title: "Use Media Query",
    description: "A hook for responsive media queries",
    files: [
      {
        path: "hooks/use-media-query.ts",
        type: "registry:hook",
      },
    ],
  },
];

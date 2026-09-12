import type { Registry } from "shadcn/schema";

export const ui: Registry["items"] = [
  {
    name: "button",
    type: "registry:ui",
    dependencies: ["@base-ui/react"],
    files: [
      {
        path: "ui/button.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "card",
    type: "registry:ui",
    files: [
      {
        path: "ui/card.tsx",
        type: "registry:ui",
      },
    ],
  },
];

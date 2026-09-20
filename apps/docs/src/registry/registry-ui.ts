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
  {
    name: "badge",
    type: "registry:ui",
    files: [
      {
        path: "ui/badge.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "switch",
    type: "registry:ui",
    title: "Switch",
    description: "A turn on and off effect having switch ui premitive",
    dependencies: ["@base-ui/react"],
    files: [
      {
        path: "ui/switch.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "accordion",
    type: "registry:ui",
    title: "Accordion-ui",
    description:
      "A vertically stacked set of interactive headings that each reveal a section of content.",
    dependencies: ["@base-ui/react", "lucide-react"],
    files: [
      {
        path: "ui/accordion.tsx",
        type: "registry:ui",
      },
    ],
  },
];

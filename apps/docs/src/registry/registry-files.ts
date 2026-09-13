import type { Registry } from "shadcn/schema";

export const files: Registry["items"] = [
  {
    name: "tailwind-preset",
    type: "registry:file",
    title: "Tailwind Preset",
    description: "A shareable Tailwind preset file for registry consumers.",
    files: [
      {
        path: "files/tailwind-preset.ts",
        type: "registry:file",
        target: "~/tailwind.preset.ts",
      },
    ],
  },
];

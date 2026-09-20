import type { Registry } from "shadcn/schema";

export const examples: Registry["items"] = [
  {
    name: "button-demo",
    type: "registry:example",
    registryDependencies: ["button"],
    files: [
      {
        path: "examples/button-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "card-demo",
    type: "registry:example",
    registryDependencies: ["card", "button"],
    files: [
      {
        path: "examples/card-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "project-card-demo",
    type: "registry:example",
    registryDependencies: ["project-card"],
    files: [
      {
        path: "examples/project-card-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "switch-demo",
    type: "registry:example",
    registryDependencies: ["switch"],
    files: [
      {
        path: "examples/switch-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "accordion-demo",
    type: "registry:example",
    registryDependencies: ["accordion"],
    files: [
      {
        path: "examples/accordion-demo.tsx",
        type: "registry:example",
      },
    ],
  },
];

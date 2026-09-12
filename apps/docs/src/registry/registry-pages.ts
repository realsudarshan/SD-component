import type { Registry } from "shadcn/schema";

export const pages: Registry["items"] = [
  {
    name: "landing-page",
    type: "registry:page",
    title: "Landing Page",
    description: "A complete landing page template with hero, features, and footer sections",
    files: [
      {
        path: "pages/landing-page.tsx",
        type: "registry:page",
        target: "app/page.tsx",
      },
    ],
  },
];

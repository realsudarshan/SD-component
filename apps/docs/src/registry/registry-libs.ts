import type { Registry } from "shadcn/schema";

export const libs: Registry["items"] = [
  {
    name: "format-date",
    type: "registry:lib",
    title: "Format Date",
    description: "Utility functions for date formatting",
    files: [
      {
        path: "lib/format-date.ts",
        type: "registry:lib",
      },
    ],
  },
  {
    name: "validate-email",
    type: "registry:lib",
    title: "Validate Email",
    description: "Email validation utility function",
    files: [
      {
        path: "lib/validate-email.ts",
        type: "registry:lib",
      },
    ],
  },
];

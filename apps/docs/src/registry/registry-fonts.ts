import type { Registry } from "shadcn/schema";

export const fonts: Registry["items"] = [
  {
    name: "font-inter",
    type: "registry:font",
    title: "Inter Font",
    description:
      "A sans-serif Google Font configured as the default font variable.",
    font: {
      family: "'Inter Variable', sans-serif",
      provider: "google",
      import: "Inter",
      variable: "--font-sans",
      subsets: ["latin"],
      dependency: "@fontsource-variable/inter",
    },
  },
];

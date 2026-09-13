import { getRegistryNavItems } from "@/lib/registry-types";

export const siteConfig = {
  name: "Registry Docs Kit",
  url: "https://components.sudarshandhakal.com.np/",
  description:
    "Ship a polished shadcn registry with docs, previews, and installable packages.",
  links: {
    twitter: "https://x.com/realsudarsan",
    github: "https://github.com/realsudarshan/SD-component",
  },
  navItems: getRegistryNavItems(),
};

import { getRegistryNavItems } from "@/lib/registry-types";

export const siteConfig = {
  name: "Your UI Library",
  url: "https://components.sudarshandhakal.com.np/",
  description:
    "Build, host, and share your own shadcn-compatible component library in minutes. AI-ready, easily hosted, and zero-friction.",
  links: {
    twitter: "https://x.com/realsudarsan",
    github: "https://github.com/realsudarshan/SD-component",
  },
  navItems: getRegistryNavItems(),
};

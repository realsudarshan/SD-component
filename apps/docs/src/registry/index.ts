import type { Registry } from "shadcn/schema";
import { bases } from "./registry-bases";
import { blocks } from "./registry-blocks";
import { components } from "./registry-components";
import { examples } from "./registry-examples";
import { files } from "./registry-files";
import { fonts } from "./registry-fonts";
import { hooks } from "./registry-hooks";
import { libs } from "./registry-libs";
import { pages } from "./registry-pages";
import { ui } from "./registry-ui";

// Shared between index and style for backward compatibility.
export const TEMPLATE_STYLE = {
  type: "registry:style" as const,
  dependencies: ["class-variance-authority", "lucide-react"],
  devDependencies: ["tw-animate-css"],
  registryDependencies: ["utils"],
  files: [],
};

export const registry = {
  name: "shadcn-registry-docs-template/ui",
  homepage: "https://shadcn-registry-docs-template.pages.dev/",
  items: [
    {
      name: "index",
      ...TEMPLATE_STYLE,
    },
    {
      name: "style",
      ...TEMPLATE_STYLE,
    },
    ...ui,
    ...components,
    ...blocks,
    ...hooks,
    ...libs,
    ...pages,
    ...files,
    ...bases,
    ...fonts,
    ...examples,
  ] satisfies Registry["items"],
} satisfies Registry;

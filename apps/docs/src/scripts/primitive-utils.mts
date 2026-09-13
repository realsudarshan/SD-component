import { existsSync } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { stdout as output } from "node:process";
import type readline from "node:readline/promises";
import { IndentationText, Project, SyntaxKind } from "ts-morph";

export const primitiveTypes = [
  "ui",
  "component",
  "block",
  "hook",
  "lib",
  "page",
  "file",
  "font",
] as const;

export type PrimitiveType = (typeof primitiveTypes)[number];

export type PrimitiveConfig = {
  collection: string;
  docsDir: string;
  exportName: string;
  fileType: string;
  registryFile: string;
  registryType: string;
  sourceDir?: string;
  target?: string;
};

export type RegistryCollection = PrimitiveType | "example";

export const primitiveConfigs: Record<RegistryCollection, PrimitiveConfig> = {
  ui: {
    collection: "ui",
    docsDir: "ui",
    exportName: "ui",
    fileType: "registry:ui",
    registryFile: "registry-ui.ts",
    registryType: "registry:ui",
    sourceDir: "ui",
  },
  component: {
    collection: "components",
    docsDir: "components",
    exportName: "components",
    fileType: "registry:component",
    registryFile: "registry-components.ts",
    registryType: "registry:component",
    sourceDir: "components",
  },
  block: {
    collection: "blocks",
    docsDir: "blocks",
    exportName: "blocks",
    fileType: "registry:component",
    registryFile: "registry-blocks.ts",
    registryType: "registry:block",
    sourceDir: "blocks",
  },
  hook: {
    collection: "hooks",
    docsDir: "hooks",
    exportName: "hooks",
    fileType: "registry:hook",
    registryFile: "registry-hooks.ts",
    registryType: "registry:hook",
    sourceDir: "hooks",
  },
  lib: {
    collection: "libs",
    docsDir: "lib",
    exportName: "libs",
    fileType: "registry:lib",
    registryFile: "registry-libs.ts",
    registryType: "registry:lib",
    sourceDir: "lib",
  },
  page: {
    collection: "pages",
    docsDir: "pages",
    exportName: "pages",
    fileType: "registry:page",
    registryFile: "registry-pages.ts",
    registryType: "registry:page",
    sourceDir: "pages",
    target: "app/page.tsx",
  },
  file: {
    collection: "files",
    docsDir: "files",
    exportName: "files",
    fileType: "registry:file",
    registryFile: "registry-files.ts",
    registryType: "registry:file",
    sourceDir: "files",
  },
  font: {
    collection: "fonts",
    docsDir: "fonts",
    exportName: "fonts",
    fileType: "registry:font",
    registryFile: "registry-fonts.ts",
    registryType: "registry:font",
  },
  example: {
    collection: "examples",
    docsDir: "examples",
    exportName: "examples",
    fileType: "registry:example",
    registryFile: "registry-examples.ts",
    registryType: "registry:example",
    sourceDir: "examples",
  },
};

export type PrimitiveAnswers = {
  description: string;
  docs: boolean;
  force: boolean;
  name: string;
  runBuild: boolean;
  demo: boolean;
  sync: boolean;
  title: string;
  type: PrimitiveType;
};

type RegistryItemInput = {
  dependencies?: string[];
  description: string;
  files?: Array<{
    path: string;
    target?: string;
    type: string;
  }>;
  font?: {
    dependency: string;
    family: string;
    import: string;
    provider: string;
    subsets: string[];
    variable: string;
  };
  name: string;
  registryDependencies?: string[];
  title: string;
  type: string;
};

export function docsRoot() {
  return process.cwd();
}

export function slugify(value: string) {
  return value
    .trim()
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function titleize(value: string) {
  return slugify(value)
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function pascalCase(value: string) {
  return slugify(value)
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}

export function parseArgs(argv = process.argv.slice(2)) {
  const flags = new Map<string, string | boolean>();
  const positional: string[] = [];

  for (let index = 0; index < argv.length; index++) {
    const arg = argv[index];

    if (!arg.startsWith("--")) {
      positional.push(arg);
      continue;
    }

    const [rawKey, inlineValue] = arg.slice(2).split("=", 2);
    const key = rawKey.replace(/^no-/, "");
    const value = rawKey.startsWith("no-")
      ? false
      : (inlineValue ?? argv[index + 1]);

    if (value === undefined || value === false) {
      flags.set(key, value ?? true);
      continue;
    }

    if (String(value).startsWith("--")) {
      flags.set(key, true);
      continue;
    }

    flags.set(key, value);
    if (inlineValue === undefined) {
      index++;
    }
  }

  return { flags, positional };
}

export function boolFromFlag(
  flags: Map<string, string | boolean>,
  key: string,
  fallback: boolean,
) {
  const value = flags.get(key);

  if (typeof value === "boolean") {
    return value;
  }

  if (typeof value === "string") {
    return !["0", "false", "no", "off"].includes(value.toLowerCase());
  }

  return fallback;
}

export function stringFromFlag(
  flags: Map<string, string | boolean>,
  key: string,
) {
  const value = flags.get(key);
  return typeof value === "string" ? value : undefined;
}

export function isPrimitiveType(value: string): value is PrimitiveType {
  return primitiveTypes.includes(value as PrimitiveType);
}

export async function promptText(
  label: string,
  defaultValue: string,
  rl: readline.Interface,
) {
  const suffix = defaultValue ? ` (${defaultValue})` : "";
  const answer = await rl.question(`${label}${suffix}: `);
  return answer.trim() || defaultValue;
}

export async function promptConfirm(
  label: string,
  defaultValue: boolean,
  rl: readline.Interface,
) {
  const hint = defaultValue ? "Y/n" : "y/N";
  const answer = (await rl.question(`${label} (${hint}): `))
    .trim()
    .toLowerCase();

  if (!answer) {
    return defaultValue;
  }

  return ["y", "yes", "true", "1"].includes(answer);
}

export async function promptType(
  defaultValue: PrimitiveType,
  rl: readline.Interface,
) {
  output.write(`What are you adding?\n`);
  primitiveTypes.forEach((type, index) => {
    output.write(
      `  ${index + 1}. ${type}${type === defaultValue ? " (default)" : ""}\n`,
    );
  });

  const answer = (await rl.question(`Choose type: `)).trim();

  if (!answer) {
    return defaultValue;
  }

  const index = Number(answer);
  const selected = Number.isInteger(index) ? primitiveTypes[index - 1] : answer;

  if (!selected || !isPrimitiveType(selected)) {
    throw new Error(`Unknown primitive type "${answer}".`);
  }

  return selected;
}

export async function writeFileIfAllowed(
  filePath: string,
  contents: string,
  force: boolean,
) {
  if (existsSync(filePath) && !force) {
    return false;
  }

  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, contents);
  return true;
}

export function sourceRelativePath(type: PrimitiveType, name: string) {
  const config = primitiveConfigs[type];

  if (!config.sourceDir) {
    return undefined;
  }

  const extension = ["ui", "component", "block", "page"].includes(type)
    ? "tsx"
    : "ts";

  return `${config.sourceDir}/${name}.${extension}`;
}

export function sourceAbsolutePath(type: PrimitiveType, name: string) {
  const relativePath = sourceRelativePath(type, name);

  if (!relativePath) {
    return undefined;
  }

  return path.join(docsRoot(), "src", "registry", "new-york-v4", relativePath);
}

export function docsAbsolutePath(type: PrimitiveType, name: string) {
  return path.join(
    docsRoot(),
    "content",
    "docs",
    primitiveConfigs[type].docsDir,
    `${name}.mdx`,
  );
}

export function exampleRelativePath(name: string) {
  return `examples/${name}-demo.tsx`;
}

export function exampleAbsolutePath(name: string) {
  return path.join(
    docsRoot(),
    "src",
    "registry",
    "new-york-v4",
    exampleRelativePath(name),
  );
}

export function registryAbsolutePath(type: RegistryCollection) {
  return path.join(
    docsRoot(),
    "src",
    "registry",
    primitiveConfigs[type].registryFile,
  );
}

export function supportsDemo(type: PrimitiveType) {
  return ["ui", "component", "block", "page"].includes(type);
}

export function getImportPath(type: PrimitiveType, name: string) {
  const config = primitiveConfigs[type];
  return `@/registry/new-york-v4/${config.sourceDir}/${name}`;
}

export function sourceTemplate(type: PrimitiveType, name: string) {
  const componentName = pascalCase(name);

  if (type === "hook") {
    const hookName = name.startsWith("use-")
      ? name.replace(/-([a-z])/g, (_, letter: string) => letter.toUpperCase())
      : `use${componentName}`;

    return `export function ${hookName}() {\n  return null;\n}\n`;
  }

  if (type === "lib" || type === "file") {
    const functionName = name.replace(/-([a-z])/g, (_, letter: string) =>
      letter.toUpperCase(),
    );

    return `export function ${functionName}() {\n  return null;\n}\n`;
  }

  return `import type { ComponentProps } from "react";\n\ntype ${componentName}Props = ComponentProps<"div">;\n\nfunction ${componentName}({ className, ...props }: ${componentName}Props) {\n  return (\n    <div\n      data-slot="${name}"\n      className={className}\n      {...props}\n    />\n  );\n}\n\nexport { ${componentName} };\n`;
}

export function exampleTemplate(type: PrimitiveType, name: string) {
  const componentName = pascalCase(name);
  return `import { ${componentName} } from "${getImportPath(type, name)}";\n\nexport default function ${componentName}Demo() {\n  return <${componentName} />;\n}\n`;
}

export function docsTemplate(answers: PrimitiveAnswers) {
  const config = primitiveConfigs[answers.type];
  const sourceTitle =
    answers.type === "ui"
      ? `components/ui/${answers.name}.tsx`
      : `${config.sourceDir ?? config.docsDir}/${answers.name}.tsx`;
  const preview = answers.demo
    ? `\n<ComponentPreview name="${answers.name}-demo" />\n`
    : "";
  const usage =
    answers.type === "font"
      ? ""
      : `\n## Usage\n\n\`\`\`tsx\nimport { ${pascalCase(answers.name)} } from "${answers.type === "ui" ? "@/components/ui" : "@/components"}/${answers.name}"\n\`\`\`\n`;
  const source =
    answers.type === "font"
      ? ""
      : `\n<Step>Copy and paste the following code into your project.</Step>\n\n<ComponentSource\n  name="${answers.name}"\n  title="${sourceTitle}"\n  styleName="new-york-v4"\n/>\n\n<Step>Update the import paths to match your project setup.</Step>\n`;

  return `---\ntitle: ${answers.title}\ndescription: ${answers.description}\n---\n${preview}\n## Installation\n\n<CodeTabs>\n\n<TabsList>\n  <TabsTrigger value="cli">Command</TabsTrigger>\n  <TabsTrigger value="manual">Manual</TabsTrigger>\n</TabsList>\n<TabsContent value="cli">\n\n<CodeBlockCommand command="npx shadcn@latest add https://components.sudarshandhakal.com.np/r/${answers.name}.json" />\n\n</TabsContent>\n\n<TabsContent value="manual">\n\n<Steps className="mb-0 pt-2">\n\n<Step>Run sync after implementation to detect package and registry dependencies.</Step>\n${source}\n</Steps>\n\n</TabsContent>\n\n</CodeTabs>\n${usage}\n## Reference\n\nAdd props, examples, and notes here once the primitive is implemented.\n`;
}

export function registryItemText(input: RegistryItemInput) {
  const lines = [
    "{",
    `  name: ${JSON.stringify(input.name)},`,
    `  type: ${JSON.stringify(input.type)},`,
  ];

  if (input.title) {
    lines.push(`  title: ${JSON.stringify(input.title)},`);
  }

  if (input.description) {
    lines.push(`  description: ${JSON.stringify(input.description)},`);
  }

  if (input.dependencies?.length) {
    lines.push(`  dependencies: ${JSON.stringify(input.dependencies)},`);
  }

  if (input.registryDependencies?.length) {
    lines.push(
      `  registryDependencies: ${JSON.stringify(input.registryDependencies)},`,
    );
  }

  if (input.files?.length) {
    lines.push("  files: [");
    for (const file of input.files) {
      lines.push("    {");
      lines.push(`      path: ${JSON.stringify(file.path)},`);
      lines.push(`      type: ${JSON.stringify(file.type)},`);

      if (file.target) {
        lines.push(`      target: ${JSON.stringify(file.target)},`);
      }

      lines.push("    },");
    }
    lines.push("  ],");
  }

  if (input.font) {
    lines.push(
      `  font: ${JSON.stringify(input.font, null, 2).replace(/\n/g, "\n  ")},`,
    );
  }

  lines.push("}");

  return lines.join("\n");
}

export async function upsertRegistryItem(
  type: RegistryCollection,
  item: RegistryItemInput,
) {
  const project = new Project({
    manipulationSettings: {
      indentationText: IndentationText.TwoSpaces,
    },
  });
  const filePath = registryAbsolutePath(type);
  const sourceFile = project.addSourceFileAtPath(filePath);
  const declaration = sourceFile.getVariableDeclarationOrThrow(
    primitiveConfigs[type].exportName,
  );
  const array = declaration.getInitializerIfKindOrThrow(
    SyntaxKind.ArrayLiteralExpression,
  );
  const itemText = registryItemText(item);
  const existing = array.getElements().find((element) => {
    if (!element.isKind(SyntaxKind.ObjectLiteralExpression)) {
      return false;
    }

    const property = element.getProperty("name");

    if (!property?.isKind(SyntaxKind.PropertyAssignment)) {
      return false;
    }

    const initializer = property.getInitializer();
    return initializer?.getText().replaceAll(/['"]/g, "") === item.name;
  });

  if (existing) {
    existing.replaceWithText(itemText);
  } else {
    array.addElement(itemText);
  }

  await sourceFile.save();
}

export function readRegistryItem(type: RegistryCollection, name: string) {
  const project = new Project();
  const sourceFile = project.addSourceFileAtPath(registryAbsolutePath(type));
  const declaration = sourceFile.getVariableDeclarationOrThrow(
    primitiveConfigs[type].exportName,
  );
  const array = declaration.getInitializerIfKindOrThrow(
    SyntaxKind.ArrayLiteralExpression,
  );
  const existing = array.getElements().find((element) => {
    if (!element.isKind(SyntaxKind.ObjectLiteralExpression)) {
      return false;
    }

    const property = element.getProperty("name");

    if (!property?.isKind(SyntaxKind.PropertyAssignment)) {
      return false;
    }

    const initializer = property.getInitializer();
    return initializer?.getText().replaceAll(/['"]/g, "") === name;
  });

  if (!existing?.isKind(SyntaxKind.ObjectLiteralExpression)) {
    return undefined;
  }

  const readString = (propertyName: string) => {
    const property = existing.getProperty(propertyName);

    if (!property?.isKind(SyntaxKind.PropertyAssignment)) {
      return undefined;
    }

    const initializer = property.getInitializer();

    if (!initializer?.isKind(SyntaxKind.StringLiteral)) {
      return undefined;
    }

    return initializer.getLiteralText();
  };

  return {
    description: readString("description") ?? "",
    title: readString("title") ?? titleize(name),
  };
}

export async function readJsonFile<T>(filePath: string): Promise<T> {
  return JSON.parse(await readFile(filePath, "utf8")) as T;
}

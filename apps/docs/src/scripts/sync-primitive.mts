import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { intro, note, outro } from "@clack/prompts";
import {
  boolFromFlag,
  docsRoot,
  exampleAbsolutePath,
  exampleRelativePath,
  isPrimitiveType,
  type PrimitiveType,
  parseArgs,
  primitiveConfigs,
  primitiveTypes,
  promptConfirm,
  readRegistryItem,
  sourceAbsolutePath,
  sourceRelativePath,
  supportsDemo,
  titleize,
  upsertRegistryItem,
} from "./primitive-utils.mjs";

type DetectedDependencies = {
  dependencies: string[];
  registryDependencies: string[];
};

function normalizePackageImport(importPath: string) {
  if (importPath.startsWith("@")) {
    const [scope, pkg] = importPath.split("/");
    return `${scope}/${pkg}`;
  }

  return importPath.split("/")[0];
}

function detectImports(
  contents: string,
  selfName: string,
): DetectedDependencies {
  const imports = new Set<string>();
  const dependencies = new Set<string>();
  const registryDependencies = new Set<string>();
  const importRegex =
    /(?:import|export)\s+(?:type\s+)?(?:[^'"]*?\s+from\s+)?["']([^"']+)["']/g;

  for (const match of contents.matchAll(importRegex)) {
    imports.add(match[1]);
  }

  for (const importPath of imports) {
    if (importPath.startsWith(".") || importPath === "react") {
      continue;
    }

    const registryMatch = importPath.match(
      /^@\/registry\/new-york-v4\/[^/]+\/([^/]+)$/,
    );

    if (registryMatch) {
      const dependencyName = registryMatch[1].replace(/\.(ts|tsx)$/, "");

      if (dependencyName !== selfName) {
        registryDependencies.add(dependencyName);
      }

      continue;
    }

    if (importPath.startsWith("@/")) {
      continue;
    }

    dependencies.add(normalizePackageImport(importPath));
  }

  return {
    dependencies: [...dependencies].sort(),
    registryDependencies: [...registryDependencies].sort(),
  };
}

async function readIfExists(filePath: string) {
  if (!existsSync(filePath)) {
    return "";
  }

  return await readFile(filePath, "utf8");
}

function findType(name: string, requestedType?: string): PrimitiveType {
  if (requestedType) {
    if (!isPrimitiveType(requestedType)) {
      throw new Error(`Unknown primitive type "${requestedType}".`);
    }

    return requestedType;
  }

  const matches = primitiveTypes.filter((type) => {
    const sourcePath = sourceAbsolutePath(type, name);
    return sourcePath ? existsSync(sourcePath) : false;
  });

  if (matches.length === 1) {
    return matches[0];
  }

  if (matches.length > 1) {
    throw new Error(
      `Found ${name} in multiple primitive folders. Pass --type ${matches.join("|")}.`,
    );
  }

  throw new Error(
    `Could not find a source file for "${name}". Pass --type if needed.`,
  );
}

async function main() {
  const { flags, positional } = parseArgs();
  const name = String(flags.get("name") ?? positional[0] ?? "").trim();

  if (!name) {
    throw new Error(
      "Pass a primitive name, for example: bun run primitive:sync button",
    );
  }

  const type = findType(name, String(flags.get("type") ?? ""));
  const config = primitiveConfigs[type];
  const sourcePath = sourceAbsolutePath(type, name);
  const sourcePathForRegistry = sourceRelativePath(type, name);

  if (!sourcePath || !sourcePathForRegistry) {
    throw new Error(`"${type}" does not have a source file to sync.`);
  }

  const sourceContents = await readIfExists(sourcePath);
  const demoPath = exampleAbsolutePath(name);
  const demoContents = supportsDemo(type) ? await readIfExists(demoPath) : "";
  const sourceDetected = detectImports(sourceContents, name);
  const demoDetected = detectImports(demoContents, `${name}-demo`);
  const dependencies = [...new Set(sourceDetected.dependencies)].sort();
  const registryDependencies = [
    ...new Set(sourceDetected.registryDependencies),
  ].sort();
  const demoRegistryDependencies = [
    ...new Set([name, ...demoDetected.registryDependencies]),
  ].sort();
  const existing = readRegistryItem(type, name);
  const title = String(flags.get("title") ?? existing?.title ?? titleize(name));
  const description = String(
    flags.get("description") ??
      existing?.description ??
      `A reusable ${name} ${type} primitive.`,
  );
  const shouldConfirm = boolFromFlag(flags, "confirm", true);

  intro(`Sync Primitive`);

  note(
    `Detected for ${name}:\n` +
      `Package dependencies: ${dependencies.length ? dependencies.join(", ") : "none"}\n` +
      `Registry dependencies: ${
        registryDependencies.length ? registryDependencies.join(", ") : "none"
      }` +
      (supportsDemo(type) && existsSync(demoPath)
        ? `\nDemo registry dependencies: ${demoRegistryDependencies.join(", ")}`
        : ""),
  );

  if (shouldConfirm) {
    const confirmed = await promptConfirm("Update registry files", true);

    if (!confirmed) {
      outro("No files changed.");
      return;
    }
  }

  await upsertRegistryItem(type, {
    dependencies,
    description,
    files: [
      {
        path: sourcePathForRegistry,
        target: config.target,
        type: config.fileType,
      },
    ],
    name,
    registryDependencies,
    title,
    type: config.registryType,
  });

  if (supportsDemo(type) && existsSync(demoPath)) {
    await upsertRegistryItem("example", {
      description: "",
      files: [
        {
          path: exampleRelativePath(name),
          type: "registry:example",
        },
      ],
      name: `${name}-demo`,
      registryDependencies: demoRegistryDependencies,
      title: "",
      type: "registry:example",
    });
  }

  outro(
    `Synced ${path.relative(docsRoot(), sourcePath)} into ${config.registryFile}.`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

import { spawn } from "node:child_process";
import path from "node:path";
import { intro, note, outro } from "@clack/prompts";
import {
  boolFromFlag,
  docsAbsolutePath,
  docsTemplate,
  exampleAbsolutePath,
  exampleRelativePath,
  exampleTemplate,
  isPrimitiveType,
  type PrimitiveAnswers,
  parseArgs,
  primitiveConfigs,
  promptConfirm,
  promptText,
  promptType,
  slugify,
  sourceAbsolutePath,
  sourceRelativePath,
  sourceTemplate,
  supportsDemo,
  titleize,
  upsertRegistryItem,
  writeFileIfAllowed,
} from "./primitive-utils.mjs";

async function collectAnswers() {
  const { flags } = parseArgs();
  intro(`Add Primitive`);

  const rawType = String(flags.get("type") ?? "");
  const type = rawType
    ? isPrimitiveType(rawType)
      ? rawType
      : (() => {
          throw new Error(`Unknown primitive type "${rawType}".`);
        })()
    : await promptType("ui");
  const rawName =
    typeof flags.get("name") === "string"
      ? String(flags.get("name"))
      : await promptText("Name", "example-card");
  const name = slugify(rawName);
  const title =
    typeof flags.get("title") === "string"
      ? String(flags.get("title"))
      : await promptText("Title", titleize(name));
  const description =
    typeof flags.get("description") === "string"
      ? String(flags.get("description"))
      : await promptText(
          "Description",
          `A reusable ${name} ${type} primitive.`,
        );
  const canDemo = supportsDemo(type);
  const answers: PrimitiveAnswers = {
    description,
    docs: boolFromFlag(flags, "docs", true),
    force: boolFromFlag(flags, "force", false),
    name,
    runBuild: boolFromFlag(flags, "build", false),
    demo: canDemo && boolFromFlag(flags, "demo", canDemo),
    sync: boolFromFlag(flags, "sync", false),
    title,
    type,
  };

  if (!flags.has("docs")) {
    answers.docs = await promptConfirm("Create docs page", answers.docs);
  }

  if (canDemo && !flags.has("demo")) {
    answers.demo = await promptConfirm("Create demo", answers.demo);
  }

  if (!flags.has("build")) {
    answers.runBuild = await promptConfirm(
      "Run registry build after scaffold",
      answers.runBuild,
    );
  }

  return answers;
}

async function run(command: string, args: string[]) {
  await new Promise<void>((resolve, reject) => {
    const child = spawn(command, args, {
      cwd: process.cwd(),
      shell: true,
      stdio: "inherit",
    });

    child.on("exit", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(
          new Error(`${command} ${args.join(" ")} failed with code ${code}`),
        );
      }
    });
  });
}

async function main() {
  const answers = await collectAnswers();
  const config = primitiveConfigs[answers.type];
  const created: string[] = [];
  const skipped: string[] = [];
  const sourcePath = sourceAbsolutePath(answers.type, answers.name);
  const sourcePathForRegistry = sourceRelativePath(answers.type, answers.name);

  if (sourcePath) {
    const wrote = await writeFileIfAllowed(
      sourcePath,
      sourceTemplate(answers.type, answers.name),
      answers.force,
    );
    (wrote ? created : skipped).push(path.relative(process.cwd(), sourcePath));
  }

  if (answers.demo) {
    const demoPath = exampleAbsolutePath(answers.name);
    const wrote = await writeFileIfAllowed(
      demoPath,
      exampleTemplate(answers.type, answers.name),
      answers.force,
    );
    (wrote ? created : skipped).push(path.relative(process.cwd(), demoPath));
  }

  if (answers.docs) {
    const docsPath = docsAbsolutePath(answers.type, answers.name);
    const wrote = await writeFileIfAllowed(
      docsPath,
      docsTemplate(answers),
      answers.force,
    );
    (wrote ? created : skipped).push(path.relative(process.cwd(), docsPath));
  }

  await upsertRegistryItem(answers.type, {
    description: answers.description,
    files: sourcePathForRegistry
      ? [
          {
            path: sourcePathForRegistry,
            target: config.target,
            type: config.fileType,
          },
        ]
      : undefined,
    font:
      answers.type === "font"
        ? {
            dependency: `@fontsource-variable/${answers.name.replace(/^font-/, "")}`,
            family: `'${answers.title}', sans-serif`,
            import: answers.title.replace(/\s+/g, ""),
            provider: "google",
            subsets: ["latin"],
            variable: "--font-sans",
          }
        : undefined,
    name: answers.name,
    title: answers.title,
    type: config.registryType,
  });

  if (answers.demo) {
    await upsertRegistryItem("example", {
      description: "",
      files: [
        {
          path: exampleRelativePath(answers.name),
          type: "registry:example",
        },
      ],
      name: `${answers.name}-demo`,
      registryDependencies: [answers.name],
      title: "",
      type: "registry:example",
    });
  }

  if (answers.sync) {
    await run("bun", ["./src/scripts/sync-primitive.mts", answers.name]);
  }

  if (answers.runBuild) {
    await run("bun", ["run", "registry:build"]);
  }

  note(`Created ${answers.name}`);

  if (created.length) {
    note(`Files:\n${created.map((file) => `- ${file}`).join("\n")}`);
  }

  if (skipped.length) {
    note(
      `Skipped existing files:\n${skipped.map((file) => `- ${file}`).join("\n")}`,
    );
  }

  outro(
    `Next:\n- Implement the generated source file\n- Run bun run primitive:sync ${answers.name}\n- Run bun run registry:build`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

#!/usr/bin/env node

import { execSync } from "node:child_process";
import os from "node:os";
import path from "node:path";
import {
	cancel,
	intro,
	isCancel,
	note,
	outro,
	spinner,
	text,
} from "@clack/prompts";
import { Command } from "commander";
import fs from "fs-extra";
import pc from "picocolors";

const CONFIG_PATH = path.join(os.homedir(), ".registry-cli-config.json");

function getConfig() {
	if (fs.existsSync(CONFIG_PATH)) {
		return fs.readJSONSync(CONFIG_PATH);
	}
	return {};
}

function saveConfig(config: any) {
	fs.writeJSONSync(CONFIG_PATH, config, { spaces: 2 });
}

const program = new Command();

program
	.name("registry-cli")
	.description(
		"Push components seamlessly from your local repo to the shadcn-registry-docs-template",
	)
	.version("1.0.0");

program
	.command("push")
	.description("Push a component file to the global registry")
	.argument(
		"<file>",
		"Path to the component file (e.g., src/components/ui/my-card.tsx)",
	)
	.option(
		"-t, --type <type>",
		"Primitive type (ui, component, hook, block)",
		"ui",
	)
	.action(async (file, options) => {
		intro(pc.bgCyan(pc.black(" Registry CLI ")));

		const absoluteSourcePath = path.resolve(process.cwd(), file);
		if (!fs.existsSync(absoluteSourcePath)) {
			cancel(`File not found: ${absoluteSourcePath}`);
			process.exit(1);
		}

		const config = getConfig();
		let registryPath = process.env.REGISTRY_REPO_PATH || config.registryPath;

		if (!registryPath || !fs.existsSync(registryPath)) {
			note(
				"We need to know where your shadcn-registry-docs-template repository is located.",
				"Setup Required",
			);

			const inputPath = await text({
				message: "Enter the absolute path to your registry repository:",
				placeholder: "C:\\Projects\\shadcn-registry-docs-template",
				validate: (value) => {
					if (!fs.existsSync(value)) return "Directory does not exist.";
					if (!fs.existsSync(path.join(value, "apps/docs")))
						return "Could not find apps/docs inside the directory.";
				},
			});

			if (isCancel(inputPath)) {
				cancel("Operation cancelled.");
				process.exit(0);
			}

			registryPath = inputPath;
			config.registryPath = registryPath;
			saveConfig(config);
			note(`Saved config to ${CONFIG_PATH}`);
		}

		const fileName = path.basename(file);
		const componentName = fileName.replace(/\.tsx?$/, "");

		// Mapping primitive types to their folder in the registry
		let folder = options.type;
		if (options.type === "component") folder = "components";
		if (options.type === "hook") folder = "hooks";
		if (options.type === "block") folder = "blocks";

		const docsAppDir = path.join(registryPath, "apps/docs");
		const targetFilePath = path.join(
			docsAppDir,
			"src/registry/new-york-v4",
			folder,
			fileName,
		);

		const s = spinner();
		s.start(`Copying ${fileName} to registry...`);

		// Ensure directory exists and copy
		fs.ensureDirSync(path.dirname(targetFilePath));
		fs.copyFileSync(absoluteSourcePath, targetFilePath);

		s.stop(`Copied to ${targetFilePath}`);

		// Syncing Primitive
		s.start(`Syncing primitive: ${componentName}...`);
		try {
			execSync(`bun run primitive:sync ${componentName} --confirm`, {
				cwd: docsAppDir,
				stdio: "inherit",
			});
			s.stop(`Successfully synced ${componentName}!`);
		} catch (error) {
			s.stop("Failed to sync primitive.");
			console.error(error);
		}

		outro(pc.green(`Done! Component ${componentName} is now in the registry.`));
	});

program.parse(process.argv);

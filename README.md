# shadcn-registry-docs-template

Minimal template for building shadcn registry with docs

## Features

- **TypeScript** - For type safety and improved developer experience
- **Biome** - Linting and formatting
- **Husky** - Git hooks for code quality
- **Turborepo** - Optimized monorepo build system

## Getting Started

First, install the dependencies:

```bash
bun install
```

Then, run the development server:

```bash
bun run dev
```

## Git Hooks and Formatting

- Initialize hooks: `bun run prepare`
- Format and lint fix: `bun run check`

## Project Structure

```
shadcn-registry-docs-template/
├── .antigravity/
│   └── skills/        # AI Workspace Skills (e.g., component scaffolding instructions)
├── apps/
│   └── docs/          # Next.js + Fumadocs app with the registry UI
└── packages/
    ├── config/        # Shared TypeScript / tooling config
    └── cli/           # Global CLI tool for cross-repo syncing
```

## Available Scripts

- `bun run dev`: Start all applications in development mode
- `bun run build`: Build all applications
- `bun run check-types`: Check TypeScript types across all apps
- `bun run check`: Run Biome formatting and linting
- `bun run add`: Scaffold a new registry component/primitive
- `bun run primitive:sync <name>`: Automatically sync AST dependencies for a primitive
- `bun run registry:build`: Rebuild the static JSON registry

## Cross-Repo Development (Global CLI)

When building components in real-world applications (outside of this repo), it can be tedious to manually copy and paste them back into your registry docs. 

We provide a **Global CLI** that can push a component from any local Next.js/React project directly into this registry template.

1. Navigate to `packages/cli` and link it globally:
   ```bash
   cd packages/cli
   bun link
   ```
2. From *any* other project on your machine, push a component:
   ```bash
   registry-cli push src/components/ui/my-new-card.tsx --type ui
   ```
3. The CLI will copy the file, resolve your registry directory, and automatically trigger the `primitive:sync` AST parser so your component is completely wired up.

## AI Assistant Integration

This repository ships with an **AI Workspace Skill** (`.antigravity/skills/create-registry-component/SKILL.md`). 

If you are using an AI coding assistant (like Gemini, Claude, or Antigravity), simply ask it to **"create a new component called X"**. The AI will automatically read the skill file and know precisely how to:
1. Use the `bun run add` scaffolding CLI.
2. Write the component and demo.
3. Sync the dependencies via `bun run primitive:sync`.
4. Fill in the MDX documentation.
5. Rebuild the `registry.json` endpoints.

## Customizing this template

- **Change site name, description, links, and nav**
  - Edit `apps/docs/src/lib/config.ts` to update the site name, description, URLs, social links, and top navigation items.

- **Customize documentation content**
  - Docs live in `apps/docs/content/docs` as MDX files (for example: `index.mdx`, `components/*.mdx`).
  - Adjust frontmatter and meta schemas in `apps/docs/source.config.ts` if you need custom fields.

- **Customize shadcn registry items**
  - Add or edit UI components under `apps/docs/src/registry/new-york-v4/ui`.
  - Add or edit examples under `apps/docs/src/registry/new-york-v4/examples`.
  - Control the exported registry (name, homepage, items) in `apps/docs/src/registry/index.ts` and `apps/docs/registry.json`.

- **Update URLs and deployment metadata**
  - Update the public site URL in `apps/docs/src/lib/config.ts` (`url` field).
  - Update the registry homepage in `apps/docs/registry.json` and `apps/docs/src/registry/index.ts`.

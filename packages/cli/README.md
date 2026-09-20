# `@shadcn-registry-docs-template/cli`

A global CLI tool designed to reduce friction when building components in other repositories and syncing them into this registry template.

## The Problem
When creating components for a registry, you typically build them inside your *actual* application first so you can test them in real-world scenarios. Moving them back to the registry repo involves manually copying files, updating paths, and figuring out dependencies.

## The Solution
This CLI allows you to simply run `registry-cli push` from *any* local directory on your machine. It will automatically:
1. Copy the file into the correct folder inside the registry docs app (`apps/docs/src/registry/new-york-v4/...`).
2. Run the `primitive:sync` AST parser in the registry to auto-detect and register its dependencies.

## Installation

Since this is part of the monorepo, you can link it globally for local development:

```bash
cd packages/cli
bun link
```

## Usage

From any other project on your machine (e.g., your separate Next.js app):

```bash
registry-cli push src/components/ui/magic-card.tsx --type ui
```

The CLI will prompt you for the absolute path to your `shadcn-registry-docs-template` repository on your first run and save it to `~/.registry-cli-config.json`.

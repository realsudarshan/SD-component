---
name: create-registry-component
description: How to scaffold, implement, and sync a new shadcn-compatible component, hook, or block in this registry repository.
---

# Creating a Registry Component

This repository uses a custom CLI and Turborepo setup to manage a shadcn-compatible registry. Whenever you are asked to "create a component", "add a hook", or "build a block", you MUST follow this exact workflow to ensure the registry generates correctly.

## Workflow

### 1. Scaffold the Primitive
Always start by using the built-in scaffolding tool. **Do not create files manually.**

Run the following command in the `apps/docs` directory:
```bash
bun run add --name <component-name> --type <type> --docs --demo --no-build
```
- `<component-name>` should be a kebab-case slug (e.g., `fancy-button`).
- `<type>` must be one of: `ui`, `component`, `block`, `hook`, `lib`, `page`, `file`, `font`.
- `--no-build` prevents it from rebuilding the whole registry immediately (we'll do that at the end).

### 2. Implement the Source Code
The scaffolding tool will create a blank file for your primitive.
- For `ui` components, it will be at `apps/docs/src/registry/new-york-v4/ui/<component-name>.tsx`
- For `hooks`, it will be at `apps/docs/src/registry/new-york-v4/hooks/<component-name>.ts`

Implement the actual logic of the component there. Keep it highly reusable and shadcn-compatible (use `cn` for classes, forward refs, etc.).

### 3. Implement the Demo
The scaffolding tool will create a demo file at:
`apps/docs/src/registry/new-york-v4/examples/<component-name>-demo.tsx`

Implement a working, visual example of the component in this file. This demo is what will be rendered on the documentation page.

### 4. Sync the Registry (Crucial Step)
Once your imports and code are finalized, you **must** sync the primitive so the registry detects its dependencies (like `lucide-react`, `@radix-ui/*`, or other registry items).

Run this in the `apps/docs` directory:
```bash
bun run primitive:sync <component-name> --confirm
```
This will automatically parse the AST of your component and update `apps/docs/src/registry/registry-<type>.ts`.

### 5. Update the Documentation
The scaffolding tool creates an MDX file for the documentation:
`apps/docs/content/docs/<type>/<component-name>.mdx`

Edit this file to:
- Add a clear description.
- Add prop definitions.
- Write usage examples.

### 6. Build the Registry
Finally, generate the static `registry.json` and `registry/__index__.tsx` files so the CLI can actually install it:

Run this in the `apps/docs` directory:
```bash
bun run registry:build
```

You are done! The component is now fully integrated into the registry.

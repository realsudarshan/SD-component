<div align="center">
  <h1>✨ The Ultimate Component Registry Template</h1>
  <p><strong>Build, host, and share your own shadcn-compatible component library in minutes.</strong></p>
  <p>Zero friction. AI-ready. Deploy anywhere.</p>
</div>

---

## 🌟 Why this template?

We believe that **everyone** should be able to spin up and host their own component library in minutes without the headache of manual AST parsing, documentation boilerplate, and configuration setup. 

This template is built to eliminate friction across the entire component lifecycle:

- 🤖 **AI-Ready (Built for LLMs):** Ships with an AI Workspace Skill (`.antigravity/skills`). Just ask your AI coding assistant (Gemini, Claude, Antigravity) to *"create a component"* and it will autonomously scaffold, implement, sync dependencies, and document it.
- 🚀 **Zero-Friction Publishing:** Working on a component inside your actual Next.js app? Use our [Global CLI](#cross-repo-development-global-cli) to push it directly to your registry from *any local repository* with a single command.
- 🌍 **Use Anywhere:** Fully compatible with the standard `npx shadcn@latest add ...` CLI out of the box. Consumers can use your components instantly.
- ⚡ **Easily Hosted:** Powered by Next.js and Fumadocs. Static export is built-in. Deploy to Vercel, Netlify, or GitHub Pages in seconds.

---

## 📦 Getting Started

### 1. Clone & Install
```bash
git clone https://github.com/realsudarshan/SD-component.git my-ui-library
cd my-ui-library
bun install
```

### 2. Start the Dev Server
```bash
bun run dev
```

### 3. Customize Your Brand
- Edit `apps/docs/src/lib/config.ts` to update your site name, URLs, and social links.
- Update `apps/docs/registry.json` and `apps/docs/src/registry/index.ts` to reflect your author name and URL.

---

## 🛠 Available Scripts

- `bun run add`: Beautiful, interactive CLI to scaffold a new registry component, block, or hook.
- `bun run primitive:sync <name>`: Automatically parses the AST of your component and resolves all dependencies.
- `bun run registry:build`: Rebuilds the static JSON registry endpoints.
- `bun run dev`: Start development server.
- `bun run build`: Build for production.

---

## 🪄 AI Assistant Integration (Zero-Touch Components)

This repository is designed to be fully manageable by LLMs. It includes an **AI Workspace Skill** (`.antigravity/skills/create-registry-component/SKILL.md`). 

If you use an AI coding assistant, simply prompt:
> *"Create a new UI component called glowing-button."*

**The AI will autonomously:**
1. Scaffold it via `bun run add --name glowing-button --type ui`.
2. Write the component logic and its visual demo.
3. Sync dependencies using `bun run primitive:sync`.
4. Fill in the MDX documentation automatically.
5. Rebuild the `registry.json`.

---

## 🚚 Cross-Repo Development (Global CLI)

We know you don't build components in a vacuum. You build them in your real-world applications and *then* decide they belong in your UI library.

We built a **Global CLI** so you can push a component from *any* local Next.js/React project directly into this registry without copy-pasting.

### Link the CLI
```bash
cd packages/cli
bun link
```

### Push from any project
Go to your separate app's codebase and push your newly created component:
```bash
registry-cli push src/components/ui/magic-card.tsx --type ui
```
The CLI will copy the file, resolve your registry directory, and trigger the `primitive:sync` AST parser so your component is completely wired up.

---

## 📂 Project Structure

```
shadcn-registry-docs-template/
├── .antigravity/
│   └── skills/        # Tells AI exactly how to write & sync components
├── apps/
│   └── docs/          # Next.js + Fumadocs app with the registry UI
└── packages/
    ├── config/        # Shared TypeScript / tooling config
    └── cli/           # Global CLI tool for pushing components
```

# DesignAgent

Local-first, platform-agnostic UI contract engine for AI-native development.

## What it is

- **Source of truth for UI contracts**: Defines component interfaces, tokens, and platform rules as structured JSON
- **Workspace-first architecture**: All state lives on disk; no in-memory-only models
- **Multi-platform token compilation**: Core → Semantic → Platform (web/rn) with proper unit transforms
- **MCP server**: Exposes contracts and tokens to AI assistants (Cursor, Claude, etc.) over stdio
- **Web Editor**: Visual interface for editing contracts and tokens with live preview
- **Preview runtime**: Vite-powered component explorer with hot reload

## What it is NOT

- Not a design tool or canvas
- Not a visual editor for drawing UI
- Not an IDE
- Not a Figma plugin
- Not an AI that generates UI

DesignAgent does not invent or generate UI. It enforces contracts that humans define.

## Quick Start

```bash
# Clone and install
git clone https://github.com/sherizan/designagent.git
cd designagent
npm install
npm run build

# Start the editor
npm run dev

# Open http://localhost:3000/editor
```

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         Web Editor                               │
│  ┌──────────────┐  ┌───────────────┐  ┌────────────────────┐   │
│  │ File Explorer│  │ Monaco Editor │  │   Preview Pane     │   │
│  └──────────────┘  └───────────────┘  └────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Workspace (~/.designagent/)                   │
│  ┌─────────┐  ┌──────────────┐  ┌───────────────────┐          │
│  │ tokens/ │  │  contracts/  │  │    system.json    │          │
│  └─────────┘  └──────────────┘  └───────────────────┘          │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
                ┌───────────────────────┐
                │   SystemWorkspace     │
                │   (Core Engine)       │
                └───────────────────────┘
                              │
          ┌───────────────────┼───────────────────┐
          ▼                   ▼                   ▼
    ┌──────────┐        ┌──────────┐        ┌──────────┐
    │   CLI    │        │   MCP    │        │ Preview  │
    └──────────┘        └──────────┘        └──────────┘
```

## Editor Features

The web editor provides a complete interface for managing your design system:

### 3-Column Layout
- **File Explorer** (left): Navigate system.json, tokens, and contracts
- **Monaco Editor** (center): Edit JSON files with syntax highlighting
- **Preview Pane** (right): Live component preview with platform/theme switching

### Key Features
- **Auto-save**: `Cmd/Ctrl+S` saves and validates
- **Validation**: One-click validation of all workspace files
- **Platform/Theme**: Switch between web/rn and light/dark
- **MCP Config**: Copy-paste config for Cursor integration

### Screenshots

```
┌─────────────────────────────────────────────────────────────────┐
│ my-design-system │ Web ▼ │ Light ▼ │ ● Preview │ ✓ Save │ ▶ Val │
├────────────┬─────────────────────────┬──────────────────────────┤
│ SYSTEM     │ 1 {                     │ http://localhost:3333    │
│ system.json│ 2   "$schema": "...",   ├──────────────────────────┤
│            │ 3   "name": "Button",   │ DesignAgent Preview      │
│ TOKENS     │ 4   "description":...   │                          │
│ core.json  │ 5   "platformTargets"..│ COMPONENTS               │
│ semantic...│ 6   "props": {          │ Button                   │
│            │ 7     "variant": {      │                          │
│ CONTRACTS  │ 8       "type": "enum", │                          │
│ Button.json│ 9       "values": [...] │                          │
├────────────┴─────────────────────────┴──────────────────────────┤
│ >_ Connect to Cursor                                        ▲   │
└─────────────────────────────────────────────────────────────────┘
```

## Workflows

### 1. Editor-first (Web UI)

Visual editing with live preview:

```bash
npm run dev
# Open http://localhost:3000/editor
```

The editor automatically:
- Creates a workspace at `~/.designagent/workspaces/<id>/`
- Starts a Vite preview server at port 3333
- Validates on save

### 2. Cursor-first (MCP)

AI assistant reads contracts and tokens via MCP to generate compliant code:

```bash
# Start MCP server
npm run designagent -- serve-mcp --workspace ./my-system
```

Configure in Cursor's MCP settings:
```json
{
  "mcpServers": {
    "designagent": {
      "command": "npm",
      "args": ["run", "designagent", "--", "serve-mcp", "--workspace", "/path/to/workspace"]
    }
  }
}
```

Available MCP tools:
- `listComponents` - List all contract names
- `getComponent` - Get contract by name
- `getTokens` - Get compiled tokens for platform/theme
- `validateUsage` - Validate props against contract

### 3. CLI-first

Command-line operations for CI/CD:

```bash
# Initialize a workspace
npm run designagent -- init ./my-system

# Validate
npm run designagent -- validate --workspace ./my-system

# Compile tokens
npm run designagent -- tokens --workspace ./my-system --platform web --theme light
```

## Token Model

Three-layer token architecture:

1. **Core tokens** (`tokens/core.json`)
   - Raw primitive values (colors, spacing, typography)
   - Platform-neutral

2. **Semantic tokens** (`tokens/semantic.{theme}.json`)
   - Intent-based naming (e.g., `color.text.primary`)
   - References core tokens
   - Theme-specific (light/dark)

3. **Platform rules** (`tokens/platform.{platform}.json`)
   - Unit transforms per platform
   - Web: spacing → `"16px"`
   - React Native: spacing → `16`

## Contract Schema

Component contracts define the canonical interface:

```json
{
  "$schema": "../schemas/component-contract.schema.json",
  "$version": "1.0.0",
  "name": "Button",
  "description": "Primary interactive element",
  "platformTargets": ["web", "rn"],
  "props": {
    "variant": {
      "type": "enum",
      "values": ["primary", "secondary", "ghost"],
      "default": "primary",
      "description": "Visual style variant"
    },
    "label": {
      "type": "string",
      "required": true,
      "description": "Button text"
    }
  },
  "code": {
    "importPath": "@ui/Button"
  },
  "examples": [
    { "name": "Primary", "props": { "variant": "primary", "label": "Click me" } }
  ]
}
```

## API Routes

The editor exposes these endpoints:

| Route | Method | Description |
|-------|--------|-------------|
| `/api/workspaces/create` | POST | Create new workspace |
| `/api/workspaces/[id]/tree` | GET | Get file tree |
| `/api/workspaces/[id]/file` | GET/PUT | Read/write files |
| `/api/workspaces/[id]/validate` | POST | Validate workspace |
| `/api/preview/start` | POST | Start Vite preview |
| `/api/preview/stop` | POST | Stop preview |
| `/api/preview/status` | GET | Get preview URL |

## CLI Commands

| Command | Description |
|---------|-------------|
| `designagent init [path]` | Create workspace from template |
| `designagent validate` | Validate contracts and tokens |
| `designagent preview` | Start preview HTTP server |
| `designagent serve-mcp` | Start MCP stdio server |
| `designagent tokens` | Compile and output tokens |

## Project Structure

```
/designagent
  /app
    /api              # Next.js API routes
    /editor           # Editor page
  /components
    /editor           # Editor UI components
    /ui               # shadcn/ui components
  /lib
    workspace-manager.ts  # Workspace CRUD
    preview-manager.ts    # Preview lifecycle
  /packages
    /core             # Types, workspace, validation
    /compiler         # Token compilation
    /preview          # Vite preview server
    /mcp              # MCP stdio server
    /cli              # CLI entry point
  /workspace-template
    /tokens           # Example token files
    /contracts        # Example contracts
    system.json
```

## Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **Editor**: Monaco Editor
- **Styling**: Tailwind CSS, shadcn/ui (zinc theme)
- **Preview**: Vite dev server
- **MCP**: @modelcontextprotocol/sdk

## Why this exists

AI assistants should not invent UI. They should implement contracts that humans define.

DesignAgent provides:
1. A canonical source of truth for component interfaces
2. Platform-aware token compilation
3. Machine-readable validation for AI-generated code
4. Visual editor for contract management
5. MCP integration for AI assistants

## License

MIT

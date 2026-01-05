# DesignAgent

Local-first, platform-agnostic UI contract engine for AI-native development.

## What it is

- **Source of truth for UI contracts**: Defines component interfaces, tokens, and platform rules as structured JSON
- **Workspace-first architecture**: All state lives on disk; no in-memory-only models
- **Multi-platform token compilation**: Core → Semantic → Platform (web/rn) with proper unit transforms
- **MCP server**: Exposes contracts and tokens to AI assistants (Cursor, Claude, etc.) over stdio
- **Preview runtime**: Local HTTP server for component exploration and token inspection

## What it is NOT

- Not a design tool or canvas
- Not a visual editor
- Not an IDE
- Not a Figma plugin
- Not an AI that generates UI

DesignAgent does not invent or generate UI. It enforces contracts that humans define.

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Workspace (Disk)                      │
│  ┌─────────┐  ┌──────────────┐  ┌───────────────────┐  │
│  │ tokens/ │  │  contracts/  │  │    system.json    │  │
│  └─────────┘  └──────────────┘  └───────────────────┘  │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
              ┌───────────────────────┐
              │   SystemWorkspace     │
              │   (Core Engine)       │
              └───────────────────────┘
                          │
          ┌───────────────┼───────────────┐
          ▼               ▼               ▼
    ┌──────────┐    ┌──────────┐    ┌──────────┐
    │   CLI    │    │   MCP    │    │ Preview  │
    └──────────┘    └──────────┘    └──────────┘
```

All consumers read/write through `SystemWorkspace`. No direct file access.

## Workflows

### 1. Cursor-first (MCP)

AI assistant reads contracts and tokens via MCP to generate compliant code:

```bash
# Start MCP server
designagent serve-mcp --workspace ./my-system
```

Configure in Cursor's MCP settings:
```json
{
  "mcpServers": {
    "designagent": {
      "command": "designagent",
      "args": ["serve-mcp", "--workspace", "/path/to/workspace"]
    }
  }
}
```

Available MCP tools:
- `listComponents` - List all contract names
- `getComponent` - Get contract by name
- `getTokens` - Get compiled tokens for platform/theme
- `validateUsage` - Validate props against contract

### 2. Preview-first (Local runtime)

Inspect contracts and tokens via HTTP API:

```bash
# Start preview server
designagent preview --workspace ./my-system --port 3456
```

Endpoints:
- `GET /api/contracts` - List contracts
- `GET /api/contracts/:name` - Get contract
- `GET /api/tokens/:platform/:theme` - Compiled tokens
- `GET /api/validate` - Validate workspace

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

```bash
# Compile tokens for web, light theme
designagent tokens --platform web --theme light --format css
```

## Contract Schema

Component contracts define the canonical interface:

```json
{
  "name": "Button",
  "platformTargets": ["web", "rn"],
  "props": {
    "variant": {
      "type": "enum",
      "values": ["primary", "secondary"],
      "default": "primary"
    },
    "label": {
      "type": "string",
      "required": true
    }
  },
  "code": {
    "importPath": "@ui/Button"
  }
}
```

## Installation

```bash
# Clone and install
git clone <repo>
cd designagent
npm install
npm run build

# Initialize a workspace
npx designagent init ./my-system

# Validate
npx designagent validate --workspace ./my-system
```

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
  /packages
    /core        # Types, workspace, validation
    /compiler    # Token compilation
    /preview     # HTTP preview server
    /mcp         # MCP stdio server
    /cli         # CLI entry point
  /workspace-template
    /tokens      # Example token files
    /contracts   # Example contracts
    system.json
```

## Why this exists

AI assistants should not invent UI. They should implement contracts that humans define.

DesignAgent provides:
1. A canonical source of truth for component interfaces
2. Platform-aware token compilation
3. Machine-readable validation for AI-generated code
4. No visual canvas, no editor lock-in

The editor (coming later) will be a thin shell over these files.

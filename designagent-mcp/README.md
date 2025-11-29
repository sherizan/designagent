# DesignAgent MCP Server

A Model Context Protocol (MCP) server that exposes DesignAgent UI screen kits for installation into Expo React Native projects.

## Overview

This MCP server provides two tools:
- `list_screens`: Lists all available DesignAgent screen kits
- `get_screen_kit`: Retrieves the complete file kit for a specific screen (including paths and file content)

## Setup

### Installation

```bash
npm install
```

### Development

Run the server in development mode:

```bash
npm run dev
```

The server will start and listen on stdin/stdout (it will appear idle in the terminal; that's expected).

### Production

Build and run:

```bash
npm run build
npm start
```

## Cursor MCP Configuration

To use this MCP server with Cursor in your Expo app project, create the following file:

**`.cursor/mcp/designagent.json`** (in your Expo app project):

```json
{
  "name": "designagent-mcp",
  "version": "0.1.0",
  "command": "npx",
  "args": ["tsx", "../designagent-mcp/src/server.ts"],
  "env": {}
}
```

**Note**: Adjust the path in `args` based on your folder structure. If your Expo app and this MCP server are siblings, use `../designagent-mcp/src/server.ts`. If they're in different locations, update the path accordingly.

## Usage

### Available Tools

#### `list_screens`

Lists all available DesignAgent screen kits.

**Input**: None

**Output**: Array of screen objects with:
- `id`: Screen identifier (e.g., "login-simple")
- `name`: Display name
- `description`: Screen description
- `framework`: Framework type ("react-native")
- `tags`: Array of tags

#### `get_screen_kit`

Retrieves the complete file kit for a specific screen.

**Input**:
- `screenId` (string): The ID of the screen to retrieve

**Output**:
- `files`: Array of file objects, each containing:
  - `path`: File path relative to project root
  - `content`: Complete file content

**Example**:
```json
{
  "screenId": "login-simple"
}
```

## Project Structure

```
designagent-mcp/
├── src/
│   ├── server.ts       # MCP server implementation
│   ├── types.ts        # TypeScript type definitions
│   └── screenKits.ts   # Screen kit data and utilities
├── package.json
├── tsconfig.json
└── README.md
```

## Development

### Adding New Screen Kits

Edit `src/screenKits.ts` and add new entries to the `screenKits` array. Each screen kit should include:
- Unique `id`
- `name` and `description`
- `framework`: "react-native"
- `tags`: Array of relevant tags
- `files`: Array of `DesignAgentFile` objects with `path` and `content`

## License

Private project.


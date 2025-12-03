# JSON to TOON MCP Server

A Model Context Protocol (MCP) server that provides tools for converting JSON data to TOON (Token-Oriented Object Notation) format. TOON is a token-efficient format designed specifically for LLM applications, reducing token usage by 30-60% compared to JSON.

## Features

- **JSON to TOON Conversion**: Convert JSON data to TOON format with customizable options
- **TOON to JSON Conversion**: Convert TOON format back to JSON
- **Token Savings Analysis**: Analyze potential token savings before conversion
- **MCP Protocol Support**: Full MCP server implementation for integration with LLM applications

## Quick Start

### 1. Install the Package
```bash
npm install -g json-to-toon-mcp-server
```

### 2. Configure Claude Desktop
Add this to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "json-to-toon": {
      "command": "npx",
      "args": ["json-to-toon-mcp-server"]
    }
  }
}
```

### 3. Restart Claude Desktop
Restart Claude Desktop and the MCP server will be available.

## Installation

```bash
npm install
```

## Usage

### Running the Server

```bash
npm start
```

The server runs on stdio and can be connected to any MCP client.

### Available Tools

#### 1. `convert_json_to_toon`

Converts JSON data to TOON format.

**Parameters:**
- `json_data` (string, required): JSON data to convert
- `options` (object, optional): Conversion options
  - `delimiter` (string): Delimiter for tabular arrays (default: ",")
  - `indentation` (string): Indentation string (default: "  ")
  - `show_length_markers` (boolean): Show length markers [N] for arrays (default: true)

**Example:**
```json
{
  "json_data": "{\"users\": [{\"id\": 1, \"name\": \"Alice\"}]}",
  "options": {
    "delimiter": ",",
    "show_length_markers": true
  }
}
```

#### 2. `convert_toon_to_json`

Converts TOON format back to JSON.

**Parameters:**
- `toon_data` (string, required): TOON data to convert

**Example:**
```json
{
  "toon_data": "users[1]{id,name}:\n  1,Alice"
}
```

#### 3. `analyze_token_savings`

Analyzes potential token savings when converting JSON to TOON.

**Parameters:**
- `json_data` (string, required): JSON data to analyze

**Example:**
```json
{
  "json_data": "{\"users\": [{\"id\": 1, \"name\": \"Alice\"}]}}"
}
```

## Example Conversions

### JSON to TOON

**JSON Input:**
```json
{
  "users": [
    { "id": 1, "name": "Alice", "role": "admin" },
    { "id": 2, "name": "Bob", "role": "user" }
  ]
}
```

**TOON Output:**
```
users[2]{id,name,role}:
  1,Alice,admin
  2,Bob,user
```

### Token Savings

The TOON format typically reduces token usage by 30-60% compared to JSON, making it ideal for LLM applications where token efficiency is important.

## Development

### Running Tests

```bash
npm test
```

### Development Mode

```bash
npm run dev
```

## Integration with MCP Clients

This server can be integrated with any MCP-compatible client. The server communicates via stdio, making it suitable for integration with various LLM applications and development tools.

### Manual Configuration for Claude Desktop

To add this MCP server to Claude Desktop manually, add the following configuration to your `claude_desktop_config.json` file.

**Config file locations:**
- **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`
- **Linux**: `~/.config/Claude/claude_desktop_config.json`

To add this MCP server to Claude Desktop manually, add the following configuration to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "json-to-toon": {
      "command": "npx",
      "args": ["json-to-toon-mcp-server"],
      "env": {}
    }
  }
}
```

**Alternative configuration using local installation:**

```json
{
  "mcpServers": {
    "json-to-toon": {
      "command": "node",
      "args": ["/path/to/json-to-toon-mcp-server/index.js"],
      "env": {}
    }
  }
}
```

**Configuration for development (from source):**

```json
{
  "mcpServers": {
    "json-to-toon": {
      "command": "node",
      "args": ["index.js"],
      "cwd": "/path/to/json-to-toon-mcp-server"
    }
  }
}
```

### Configuration Notes

- Replace `/path/to/json-to-toon-mcp-server` with the actual path to your installation
- The `npx` method requires the package to be installed globally (`npm install -g json-to-toon-mcp-server`)
- The server communicates via stdio, so no additional network configuration is needed
- After adding the configuration, restart Claude Desktop for changes to take effect

## TOON Format Benefits

- **Token Efficient**: 30-60% fewer tokens than JSON
- **LLM-Friendly**: Structured format that's easy for LLMs to parse
- **Lossless**: Full bidirectional conversion between JSON and TOON
- **Human Readable**: Maintains readability while being compact
- **Schema Aware**: Explicit structure declarations help with validation

## License

MIT
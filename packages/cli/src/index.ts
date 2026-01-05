#!/usr/bin/env node

import { Command } from 'commander';
import { initCommand } from './commands/init.js';
import { validateCommand } from './commands/validate.js';
import { previewCommand } from './commands/preview.js';
import { serveMcpCommand } from './commands/serve-mcp.js';
import { tokensCommand } from './commands/tokens.js';

const program = new Command();

program
  .name('designagent')
  .description('DesignAgent CLI - UI contract engine for AI-native development')
  .version('0.1.0');

program
  .command('init')
  .description('Initialize a new DesignAgent workspace')
  .argument('[path]', 'Path to create workspace', '.')
  .option('-f, --force', 'Overwrite existing files')
  .action(initCommand);

program
  .command('validate')
  .description('Validate workspace contracts and tokens')
  .option('-w, --workspace <path>', 'Workspace path', '.')
  .action(validateCommand);

program
  .command('preview')
  .description('Start the preview server')
  .option('-w, --workspace <path>', 'Workspace path', '.')
  .option('-p, --port <number>', 'Server port', '3456')
  .action(previewCommand);

program
  .command('serve-mcp')
  .description('Start MCP server over stdio')
  .option('-w, --workspace <path>', 'Workspace path', '.')
  .action(serveMcpCommand);

program
  .command('tokens')
  .description('Compile and output tokens')
  .option('-w, --workspace <path>', 'Workspace path', '.')
  .option('--platform <platform>', 'Target platform (web, rn)', 'web')
  .option('--theme <theme>', 'Theme (light, dark)', 'light')
  .option('--format <format>', 'Output format (json, css, ts)', 'json')
  .action(tokensCommand);

program.parse();

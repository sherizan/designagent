import { resolve } from 'node:path';
import { SystemWorkspace } from '@designagent/core';

interface ValidateOptions {
  workspace: string;
}

export async function validateCommand(options: ValidateOptions): Promise<void> {
  const workspacePath = resolve(process.cwd(), options.workspace);
  
  console.log(`Validating workspace: ${workspacePath}`);
  console.log('');

  const workspace = new SystemWorkspace(workspacePath);

  // Check workspace exists
  if (!(await workspace.exists())) {
    console.error('Error: Workspace not found.');
    console.error('Run "designagent init" to create a workspace.');
    process.exit(1);
  }

  // Run validation
  const result = await workspace.validate();

  if (result.valid) {
    console.log('✓ Workspace is valid!');
    console.log('');
    
    // Print summary
    const contracts = await workspace.listContracts();
    const tokenFiles = await workspace.listTokenFiles();
    const system = await workspace.readSystem();
    
    console.log(`System: ${system.name} v${system.version}`);
    console.log(`Contracts: ${contracts.length}`);
    contracts.forEach(c => console.log(`  - ${c}`));
    console.log(`Token files: ${tokenFiles.core.length + tokenFiles.semantic.length + tokenFiles.platform.length}`);
    console.log(`  Core: ${tokenFiles.core.length}`);
    console.log(`  Semantic: ${tokenFiles.semantic.length} (${tokenFiles.semantic.map(s => s.theme).join(', ')})`);
    console.log(`  Platform: ${tokenFiles.platform.length} (${tokenFiles.platform.map(p => p.platform).join(', ')})`);
  } else {
    console.error('✗ Validation failed!');
    console.error('');
    console.error(`Found ${result.errors.length} error(s):`);
    console.error('');
    
    for (const error of result.errors) {
      console.error(`  [${error.code}] ${error.path}`);
      console.error(`    ${error.message}`);
      console.error('');
    }
    
    process.exit(1);
  }
}

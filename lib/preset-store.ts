/**
 * Preset Store
 * File-based storage for presets under ~/.designagent/presets
 */

import { mkdir, readFile, writeFile, access } from 'node:fs/promises';
import { join } from 'node:path';
import { homedir } from 'node:os';
import type { PresetJSON } from './preset-generator';

// ============================================================
// Configuration
// ============================================================

const PRESETS_DIR = join(homedir(), '.designagent', 'presets');

// ============================================================
// ID Generation
// ============================================================

function generateId(length: number = 8): string {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let id = '';
  for (let i = 0; i < length; i++) {
    id += chars[Math.floor(Math.random() * chars.length)];
  }
  return id;
}

// ============================================================
// Ensure Directory Exists
// ============================================================

async function ensurePresetsDir(): Promise<void> {
  try {
    await access(PRESETS_DIR);
  } catch {
    await mkdir(PRESETS_DIR, { recursive: true });
  }
}

// ============================================================
// Store Preset
// ============================================================

export async function storePreset(preset: PresetJSON): Promise<{ id: string; url: string }> {
  await ensurePresetsDir();
  
  const id = generateId();
  const filePath = join(PRESETS_DIR, `${id}.json`);
  
  // Add id to preset meta
  const presetWithId: PresetJSON = {
    ...preset,
    meta: {
      ...preset.meta,
      id,
    },
  };
  
  await writeFile(filePath, JSON.stringify(presetWithId, null, 2), 'utf-8');
  
  return {
    id,
    url: `/p/${id}`,
  };
}

// ============================================================
// Load Preset
// ============================================================

export async function loadPreset(id: string): Promise<PresetJSON | null> {
  const filePath = join(PRESETS_DIR, `${id}.json`);
  
  try {
    const content = await readFile(filePath, 'utf-8');
    return JSON.parse(content) as PresetJSON;
  } catch {
    return null;
  }
}

// ============================================================
// Check if Preset Exists
// ============================================================

export async function presetExists(id: string): Promise<boolean> {
  const filePath = join(PRESETS_DIR, `${id}.json`);
  
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

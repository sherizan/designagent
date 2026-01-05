/**
 * Preset Generator
 * Generates deterministic preset JSON from query parameters
 */

// ============================================================
// Types
// ============================================================

export type Platform = 'web' | 'rn';
export type Mode = 'light' | 'dark' | 'both';
export type BaseColor = 'zinc' | 'slate' | 'gray';
export type RadiusScale = 'none' | 'sm' | 'md' | 'lg' | 'xl';
export type Font = 'system' | 'inter' | 'geist';
export type Density = 'compact' | 'comfortable';
export type Style = 'maia' | 'classic';

export interface PresetParams {
  platform: Platform;
  mode: Mode;
  baseColor: BaseColor;
  brand: string; // hex color
  radius: RadiusScale;
  font: Font;
  density: Density;
  style: Style;
}

export interface PresetMeta {
  version: string;
  createdAt: string;
  source: string;
  id?: string;
}

export interface PresetSystem {
  name: string;
  version: string;
  defaultPlatform: Platform;
  defaultTheme: 'light' | 'dark';
  componentSource: { type: 'npm'; value: string };
}

export interface TokenValue {
  value: string | number;
  category: string;
}

export interface SemanticTokenValue {
  ref?: string;
  value?: string | number;
  description?: string;
}

export interface CoreTokens {
  $version: string;
  tokens: Record<string, TokenValue>;
}

export interface SemanticTokens {
  $version: string;
  $theme: string;
  tokens: Record<string, SemanticTokenValue>;
}

export interface PlatformRules {
  $version: string;
  $platform: string;
  rules: {
    spacing: { format: string };
    borderRadius: { format: string };
    fontSize: { format: string };
  };
}

export interface ContractDefinition {
  name: string;
  path: string;
  content: Record<string, unknown>;
}

export interface PresetJSON {
  meta: PresetMeta;
  system: PresetSystem;
  tokens: {
    core: CoreTokens;
    semantic: {
      light: SemanticTokens;
      dark?: SemanticTokens;
    };
    platformRules: {
      web: PlatformRules;
      rn: PlatformRules;
    };
  };
  contracts: ContractDefinition[];
  showroom: {
    density: Density;
    style: Style;
  };
}

// ============================================================
// Default Params
// ============================================================

export const DEFAULT_PARAMS: PresetParams = {
  platform: 'web',
  mode: 'light',
  baseColor: 'zinc',
  brand: '#1D4ED8',
  radius: 'lg',
  font: 'inter',
  density: 'comfortable',
  style: 'maia',
};

// ============================================================
// Neutral Color Palettes
// ============================================================

const NEUTRAL_PALETTES: Record<BaseColor, Record<string, string>> = {
  zinc: {
    '0': '#ffffff',
    '50': '#fafafa',
    '100': '#f4f4f5',
    '200': '#e4e4e7',
    '300': '#d4d4d8',
    '400': '#a1a1aa',
    '500': '#71717a',
    '600': '#52525b',
    '700': '#3f3f46',
    '800': '#27272a',
    '900': '#18181b',
  },
  slate: {
    '0': '#ffffff',
    '50': '#f8fafc',
    '100': '#f1f5f9',
    '200': '#e2e8f0',
    '300': '#cbd5e1',
    '400': '#94a3b8',
    '500': '#64748b',
    '600': '#475569',
    '700': '#334155',
    '800': '#1e293b',
    '900': '#0f172a',
  },
  gray: {
    '0': '#ffffff',
    '50': '#f9fafb',
    '100': '#f3f4f6',
    '200': '#e5e7eb',
    '300': '#d1d5db',
    '400': '#9ca3af',
    '500': '#6b7280',
    '600': '#4b5563',
    '700': '#374151',
    '800': '#1f2937',
    '900': '#111827',
  },
};

// ============================================================
// Radius Values
// ============================================================

const RADIUS_VALUES: Record<RadiusScale, number> = {
  none: 0,
  sm: 6,
  md: 10,
  lg: 14,
  xl: 18,
};

// ============================================================
// Font Families
// ============================================================

const FONT_FAMILIES: Record<Font, string> = {
  system: 'system-ui, sans-serif',
  inter: 'Inter, system-ui, sans-serif',
  geist: 'Geist, system-ui, sans-serif',
};

// ============================================================
// Color Utilities
// ============================================================

function hexToHSL(hex: string): { h: number; s: number; l: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return { h: 0, s: 0, l: 0 };

  const r = parseInt(result[1], 16) / 255;
  const g = parseInt(result[2], 16) / 255;
  const b = parseInt(result[3], 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }

  return { h: h * 360, s: s * 100, l: l * 100 };
}

function hslToHex(h: number, s: number, l: number): string {
  s /= 100;
  l /= 100;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

function generateBrandPalette(brandHex: string): Record<string, string> {
  const { h, s, l } = hexToHSL(brandHex);
  return {
    '100': hslToHex(h, Math.min(s, 90), Math.min(l + 35, 95)),
    '200': hslToHex(h, Math.min(s, 85), Math.min(l + 25, 85)),
    '300': hslToHex(h, Math.min(s, 80), Math.min(l + 15, 75)),
    '400': hslToHex(h, s, Math.min(l + 5, 65)),
    '500': brandHex,
    '600': hslToHex(h, s, Math.max(l - 10, 20)),
  };
}

// ============================================================
// Parse Params from SearchParams
// ============================================================

export function parsePresetParams(searchParams: URLSearchParams): PresetParams {
  const platform = (searchParams.get('platform') as Platform) || DEFAULT_PARAMS.platform;
  const mode = (searchParams.get('mode') as Mode) || DEFAULT_PARAMS.mode;
  const baseColor = (searchParams.get('baseColor') as BaseColor) || DEFAULT_PARAMS.baseColor;
  const brandRaw = searchParams.get('brand') || DEFAULT_PARAMS.brand;
  const brand = brandRaw.startsWith('#') ? brandRaw : `#${brandRaw}`;
  const radius = (searchParams.get('radius') as RadiusScale) || DEFAULT_PARAMS.radius;
  const font = (searchParams.get('font') as Font) || DEFAULT_PARAMS.font;
  const density = (searchParams.get('density') as Density) || DEFAULT_PARAMS.density;
  const style = (searchParams.get('style') as Style) || DEFAULT_PARAMS.style;

  return { platform, mode, baseColor, brand, radius, font, density, style };
}

// ============================================================
// Generate Core Tokens
// ============================================================

function generateCoreTokens(params: PresetParams): CoreTokens {
  const neutralPalette = NEUTRAL_PALETTES[params.baseColor];
  const brandPalette = generateBrandPalette(params.brand);

  const tokens: Record<string, TokenValue> = {};

  // Spacing scale: 0, 2, 4, 8, 12, 16, 20, 24, 32, 40
  const spacingScale = [0, 2, 4, 8, 12, 16, 20, 24, 32, 40];
  spacingScale.forEach((v, i) => {
    tokens[`spacing.${i}`] = { value: v, category: 'spacing' };
  });

  // Radius scale
  tokens['radius.sm'] = { value: 6, category: 'borderRadius' };
  tokens['radius.md'] = { value: 10, category: 'borderRadius' };
  tokens['radius.lg'] = { value: 14, category: 'borderRadius' };
  tokens['radius.xl'] = { value: 18, category: 'borderRadius' };

  // Typography
  tokens['font.family.system'] = { value: FONT_FAMILIES.system, category: 'fontFamily' };
  tokens['font.family.inter'] = { value: FONT_FAMILIES.inter, category: 'fontFamily' };
  tokens['font.family.geist'] = { value: FONT_FAMILIES.geist, category: 'fontFamily' };

  const fontSizes = [12, 14, 16, 18, 20, 24, 32];
  fontSizes.forEach((size, i) => {
    tokens[`fontSize.${i}`] = { value: size, category: 'fontSize' };
  });

  const lineHeights = [16, 20, 24, 28, 32, 36];
  lineHeights.forEach((lh, i) => {
    tokens[`lineHeight.${i}`] = { value: lh, category: 'lineHeight' };
  });

  const weights = [400, 500, 600, 700];
  const weightNames = ['regular', 'medium', 'semibold', 'bold'];
  weights.forEach((w, i) => {
    tokens[`fontWeight.${weightNames[i]}`] = { value: w, category: 'fontWeight' };
  });

  // Neutral colors
  Object.entries(neutralPalette).forEach(([step, hex]) => {
    tokens[`neutral.${step}`] = { value: hex, category: 'color' };
  });

  // Brand colors
  Object.entries(brandPalette).forEach(([step, hex]) => {
    tokens[`brand.${step}`] = { value: hex, category: 'color' };
  });

  // Danger color
  tokens['color.danger'] = { value: '#ef4444', category: 'color' };

  return {
    $version: '1.0.0',
    tokens,
  };
}

// ============================================================
// Generate Semantic Tokens
// ============================================================

function generateSemanticTokensLight(params: PresetParams): SemanticTokens {
  const radiusDefault = RADIUS_VALUES[params.radius];
  const fontFamily = `font.family.${params.font}`;

  return {
    $version: '1.0.0',
    $theme: 'light',
    tokens: {
      'color.bg': { ref: 'neutral.0', description: 'Background color' },
      'color.surface': { ref: 'neutral.0', description: 'Surface color' },
      'color.text': { ref: 'neutral.900', description: 'Primary text color' },
      'color.mutedText': { ref: 'neutral.600', description: 'Muted text color' },
      'color.border': { ref: 'neutral.200', description: 'Border color' },
      'color.primary': { ref: 'brand.500', description: 'Primary color' },
      'color.primaryText': { ref: 'neutral.0', description: 'Text on primary' },
      'color.danger': { value: '#ef4444', description: 'Danger color' },
      'shadow.sm': { value: '0 1px 2px 0 rgba(0, 0, 0, 0.05)', description: 'Small shadow' },
      'radius.default': { value: radiusDefault, description: 'Default radius' },
      'font.family.default': { ref: fontFamily, description: 'Default font family' },
    },
  };
}

function generateSemanticTokensDark(params: PresetParams): SemanticTokens {
  const radiusDefault = RADIUS_VALUES[params.radius];
  const fontFamily = `font.family.${params.font}`;

  return {
    $version: '1.0.0',
    $theme: 'dark',
    tokens: {
      'color.bg': { ref: 'neutral.900', description: 'Background color' },
      'color.surface': { ref: 'neutral.800', description: 'Surface color' },
      'color.text': { ref: 'neutral.0', description: 'Primary text color' },
      'color.mutedText': { ref: 'neutral.300', description: 'Muted text color' },
      'color.border': { ref: 'neutral.700', description: 'Border color' },
      'color.primary': { ref: 'brand.400', description: 'Primary color' },
      'color.primaryText': { ref: 'neutral.900', description: 'Text on primary' },
      'color.danger': { value: '#ef4444', description: 'Danger color' },
      'shadow.sm': { value: '0 1px 2px 0 rgba(0, 0, 0, 0.3)', description: 'Small shadow' },
      'radius.default': { value: radiusDefault, description: 'Default radius' },
      'font.family.default': { ref: fontFamily, description: 'Default font family' },
    },
  };
}

// ============================================================
// Generate Platform Rules
// ============================================================

function generatePlatformRules(): { web: PlatformRules; rn: PlatformRules } {
  return {
    web: {
      $version: '1.0.0',
      $platform: 'web',
      rules: {
        spacing: { format: '${value}px' },
        borderRadius: { format: '${value}px' },
        fontSize: { format: '${value}px' },
      },
    },
    rn: {
      $version: '1.0.0',
      $platform: 'rn',
      rules: {
        spacing: { format: '${value}' },
        borderRadius: { format: '${value}' },
        fontSize: { format: '${value}' },
      },
    },
  };
}

// ============================================================
// Generate Contracts
// ============================================================

function generateContracts(): ContractDefinition[] {
  return [
    {
      name: 'Button',
      path: 'contracts/Button.contract.json',
      content: {
        $version: '1.0.0',
        name: 'Button',
        description: 'Primary interactive element for triggering actions',
        platformTargets: ['web', 'rn'],
        props: {
          variant: {
            type: 'enum',
            values: ['primary', 'secondary', 'ghost'],
            default: 'primary',
            description: 'Visual style variant',
          },
          size: {
            type: 'enum',
            values: ['sm', 'md', 'lg'],
            default: 'md',
            description: 'Button size',
          },
          disabled: {
            type: 'boolean',
            default: false,
            description: 'Whether the button is disabled',
          },
          loading: {
            type: 'boolean',
            default: false,
            description: 'Whether the button is in loading state',
          },
          label: {
            type: 'string',
            required: true,
            description: 'Button text content',
          },
        },
        code: {
          importPath: '@designagent/uistack-core',
        },
        examples: [
          { name: 'Primary Submit', props: { label: 'Submit', variant: 'primary' } },
          { name: 'Secondary Cancel', props: { label: 'Cancel', variant: 'secondary' } },
          { name: 'Ghost Action', props: { label: 'Learn more', variant: 'ghost' } },
        ],
      },
    },
    {
      name: 'Input',
      path: 'contracts/Input.contract.json',
      content: {
        $version: '1.0.0',
        name: 'Input',
        description: 'Text input field for user data entry',
        platformTargets: ['web', 'rn'],
        props: {
          placeholder: {
            type: 'string',
            default: '',
            description: 'Placeholder text',
          },
          value: {
            type: 'string',
            default: '',
            description: 'Input value',
          },
          disabled: {
            type: 'boolean',
            default: false,
            description: 'Whether the input is disabled',
          },
          type: {
            type: 'enum',
            values: ['text', 'password', 'email'],
            default: 'text',
            description: 'Input type',
          },
        },
        code: {
          importPath: '@designagent/uistack-core',
        },
        examples: [
          { name: 'Email Input', props: { placeholder: 'Enter your email', type: 'email' } },
          { name: 'Password Input', props: { placeholder: 'Enter password', type: 'password' } },
        ],
      },
    },
    {
      name: 'Card',
      path: 'contracts/Card.contract.json',
      content: {
        $version: '1.0.0',
        name: 'Card',
        description: 'Container component for grouping related content',
        platformTargets: ['web', 'rn'],
        props: {
          padding: {
            type: 'enum',
            values: ['sm', 'md', 'lg'],
            default: 'md',
            description: 'Internal padding size',
          },
        },
        code: {
          importPath: '@designagent/uistack-core',
        },
        examples: [
          { name: 'Default Card', props: { padding: 'md' } },
          { name: 'Compact Card', props: { padding: 'sm' } },
        ],
      },
    },
    {
      name: 'Text',
      path: 'contracts/Text.contract.json',
      content: {
        $version: '1.0.0',
        name: 'Text',
        description: 'Typography component for displaying text',
        platformTargets: ['web', 'rn'],
        props: {
          tone: {
            type: 'enum',
            values: ['default', 'muted', 'danger'],
            default: 'default',
            description: 'Text tone/color intent',
          },
          size: {
            type: 'enum',
            values: ['sm', 'md', 'lg'],
            default: 'md',
            description: 'Text size',
          },
          weight: {
            type: 'enum',
            values: ['regular', 'medium', 'semibold', 'bold'],
            default: 'regular',
            description: 'Font weight',
          },
        },
        code: {
          importPath: '@designagent/uistack-core',
        },
        examples: [
          { name: 'Body Text', props: { size: 'md', tone: 'default' } },
          { name: 'Muted Caption', props: { size: 'sm', tone: 'muted' } },
          { name: 'Bold Heading', props: { size: 'lg', weight: 'bold' } },
        ],
      },
    },
  ];
}

// ============================================================
// Main Generator
// ============================================================

export function generatePreset(params: PresetParams, id?: string): PresetJSON {
  const coreTokens = generateCoreTokens(params);
  const semanticLight = generateSemanticTokensLight(params);
  const semanticDark =
    params.mode === 'dark' || params.mode === 'both'
      ? generateSemanticTokensDark(params)
      : undefined;

  const platformRules = generatePlatformRules();
  const contracts = generateContracts();

  return {
    meta: {
      version: 'v3',
      createdAt: new Date().toISOString(),
      source: 'designagent.dev',
      ...(id && { id }),
    },
    system: {
      name: 'My Design System',
      version: '0.1.0',
      defaultPlatform: params.platform,
      defaultTheme: params.mode === 'dark' ? 'dark' : 'light',
      componentSource: { type: 'npm', value: '@designagent/uistack-core' },
    },
    tokens: {
      core: coreTokens,
      semantic: {
        light: semanticLight,
        ...(semanticDark && { dark: semanticDark }),
      },
      platformRules,
    },
    contracts,
    showroom: {
      density: params.density,
      style: params.style,
    },
  };
}

// ============================================================
// Build Preset URL from Params
// ============================================================

export function buildPresetUrl(params: PresetParams, baseUrl: string = ''): string {
  const searchParams = new URLSearchParams();
  
  if (params.platform !== DEFAULT_PARAMS.platform) {
    searchParams.set('platform', params.platform);
  }
  if (params.mode !== DEFAULT_PARAMS.mode) {
    searchParams.set('mode', params.mode);
  }
  if (params.baseColor !== DEFAULT_PARAMS.baseColor) {
    searchParams.set('baseColor', params.baseColor);
  }
  if (params.brand !== DEFAULT_PARAMS.brand) {
    searchParams.set('brand', params.brand.replace('#', ''));
  }
  if (params.radius !== DEFAULT_PARAMS.radius) {
    searchParams.set('radius', params.radius);
  }
  if (params.font !== DEFAULT_PARAMS.font) {
    searchParams.set('font', params.font);
  }
  if (params.density !== DEFAULT_PARAMS.density) {
    searchParams.set('density', params.density);
  }
  if (params.style !== DEFAULT_PARAMS.style) {
    searchParams.set('style', params.style);
  }

  const queryString = searchParams.toString();
  return `${baseUrl}/preset${queryString ? `?${queryString}` : ''}`;
}

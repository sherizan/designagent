'use client';

import { useCallback, useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { Copy, Check, ExternalLink, Sparkles, Moon, Sun, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ShowroomPreview } from '@/components/showroom/ShowroomPreview';
import {
  type PresetParams,
  type PresetJSON,
  type Platform,
  type Mode,
  type BaseColor,
  type RadiusScale,
  type Font,
  type Density,
  type Style,
  DEFAULT_PARAMS,
  buildPresetUrl,
} from '@/lib/preset-generator';

// Segmented control component
function SegmentedControl<T extends string>({
  value,
  onChange,
  options,
}: {
  value: T;
  onChange: (value: T) => void;
  options: { value: T; label: string }[];
}) {
  return (
    <div className="flex rounded-lg bg-muted p-1">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          className={`
            flex-1 px-3 py-1.5 text-sm font-medium rounded-md transition-all
            ${value === option.value
              ? 'bg-background text-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
            }
          `}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

// Copy button component
function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleCopy}
      className="h-8 w-8 p-0"
    >
      {copied ? (
        <Check className="h-4 w-4 text-green-500" />
      ) : (
        <Copy className="h-4 w-4" />
      )}
    </Button>
  );
}

export default function CreatePage() {
  // Preset params state
  const [params, setParams] = useState<PresetParams>(DEFAULT_PARAMS);
  
  // Preset data state
  const [preset, setPreset] = useState<PresetJSON | null>(null);
  const [previewTheme, setPreviewTheme] = useState<'light' | 'dark'>('light');
  
  // Created preset state
  const [createdPreset, setCreatedPreset] = useState<{ id: string; url: string } | null>(null);
  const [creating, setCreating] = useState(false);
  
  // Base URL state (set on client only to avoid hydration mismatch)
  const [baseUrl, setBaseUrl] = useState<string>('');
  
  // Debounce ref
  const fetchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Set base URL on client mount
  useEffect(() => {
    setBaseUrl(window.location.origin);
  }, []);

  // Update a single param
  const updateParam = useCallback(<K extends keyof PresetParams>(key: K, value: PresetParams[K]) => {
    setParams((prev) => ({ ...prev, [key]: value }));
    // Reset created preset when params change
    setCreatedPreset(null);
  }, []);

  // Fetch preset with debounce
  useEffect(() => {
    if (fetchTimeoutRef.current) {
      clearTimeout(fetchTimeoutRef.current);
    }

    fetchTimeoutRef.current = setTimeout(async () => {
      const url = buildPresetUrl(params);
      try {
        const res = await fetch(url);
        if (res.ok) {
          const data = await res.json();
          setPreset(data);
        }
      } catch (err) {
        console.error('Failed to fetch preset:', err);
      }
    }, 300);

    return () => {
      if (fetchTimeoutRef.current) {
        clearTimeout(fetchTimeoutRef.current);
      }
    };
  }, [params]);

  // Update preview theme based on mode
  useEffect(() => {
    if (params.mode === 'dark') {
      setPreviewTheme('dark');
    } else if (params.mode === 'light') {
      setPreviewTheme('light');
    }
    // For 'both', keep current theme selection
  }, [params.mode]);

  // Handle create button click
  const handleCreate = async () => {
    setCreating(true);
    try {
      const res = await fetch('/preset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      });
      if (res.ok) {
        const data = await res.json();
        setCreatedPreset(data);
      }
    } catch (err) {
      console.error('Failed to create preset:', err);
    } finally {
      setCreating(false);
    }
  };

  // Build full URL for display
  const presetUrl = buildPresetUrl(params, baseUrl);
  const shareUrl = createdPreset ? `${baseUrl}${createdPreset.url}` : null;
  const cliCommand = shareUrl ? `npx designagent@latest init --preset "${shareUrl}"` : null;

  return (
    <div className="min-h-screen bg-zinc-50">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold text-zinc-900">DesignAgent</span>
          </Link>
          <nav className="flex items-center gap-4">
            <Link href="/editor" className="text-sm text-zinc-600 hover:text-zinc-900">
              Editor
            </Link>
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-zinc-900 mb-2">Create Design System</h1>
          <p className="text-zinc-600">
            Configure your design tokens and get started with a preset.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left column: Controls */}
          <div className="space-y-6">
            {/* Platform & Mode */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-base">Platform & Theme</CardTitle>
                <CardDescription>Choose your target platform and theme mode</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Platform</Label>
                  <SegmentedControl<Platform>
                    value={params.platform}
                    onChange={(v) => updateParam('platform', v)}
                    options={[
                      { value: 'web', label: 'Web' },
                      { value: 'rn', label: 'React Native' },
                    ]}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Theme Mode</Label>
                  <SegmentedControl<Mode>
                    value={params.mode}
                    onChange={(v) => updateParam('mode', v)}
                    options={[
                      { value: 'light', label: 'Light' },
                      { value: 'dark', label: 'Dark' },
                      { value: 'both', label: 'Both' },
                    ]}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Colors */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-base flex items-center gap-2">
                  <Palette className="w-4 h-4" />
                  Colors
                </CardTitle>
                <CardDescription>Define your color palette</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Base Neutral</Label>
                  <Select
                    value={params.baseColor}
                    onValueChange={(v) => updateParam('baseColor', v as BaseColor)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select base color" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="zinc">Zinc</SelectItem>
                      <SelectItem value="slate">Slate</SelectItem>
                      <SelectItem value="gray">Gray</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Brand Color</Label>
                  <div className="flex gap-2">
                    <div className="relative">
                      <input
                        type="color"
                        value={params.brand}
                        onChange={(e) => updateParam('brand', e.target.value)}
                        className="w-12 h-9 rounded-md border border-input cursor-pointer"
                      />
                    </div>
                    <Input
                      value={params.brand}
                      onChange={(e) => updateParam('brand', e.target.value)}
                      placeholder="#1D4ED8"
                      className="flex-1 font-mono text-sm"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Typography & Shape */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-base">Typography & Shape</CardTitle>
                <CardDescription>Font family and border radius</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Font Family</Label>
                  <Select
                    value={params.font}
                    onValueChange={(v) => updateParam('font', v as Font)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select font" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="system">System UI</SelectItem>
                      <SelectItem value="inter">Inter</SelectItem>
                      <SelectItem value="geist">Geist</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Border Radius</Label>
                  <SegmentedControl<RadiusScale>
                    value={params.radius}
                    onChange={(v) => updateParam('radius', v)}
                    options={[
                      { value: 'none', label: '0' },
                      { value: 'sm', label: 'S' },
                      { value: 'md', label: 'M' },
                      { value: 'lg', label: 'L' },
                      { value: 'xl', label: 'XL' },
                    ]}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Density & Style */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-base">Density & Style</CardTitle>
                <CardDescription>Component spacing and visual style</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Density</Label>
                  <SegmentedControl<Density>
                    value={params.density}
                    onChange={(v) => updateParam('density', v)}
                    options={[
                      { value: 'compact', label: 'Compact' },
                      { value: 'comfortable', label: 'Comfortable' },
                    ]}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Style</Label>
                  <SegmentedControl<Style>
                    value={params.style}
                    onChange={(v) => updateParam('style', v)}
                    options={[
                      { value: 'maia', label: 'Maia' },
                      { value: 'classic', label: 'Classic' },
                    ]}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Create Action */}
            <Card className="border-2 border-dashed">
              <CardContent className="pt-6">
                <Button
                  onClick={handleCreate}
                  disabled={creating}
                  className="w-full h-12 text-base"
                >
                  {creating ? 'Creating...' : 'Create Preset'}
                </Button>
                
                {/* Preview URL */}
                <div className="mt-4 p-3 bg-muted rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-muted-foreground">Preview URL</span>
                    <CopyButton text={presetUrl} />
                  </div>
                  <code className="text-xs text-muted-foreground break-all">{presetUrl}</code>
                </div>

                {/* Created preset info */}
                {createdPreset && (
                  <div className="mt-4 space-y-3">
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-medium text-green-800">Share Link</span>
                        <div className="flex items-center gap-1">
                          <CopyButton text={shareUrl!} />
                          <a
                            href={shareUrl!}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 text-green-600 hover:text-green-800"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </div>
                      </div>
                      <code className="text-xs text-green-700 break-all">{shareUrl}</code>
                    </div>
                    <div className="p-3 bg-zinc-100 rounded-lg">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-medium text-zinc-600">CLI Command</span>
                        <CopyButton text={cliCommand!} />
                      </div>
                      <code className="text-xs text-zinc-700 break-all font-mono">{cliCommand}</code>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right column: Preview */}
          <div className="lg:sticky lg:top-20 lg:h-[calc(100vh-8rem)]">
            <Card className="h-full flex flex-col">
              <CardHeader className="pb-2 flex-shrink-0">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">Preview</CardTitle>
                  {params.mode === 'both' && (
                    <Tabs value={previewTheme} onValueChange={(v) => setPreviewTheme(v as 'light' | 'dark')}>
                      <TabsList className="h-8">
                        <TabsTrigger value="light" className="h-6 px-2 text-xs">
                          <Sun className="w-3 h-3 mr-1" />
                          Light
                        </TabsTrigger>
                        <TabsTrigger value="dark" className="h-6 px-2 text-xs">
                          <Moon className="w-3 h-3 mr-1" />
                          Dark
                        </TabsTrigger>
                      </TabsList>
                    </Tabs>
                  )}
                </div>
              </CardHeader>
              <CardContent className="flex-1 p-0 overflow-hidden">
                <div className="h-full min-h-[600px] rounded-b-xl overflow-hidden">
                  <ShowroomPreview
                    preset={preset}
                    theme={previewTheme}
                    density={params.density}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

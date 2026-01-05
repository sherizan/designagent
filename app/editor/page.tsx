'use client';

import { useCallback, useEffect, useState } from 'react';
import { FileExplorer } from '@/components/editor/FileExplorer';
import { JsonEditor } from '@/components/editor/JsonEditor';
import { ErrorsPanel } from '@/components/editor/ErrorsPanel';
import { PreviewPane } from '@/components/editor/PreviewPane';
import { McpConnectPanel } from '@/components/editor/McpConnectPanel';
import { TopBar } from '@/components/editor/TopBar';

interface FileNode {
  name: string;
  path: string;
  type: 'file' | 'directory';
}

interface GroupedTree {
  system: FileNode | null;
  tokens: FileNode[];
  contracts: FileNode[];
}

interface WorkspaceInfo {
  workspaceId: string;
  workspacePath: string;
  tree: GroupedTree;
}

interface ValidationError {
  file: string;
  message: string;
  line?: number;
  column?: number;
  level: 'error' | 'warn';
}

interface SystemJson {
  name: string;
  version: string;
  defaultPlatform?: 'web' | 'rn';
  defaultTheme?: 'light' | 'dark';
}

const STORAGE_KEY = 'designagent_workspace_id';

export default function EditorPage() {
  // Workspace state
  const [workspaceId, setWorkspaceId] = useState<string | null>(null);
  const [workspacePath, setWorkspacePath] = useState<string>('');
  const [tree, setTree] = useState<GroupedTree | null>(null);
  const [workspaceName, setWorkspaceName] = useState<string>('Loading...');
  
  // Editor state
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [fileContent, setFileContent] = useState<string>('');
  const [originalContent, setOriginalContent] = useState<string>('');
  const [saving, setSaving] = useState(false);
  
  // Validation state
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [showErrors, setShowErrors] = useState(false);
  const [validating, setValidating] = useState(false);
  
  // Preview state
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [previewLoading, setPreviewLoading] = useState(false);
  
  // Settings state
  const [platform, setPlatform] = useState<'web' | 'rn'>('web');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // Check if content is dirty (modified)
  const dirty = fileContent !== originalContent;

  // Initialize workspace
  useEffect(() => {
    const initWorkspace = async () => {
      // Check localStorage for existing workspace
      const storedId = localStorage.getItem(STORAGE_KEY);
      
      if (storedId) {
        // Try to load existing workspace
        try {
          const treeRes = await fetch(`/api/workspaces/${storedId}/tree`);
          if (treeRes.ok) {
            const { tree } = await treeRes.json();
            setWorkspaceId(storedId);
            setTree(tree);
            
            // Load system.json for workspace name and defaults
            const systemRes = await fetch(`/api/workspaces/${storedId}/file?path=system.json`);
            if (systemRes.ok) {
              const { content } = await systemRes.json();
              try {
                const system: SystemJson = JSON.parse(content);
                setWorkspaceName(system.name || 'Untitled');
                if (system.defaultPlatform) setPlatform(system.defaultPlatform);
                if (system.defaultTheme) setTheme(system.defaultTheme);
              } catch {
                setWorkspaceName('Untitled');
              }
            }
            
            // Get workspace path (approximate - we don't have it stored)
            setWorkspacePath(`~/.designagent/workspaces/${storedId}`);
            
            return;
          }
        } catch {
          // Workspace doesn't exist anymore, create new one
        }
      }
      
      // Create new workspace
      try {
        const res = await fetch('/api/workspaces/create', { method: 'POST' });
        if (!res.ok) throw new Error('Failed to create workspace');
        
        const data: WorkspaceInfo = await res.json();
        setWorkspaceId(data.workspaceId);
        setWorkspacePath(data.workspacePath);
        setTree(data.tree);
        localStorage.setItem(STORAGE_KEY, data.workspaceId);
        
        // Load system.json for name
        const systemRes = await fetch(`/api/workspaces/${data.workspaceId}/file?path=system.json`);
        if (systemRes.ok) {
          const { content } = await systemRes.json();
          try {
            const system: SystemJson = JSON.parse(content);
            setWorkspaceName(system.name || 'Untitled');
          } catch {
            setWorkspaceName('Untitled');
          }
        }
      } catch (err) {
        console.error('Failed to create workspace:', err);
      }
    };

    initWorkspace();
  }, []);

  // Start preview when workspace is ready
  useEffect(() => {
    if (!workspaceId) return;

    const startPreview = async () => {
      setPreviewLoading(true);
      try {
        const res = await fetch('/api/preview/start', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ workspaceId }),
        });
        if (res.ok) {
          const { url } = await res.json();
          setPreviewUrl(url);
        }
      } catch (err) {
        console.error('Failed to start preview:', err);
      } finally {
        setPreviewLoading(false);
      }
    };

    startPreview();

    // Cleanup on unmount
    return () => {
      fetch('/api/preview/stop', { method: 'POST' }).catch(() => {});
    };
  }, [workspaceId]);

  // Load file content when selection changes
  useEffect(() => {
    if (!workspaceId || !selectedFile) return;

    const loadFile = async () => {
      try {
        const res = await fetch(
          `/api/workspaces/${workspaceId}/file?path=${encodeURIComponent(selectedFile)}`
        );
        if (res.ok) {
          const { content } = await res.json();
          setFileContent(content);
          setOriginalContent(content);
        }
      } catch (err) {
        console.error('Failed to load file:', err);
      }
    };

    loadFile();
  }, [workspaceId, selectedFile]);

  // Save file
  const handleSave = useCallback(async () => {
    if (!workspaceId || !selectedFile || !dirty) return;

    setSaving(true);
    try {
      const res = await fetch(
        `/api/workspaces/${workspaceId}/file?path=${encodeURIComponent(selectedFile)}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ content: fileContent }),
        }
      );

      if (res.ok) {
        setOriginalContent(fileContent);
        // Auto-validate after save
        handleValidate();
      }
    } catch (err) {
      console.error('Failed to save file:', err);
    } finally {
      setSaving(false);
    }
  }, [workspaceId, selectedFile, fileContent, dirty]);

  // Validate workspace
  const handleValidate = useCallback(async () => {
    if (!workspaceId) return;

    setValidating(true);
    try {
      const res = await fetch(`/api/workspaces/${workspaceId}/validate`, {
        method: 'POST',
      });
      if (res.ok) {
        const { errors: newErrors } = await res.json();
        setErrors(newErrors);
        setShowErrors(newErrors.length > 0);
      }
    } catch (err) {
      console.error('Failed to validate:', err);
    } finally {
      setValidating(false);
    }
  }, [workspaceId]);

  // Update platform/theme in system.json
  const handlePlatformChange = useCallback(
    async (newPlatform: 'web' | 'rn') => {
      if (!workspaceId) return;
      setPlatform(newPlatform);

      // Update system.json
      try {
        const res = await fetch(
          `/api/workspaces/${workspaceId}/file?path=system.json`
        );
        if (res.ok) {
          const { content } = await res.json();
          const system = JSON.parse(content);
          system.defaultPlatform = newPlatform;

          await fetch(
            `/api/workspaces/${workspaceId}/file?path=system.json`,
            {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ content: JSON.stringify(system, null, 2) }),
            }
          );
        }
      } catch (err) {
        console.error('Failed to update platform:', err);
      }
    },
    [workspaceId]
  );

  const handleThemeChange = useCallback(
    async (newTheme: 'light' | 'dark') => {
      if (!workspaceId) return;
      setTheme(newTheme);

      // Update system.json
      try {
        const res = await fetch(
          `/api/workspaces/${workspaceId}/file?path=system.json`
        );
        if (res.ok) {
          const { content } = await res.json();
          const system = JSON.parse(content);
          system.defaultTheme = newTheme;

          await fetch(
            `/api/workspaces/${workspaceId}/file?path=system.json`,
            {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ content: JSON.stringify(system, null, 2) }),
            }
          );
        }
      } catch (err) {
        console.error('Failed to update theme:', err);
      }
    },
    [workspaceId]
  );

  // Refresh file tree
  const refreshTree = useCallback(async () => {
    if (!workspaceId) return;
    try {
      const res = await fetch(`/api/workspaces/${workspaceId}/tree`);
      if (res.ok) {
        const { tree } = await res.json();
        setTree(tree);
      }
    } catch (err) {
      console.error('Failed to refresh tree:', err);
    }
  }, [workspaceId]);

  // Refresh preview
  const handleRefreshPreview = useCallback(() => {
    if (previewUrl) {
      // Force iframe refresh by updating the URL with a timestamp
      const url = new URL(previewUrl);
      url.searchParams.set('_t', Date.now().toString());
      setPreviewUrl(url.toString());
    }
  }, [previewUrl]);

  return (
    <div className="h-screen flex flex-col bg-zinc-50">
      {/* Top bar */}
      <TopBar
        workspaceName={workspaceName}
        platform={platform}
        theme={theme}
        onPlatformChange={handlePlatformChange}
        onThemeChange={handleThemeChange}
        onValidate={handleValidate}
        validating={validating}
        hasErrors={errors.some((e) => e.level === 'error')}
        previewRunning={!!previewUrl && !previewLoading}
        saving={saving}
        dirty={dirty}
        onSave={handleSave}
      />

      {/* Main content */}
      <div className="flex-1 flex min-h-0">
        {/* File explorer */}
        <div className="w-56 border-r border-zinc-200 bg-white flex-shrink-0">
          <FileExplorer
            tree={tree}
            selectedFile={selectedFile}
            onSelectFile={setSelectedFile}
          />
        </div>

        {/* Editor */}
        <div className="flex-1 flex flex-col min-w-0">
          <div className="flex-1 min-h-0">
            {selectedFile ? (
              <JsonEditor
                value={fileContent}
                onChange={setFileContent}
                onSave={handleSave}
                fileName={selectedFile}
              />
            ) : (
              <div className="h-full flex items-center justify-center text-zinc-500 text-sm">
                Select a file to edit
              </div>
            )}
          </div>

          {/* Errors panel */}
          {showErrors && (
            <ErrorsPanel
              errors={errors}
              onClose={() => setShowErrors(false)}
              onErrorClick={(error) => {
                if (error.file !== selectedFile) {
                  setSelectedFile(error.file);
                }
              }}
            />
          )}
        </div>

        {/* Preview */}
        <div className="w-96 border-l border-zinc-200 bg-white flex-shrink-0 flex flex-col">
          <div className="flex-1 min-h-0">
            <PreviewPane
              url={previewUrl}
              loading={previewLoading}
              onRefresh={handleRefreshPreview}
            />
          </div>
        </div>
      </div>

      {/* MCP Connect panel */}
      <McpConnectPanel workspacePath={workspacePath} />
    </div>
  );
}

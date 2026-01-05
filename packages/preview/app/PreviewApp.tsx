import React, { useEffect, useState } from 'react';

interface Contract {
  name: string;
  description?: string;
  props: Record<string, {
    type: string;
    values?: string[];
    default?: unknown;
    required?: boolean;
    description?: string;
  }>;
  examples?: Array<{
    name?: string;
    props: Record<string, unknown>;
  }>;
}

interface Tokens {
  [key: string]: string | number;
}

interface PreviewState {
  contracts: string[];
  selectedContract: string | null;
  contract: Contract | null;
  tokens: Tokens;
  platform: 'web' | 'rn';
  theme: 'light' | 'dark';
  exampleIndex: number;
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    background: '#fafafa',
  },
  header: {
    padding: '12px 16px',
    borderBottom: '1px solid #e5e7eb',
    background: '#fff',
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  title: {
    fontSize: '14px',
    fontWeight: 600,
    color: '#18181b',
  },
  select: {
    padding: '6px 10px',
    fontSize: '13px',
    border: '1px solid #e5e7eb',
    borderRadius: '6px',
    background: '#fff',
    cursor: 'pointer',
  },
  main: {
    flex: 1,
    display: 'flex',
    overflow: 'hidden',
  },
  sidebar: {
    width: '240px',
    borderRight: '1px solid #e5e7eb',
    background: '#fff',
    overflow: 'auto',
    padding: '12px',
  },
  sidebarTitle: {
    fontSize: '11px',
    fontWeight: 600,
    color: '#71717a',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.05em',
    marginBottom: '8px',
  },
  contractItem: {
    padding: '8px 12px',
    fontSize: '13px',
    borderRadius: '6px',
    cursor: 'pointer',
    marginBottom: '2px',
  },
  preview: {
    flex: 1,
    padding: '24px',
    overflow: 'auto',
  },
  componentBox: {
    background: '#fff',
    borderRadius: '12px',
    border: '1px solid #e5e7eb',
    padding: '24px',
    marginBottom: '16px',
  },
  componentName: {
    fontSize: '16px',
    fontWeight: 600,
    color: '#18181b',
    marginBottom: '4px',
  },
  componentDesc: {
    fontSize: '13px',
    color: '#71717a',
    marginBottom: '16px',
  },
  exampleTitle: {
    fontSize: '12px',
    fontWeight: 500,
    color: '#71717a',
    marginBottom: '8px',
  },
  exampleBox: {
    background: '#fafafa',
    borderRadius: '8px',
    padding: '16px',
    marginBottom: '12px',
  },
  propsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '12px',
    marginTop: '16px',
  },
  propItem: {
    background: '#f4f4f5',
    borderRadius: '6px',
    padding: '10px 12px',
  },
  propName: {
    fontSize: '12px',
    fontWeight: 600,
    color: '#18181b',
  },
  propValue: {
    fontSize: '12px',
    color: '#71717a',
    marginTop: '2px',
  },
  tokenSection: {
    marginTop: '24px',
  },
  tokenGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
    gap: '8px',
    marginTop: '8px',
  },
  tokenItem: {
    background: '#fff',
    border: '1px solid #e5e7eb',
    borderRadius: '6px',
    padding: '8px 10px',
    fontSize: '11px',
  },
  tokenName: {
    color: '#71717a',
    marginBottom: '2px',
    wordBreak: 'break-all' as const,
  },
  tokenValue: {
    fontFamily: 'monospace',
    color: '#18181b',
  },
  colorSwatch: {
    width: '16px',
    height: '16px',
    borderRadius: '4px',
    border: '1px solid #e5e7eb',
    display: 'inline-block',
    marginRight: '6px',
    verticalAlign: 'middle',
  },
  empty: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    color: '#71717a',
    fontSize: '14px',
  },
};

export function PreviewApp() {
  const [state, setState] = useState<PreviewState>({
    contracts: [],
    selectedContract: null,
    contract: null,
    tokens: {},
    platform: 'web',
    theme: 'light',
    exampleIndex: 0,
  });
  const [loading, setLoading] = useState(true);

  // Fetch contracts list
  useEffect(() => {
    fetch('/api/contracts')
      .then((res) => res.json())
      .then((data) => {
        setState((s) => ({
          ...s,
          contracts: data.contracts || [],
          selectedContract: data.contracts?.[0] || null,
        }));
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  // Fetch selected contract
  useEffect(() => {
    if (!state.selectedContract) return;

    fetch(`/api/contracts/${state.selectedContract}`)
      .then((res) => res.json())
      .then((data) => {
        setState((s) => ({ ...s, contract: data.contract, exampleIndex: 0 }));
      })
      .catch(console.error);
  }, [state.selectedContract]);

  // Fetch tokens
  useEffect(() => {
    fetch(`/api/tokens/${state.platform}/${state.theme}`)
      .then((res) => res.json())
      .then((data) => {
        setState((s) => ({ ...s, tokens: data.tokens || {} }));
      })
      .catch(console.error);
  }, [state.platform, state.theme]);

  if (loading) {
    return <div style={styles.empty}>Loading...</div>;
  }

  const { contracts, selectedContract, contract, tokens, platform, theme } = state;

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <span style={styles.title}>DesignAgent Preview</span>
        <select
          style={styles.select}
          value={platform}
          onChange={(e) =>
            setState((s) => ({ ...s, platform: e.target.value as 'web' | 'rn' }))
          }
        >
          <option value="web">Web</option>
          <option value="rn">React Native</option>
        </select>
        <select
          style={styles.select}
          value={theme}
          onChange={(e) =>
            setState((s) => ({ ...s, theme: e.target.value as 'light' | 'dark' }))
          }
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </header>

      <div style={styles.main}>
        <aside style={styles.sidebar}>
          <div style={styles.sidebarTitle}>Components</div>
          {contracts.length === 0 ? (
            <div style={{ fontSize: '13px', color: '#71717a' }}>No contracts found</div>
          ) : (
            contracts.map((name) => (
              <div
                key={name}
                style={{
                  ...styles.contractItem,
                  background: name === selectedContract ? '#f4f4f5' : 'transparent',
                  color: name === selectedContract ? '#18181b' : '#71717a',
                }}
                onClick={() => setState((s) => ({ ...s, selectedContract: name }))}
              >
                {name}
              </div>
            ))
          )}
        </aside>

        <main style={styles.preview}>
          {contract ? (
            <>
              <div style={styles.componentBox}>
                <div style={styles.componentName}>{contract.name}</div>
                {contract.description && (
                  <div style={styles.componentDesc}>{contract.description}</div>
                )}

                {contract.examples && contract.examples.length > 0 && (
                  <>
                    <div style={styles.exampleTitle}>
                      Example: {contract.examples[state.exampleIndex]?.name || `#${state.exampleIndex + 1}`}
                    </div>
                    <div style={styles.exampleBox}>
                      <div style={styles.propsGrid}>
                        {Object.entries(contract.examples[state.exampleIndex]?.props || {}).map(
                          ([key, value]) => (
                            <div key={key} style={styles.propItem}>
                              <div style={styles.propName}>{key}</div>
                              <div style={styles.propValue}>{String(value)}</div>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                    {contract.examples.length > 1 && (
                      <div style={{ display: 'flex', gap: '8px' }}>
                        {contract.examples.map((ex, i) => (
                          <button
                            key={i}
                            style={{
                              ...styles.select,
                              background: i === state.exampleIndex ? '#18181b' : '#fff',
                              color: i === state.exampleIndex ? '#fff' : '#18181b',
                            }}
                            onClick={() => setState((s) => ({ ...s, exampleIndex: i }))}
                          >
                            {ex.name || `Example ${i + 1}`}
                          </button>
                        ))}
                      </div>
                    )}
                  </>
                )}

                <div style={{ marginTop: '20px' }}>
                  <div style={styles.exampleTitle}>Props Schema</div>
                  <div style={styles.propsGrid}>
                    {Object.entries(contract.props).map(([key, prop]) => (
                      <div key={key} style={styles.propItem}>
                        <div style={styles.propName}>
                          {key}
                          {prop.required && <span style={{ color: '#ef4444' }}> *</span>}
                        </div>
                        <div style={styles.propValue}>
                          {prop.type}
                          {prop.values && `: ${prop.values.join(' | ')}`}
                          {prop.default !== undefined && ` = ${prop.default}`}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div style={styles.tokenSection}>
                <div style={styles.sidebarTitle}>Applied Tokens ({platform} / {theme})</div>
                <div style={styles.tokenGrid}>
                  {Object.entries(tokens).slice(0, 20).map(([key, value]) => (
                    <div key={key} style={styles.tokenItem}>
                      <div style={styles.tokenName}>{key}</div>
                      <div style={styles.tokenValue}>
                        {typeof value === 'string' && value.startsWith('#') && (
                          <span style={{ ...styles.colorSwatch, background: value }} />
                        )}
                        {String(value)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div style={styles.empty}>Select a component to preview</div>
          )}
        </main>
      </div>
    </div>
  );
}

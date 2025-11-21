// Global type declarations for custom window properties

interface Window {
  mermaid?: {
    initialize: (config: any) => void;
    run: (options?: { querySelector?: string }) => Promise<void>;
  };
  mermaidLoaded?: boolean;
}

// Augment CSSStyleDeclaration to include webkit prefixed properties
interface CSSStyleDeclaration {
  webkitBackdropFilter: string;
}

'use client';

import Link from 'next/link';
import React, { memo, useEffect, useMemo, useState } from 'react';
import { Streamdown, type StreamdownProps } from 'streamdown';
import { useTheme } from 'next-themes';
import { codeToHtml } from 'shiki';

type Components = StreamdownProps['components'];

// Simple inline copy button used inside code fences
function CopyButton({ getText }: { getText: () => string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const id = setTimeout(() => setCopied(false), 1500);
    return () => clearTimeout(id);
  }, [copied]);

  return (
    <button
      type="button"
      aria-label="Kodu kopyala"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(getText());
          setCopied(true);
        } catch {
          // noop
        }
      }}
      className="absolute top-2 right-2 rounded-md px-2 py-1 text-xs bg-muted/80 hover:bg-muted transition-colors"
    >
      {copied ? 'Kopyalandı' : 'Kopyala'}
    </button>
  );
}

// Custom code block with Shiki and theme-aware colors
function ThemedCodeBlock({
  node,
  className,
  children,
}: {
  node?: any;
  className?: string;
  children?: any;
}) {
  const { resolvedTheme } = useTheme();

  // language detection from remark/rehype className e.g. language-ts
  const language = useMemo(() => {
    const cls =
      typeof node?.properties?.className === 'string'
        ? node.properties.className
        : Array.isArray(node?.properties?.className)
          ? node.properties.className.join(' ')
          : '';
    const match = cls.replace(/,/g, ' ').match(/language-([\w-]+)/);
    return match?.[1] ?? 'plaintext';
  }, [node]);

  const code = useMemo(() => {
    if (typeof children === 'string') return children;
    if (children && typeof children?.props?.children === 'string') {
      return children.props.children;
    }
    return '';
  }, [children]);

  const [html, setHtml] = useState('');

  useEffect(() => {
    let mounted = true;
    const theme = resolvedTheme === 'dark' ? 'github-dark' : 'github-light';
    codeToHtml(code, { lang: language, theme }).then((result) => {
      if (mounted) setHtml(result);
    });
    return () => {
      mounted = false;
    };
  }, [code, language, resolvedTheme]);

  return (
    <div
      className={`group relative my-4 rounded-lg border bg-background ${className ?? ''}`}
    >
      <div
        className="overflow-x-auto p-4"
        dangerouslySetInnerHTML={{ __html: html }}
      />
      <CopyButton getText={() => code} />
    </div>
  );
}

const components: Partial<Components> = {
  a: ({ node, children, ...props }) => {
    return (
      // @ts-expect-error
      <Link
        className="text-blue-500 hover:underline"
        target="_blank"
        rel="noreferrer"
        {...props}
      >
        {children}
      </Link>
    );
  },
  // Inline code
  code: ({ node, className, ...props }) => (
    <code
      className={`rounded bg-muted px-1.5 py-0.5 font-mono text-sm ${className ?? ''}`}
      {...props}
    />
  ),
  // Fenced code blocks
  pre: (props) => <ThemedCodeBlock {...props} />,
};

const NonMemoizedMarkdown = ({ children }: { children: string }) => (
  <Streamdown components={components}>{children}</Streamdown>
);

export const Markdown = memo(
  NonMemoizedMarkdown,
  (prevProps, nextProps) => prevProps.children === nextProps.children,
);

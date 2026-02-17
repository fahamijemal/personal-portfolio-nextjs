"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

type MarkdownContentProps = {
  content: string;
  className?: string;
};

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export function MarkdownContent({ content, className = "" }: MarkdownContentProps) {
  const components = {
    h2: ({ children, ...props }: { children?: React.ReactNode }) => (
      <h2 id={slugify(String(children ?? ""))} className="scroll-mt-24" {...props}>
        {children}
      </h2>
    ),
    h3: ({ children, ...props }: { children?: React.ReactNode }) => (
      <h3 id={slugify(String(children ?? ""))} className="scroll-mt-24" {...props}>
        {children}
      </h3>
    ),
    a: ({ href, children }: { href?: string; children?: React.ReactNode }) => (
      <a
        href={href}
        target={href?.startsWith("http") ? "_blank" : undefined}
        rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
        className="text-primary underline underline-offset-4 hover:no-underline"
      >
        {children}
      </a>
    ),
    pre: ({ children }: { children?: React.ReactNode }) => (
      <pre className="overflow-x-auto rounded-lg border border-border bg-muted/50 p-4">
        {children}
      </pre>
    ),
    code: ({ className, children, ...props }: { className?: string; children?: React.ReactNode }) => {
      const isInline = !className;
      if (isInline) {
        return (
          <code
            className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm"
            {...props}
          >
            {children}
          </code>
        );
      }
      return (
        <code className={className} {...props}>
          {children}
        </code>
      );
    },
  };

  return (
    <div className={`blog-prose max-w-none ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={components}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

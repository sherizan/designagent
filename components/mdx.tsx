import Link from "next/link";
import type {
  AnchorHTMLAttributes,
  HTMLAttributes,
  OlHTMLAttributes,
} from "react";

export const mdxComponents = {
  h2: (props: HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className="mt-10 mb-3 text-xl font-semibold tracking-tight text-foreground"
      {...props}
    />
  ),
  h3: (props: HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className="mt-8 mb-2 text-lg font-semibold tracking-tight text-foreground"
      {...props}
    />
  ),
  p: (props: HTMLAttributes<HTMLParagraphElement>) => (
    <p className="my-4 leading-relaxed text-muted" {...props} />
  ),
  ul: (props: HTMLAttributes<HTMLUListElement>) => (
    <ul className="my-4 list-disc space-y-1.5 pl-5 text-muted" {...props} />
  ),
  ol: (props: OlHTMLAttributes<HTMLOListElement>) => (
    <ol className="my-4 list-decimal space-y-1.5 pl-5 text-muted" {...props} />
  ),
  li: (props: HTMLAttributes<HTMLLIElement>) => (
    <li className="leading-relaxed" {...props} />
  ),
  a: ({ href = "#", ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const internal = href.startsWith("/");
    const className =
      "text-accent underline-offset-4 transition-colors hover:underline";
    return internal ? (
      <Link href={href} className={className} {...props} />
    ) : (
      <a href={href} className={className} {...props} />
    );
  },
  code: (props: HTMLAttributes<HTMLElement>) => (
    <code
      className="rounded bg-card px-1.5 py-0.5 font-mono text-[0.85em] text-accent"
      {...props}
    />
  ),
  pre: (props: HTMLAttributes<HTMLPreElement>) => (
    <pre
      className="my-5 overflow-x-auto rounded-xl border border-border bg-card/60 p-4 font-mono text-sm leading-relaxed [&_code]:bg-transparent [&_code]:p-0 [&_code]:text-foreground"
      {...props}
    />
  ),
  strong: (props: HTMLAttributes<HTMLElement>) => (
    <strong className="font-semibold text-foreground" {...props} />
  ),
  hr: () => <hr className="my-10 border-border" />,
};

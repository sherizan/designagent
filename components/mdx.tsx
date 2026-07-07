import Link from "next/link";
import type {
  AnchorHTMLAttributes,
  HTMLAttributes,
  OlHTMLAttributes,
} from "react";

export const mdxComponents = {
  h2: (props: HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="text-heading-md mt-10 mb-3 text-on-surface" {...props} />
  ),
  h3: (props: HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="text-heading-sm mt-8 mb-2 text-on-surface" {...props} />
  ),
  p: (props: HTMLAttributes<HTMLParagraphElement>) => (
    <p className="text-body-lg my-4 text-on-surface-muted" {...props} />
  ),
  ul: (props: HTMLAttributes<HTMLUListElement>) => (
    <ul
      className="text-body-lg my-4 list-disc space-y-1.5 pl-5 text-on-surface-muted"
      {...props}
    />
  ),
  ol: (props: OlHTMLAttributes<HTMLOListElement>) => (
    <ol
      className="text-body-lg my-4 list-decimal space-y-1.5 pl-5 text-on-surface-muted"
      {...props}
    />
  ),
  li: (props: HTMLAttributes<HTMLLIElement>) => <li {...props} />,
  a: ({ href = "#", ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const internal = href.startsWith("/");
    const className =
      "text-on-surface underline underline-offset-4 decoration-on-surface-faint transition-colors hover:decoration-on-surface";
    return internal ? (
      <Link href={href} className={className} {...props} />
    ) : (
      <a href={href} className={className} {...props} />
    );
  },
  code: (props: HTMLAttributes<HTMLElement>) => (
    <code
      className="text-mono-sm rounded-[6px] bg-surface-secondary px-1.5 py-0.5 text-on-surface"
      {...props}
    />
  ),
  pre: (props: HTMLAttributes<HTMLPreElement>) => (
    <pre
      className="card text-mono-sm my-5 overflow-x-auto p-4 text-on-surface [&_code]:bg-transparent [&_code]:p-0"
      {...props}
    />
  ),
  strong: (props: HTMLAttributes<HTMLElement>) => (
    <strong className="font-semibold text-on-surface" {...props} />
  ),
  hr: () => <hr className="my-10 border-border" />,
};

import Link from "next/link";
import { COCO } from "@/lib/voice";

export default function NotFound() {
  return (
    <section className="py-[clamp(64px,12vh,160px)]">
      <p className="text-mono-sm text-on-surface-subtle">404</p>
      <h1 className="text-heading-lg mt-4 max-w-[14ch] text-on-surface">{COCO.notFound.title}</h1>
      <p className="text-body-lg mt-6 max-w-[34ch] text-on-surface-muted">{COCO.notFound.body}</p>
      <Link
        href="/"
        className="text-label-md mt-10 inline-block rounded-full bg-primary px-[18px] py-2.5 text-on-primary transition-colors hover:bg-primary-hover"
      >
        Back to DesignAgent
      </Link>
    </section>
  );
}

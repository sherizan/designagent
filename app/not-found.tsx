import Link from "next/link";
import { Coco } from "@/components/Coco";
import { Frame } from "@/components/Frame";
import { COCO } from "@/lib/voice";

export default function NotFound() {
  return (
    <Frame top={false} className="flex flex-col items-center py-28 text-center">
      <Coco size={96} className="text-on-surface" />
      <p className="text-mono-sm mt-4 text-on-surface-subtle">404</p>
      <h1 className="text-heading-lg mt-3 text-on-surface">
        {COCO.notFound.title}
      </h1>
      <p className="text-body-md mt-3 max-w-[440px] text-on-surface-muted">
        {COCO.notFound.body}
      </p>
      <Link
        href="/plugins"
        className="text-label-lg mt-7 rounded-full bg-primary px-[18px] py-2.5 text-on-primary transition-colors hover:bg-primary-hover"
      >
        Browse the plugins
      </Link>
    </Frame>
  );
}

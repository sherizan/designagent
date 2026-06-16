import Link from "next/link";

export function SubmitBanner() {
  return (
    <div className="flex flex-col gap-5 rounded-xl bg-primary px-9 py-8 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-col gap-1.5">
        <p className="text-eyebrow text-on-surface-muted">For builders</p>
        <h3 className="text-heading-sm text-on-primary">
          Built a Claude Code plugin for designers?
        </h3>
        <p className="text-body-sm text-[#777777]">
          Submit it — review is manual and fast. Public repos only.
        </p>
      </div>
      <Link
        href="/submit"
        className="text-label-md w-fit shrink-0 rounded-full bg-on-primary px-[18px] py-2.5 text-primary transition-opacity hover:opacity-90"
      >
        Submit a plugin
      </Link>
    </div>
  );
}

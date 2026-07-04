import Link from "next/link";

export function SubmitBanner() {
  return (
    <div className="flex flex-col gap-6 rounded-xl bg-primary p-8 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
      <div className="flex flex-col gap-2">
        <p className="text-eyebrow text-on-surface-muted">For builders</p>
        <h3 className="text-heading-sm text-on-primary">
          Built a Claude Code plugin for designers?
        </h3>
        <p className="text-body-sm text-[#777777]">
          Submit it. Review is manual and fast. Public repos only.
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

import type { Locale } from "@/i18n/routing";
import { pick, type StoreLink } from "@/content/profile";
import { NewTabHint } from "@/components/NewTabHint";

export function StoreButton({ link, locale, newTabLabel }: { link: StoreLink; locale: Locale; newTabLabel: string }) {
  return (
    <a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-3 rounded-2xl bg-fresh py-2.5 pr-5 pl-4 text-paper shadow-lg shadow-fresh/25 transition-transform hover:-translate-y-0.5"
    >
      <svg viewBox="0 0 24 24" aria-hidden="true" className="size-7 shrink-0" fill="currentColor">
        <path d={link.icon.path} />
      </svg>
      <span className="grid leading-tight">
        <span className="text-xs font-medium">
          <span className="sr-only">{link.app}: </span>
          {pick(link.kicker, locale)}
        </span>
        <span className="text-lg font-semibold tracking-tight">
          {pick(link.label, locale)}
          <NewTabHint label={newTabLabel} arrow={false} />
        </span>
      </span>
    </a>
  );
}

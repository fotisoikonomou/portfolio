"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";

const options = ["el", "en"] as const;

export function LocaleSwitcher() {
  const t = useTranslations("locale");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const next = locale === "el" ? "en" : "el";

  return (
    <button
      type="button"
      onClick={() => router.replace(pathname, { locale: next })}
      className="relative grid h-9 w-[5.5rem] grid-cols-2 items-center rounded-full border border-line p-1 text-xs font-semibold transition-colors hover:border-accent"
    >
      {/* Accessible name = this hidden label + the visible "EL EN", so it contains the visible text (WCAG 2.5.3). */}
      <span lang={next} className="sr-only">
        {t("switchLabel")}:{" "}
      </span>
      {/* Το «χάπι» γλιστράει κάτω από την ενεργή γλώσσα */}
      <span
        aria-hidden="true"
        className={`absolute inset-y-1 left-1 w-[calc(50%-0.25rem)] rounded-full bg-accent transition-transform duration-300 ease-out motion-reduce:transition-none ${
          locale === "en" ? "translate-x-full" : ""
        }`}
      />
      {options.map((o) => (
        <span
          key={o}
          lang={o}
          className={`relative z-10 text-center transition-colors duration-300 ${
            o === locale ? "text-paper" : "text-muted"
          }`}
        >
          {o.toUpperCase()}
        </span>
      ))}
    </button>
  );
}

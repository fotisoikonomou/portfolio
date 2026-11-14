"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";

export function LocaleSwitcher() {
  const t = useTranslations("locale");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const next = locale === "el" ? "en" : "el";
  const code = next.toUpperCase();

  return (
    <button
      type="button"
      lang={next}
      onClick={() => router.replace(pathname, { locale: next })}
      // Shows only the code of the language you switch to; the name still contains that visible text (WCAG 2.5.3).
      aria-label={`${t("switchLabel")} (${code})`}
      title={t("switchLabel")}
      className="grid size-9 place-items-center rounded-full border border-line text-xs font-semibold text-muted transition-colors hover:border-accent hover:text-accent"
    >
      {code}
    </button>
  );
}

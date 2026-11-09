import Image from "next/image";
import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { pick, profile } from "@/content/profile";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";

const sections = ["about", "projects", "experience", "education", "skills", "contact"] as const;

export async function SiteHeader({ locale }: { locale: Locale }) {
  const t = await getTranslations();

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/85 backdrop-blur">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[60] focus:rounded-full focus:bg-accent focus:px-5 focus:py-2.5 focus:font-semibold focus:text-paper"
      >
        {t("a11y.skip")}
      </a>
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-3 md:px-10">
        <a href="#top" className="flex shrink-0 items-center gap-3 text-lg font-semibold tracking-tight">
          <Image
            src="/avatar.png"
            alt=""
            width={40}
            height={40}
            className="size-10 rounded-full border border-line object-cover"
            priority
          />
          {pick(profile.firstName, locale)} {pick(profile.lastName, locale)}
        </a>

        <nav aria-label={t("nav.label")} className="hidden lg:block">
          <ul className="flex gap-6 text-[0.95rem]">
            {sections.map((s) => (
              <li key={s}>
                <a href={`#${s}`} className="text-muted transition-colors hover:text-accent">
                  {t(`nav.${s}`)}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <a
            href={profile.cv[locale]}
            download
            className="mr-2 hidden text-sm font-medium text-accent underline-offset-4 hover:underline sm:inline"
          >
            {t("cv.download")}
          </a>
          <LocaleSwitcher />
          <ThemeToggle />
        </div>
      </div>

      {/* Σε μικρές οθόνες το μενού γίνεται δεύτερη γραμμή με οριζόντιο scroll */}
      <nav aria-label={t("nav.label")} className="border-t border-line lg:hidden">
        <ul className="mx-auto flex max-w-6xl gap-5 overflow-x-auto whitespace-nowrap px-6 py-2.5 text-sm md:px-10">
          {sections.map((s) => (
            <li key={s}>
              <a href={`#${s}`} className="text-muted transition-colors hover:text-accent">
                {t(`nav.${s}`)}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

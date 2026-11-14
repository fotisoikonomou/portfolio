import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { pick, profile } from "@/content/profile";
import { NewTabHint } from "@/components/NewTabHint";

export async function Footer({ locale }: { locale: Locale }) {
  const t = await getTranslations();

  return (
    <footer className="flex flex-wrap justify-between gap-4 border-t border-line py-10 text-sm text-muted">
      <p>© {new Date().getFullYear()} {pick(profile.firstName, locale)} {pick(profile.lastName, locale)}</p>
      <p className="flex gap-5">
        <a href={profile.links.github} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-accent">
          GitHub
          <NewTabHint label={t("a11y.newTab")} arrow={false} />
        </a>
        <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-accent">
          LinkedIn
          <NewTabHint label={t("a11y.newTab")} arrow={false} />
        </a>
      </p>
    </footer>
  );
}

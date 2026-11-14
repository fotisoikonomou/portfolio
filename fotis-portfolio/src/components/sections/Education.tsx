import { existsSync } from "node:fs";
import path from "node:path";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { education, pick } from "@/content/profile";
import { NewTabHint } from "@/components/NewTabHint";
import { Section } from "./Section";

// Looks in public/logos/<locale>/ first, then public/logos/ for logos shared by both languages.
function findLogo(name: string, locale: Locale) {
  const candidates = [`${locale}/${name}`, name].flatMap((base) => [".svg", ".png", ".webp"].map((ext) => base + ext));
  const file = candidates.find((f) => existsSync(path.join(process.cwd(), "public", "logos", f)));
  return file ? `/logos/${file}` : undefined;
}

export async function Education({ locale }: { locale: Locale }) {
  const t = await getTranslations();

  return (
    <Section id="education" title={t("education.title")}>
      <ul className="grid gap-5 sm:grid-cols-2">
        {education.map((e) => {
          const logo = findLogo(e.logo, locale);
          return (
            <li
              key={e.title.en}
              className="flex flex-col rounded-3xl border border-line bg-card p-6 shadow-sm transition-shadow hover:shadow-md md:p-8"
            >
              <div className="flex items-start justify-between gap-4">
                {/* Logos carry dark artwork, so they sit on a white plate in both themes. */}
                <div className="flex h-20 max-w-full items-center rounded-2xl border border-line bg-white px-4 py-3">
                  {logo ? (
                    <Image
                      src={logo}
                      alt={pick(e.school, locale)}
                      width={0}
                      height={0}
                      sizes="240px"
                      className="h-full w-auto max-w-full object-contain"
                    />
                  ) : (
                    <span aria-hidden="true" className="px-2 text-xl font-bold tracking-tight text-[#157a45]">
                      {pick(e.monogram, locale)}
                    </span>
                  )}
                </div>
                {e.year && (
                  <p className="shrink-0 rounded-full bg-line/70 px-3 py-1 text-sm tabular-nums text-muted">{e.year}</p>
                )}
              </div>

              <h3 className="mt-5 text-lg font-semibold tracking-tight">{pick(e.title, locale)}</h3>
              <p className="mt-1.5 leading-relaxed text-muted">{pick(e.school, locale)}</p>

              {e.link && (
                <div className="mt-auto pt-5">
                  <a
                    href={pick(e.link, locale)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex rounded-full border border-line px-4 py-1.5 text-sm font-medium text-ink/85 transition-colors hover:border-fresh hover:text-fresh"
                  >
                    {t("education.website")}
                    <span className="sr-only">: {pick(e.school, locale)}</span>
                    <NewTabHint label={t("a11y.newTab")} />
                  </a>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </Section>
  );
}

import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { pick, profile } from "@/content/profile";
import { Section } from "./Section";

const card = "rounded-3xl border border-line bg-card p-8 shadow-sm";
const smallCard = "rounded-3xl border border-line bg-card px-6 py-5 shadow-sm";
const iconButton =
  "grid size-11 place-items-center rounded-full bg-line/70 text-ink transition-colors hover:bg-fresh hover:text-paper";

export async function About({ locale }: { locale: Locale }) {
  const t = await getTranslations();

  return (
    <Section id="about" title={t("about.title")}>
      <div className="grid gap-5 lg:grid-cols-2">
        <div className={card}>
          <h3 className="mb-4 text-lg font-semibold">{t("about.summary")}</h3>
          <div className="grid gap-4 leading-[1.7] text-ink/85">
            <p>{t("about.p1")}</p>
          </div>
        </div>

        {/* The stats card takes any extra height, so the two small cards stay compact. */}
        <div className="flex flex-col gap-5">
          <div className="grid gap-5 sm:grid-cols-[1fr_auto]">
            <div className={`${smallCard} flex items-center justify-center gap-4`}>
              <svg viewBox="0 0 24 24" className="size-9 shrink-0 text-fresh" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12z" />
                <circle cx="12" cy="10" r="2.5" />
              </svg>
              <div>
                <p className="font-semibold">{t("about.basedIn")}</p>
                <p className="text-muted">{t("hero.location")}</p>
                <p className="text-sm font-medium text-fresh">{profile.timezone}</p>
              </div>
            </div>

            <div className={`${smallCard} flex items-center justify-center gap-4`}>
              <p className="whitespace-nowrap font-semibold">{t("about.connect")}</p>
              <div className="flex gap-3">
                <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`LinkedIn ${t("a11y.newTab")}`} className={iconButton}>
                  <svg viewBox="0 0 24 24" className="size-5" fill="currentColor" aria-hidden="true">
                    <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
                  </svg>
                </a>
                <a href={profile.links.github} target="_blank" rel="noopener noreferrer" aria-label={`GitHub ${t("a11y.newTab")}`} className={iconButton}>
                  <svg viewBox="0 0 16 16" className="size-5" fill="currentColor" aria-hidden="true">
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div className="grid flex-1 grid-cols-2 content-center gap-x-3 gap-y-8 rounded-3xl border border-line bg-card px-4 py-8 shadow-sm sm:gap-x-4 sm:p-8">
            {profile.stats.map((s) => (
              <div key={s.label.en} className="min-w-0 text-center sm:px-4">
                <p className="text-3xl font-bold tracking-tight text-fresh min-[400px]:text-4xl sm:text-5xl md:text-6xl">{pick(s.value, locale)}</p>
                <p className="mt-2 text-xs font-medium uppercase tracking-wide text-muted sm:text-sm sm:tracking-wider">{pick(s.label, locale)}</p>
              </div>
            ))}
          </div>
        </div>

        <div className={`${card} lg:col-span-2`}>
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-fresh">{t("about.currentlyLabel")}</p>
          <p className="max-w-4xl text-xl font-medium leading-snug md:text-[1.4rem]">{t("about.currently")}</p>
        </div>
      </div>
    </Section>
  );
}

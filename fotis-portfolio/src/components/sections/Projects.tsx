import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { pick, projects, type ProjectStatus } from "@/content/profile";
import { NewTabHint } from "@/components/NewTabHint";
import { StoreButton } from "@/components/StoreButton";
import { Section } from "./Section";

const statusDot: Record<ProjectStatus, string> = {
  live: "bg-fresh",
  active: "bg-gold",
  design: "bg-accent",
  done: "bg-muted",
};

const pillLink =
  "inline-flex rounded-full border border-line px-4 py-1.5 text-sm font-medium text-ink/85 transition-colors hover:border-fresh hover:text-fresh";

export async function Projects({ locale }: { locale: Locale }) {
  const t = await getTranslations();

  return (
    <Section id="projects" title={t("projects.title")}>
      <ul className="grid gap-5 md:grid-cols-2">
        {projects.map((p) => (
          <li
            key={p.title.en}
            className="flex flex-col rounded-3xl border border-line bg-card p-6 shadow-sm transition-shadow hover:shadow-md md:p-8"
          >
            <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
              <p className="text-sm font-semibold uppercase tracking-wider text-muted">{pick(p.kind, locale)}</p>
              <p className="inline-flex items-center gap-2 rounded-full bg-line/70 px-3 py-1 text-sm text-ink/85">
                <span aria-hidden="true" className={`size-2 rounded-full ${statusDot[p.status]}`} />
                {t(`projects.status.${p.status}`)}
              </p>
            </div>

            <h3 className="mt-4 text-2xl font-semibold tracking-tight">{pick(p.title, locale)}</h3>
            <p className="mt-3 leading-[1.7] text-ink/85">{pick(p.summary, locale)}</p>

            {p.facts && (
              <dl className="mt-6 grid grid-cols-3 gap-3">
                {p.facts.map((f) => (
                  <div key={f.label.en} className="flex flex-col-reverse gap-0.5 rounded-2xl bg-paper px-3 py-3 text-center">
                    <dt className="text-xs text-muted">{pick(f.label, locale)}</dt>
                    <dd className="text-lg font-bold tracking-tight text-fresh md:text-xl">{pick(f.value, locale)}</dd>
                  </div>
                ))}
              </dl>
            )}

            <ul className="mt-6 flex flex-wrap gap-2" aria-label={t("experience.stack")}>
              {p.stack.map((tech) => (
                <li key={tech} className="rounded-full border border-line px-3 py-1 text-sm font-medium text-ink/80">
                  {tech}
                </li>
              ))}
            </ul>

            {(p.stores || p.code || p.demo) && (
              <div className="mt-auto flex flex-wrap items-center gap-3 pt-6">
                {p.stores?.map((link) => (
                  <StoreButton key={link.href} link={link} locale={locale} newTabLabel={t("a11y.newTab")} />
                ))}
                {p.code && (
                  <a href={p.code} target="_blank" rel="noopener noreferrer" className={pillLink}>
                    {t("projects.code")}
                    <NewTabHint label={t("a11y.newTab")} />
                  </a>
                )}
                {p.demo && (
                  <a href={p.demo} target="_blank" rel="noopener noreferrer" className={pillLink}>
                    {t("projects.demo")}
                    <NewTabHint label={t("a11y.newTab")} />
                  </a>
                )}
              </div>
            )}
          </li>
        ))}
      </ul>
    </Section>
  );
}

import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { pick, projects } from "@/content/profile";
import { Section } from "./Section";

export async function Projects({ locale }: { locale: Locale }) {
  const t = await getTranslations();

  return (
    <Section id="projects" title={t("projects.title")}>
      <ul className="grid gap-12">
        {projects.map((p) => (
          <li key={p.title.en} className="grid max-w-[65ch] gap-3">
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <h3 className="text-xl font-semibold tracking-tight">{pick(p.title, locale)}</h3>
              <span className={`text-sm ${p.status === "done" ? "text-muted" : "text-gold"}`}>
                {t(`projects.status.${p.status}`)}
              </span>
            </div>
            <p className="leading-[1.7] text-ink/85">{pick(p.summary, locale)}</p>
            <p className="text-sm text-muted">{p.stack.join(", ")}</p>
            {(p.code || p.demo) && (
              <p className="flex gap-5 text-sm font-medium">
                {p.code && <a href={p.code} className="text-accent underline-offset-4 hover:underline">{t("projects.code")}</a>}
                {p.demo && <a href={p.demo} className="text-accent underline-offset-4 hover:underline">{t("projects.demo")}</a>}
              </p>
            )}
          </li>
        ))}
      </ul>
    </Section>
  );
}

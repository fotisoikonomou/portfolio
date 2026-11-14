import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { experience, pick, profile } from "@/content/profile";
import { NewTabHint } from "@/components/NewTabHint";
import { StoreButton } from "@/components/StoreButton";
import { Section } from "./Section";

export async function Experience({ locale }: { locale: Locale }) {
  const t = await getTranslations();

  return (
    <Section id="experience" title={t("experience.title")}>
      <ol className="relative grid gap-6 md:pl-10">
        <span aria-hidden="true" className="absolute top-4 bottom-4 left-[0.6875rem] hidden w-px bg-line md:block" />
        {experience.map((job) => (
          <li key={job.org.en + job.period} className="relative">
            <span
              aria-hidden="true"
              className="absolute top-9 -left-10 hidden size-6 place-items-center rounded-full border border-line bg-paper md:grid"
            >
              <span className="size-2.5 rounded-full bg-fresh" />
            </span>

            <article className="rounded-3xl border border-line bg-card p-6 shadow-sm transition-shadow hover:shadow-md md:p-8">
              <header className="flex flex-wrap items-start justify-between gap-x-6 gap-y-3">
                <div>
                  <h3 className="text-xl font-semibold tracking-tight">{pick(job.role, locale)}</h3>
                  <p className="mt-1 font-medium text-fresh">
                    {job.orgUrl ? (
                      <a
                        href={job.orgUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline-offset-4 hover:underline"
                      >
                        {pick(job.org, locale)}
                        <NewTabHint label={t("a11y.newTab")} />
                      </a>
                    ) : (
                      pick(job.org, locale)
                    )}
                  </p>
                </div>
                <p className="rounded-full bg-line/70 px-3 py-1 text-sm tabular-nums text-muted">{job.period}</p>
              </header>

              {pick(job.highlights, locale).length > 0 && (
                <ul className="mt-5 grid max-w-[75ch] gap-2.5 leading-[1.7] text-ink/85">
                  {pick(job.highlights, locale).map((item) => (
                    <li key={item} className="flex gap-3">
                      <span aria-hidden="true" className="mt-[0.7em] size-1.5 shrink-0 rounded-full bg-fresh" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}

              {job.detailsOnLinkedIn && (
                <p className="mt-5 text-ink/85">
                  <a
                    href={profile.links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-fresh underline underline-offset-4 hover:no-underline"
                  >
                    {t("experience.details")}
                    <NewTabHint label={t("a11y.newTab")} />
                  </a>
                </p>
              )}

              {job.links && (
                <div className="mt-6 flex flex-wrap gap-3">
                  {job.links.map((link) => (
                    <StoreButton key={link.href} link={link} locale={locale} newTabLabel={t("a11y.newTab")} />
                  ))}
                </div>
              )}

              {job.stack.length > 0 && (
                <ul className="mt-6 flex flex-wrap gap-2 border-t border-line pt-5" aria-label={t("experience.stack")}>
                  {job.stack.map((tech) => (
                    <li key={tech} className="rounded-full border border-line px-3 py-1 text-sm font-medium text-ink/80">
                      {tech}
                    </li>
                  ))}
                </ul>
              )}
            </article>
          </li>
        ))}
      </ol>
    </Section>
  );
}

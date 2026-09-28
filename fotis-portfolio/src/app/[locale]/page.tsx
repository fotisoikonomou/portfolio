import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { education, experience, pick, profile, projects, skills } from "@/content/profile";
import { SignalTrace } from "@/components/SignalTrace";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";
import { ContactForm } from "@/components/ContactForm";

const sections = ["about", "projects", "experience", "education", "skills", "contact"] as const;

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="border-t border-line py-16 md:py-20">
      <h2 id={`${id}-title`} className="mb-10 text-2xl font-semibold tracking-tight md:text-[1.75rem]">
        {title}
      </h2>
      {children}
    </section>
  );
}

export default async function Home({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  return (
    <div className="mx-auto grid max-w-6xl gap-x-16 px-6 md:grid-cols-[15rem_1fr] md:px-10">
      {/* Αριστερή στήλη */}
      <aside className="pt-8 md:sticky md:top-0 md:flex md:h-dvh md:flex-col md:py-12">
        <div className="flex items-center justify-between gap-3 md:block">
          <a href="#top" className="text-lg font-semibold tracking-tight">
            {pick(profile.firstName, locale)} {pick(profile.lastName, locale)}
          </a>
          <div className="flex gap-2 md:mt-6">
            <LocaleSwitcher />
            <ThemeToggle />
          </div>
        </div>

        <nav aria-label={t("nav.label")} className="mt-10 hidden md:block">
          <ul className="grid gap-2.5 text-[0.95rem]">
            {sections.map((s) => (
              <li key={s}>
                <a href={`#${s}`} className="text-muted transition-colors hover:text-accent">
                  {t(`nav.${s}`)}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-auto hidden gap-2 text-sm md:grid">
          <a href={profile.cv[locale]} download className="font-medium text-accent underline-offset-4 hover:underline">
            {t("cv.download")}
          </a>
          <a href={profile.links.github}     target="_blank" className="text-muted hover:text-accent">GitHub</a>
          <a href={profile.links.linkedin}     target="_blank" className="text-muted hover:text-accent">LinkedIn</a>
        </div>
      </aside>

      {/* Περιεχόμενο */}
      <main id="top" className="min-w-0">
        <header className="pb-16 pt-14 md:pb-20 md:pt-24">
          <p className="mb-6 text-muted">
            {t("hero.role")} / {t("hero.location")}
          </p>
          <h1 className="text-[clamp(3rem,9vw,6.5rem)] font-light leading-[0.95] tracking-[-0.03em]">
            <span className="block">{pick(profile.firstName, locale)}</span>
            <span className="block font-semibold">{pick(profile.lastName, locale)}</span>
          </h1>
          <div className="-mx-2 mt-10">
            <SignalTrace label={t("hero.traceLabel")} />
          </div>
          <p className="mt-8 max-w-[34ch] text-xl leading-relaxed md:text-2xl">{t("hero.lede")}</p>
          <div className="mt-8 flex flex-wrap gap-3 md:hidden">
            <a href={profile.cv[locale]} download className="rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-paper">
              {t("cv.download")}
            </a>
            <a href="#contact" className="rounded-full border border-line px-5 py-2.5 text-sm">
              {t("nav.contact")}
            </a>
          </div>
        </header>

        <Section id="about" title={t("about.title")}>
          <div className="grid max-w-[65ch] gap-5 text-lg leading-[1.7] text-ink/90">
            <p>{t("about.p1")}</p>
            <p>{t("about.p2")}</p>
          </div>
        </Section>

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

        <Section id="experience" title={t("experience.title")}>
          <ol className="grid gap-12">
            {experience.map((job) => (
              <li key={job.org.en + job.period} className="grid gap-2 md:grid-cols-[9rem_1fr] md:gap-8">
                <p className="text-sm tabular-nums text-muted md:pt-1">{job.period}</p>
                <div className="grid max-w-[65ch] gap-3">
                  <h3 className="text-xl font-semibold tracking-tight">
                    {pick(job.role, locale)}
                    <span className="font-normal text-muted">, {pick(job.org, locale)}</span>
                  </h3>
                  <p className="leading-[1.7] text-ink/85">{pick(job.summary, locale)}</p>
                  {job.stack.length > 0 && <p className="text-sm text-muted">{job.stack.join(", ")}</p>}
                </div>
              </li>
            ))}
          </ol>
        </Section>

        <Section id="education" title={t("education.title")}>
          <ul className="grid gap-6 sm:grid-cols-2">
            {education.map((e) => (
              <li key={e.title.en} className="border-l-2 border-accent/40 pl-4">
                <h3 className="font-semibold">
                  {e.link ? (
                    <a
                      href={pick(e.link, locale)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline-offset-4 transition-colors hover:text-accent hover:underline"
                    >
                      {pick(e.title, locale)} ↗
                    </a>
                  ) : (
                    pick(e.title, locale)
                  )}
                </h3>
                <p className="mt-1 text-sm text-muted">
                  {pick(e.school, locale)}
                  {e.year ? `, ${e.year}` : ""}
                </p>
              </li>
            ))}
          </ul>
        </Section>

        <Section id="skills" title={t("skills.title")}>
          <dl className="grid max-w-3xl gap-6 sm:grid-cols-2">
            {skills.map((s) => (
              <div key={s.group.en}>
                <dt className="mb-1.5 font-semibold">{pick(s.group, locale)}</dt>
                <dd className="leading-relaxed text-muted">{s.items.join(", ")}</dd>
              </div>
            ))}
          </dl>
        </Section>

        <Section id="contact" title={t("contact.title")}>
          <p className="mb-8 max-w-[55ch] text-lg leading-relaxed">
            {t("contact.intro")}{" "}
            <a href={`mailto:${profile.email}`} className="text-accent underline-offset-4 hover:underline">
              {profile.email}
            </a>
          </p>
          <ContactForm />
        </Section>

        <footer className="flex flex-wrap justify-between gap-4 border-t border-line py-10 text-sm text-muted">
          <p>© {new Date().getFullYear()} {pick(profile.firstName, locale)} {pick(profile.lastName, locale)}</p>
          <p lang="en" className="italic">{t("footer.motto")}</p>
        </footer>
      </main>
    </div>
  );
}

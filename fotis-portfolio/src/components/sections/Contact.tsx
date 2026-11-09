import { getTranslations } from "next-intl/server";
import { profile } from "@/content/profile";
import { ContactForm } from "@/components/ContactForm";
import { NewTabHint } from "@/components/NewTabHint";
import { Section } from "./Section";

const card = "rounded-3xl border border-line bg-card p-6 shadow-sm md:p-8";
const pillLink =
  "inline-flex rounded-full border border-line px-4 py-1.5 text-sm font-medium text-ink/85 transition-colors hover:border-fresh hover:text-fresh";

export async function Contact() {
  const t = await getTranslations();

  return (
    <Section id="contact" title={t("contact.title")}>
      <div className="grid gap-5 lg:grid-cols-5">
        <div className={`${card} flex flex-col gap-6 lg:col-span-2`}>
          <p className="text-lg leading-relaxed">{t("contact.intro")}</p>

          <a
            href={`mailto:${profile.email}`}
            className="group flex items-center gap-4 rounded-2xl bg-paper px-4 py-3 transition-colors hover:bg-line/60"
          >
            <span className="grid size-11 shrink-0 place-items-center rounded-full bg-fresh text-paper">
              <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="m3 7 9 6 9-6" />
              </svg>
            </span>
            <span className="grid min-w-0">
              <span className="text-sm text-muted">{t("contact.email")}</span>
              <span className="break-all font-medium group-hover:text-fresh">{profile.email}</span>
            </span>
          </a>

          <div className="mt-auto">
            <p className="mb-3 font-semibold">{t("about.connect")}</p>
            <div className="flex flex-wrap gap-2">
              <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer" className={pillLink}>
                LinkedIn
                <NewTabHint label={t("a11y.newTab")} />
              </a>
              <a href={profile.links.github} target="_blank" rel="noopener noreferrer" className={pillLink}>
                GitHub
                <NewTabHint label={t("a11y.newTab")} />
              </a>
            </div>
          </div>
        </div>

        <div className={`${card} lg:col-span-3`}>
          <ContactForm />
        </div>
      </div>
    </Section>
  );
}

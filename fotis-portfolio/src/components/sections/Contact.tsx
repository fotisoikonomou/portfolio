import { getTranslations } from "next-intl/server";
import { profile } from "@/content/profile";
import { ContactForm } from "@/components/ContactForm";
import { Section } from "./Section";

export async function Contact() {
  const t = await getTranslations();

  return (
    <Section id="contact" title={t("contact.title")}>
      <p className="mb-8 max-w-[55ch] text-lg leading-relaxed">
        {t("contact.intro")}{" "}
        <a href={`mailto:${profile.email}`} className="text-accent underline underline-offset-4 hover:decoration-2">
          {profile.email}
        </a>
      </p>
      <ContactForm />
    </Section>
  );
}

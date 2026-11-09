import { setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { SiteHeader } from "@/components/sections/SiteHeader";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Projects } from "@/components/sections/Projects";
import { Experience } from "@/components/sections/Experience";
import { Education } from "@/components/sections/Education";
import { Skills } from "@/components/sections/Skills";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

export default async function Home({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <SiteHeader locale={locale} />
      <main id="top" className="mx-auto max-w-6xl px-6 md:px-10">
        <span id="content" tabIndex={-1} className="block outline-none" />
        <Hero locale={locale} />
        <About locale={locale} />
        <Projects locale={locale} />
        <Experience locale={locale} />
        <Education locale={locale} />
        <Skills locale={locale} />
        <Contact />
        <Footer locale={locale} />
      </main>
    </>
  );
}

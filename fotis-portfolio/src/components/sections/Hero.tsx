import Image from "next/image";
import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { pick, profile } from "@/content/profile";

export async function Hero({ locale }: { locale: Locale }) {
  const t = await getTranslations();
  const fullName = `${pick(profile.firstName, locale)} ${pick(profile.lastName, locale)}`;

  return (
    <header className="grid min-h-[calc(100dvh-8rem)] items-center gap-12 py-16 md:grid-cols-[1fr_auto] md:gap-16">
      <div className="order-2 md:order-1">
        <h1 className="text-[clamp(2.75rem,7vw,5rem)] font-bold leading-[1.05] tracking-[-0.03em]">
          {t("hero.greeting")}{" "}
          <span className="bg-gradient-to-r from-fresh to-sun bg-clip-text pb-[0.08em] text-transparent">{fullName}.</span>
        </h1>
        <p className="mt-4 text-2xl text-muted md:text-3xl">{t("hero.role")}</p>
        <p className="mt-6 max-w-[48ch] text-lg leading-relaxed text-ink/85">{t("hero.lede")}</p>
        <p className="mt-4 max-w-[48ch] text-lg leading-relaxed text-ink/85">{t("hero.lede2")}</p>
        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href="#contact"
            className="rounded-full bg-fresh px-7 py-3.5 font-semibold text-paper shadow-lg shadow-fresh/25 transition-transform hover:-translate-y-0.5"
          >
            {t("hero.cta")}
          </a>
          <a
            href={profile.cv}
            hrefLang="en"
            download
            className="rounded-full border border-line bg-paper px-7 py-3.5 font-semibold shadow-lg shadow-ink/5 transition-transform hover:-translate-y-0.5"
          >
            {t("cv.download")}
          </a>
        </div>
      </div>

      <div className="order-1 justify-self-center md:order-2">
        <div className="rounded-full bg-gradient-to-br from-fresh to-sun p-1.5 shadow-2xl shadow-fresh/20">
          <Image
            src="/avatar.png"
            alt={fullName}
            width={420}
            height={420}
            className="size-56 rounded-full border-4 border-paper object-cover sm:size-72 lg:size-[22rem]"
            priority
          />
        </div>
      </div>
    </header>
  );
}

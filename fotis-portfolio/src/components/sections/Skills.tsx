import { getTranslations } from "next-intl/server";
import type { SimpleIcon } from "simple-icons";
import type { Locale } from "@/i18n/routing";
import { pick, skills } from "@/content/profile";
import { Section } from "./Section";

// Near-black brand colours (Next.js, Expo) vanish in dark mode, so those follow the text colour instead.
function iconColor(hex: string) {
  const [r, g, b] = [0, 2, 4].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b < 0.05 ? "currentColor" : `#${hex}`;
}

function Logo({ icon, className }: { icon: SimpleIcon; className: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill={iconColor(icon.hex)}>
      <path d={icon.path} />
    </svg>
  );
}

export async function Skills({ locale }: { locale: Locale }) {
  const t = await getTranslations();

  return (
    <Section id="skills" title={t("skills.title")}>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((s, i) => (
          <div
            key={s.group.en}
            className={`rounded-3xl border border-line bg-card p-6 shadow-sm transition-shadow hover:shadow-md md:p-8 ${i === 0 ? "sm:col-span-2" : ""}`}
          >
            <h3 className="mb-5 text-lg font-semibold">{pick(s.group, locale)}</h3>
            <ul className="flex flex-wrap gap-2">
              {s.items.map((item) => (
                <li
                  key={item.name}
                  className="flex items-center gap-2 rounded-full border border-line bg-paper px-3 py-1.5 text-sm font-medium text-ink/85"
                >
                  {item.icon ? (
                    <Logo icon={item.icon} className="size-4 shrink-0" />
                  ) : (
                    <span aria-hidden="true" className="size-2 shrink-0 rounded-full bg-fresh" />
                  )}
                  {item.name}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}

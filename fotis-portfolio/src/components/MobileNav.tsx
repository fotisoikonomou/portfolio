"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";

type Props = {
  sections: readonly string[];
  cv: string;
};

export function MobileNav({ sections, cv }: Props) {
  const t = useTranslations();
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    const onPointer = (e: PointerEvent) => {
      const target = e.target as Node;
      if (!panelRef.current?.contains(target) && !buttonRef.current?.contains(target)) setOpen(false);
    };
    // The menu only exists below lg; close it if the viewport grows past that.
    const wide = window.matchMedia("(min-width: 1024px)");
    const onWide = () => wide.matches && setOpen(false);

    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    wide.addEventListener("change", onWide);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
      wide.removeEventListener("change", onWide);
    };
  }, [open]);

  const label = open ? t("nav.close") : t("nav.open");

  return (
    <div className="lg:hidden">
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="mobile-nav"
        aria-label={label}
        title={label}
        className="grid size-9 place-items-center rounded-full border border-line text-muted transition-colors hover:border-accent hover:text-accent"
      >
        <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
          {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
        </svg>
      </button>

      <div
        ref={panelRef}
        id="mobile-nav"
        hidden={!open}
        className="absolute inset-x-0 top-full border-b border-line bg-paper shadow-lg"
      >
        <nav aria-label={t("nav.label")}>
          <ul className="mx-auto grid max-w-6xl px-6 py-3 md:px-10">
            {sections.map((s) => (
              <li key={s}>
                <a
                  href={`#${s}`}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-3 py-3 text-lg font-medium transition-colors hover:bg-line/50 hover:text-accent"
                >
                  {t(`nav.${s}`)}
                </a>
              </li>
            ))}
            <li className="mt-2 border-t border-line pt-3 sm:hidden">
              <a
                href={cv}
                hrefLang="en"
                download
                onClick={() => setOpen(false)}
                className="block rounded-xl px-3 py-3 font-medium text-accent transition-colors hover:bg-line/50"
              >
                {t("cv.download")}
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

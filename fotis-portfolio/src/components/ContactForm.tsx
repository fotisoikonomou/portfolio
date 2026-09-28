"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";

type Status = "idle" | "sending" | "success" | "validation" | "server";

export function ContactForm() {
  const t = useTranslations("contact");
  const [status, setStatus] = useState<Status>("idle");
  const openedAt = useRef(Date.now());

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;

    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email ?? "");
    if (!data.name?.trim() || !emailOk || (data.message ?? "").trim().length < 10) {
      setStatus("validation");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, elapsed: Date.now() - openedAt.current }),
      });
      if (res.status === 400) return setStatus("validation");
      if (!res.ok) return setStatus("server");
      form.reset();
      setStatus("success");
    } catch {
      setStatus("server");
    }
  }

  const field =
    "w-full rounded-md border border-line bg-transparent px-3 py-2.5 text-base text-ink placeholder:text-muted/60 focus:border-accent focus:outline-none";

  return (
    <form onSubmit={onSubmit} noValidate className="grid max-w-xl gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="grid gap-1.5 text-sm text-muted">
          {t("name")}
          <input name="name" autoComplete="name" required className={field} />
        </label>
        <label className="grid gap-1.5 text-sm text-muted">
          {t("email")}
          <input name="email" type="email" autoComplete="email" required className={field} />
        </label>
      </div>
      <label className="grid gap-1.5 text-sm text-muted">
        {t("message")}
        <textarea name="message" rows={5} required minLength={10} className={`${field} resize-y`} />
      </label>

      {/* Honeypot: οι άνθρωποι δεν το βλέπουν, τα bots το συμπληρώνουν */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          {t("honeypot")}
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={status === "sending"}
          className="rounded-full bg-accent px-6 py-2.5 text-sm font-medium text-paper transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {status === "sending" ? t("sending") : t("send")}
        </button>
        <p role="status" aria-live="polite" className="text-sm">
          {status === "success" && <span className="text-accent">{t("success")}</span>}
          {status === "validation" && <span className="text-gold">{t("errorValidation")}</span>}
          {status === "server" && <span className="text-gold">{t("errorServer")}</span>}
        </p>
      </div>
    </form>
  );
}

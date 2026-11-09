"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";

type Status = "idle" | "sending" | "success" | "validation" | "server";
type Field = "name" | "email" | "message";

const errorKey = { name: "errorName", email: "errorEmail", message: "errorMessage" } as const;

export function ContactForm() {
  const t = useTranslations("contact");
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Field[]>([]);
  const openedAt = useRef(Date.now());

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;

    const invalid: Field[] = [];
    if (!data.name?.trim()) invalid.push("name");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email ?? "")) invalid.push("email");
    if ((data.message ?? "").trim().length < 10) invalid.push("message");
    setErrors(invalid);
    if (invalid.length > 0) {
      setStatus("validation");
      form.querySelector<HTMLElement>(`[name="${invalid[0]}"]`)?.focus();
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
      setErrors([]);
      setStatus("success");
    } catch {
      setStatus("server");
    }
  }

  // Border uses `muted` so the field outline reaches 3:1 against the page (WCAG 1.4.11).
  const field =
    "w-full rounded-xl border border-muted bg-paper px-4 py-3 text-base text-ink transition-colors hover:border-ink/60 aria-[invalid=true]:border-gold aria-[invalid=true]:border-2";

  const labelClass = "text-sm font-medium text-muted";

  const fieldProps = (name: Field) => {
    const hasError = errors.includes(name);
    return {
      id: `contact-${name}`,
      name,
      required: true,
      "aria-invalid": hasError,
      "aria-describedby": hasError ? `${name}-error` : undefined,
      className: field,
    };
  };

  const fieldError = (name: Field) =>
    errors.includes(name) && (
      <span id={`${name}-error`} className="text-sm font-medium text-gold">
        {t(errorKey[name])}
      </span>
    );

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-5">
      <p className="text-sm text-muted">{t("required")}</p>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="grid content-start gap-1.5">
          <label htmlFor="contact-name" className={labelClass}>{t("name")}</label>
          <input {...fieldProps("name")} autoComplete="name" />
          {fieldError("name")}
        </div>
        <div className="grid content-start gap-1.5">
          <label htmlFor="contact-email" className={labelClass}>{t("email")}</label>
          <input {...fieldProps("email")} type="email" autoComplete="email" />
          {fieldError("email")}
        </div>
      </div>
      <div className="grid gap-1.5">
        <label htmlFor="contact-message" className={labelClass}>{t("message")}</label>
        <textarea {...fieldProps("message")} rows={5} minLength={10} className={`${field} resize-y`} />
        {fieldError("message")}
      </div>

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
          className="rounded-full bg-fresh px-7 py-3 font-semibold text-paper shadow-lg shadow-fresh/25 transition-transform hover:-translate-y-0.5 disabled:translate-y-0 disabled:opacity-60"
        >
          {status === "sending" ? t("sending") : t("send")}
        </button>
        <p role="status" aria-live="polite" className="text-sm">
          {status === "success" && <span className="font-medium text-fresh">{t("success")}</span>}
          {status === "validation" && <span className="text-gold">{t("errorValidation")}</span>}
          {status === "server" && <span className="text-gold">{t("errorServer")}</span>}
        </p>
      </div>
    </form>
  );
}

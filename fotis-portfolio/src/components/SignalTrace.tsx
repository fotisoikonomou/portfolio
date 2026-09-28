"use client";

import { useEffect, useRef } from "react";

/**
 * Η κυματομορφή του hero: άθροισμα ημιτόνων σαν σήμα EEG/ήχου.
 * Κοντά στον δείκτη το πλάτος μεγαλώνει. Με reduced motion ζωγραφίζεται στατικά.
 */
export function SignalTrace({ label }: { label: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let pointerX = -1;
    let energy = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (time: number) => {
      const { width, height } = canvas.getBoundingClientRect();
      const color = getComputedStyle(document.documentElement).getPropertyValue("--gold").trim();
      const t = time / 1000;
      energy += ((pointerX >= 0 ? 1 : 0) - energy) * 0.05;

      ctx.clearRect(0, 0, width, height);
      ctx.lineWidth = 1.6;
      ctx.lineJoin = "round";
      ctx.strokeStyle = color;
      ctx.beginPath();

      const mid = height / 2;
      for (let x = 0; x <= width; x += 2) {
        const u = x / width;
        // Ήπια βάση (alpha ~10Hz) + αργό κύμα + μικρός θόρυβος
        let y =
          Math.sin(u * 38 + t * 2.1) * 0.35 +
          Math.sin(u * 9 - t * 0.7) * 0.45 +
          Math.sin(u * 83 + t * 5.3) * 0.12;
        // Ενίσχυση γύρω από τον δείκτη
        const d = pointerX >= 0 ? (x - pointerX) / 90 : 99;
        y *= 1 + energy * 1.8 * Math.exp(-d * d);
        // Σβήσιμο στις άκρες
        const edge = Math.sin(Math.PI * u);
        const py = mid + y * edge * (height * 0.28);
        if (x === 0) ctx.moveTo(x, py);
        else ctx.lineTo(x, py);
      }
      ctx.stroke();
      if (!reduced) raf = requestAnimationFrame(draw);
    };

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointerX = e.clientX - rect.left;
    };
    const onLeave = () => (pointerX = -1);

    resize();
    window.addEventListener("resize", resize);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerleave", onLeave);
    raf = requestAnimationFrame(draw);

    // Ξαναζωγράφισε όταν αλλάζει θέμα (για το στατικό mode)
    const observer = new MutationObserver(() => reduced && requestAnimationFrame(draw));
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={canvasRef} role="img" aria-label={label} className="block h-28 w-full touch-none" />;
}

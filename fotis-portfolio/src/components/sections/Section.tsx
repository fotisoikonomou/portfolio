export function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="border-t border-line py-16 md:py-20">
      <h2 id={`${id}-title`} className="mb-10 text-2xl font-semibold tracking-tight md:text-[1.75rem]">
        {title}
      </h2>
      {children}
    </section>
  );
}

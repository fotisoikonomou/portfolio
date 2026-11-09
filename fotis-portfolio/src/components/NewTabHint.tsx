// Visible ↗ for sighted users; screen readers hear "(opens in a new tab)" instead of "north east arrow".
export function NewTabHint({ label, arrow = true }: { label: string; arrow?: boolean }) {
  return (
    <>
      {arrow && <span aria-hidden="true"> ↗</span>}
      <span className="sr-only"> {label}</span>
    </>
  );
}

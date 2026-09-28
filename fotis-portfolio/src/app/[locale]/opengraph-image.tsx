import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Fotis Oikonomou — Full-stack Software Engineer";

// Λατινικοί χαρακτήρες μόνο: η default γραμματοσειρά του next/og δεν έχει ελληνικά.
export default function OgImage() {
  const points = Array.from({ length: 121 }, (_, i) => {
    const u = i / 120;
    const y = (Math.sin(u * 38) * 0.35 + Math.sin(u * 9) * 0.45 + Math.sin(u * 83) * 0.12) * Math.sin(Math.PI * u);
    return `${Math.round(u * 1040)},${Math.round(60 + y * 50)}`;
  }).join(" ");

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: 80, background: "#17151f", color: "#eceaf3" }}>
        <div style={{ fontSize: 30, color: "#a6a2b8" }}>Full-stack software engineer / Athens</div>
        <div style={{ fontSize: 110, fontWeight: 300, lineHeight: 1, marginTop: 24 }}>Fotis</div>
        <div style={{ fontSize: 110, fontWeight: 700, lineHeight: 1 }}>Oikonomou</div>
        <svg width="1040" height="120" style={{ marginTop: 40 }}>
          <polyline points={points} fill="none" stroke="#e0b458" strokeWidth="3" />
        </svg>
      </div>
    ),
    size
  );
}

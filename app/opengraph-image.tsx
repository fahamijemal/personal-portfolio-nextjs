import { ImageResponse } from "next/og";

export const alt =
  "Fahami Jemal Harun — Software Developer & Founder of IFAA TECHNOLOGIES";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#0b1729",
        color: "#ffffff",
        padding: "66px 76px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          fontSize: 19,
          color: "#a1c2f4",
          letterSpacing: 3,
        }}
      >
        SOFTWARE · PEOPLE · POSSIBILITIES
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            fontSize: 79,
            lineHeight: 1.1,
            fontWeight: 700,
            letterSpacing: -3,
          }}
        >
          Fahami Jemal Harun
        </div>
        <div style={{ fontSize: 29, color: "#b9cbe4", marginTop: 26 }}>
          Software Developer & Founder of IFAA TECHNOLOGIES
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderTop: "1px solid #334155",
          paddingTop: 27,
          fontSize: 19,
          color: "#b9cbe4",
        }}
      >
        <span>Technology with a focus on Ethiopia & Oromia</span>
        <span>fahami.ifaatechnologies.tech</span>
      </div>
    </div>,
    size,
  );
}

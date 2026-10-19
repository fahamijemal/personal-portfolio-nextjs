import { ImageResponse } from "next/og";

export const alt =
  "Fahami Jemal Harun — Full-Stack Developer & Founder of IFAA TECHNOLOGIES";
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
        background: "#f6f5f0",
        color: "#202720",
        padding: "66px 76px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          fontSize: 19,
          color: "#3e5932",
          letterSpacing: 3,
        }}
      >
        ENGINEERING · AI · ENTREPRENEURSHIP
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
        <div style={{ fontSize: 29, color: "#62695f", marginTop: 26 }}>
          Full-Stack Developer & Founder of IFAA TECHNOLOGIES
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderTop: "1px solid #dcded3",
          paddingTop: 27,
          fontSize: 19,
          color: "#62695f",
        }}
      >
        <span>Thoughtful software. Human direction.</span>
        <span>fahami.ifaatechnologies.tech</span>
      </div>
    </div>,
    size,
  );
}

import { ImageResponse } from "next/og";

export const alt = "AprilDawn — the everything store for memories";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Beautiful, on-brand social share card (shown when the link is posted).
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#fff8f1",
          backgroundImage:
            "radial-gradient(60% 60% at 15% 8%, rgba(249,100,146,0.38), transparent 70%), radial-gradient(55% 55% at 88% 14%, rgba(244,162,76,0.40), transparent 70%), radial-gradient(75% 75% at 50% 102%, rgba(159,123,214,0.32), transparent 72%)",
          fontFamily: "sans-serif",
          padding: 80,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: 40,
          }}
        >
          <div
            style={{
              width: 150,
              height: 75,
              background:
                "linear-gradient(135deg, #f4853c, #ec3c72 55%, #7e54c0)",
              borderRadius: "9999px 9999px 0 0",
            }}
          />
          <div
            style={{
              width: 184,
              height: 9,
              marginTop: 7,
              borderRadius: 5,
              background:
                "linear-gradient(90deg, #f4853c, #ec3c72 55%, #7e54c0)",
            }}
          />
        </div>
        <div style={{ fontSize: 104, fontWeight: 700, color: "#271c2c" }}>
          AprilDawn
        </div>
        <div style={{ fontSize: 40, color: "#5b4f5f", marginTop: 8 }}>
          The everything store for memories
        </div>
        <div style={{ fontSize: 26, color: "#b41650", marginTop: 34 }}>
          Keep them — beautifully, permanently — for the rest of your life.
        </div>
      </div>
    ),
    { ...size },
  );
}

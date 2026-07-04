import { ImageResponse } from "next/og";
import { profile } from "@/lib/data";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background: "#000000",
          color: "#f5f5f5",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 28,
            textTransform: "uppercase",
            letterSpacing: 6,
            color: "#8a8a8a",
          }}
        >
          {profile.title}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 160,
            fontWeight: 600,
            letterSpacing: -4,
            lineHeight: 0.9,
          }}
        >
          ADITYA
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 26,
            color: "#8a8a8a",
            maxWidth: 900,
          }}
        >
          {profile.impact}
        </div>
      </div>
    ),
    { ...size }
  );
}

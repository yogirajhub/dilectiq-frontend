import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#1C1917", // Dark tile
          borderRadius: "20%",
        }}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Sound bars forming a 'D' */}
          <rect x="10" y="8" width="4" height="20" rx="2" fill="#2F8F7D" />
          <rect x="16" y="10" width="4" height="16" rx="2" fill="#2F8F7D" />
          <rect x="22" y="13" width="4" height="10" rx="2" fill="#2F8F7D" />
        </svg>
      </div>
    ),
    { ...size }
  );
}

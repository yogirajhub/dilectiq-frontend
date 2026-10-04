import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
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
          backgroundColor: "#0A0A0A", // bg-base
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "24px",
            marginBottom: "32px",
          }}
        >
          {/* Option A Icon */}
          <div
            style={{
              width: "120px",
              height: "120px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#1C1917", // dark tile
              borderRadius: "24px",
            }}
          >
            <svg
              width="80"
              height="80"
              viewBox="0 0 36 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="10" y="8" width="4" height="20" rx="2" fill="#2F8F7D" />
              <rect x="16" y="10" width="4" height="16" rx="2" fill="#2F8F7D" />
              <rect x="22" y="13" width="4" height="10" rx="2" fill="#2F8F7D" />
            </svg>
          </div>
          {/* Option C Wordmark */}
          <div style={{ display: "flex", fontSize: "96px", fontWeight: 800, fontFamily: "sans-serif" }}>
            <span style={{ color: "#EDEBE8", fontWeight: 500 }}>Dilect</span>
            <span style={{ color: "#2F8F7D", position: "relative" }}>
              IQ
              <svg 
                style={{ position: "absolute", top: "50%", right: "-10px", width: "40px", height: "40px", transform: "translateY(-50%)" }} 
                viewBox="0 0 130 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M72 15 C75 16, 75 18, 77 22" stroke="#2F8F7D" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </span>
          </div>
        </div>
        
        <div style={{ fontSize: "40px", color: "#A8A29E", marginTop: "20px", fontWeight: 500 }}>
          AI Voice Calling Platform
        </div>
      </div>
    ),
    { ...size }
  );
}

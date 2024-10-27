import * as React from "react";

interface EmailLayoutProps {
  children: React.ReactNode;
}

export const EmailLayout: React.FC<Readonly<EmailLayoutProps>> = ({
  children,
}) => (
  <div
    dir="ltr"
    style={{
      backgroundColor: "#f5f5f5",
      padding: "20px",
      fontFamily: "Arial, sans-serif",
      color: "#333",
    }}
  >
    <div
      style={{
        maxWidth: "600px",
        margin: "0 auto",
        backgroundColor: "#ffffff",
        borderRadius: "8px",
        overflow: "hidden",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* Header */}
      <div
        style={{
          backgroundColor: "#150050",
          padding: "20px",
          textAlign: "center",
        }}
      >
        <a
          href="https://moussasaidi.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="https://www.moussasaidi.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FFullLogo.f6ef0d53.png&w=256&q=75"
            alt="Logo"
            style={{ width: "250px" }}
          />
        </a>
      </div>

      {/* Content */}
      <div style={{ padding: "20px" }}>{children}</div>

      {/* Footer */}
      <div style={{ padding: "20px", borderTop: "1px solid #e0e0e0" }}>
        <p style={{ fontSize: "16px", margin: "0 0 8px" }}>
          Best regards, <br />
          <b>Moussa Saidi</b>
        </p>
      </div>
    </div>
  </div>
);

import * as React from "react";
import { EmailLayout } from "./layout";

interface EmailTemplateProps {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
}

export const NotificationEmail: React.FC<Readonly<EmailTemplateProps>> = ({
  firstName,
  lastName,
  email,
  message,
}) => (
  <EmailLayout>
    <h1
      style={{
        fontSize: "24px",
        margin: "0 0 16px",
        fontWeight: "bold",
        textAlign: "center",
      }}
    >
      New message
    </h1>
    <p style={{ fontSize: "16px", margin: "0 0 16px" }}>
      You have a new message from {firstName} {lastName}
    </p>
    <p style={{ fontSize: "16px", margin: "0 0 16px" }}>Email: {email}</p>
    <p style={{ fontSize: "16px", margin: "0 0 16px" }}>
      Message: <br /> {message}
    </p>
  </EmailLayout>
);

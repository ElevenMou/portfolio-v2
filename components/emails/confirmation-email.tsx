import * as React from "react";
import { EmailLayout } from "./layout";

interface EmailTemplateProps {
  firstName: string;
}

export const ConfirmationEmail: React.FC<Readonly<EmailTemplateProps>> = ({
  firstName,
}) => (
  <EmailLayout>
    <p style={{ fontSize: "16px", margin: "0 0 16px" }}>Hello {firstName},</p>
    <p style={{ fontSize: "16px", margin: "0 0 16px" }}>
      Thank you for your message! I confirm that I've received it and will get
      back to you as soon as possible.
    </p>
  </EmailLayout>
);

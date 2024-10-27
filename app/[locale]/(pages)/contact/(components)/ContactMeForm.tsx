"use client";

import LabelInput from "@/components/themed/LabelInput";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useFormStatus } from "react-dom";

export default function ContactMeForm() {
  const [error, setError] = useState<{
    form: string;
    firstname: string;
    lastname: string;
    email: string;
    message: string;
  }>({
    form: "",
    firstname: "",
    lastname: "",
    email: "",
    message: "",
  });

  const [success, setSuccess] = useState("");

  const t = useTranslations("Contact");

  async function handleSubmit(formData: FormData) {
    if (!validateForm(formData)) {
      return;
    }

    const resp = await fetch("/api/send", { method: "POST", body: formData });

    if (!resp.ok) {
      setError((prev) => ({
        ...prev,
        form: t("Messages.error"),
      }));
    } else {
      setSuccess(t("Messages.success"));
    }
  }

  const validateForm = (formData: FormData): boolean => {
    let valid = true;

    setError({ form: "", firstname: "", lastname: "", email: "", message: "" });

    const email = String(formData.get("email"));
    const firstName = String(formData.get("firstname"));
    const lastName = String(formData.get("lastname"));
    const message = String(formData.get("message"));

    if (!email || !firstName || !lastName || !message) {
      setError((prev) => ({
        ...prev,
        form: t("Messages.missingFields"),
      }));

      valid = false;
    }

    if (!firstName) {
      setError((prev) => ({
        ...prev,
        firstname: t("Messages.required"),
      }));

      valid = false;
    }

    if (!lastName) {
      setError((prev) => ({
        ...prev,
        lastname: t("Messages.required"),
      }));

      valid = false;
    }

    if (!message) {
      setError((prev) => ({
        ...prev,
        message: t("Messages.required"),
      }));

      valid = false;
    }

    if (!email) {
      setError((prev) => ({
        ...prev,
        email: t("Messages.required"),
      }));

      valid = false;
    } else if (!email.match(/^\S+@\S+\.\S+$/)) {
      setError((prev) => ({
        ...prev,
        email: t("Messages.invalidEmail"),
      }));

      valid = false;
    }

    return valid;
  };

  return (
    <form action={handleSubmit}>
      {error.form && <div className="label-input__error">{error.form}</div>}
      {success && <div className="label-input__success">{success}</div>}
      <div className="display-flex gap-m">
        <LabelInput
          label={t("Firstname")}
          type="text"
          name="firstname"
          placeholder="Moussa"
          className="full-width"
          error={error.firstname}
        />
        <LabelInput
          label={t("Lastname")}
          type="text"
          name="lastname"
          placeholder="Saidi"
          className="full-width"
          error={error.lastname}
        />
      </div>
      <LabelInput
        label="Email"
        type="text"
        name="email"
        placeholder="email@example.com"
        error={error.email}
      />
      <LabelInput
        label="Message"
        type="textarea"
        name="message"
        placeholder="Hello world"
        error={error.message}
      />
      <SubmitButton label={t("Send")} />
    </form>
  );
}

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <button className="btn btn-primary" type="submit" disabled={pending}>
      {label} {pending && "..."}
    </button>
  );
}

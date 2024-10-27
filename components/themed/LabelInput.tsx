import React from "react";

interface LabelInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  className?: string;
  error?: string;
}

const LabelInput = ({ label, className, error, ...props }: LabelInputProps) => {
  return (
    <label className={"label-input" + (className ? ` ${className}` : "")}>
      {label && <span className="label-input__label">{label}</span>}
      {props.type === "textarea" ? (
        <textarea
          {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
          className="label-input__input"
        />
      ) : (
        <input {...props} className="label-input__input" />
      )}
      {error && <span className="label-input__error">{error}</span>}
    </label>
  );
};

export default LabelInput;

import { useId, useState } from "react";
import { Eye, EyeOff, CircleCheck, CircleAlert } from "lucide-react";

import "./input.css";

function Input({
  label,
  type = "text",
  name,
  value,
  defaultValue,
  onChange,
  placeholder = "",
  icon,
  rightIcon,
  prefix,
  suffix,
  suffixAction,
  helperText,
  error,
  success,
  disabled = false,
  required = false,
  showPasswordToggle = true,
  className = "",
  id,
  ...props
}) {
  const generatedId = useId();
  const inputId = id || `input-${generatedId}`;
  const helperId = `${inputId}-helper`;
  const errorId = `${inputId}-error`;
  const successId = `${inputId}-success`;

  const [passwordVisible, setPasswordVisible] = useState(false);

  const isPassword = type === "password";
  const inputType = isPassword && passwordVisible ? "text" : type;

  const hasError = Boolean(error);
  const hasSuccess = !hasError && Boolean(success);

  const describedBy =
    [
      props["aria-describedby"],
      hasError ? errorId : null,
      !hasError && helperText ? helperId : null,
      hasSuccess && typeof success === "string" ? successId : null,
    ]
      .filter(Boolean)
      .join(" ") || undefined;

  const renderRightContent = () => {
    if (isPassword && showPasswordToggle) {
      return (
        <button
          type="button"
          className="ty-input-icon-button"
          onClick={() => setPasswordVisible((visible) => !visible)}
          disabled={disabled}
          aria-label={passwordVisible ? "Hide password" : "Show password"}
          aria-pressed={passwordVisible}
        >
          {passwordVisible ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      );
    }

    if (suffixAction) {
      return (
        <button
          type="button"
          className="ty-input-suffix-action"
          onClick={suffixAction.onClick}
          disabled={disabled || suffixAction.disabled}
        >
          {suffixAction.label}
        </button>
      );
    }

    if (rightIcon) {
      return (
        <span className="ty-input-icon" aria-hidden="true">
          {rightIcon}
        </span>
      );
    }

    if (hasError) {
      return <CircleAlert size={18} aria-hidden="true" />;
    }

    if (hasSuccess) {
      return <CircleCheck size={18} aria-hidden="true" />;
    }

    return null;
  };

  return (
    <div className={`ty-input-field ${className}`}>
      {label && (
        <label className="ty-input-label" htmlFor={inputId}>
          {label}
          {required && (
            <span className="ty-input-required" aria-hidden="true">
              {" "}
              *
            </span>
          )}
        </label>
      )}

      <div
        className={[
          "ty-input-control",
          hasError ? "ty-input-control-error" : "",
          hasSuccess ? "ty-input-control-success" : "",
          disabled ? "ty-input-control-disabled" : "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {icon && (
          <span className="ty-input-icon ty-input-icon-left" aria-hidden="true">
            {icon}
          </span>
        )}

        {prefix != null && <span className="ty-input-prefix">{prefix}</span>}
        <input
          {...props}
          id={inputId}
          name={name}
          type={inputType}
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          aria-invalid={hasError ? true : undefined}
          aria-describedby={describedBy}
          className="ty-input-element"
        />

        {suffix != null && <span className="ty-input-suffix">{suffix}</span>}

        {renderRightContent()}
      </div>

      {hasError && (
        <p
          id={errorId}
          className="ty-input-message ty-input-message-error"
          role="alert"
        >
          {typeof error === "string" ? error : "Please check this field."}
        </p>
      )}

      {!hasError && helperText && (
        <p id={helperId} className="ty-input-message">
          {helperText}
        </p>
      )}

      {!hasError && hasSuccess && typeof success === "string" && (
        <p id={successId} className="ty-input-message ty-input-message-success">
          {success}
        </p>
      )}
    </div>
  );
}

export default Input;

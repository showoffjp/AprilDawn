import type { ReactNode } from "react";

/**
 * Shared form-field primitives. Replaces the near-identical `Field` components
 * that were copy-pasted across the contact, event-inquiry, and reminder forms.
 */

const labelClass = "text-sm font-medium text-ink";
const controlClass =
  "mt-1.5 w-full rounded-xl border border-ink/15 bg-cream px-3 text-sm focus:border-dawn-400 focus:outline-none";
const inputClass = `h-11 ${controlClass}`;

function Hint({ children }: { children: ReactNode }) {
  return <span className="font-normal text-ink-soft"> {children}</span>;
}

type CommonProps = {
  label: string;
  name: string;
  required?: boolean;
  /** Muted helper text shown next to the label. */
  hint?: ReactNode;
  /** Extra classes for the wrapping element (e.g. column spans). */
  className?: string;
};

type FieldProps = CommonProps & {
  type?: string;
  placeholder?: string;
  defaultValue?: string;
  autoComplete?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  min?: number;
};

export function Field({
  label,
  name,
  type = "text",
  required = true,
  placeholder,
  defaultValue,
  autoComplete,
  inputMode,
  min,
  hint,
  className,
}: FieldProps) {
  return (
    <div className={className}>
      <label htmlFor={name} className={labelClass}>
        {label}
        {!required && !hint ? <Hint>(optional)</Hint> : null}
        {hint ? <Hint>{hint}</Hint> : null}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        defaultValue={defaultValue}
        autoComplete={autoComplete}
        inputMode={inputMode}
        min={min}
        className={inputClass}
      />
    </div>
  );
}

type TextareaProps = CommonProps & {
  rows?: number;
  placeholder?: string;
  defaultValue?: string;
};

export function TextareaField({
  label,
  name,
  rows = 4,
  required = false,
  placeholder,
  defaultValue,
  hint,
}: TextareaProps) {
  return (
    <div>
      <label htmlFor={name} className={labelClass}>
        {label}
        {!required && !hint ? <Hint>(optional)</Hint> : null}
        {hint ? <Hint>{hint}</Hint> : null}
      </label>
      <textarea
        id={name}
        name={name}
        rows={rows}
        required={required}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className={`${controlClass} py-2.5`}
      />
    </div>
  );
}

type SelectProps = CommonProps & {
  defaultValue?: string;
  children: ReactNode;
};

export function SelectField({
  label,
  name,
  defaultValue,
  hint,
  children,
}: SelectProps) {
  return (
    <div>
      <label htmlFor={name} className={labelClass}>
        {label}
        {hint ? <Hint>{hint}</Hint> : null}
      </label>
      <select
        id={name}
        name={name}
        defaultValue={defaultValue}
        className={inputClass}
      >
        {children}
      </select>
    </div>
  );
}

/**
 * Hidden honeypot input for spam protection. Humans never see or tab to it;
 * bots fill every field. Routes reject submissions where `company` is set
 * (see `isBot` in `lib/validation`).
 */
export function Honeypot() {
  return (
    <div aria-hidden="true" style={{ position: "absolute", left: "-9999px" }}>
      <label>
        Company
        <input name="company" type="text" tabIndex={-1} autoComplete="off" />
      </label>
    </div>
  );
}

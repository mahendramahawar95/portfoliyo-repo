"use client";

// apps/web/components/sections/contact-section.tsx
import { useState } from "react";
import type { ChangeEvent, CSSProperties, FormEvent, ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@repo/ui/lib/cn";
import { LinkedInIcon } from "../../../../components/icons/LinkedInIcon";
import { FacebookIcon } from "../../../../components/icons/FacebookIcon";
import { TwitterIcon } from "../../../../components/icons/TwitterIcon";
import { InstagramIcon } from "../../../../components/icons/InstagramIcon";

type FieldName =
  | "firstName"
  | "lastName"
  | "company"
  | "phone"
  | "email"
  | "message";

export type ContactValues = Record<FieldName, string>;

interface FieldConfig {
  name: FieldName;
  label: string;
  type?: "text" | "email" | "tel";
  autoComplete?: string;
  required?: boolean;
  /** Shares a row with the next field on larger screens. */
  half?: boolean;
  multiline?: boolean;
}

export interface ContactDetail {
  label: string;
  value: string;
  /** Makes the value a link, for example "mailto:hello@example.com". */
  href?: string;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: ReactNode;
}

export interface ContactSectionProps {
  title?: ReactNode;
  intro?: ReactNode;
  details?: ContactDetail[];
  socials?: SocialLink[];
  formTitle?: ReactNode;
  formIntro?: ReactNode;
  /** Called with the form values. Replaces the default POST to `endpoint`. */
  onSubmit?: (values: ContactValues) => Promise<void> | void;
  endpoint?: string;
  className?: string;
}

const fields: FieldConfig[] = [
  { name: "firstName", label: "First Name", autoComplete: "given-name", required: true, half: true },
  { name: "lastName", label: "Last Name", autoComplete: "family-name", half: true },
  { name: "company", label: "Company", autoComplete: "organization", half: true },
  { name: "phone", label: "Phone", type: "tel", autoComplete: "tel", half: true },
  { name: "email", label: "Email", type: "email", autoComplete: "email", required: true },
  { name: "message", label: "Message", multiline: true, required: true },
];

const emptyValues: ContactValues = {
  firstName: "",
  lastName: "",
  company: "",
  phone: "",
  email: "",
  message: "",
};

const defaultDetails: ContactDetail[] = [
  { label: "Project enquiries", value: "hello@FullstackDev.com", href: "mailto:hello@FullstackDev.com" },
  { label: "Careers", value: "careers@FullstackDev.com", href: "mailto:careers@FullstackDev.com" },
  { label: "Working hours", value: "Monday – Friday · 9:30 AM – 6:30 PM (IST)" },
];

const social = "size-5";

// Replace the links with your real profiles.
const defaultSocials: SocialLink[] = [
  { label: "LinkedIn", href: "#", icon: <LinkedInIcon className={social} /> },
  { label: "Facebook", href: "#", icon: <FacebookIcon className={social} /> },
  { label: "X", href: "#", icon: <TwitterIcon className={social} /> },
  { label: "Instagram", href: "#", icon: <InstagramIcon className={social} /> },
];

/** Sets the delay index used by the `stagger-item` utility. */
const stagger = (index: number) => ({ "--stagger-index": index }) as CSSProperties;

const fieldClass =
  "w-full border-0 border-b border-ink-900/18 bg-transparent px-0 py-2 text-body text-foreground outline-none transition-colors duration-200 placeholder:text-ink-900/30 focus:border-trust-blue focus:shadow-[0_1px_0_0_var(--color-trust-blue)]";

const valueClass =
  "font-display text-body-lg font-semibold tracking-tight text-primary-dark";

type Status = "idle" | "sending" | "sent" | "error";

export function ContactSection({
  title = "Reach us directly",
  intro = "Prefer email or a call? Use the details below - we typically respond within one business day.",
  details = defaultDetails,
  socials = defaultSocials,
  formTitle = "Tell us about your project",
  formIntro = "Fill in the form and our team will get back to you shortly.",
  onSubmit,
  endpoint = "/api/contact",
  className,
}: ContactSectionProps) {
  const [values, setValues] = useState<ContactValues>(emptyValues);
  const [status, setStatus] = useState<Status>("idle");

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
  };

  const send = async (data: ContactValues) => {
    if (onSubmit) {
      await onSubmit(data);
      return;
    }
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Request failed");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("sending");
    try {
      await send(values);
      setValues(emptyValues);
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section
      aria-label="Contact details and enquiry form"
      className={cn("relative z-1 py-3xl", className)}
    >
      <div className="container">
        <div className="grid gap-2xl lg:grid-cols-12">
          {/* Details */}
          <div className="animate-fade-up lg:col-span-5">
            <h2 className="mb-md text-h4 font-bold leading-tight tracking-tight text-primary-dark">
              {title}
            </h2>
            <p className="mb-xl text-body text-content-secondary">{intro}</p>

            <div>
              {details.map((detail, i) => (
                <div
                  key={detail.label}
                  style={stagger(i)}
                  className="stagger-item border-b border-ink-900/14 py-4 first:border-t"
                >
                  <span className="mb-1 block text-xs font-bold uppercase tracking-widest text-ink-900/42">
                    {detail.label}
                  </span>
                  {detail.href ? (
                    <a
                      href={detail.href}
                      className={cn(
                        valueClass,
                        "transition-colors duration-200 hover:text-trust-blue-dark",
                      )}
                    >
                      {detail.value}
                    </a>
                  ) : (
                    <span className={valueClass}>{detail.value}</span>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-xl">
              <span className="mb-3 block text-xs font-bold uppercase tracking-widest text-ink-900/42">
                Follow us
              </span>
              <ul role="list" className="flex gap-3">
                {socials.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      aria-label={item.label}
                      className="grid size-10 place-items-center rounded-pill border border-ink-900/14 text-ink-900/60 transition duration-300 ease-smooth hover:-translate-y-1 hover:border-trust-blue hover:text-trust-blue-dark"
                    >
                      {item.icon}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Form */}
          <div className="animate-fade-up [animation-delay:60ms] lg:col-span-7">
            <div className="rounded-xl border border-trust-blue/12 bg-trust-blue/5 p-xl">
              <h2 className="mb-2 text-h4 font-bold leading-tight tracking-tight text-primary-dark">
                {formTitle}
              </h2>
              <p className="mb-lg text-lg text-content-secondary">{formIntro}</p>

              <form onSubmit={handleSubmit} className="grid gap-lg sm:grid-cols-2">
                {fields.map((field) => (
                  <div
                    key={field.name}
                    className={cn(!field.half && "sm:col-span-2")}
                  >
                    <label
                      htmlFor={field.name}
                      className="mb-1 block text-xs font-semibold text-ink-900/60"
                    >
                      {field.label}
                    </label>

                    {field.multiline ? (
                      <textarea
                        id={field.name}
                        name={field.name}
                        rows={4}
                        required={field.required}
                        value={values[field.name]}
                        onChange={handleChange}
                        className={cn(fieldClass, "resize-y")}
                      />
                    ) : (
                      <input
                        id={field.name}
                        name={field.name}
                        type={field.type ?? "text"}
                        autoComplete={field.autoComplete}
                        required={field.required}
                        value={values[field.name]}
                        onChange={handleChange}
                        className={fieldClass}
                      />
                    )}
                  </div>
                ))}

                <div className="flex flex-wrap items-center gap-md sm:col-span-2">
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="group inline-flex items-center gap-2 rounded-button bg-primary px-6 py-3 text-small font-semibold text-background transition duration-300 ease-smooth hover:-translate-y-1 hover:shadow-md disabled:pointer-events-none disabled:opacity-60"
                  >
                    {status === "sending" ? "Sending..." : "Let's Talk"}
                    <ArrowRight
                      className="size-3 transition-transform group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1"
                      aria-hidden="true"
                    />
                  </button>

                  {status === "sent" && (
                    <p role="status" className="animate-fade-up text-small font-medium text-trust-blue-dark">
                      Thank you! We will get back to you shortly.
                    </p>
                  )}
                  {status === "error" && (
                    <p role="alert" className="animate-fade-up text-small font-medium text-danger">
                      Something went wrong. Please try again or email us.
                    </p>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

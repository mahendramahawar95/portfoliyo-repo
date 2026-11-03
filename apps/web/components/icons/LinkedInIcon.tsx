import * as React from "react";

export type IconProps = React.SVGProps<SVGSVGElement>;

export function LinkedInIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <path d="M4.98 3.5C4.98 4.88 3.87 6 2.49 6S0 4.88 0 3.5 1.11 1 2.49 1s2.49 1.12 2.49 2.5ZM0 8h5v16H0V8Zm7.5 0h4.79v2.19h.07c.67-1.27 2.31-2.61 4.75-2.61 5.08 0 6.02 3.34 6.02 7.68V24h-5v-7.08c0-1.69-.03-3.87-2.36-3.87-2.37 0-2.73 1.85-2.73 3.75V24h-5V8Z" />
    </svg>
  );
}

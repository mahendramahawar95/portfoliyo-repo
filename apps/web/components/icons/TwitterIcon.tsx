import * as React from "react";

export type IconProps = React.SVGProps<SVGSVGElement>;

export function TwitterIcon(props: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 448 512"
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      <path d="M357.2 48H427.8L273.6 224.2L455 464H313L201.7 318.6L74.5 464H3.8L168.7 275.5L-5.2 48H140.4L240.9 180.9L357.2 48ZM332.4 421.8H371.5L119.1 88H77.1L332.4 421.8Z" />
    </svg>
  );
}

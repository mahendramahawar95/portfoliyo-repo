import { ButtonHTMLAttributes } from "react";
import { VariantProps } from "class-variance-authority";
import { buttonVariants } from "./button.variants";

type BaseProps = VariantProps<typeof buttonVariants>;

export interface ButtonAsButton
  extends BaseProps, ButtonHTMLAttributes<HTMLButtonElement> {
  href?: undefined;
  isLoading?: boolean;
  loadingText?: string;
}

export type ButtonProps = ButtonAsButton;

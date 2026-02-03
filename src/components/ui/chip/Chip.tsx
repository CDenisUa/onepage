import { forwardRef } from "react";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, Ref } from "react";
import type { TaglineRadius, TaglineSize, TaglineVariant } from "@/types";
import { chipSizeTokens } from "@/tokens";
// Styles
import styles from "./styles.module.css";

type ChipBaseProps = {
  label: string;
  variant: TaglineVariant;
  size: TaglineSize;
  radius: TaglineRadius;
  href?: string;
};

type ChipButtonProps = ChipBaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };
type ChipLinkProps = ChipBaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };
type ChipProps = ChipButtonProps | ChipLinkProps;

const Chip = forwardRef<HTMLButtonElement | HTMLAnchorElement, ChipProps>(
  (
    {
      label,
      variant,
      size,
      radius,
      href,
      className: classNameProp = "",
      style: inlineStyle,
      ...rest
    },
    ref
  ) => {
    const tokens = chipSizeTokens[size];
    const styleVars = {
      ["--chip-font-size" as const]: `${tokens.fontSize}px`,
      ["--chip-pad-x" as const]: `${tokens.padX}px`,
      ["--chip-pad-y" as const]: `${tokens.padY}px`,
      ["--chip-radius" as const]: `${radius}px`,
    };
    const mergedStyle = { ...styleVars, ...(inlineStyle ?? {}) };

    const className = [
      styles.chip,
      styles[`variant-${variant}`],
      classNameProp,
    ]
      .filter(Boolean)
      .join(" ");

    if (href) {
      return (
        <a
          ref={ref as Ref<HTMLAnchorElement>}
          className={className}
          style={mergedStyle}
          href={href}
          {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {label}
        </a>
      );
    }

    return (
      <button
        ref={ref as Ref<HTMLButtonElement>}
        className={className}
        style={mergedStyle}
        type="button"
        {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {label}
      </button>
    );
  }
);

Chip.displayName = "Chip";

export default Chip;

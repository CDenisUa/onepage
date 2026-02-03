// Core
import type { FC, PropsWithChildren } from "react";
// Styles
import styles from "./styles.module.css";

type PanelSectionProps = PropsWithChildren<{
  title?: string;
  className?: string;
}>;

const PanelSection: FC<PanelSectionProps> = ({
  title,
  className = "",
  children,
}) => {
  const classes = [styles.section, className].filter(Boolean).join(" ");

  return (
    <div className={classes}>
      {title ? <span className={styles.sectionTitle}>{title}</span> : null}
      {children}
    </div>
  );
};

export default PanelSection;

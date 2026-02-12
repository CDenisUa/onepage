// Core
import type { FC, PropsWithChildren } from "react";
// Styles
import styles from "./styles.module.css";

type PanelShellProps = PropsWithChildren<{
  title: string;
  onClose?: () => void;
  onBack?: () => void;
  className?: string;
}>;

const PanelShell: FC<PanelShellProps> = ({
  title,
  onClose,
  onBack,
  className = "",
  children,
}) => {
  return (
    <div className={[styles.panel, className].filter(Boolean).join(" ")}>
      <div className={styles.panelHeader}>
        <div className={styles.headerSide}>
          {onBack && (
            <button
              className={styles.iconButton}
              type="button"
              onClick={onBack}
              aria-label="Back"
            >
              <img
                className={styles.iconImage}
                src="/svg/back.svg"
                alt=""
                aria-hidden="true"
              />
            </button>
          )}
        </div>
        <span className={styles.headerTitle}>{title}</span>
        <div className={`${styles.headerSide} ${styles.headerSideRight}`}>
          {onClose && (
            <button
              className={styles.iconButton}
              type="button"
              onClick={onClose}
              aria-label="Close"
            >
              <img
                className={styles.iconImage}
                src="/svg/close.svg"
                alt=""
                aria-hidden="true"
              />
            </button>
          )}
        </div>
      </div>
      {children}
    </div>
  );
};

export default PanelShell;

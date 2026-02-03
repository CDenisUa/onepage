// Core
import { observer } from "mobx-react-lite";
// Styles
import styles from "./styles.module.css";
// Types
import type {
  TaglineAlign,
  TaglineSize,
  TaglineVariant,
} from "@/types";
import { RADIUS_OPTIONS } from "@/constants";
// Hooks
import { useTaglineStore } from "@hooks";
// Components
import PanelShell from "./PanelShell";
import PanelSection from "./PanelSection";

const variantOptions: Array<{ id: TaglineVariant; label: string; className: string }> =
  [
    { id: "solid", label: "Aa", className: styles.variantSolid },
    { id: "soft", label: "Aa", className: styles.variantSoft },
    { id: "outline", label: "Aa", className: styles.variantOutline },
    { id: "ghost", label: "Aa", className: styles.variantGhost },
  ];

const sizeOptions: TaglineSize[] = ["xl", "l", "m", "s", "xs"];
const alignOptions: Array<{ id: TaglineAlign; icon: string; label: string }> = [
  { id: "left", icon: "/svg/align-left.svg", label: "Align left" },
  { id: "center", icon: "/svg/align-center.svg", label: "Align center" },
  { id: "right", icon: "/svg/align-right.svg", label: "Align right" },
];

const StylesPanel = observer(() => {
  const store = useTaglineStore();
  return (
    <PanelShell
      title="Styles"
      onBack={() => store.openPanel("main")}
      onClose={() => store.closePanel()}
    >
      <PanelSection title="Style">
        <div className={styles.optionRow}>
          {variantOptions.map((option) => (
            <button
              key={option.id}
              type="button"
              className={[
                styles.optionButton,
                styles.styleButton,
                option.className,
              ]
                .filter(Boolean)
                .join(" ")}
              onClick={() => store.updateStyles({ variant: option.id })}
              aria-label={`Style ${option.id}`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </PanelSection>

      <PanelSection title="Size">
        <div className={styles.optionGrid}>
          {sizeOptions.map((size) => (
            <button
              key={size}
              type="button"
              className={[
                styles.optionButton,
                styles.sizeButton,
                store.styles.size === size ? styles.sizeButtonActive : "",
              ]
                .filter(Boolean)
                .join(" ")}
              onClick={() => store.updateStyles({ size })}
            >
              {size.toUpperCase()}
            </button>
          ))}
        </div>
      </PanelSection>

      <PanelSection title="Radius">
        <div className={styles.optionGrid}>
          {RADIUS_OPTIONS.map((radius) => (
            <button
              key={radius}
              type="button"
              className={[
                styles.optionButton,
                styles.optionButtonTiny,
                styles.radiusButton,
                store.styles.radius === radius ? styles.radiusButtonActive : "",
              ]
                .filter(Boolean)
                .join(" ")}
              onClick={() => store.updateStyles({ radius })}
            >
              {radius}
            </button>
          ))}
        </div>
      </PanelSection>

      <PanelSection>
        <div className={styles.alignRow}>
          {alignOptions.map((option) => (
            <button
              key={option.id}
              type="button"
              className={[
                styles.optionButton,
                styles.alignButton,
                store.styles.align === option.id ? styles.alignButtonActive : "",
              ]
                .filter(Boolean)
                .join(" ")}
              onClick={() => store.updateStyles({ align: option.id })}
              aria-label={option.label}
            >
              <img className={styles.alignIcon} src={option.icon} alt="" />
            </button>
          ))}
        </div>
      </PanelSection>
    </PanelShell>
  );
});

export default StylesPanel;

// Core
import { observer } from "mobx-react-lite";
import type { KeyboardEvent } from "react";
// Styles
import styles from "./styles.module.css";
// Hooks
import { useTaglineStore } from "@hooks";
// Components
import PanelShell from "./PanelShell";

const ItemPanel = observer(() => {
  const store = useTaglineStore();
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== "Enter") return;
    event.preventDefault();
    store.attemptSave();
  };

  return (
    <PanelShell
      title="Item"
      onBack={() => store.finishDraft()}
      onClose={() => store.finishDraftAndClose()}
    >
      <div className={styles.section}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="tagline-label">
            Label
          </label>
          <input
            id="tagline-label"
            className={`${styles.input} ${
              store.labelError ? styles.inputError : ""
            }`}
            value={store.draftLabel}
            onChange={(event) => store.setDraftLabel(event.target.value)}
            placeholder="Marketing"
            onKeyDown={handleKeyDown}
          />
          {store.labelError ? (
            <span className={styles.errorText}>
              {store.labelError === "required"
                ? "Required field"
                : "Item with this name already exists"}
            </span>
          ) : null}
        </div>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="tagline-link">
            Link
          </label>
          <input
            id="tagline-link"
            className={styles.input}
            value={store.draftLink}
            onChange={(event) => store.setDraftLink(event.target.value)}
            placeholder="https://onepage.io"
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>

    </PanelShell>
  );
});

export default ItemPanel;

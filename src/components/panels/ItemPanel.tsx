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
      <div className={`${styles.section} ${styles.itemSection}`}>
        <div
          className={[
            styles.itemField,
            store.labelError ? styles.itemFieldError : "",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          <label className={styles.itemFieldLabel} htmlFor="tagline-label">
            Label
          </label>
          <input
            id="tagline-label"
            className={styles.itemInput}
            value={store.draftLabel}
            onChange={(event) => store.setDraftLabel(event.target.value)}
            placeholder="Marketing"
            onKeyDown={handleKeyDown}
          />
        </div>
        {store.labelError ? (
          <span className={styles.itemErrorText}>
            {store.labelError === "required"
              ? "Required field"
              : "Item with this name already exists"}
          </span>
        ) : null}
        <div className={styles.itemField}>
          <label className={styles.itemFieldLabel} htmlFor="tagline-link">
            Link
          </label>
          <input
            id="tagline-link"
            className={styles.itemInput}
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

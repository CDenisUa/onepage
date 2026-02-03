// Core
import { observer } from "mobx-react-lite";
import { useLayoutEffect, useRef, useState } from "react";
// Styles
import styles from "./styles.module.css";
// Hooks
import { useTaglineStore } from "@hooks";
import {
  PANEL_DEFAULT_POSITION,
  PANEL_MARGIN,
} from "@/constants";
// Components
import TaglinePanel from "./TaglinePanel";
import ItemPanel from "./ItemPanel";
import StylesPanel from "./StylesPanel";

const Panels = observer(() => {
  const store = useTaglineStore();

  const panelRef = useRef<HTMLDivElement>(null);
  const [panelPosition, setPanelPosition] = useState(PANEL_DEFAULT_POSITION);

  useLayoutEffect(() => {
    if (!store.isPanelOpen) return;
    if (!panelRef.current) return;
    const rect = panelRef.current.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const nextSize = { width: rect.width, height: rect.height };
    const left = Math.min(
      store.menuPosition.x,
      window.innerWidth - nextSize.width - PANEL_MARGIN
    );
    const top = Math.min(
      store.menuPosition.y,
      window.innerHeight - nextSize.height - PANEL_MARGIN
    );
    setPanelPosition({
      left: Math.max(PANEL_MARGIN, left),
      top: Math.max(PANEL_MARGIN, top),
    });
  }, [store.activePanel, store.isPanelOpen, store.menuPosition.x, store.menuPosition.y]);

  useLayoutEffect(() => {
    if (!store.isPanelOpen) return;

    const handlePointerDown = (event: MouseEvent) => {
      const target = event.target as Node | null;
      if (!target || !panelRef.current) return;
      if (panelRef.current.contains(target)) return;
      if (store.activePanel === "item") {
        store.finishDraftAndClose();
        return;
      }
      store.closePanel();
    };

    document.addEventListener("mousedown", handlePointerDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
    };
  }, [store, store.isPanelOpen]);

  if (!store.isPanelOpen) return null;

  return (
    <div
      ref={panelRef}
      className={styles.panelWrapper}
      style={{ left: panelPosition.left, top: panelPosition.top }}
      onContextMenu={(event) => event.preventDefault()}
    >
      {store.activePanel === "item" ? (
        <ItemPanel />
      ) : store.activePanel === "styles" ? (
        <StylesPanel />
      ) : (
        <TaglinePanel />
      )}
    </div>
  );
});

export default Panels;

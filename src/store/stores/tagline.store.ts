// Core
import { makeAutoObservable } from "mobx";
import { nanoid } from "nanoid";
// Types
import type { Panel, TagItem, TaglineStyles, TaglineStateSnapshot } from "@/types";

const defaultStyles: TaglineStyles = {
  chipRadius: 10,
  chipPaddingX: 12,
  chipPaddingY: 8,
  chipGap: 8,
  chipFontSize: 14,
};

class TaglineStore {
  items: TagItem[] = [
    { id: nanoid(), text: "Fast setup" },
    { id: nanoid(), text: "No-code builder" },
    { id: nanoid(), text: "Customizable" },
  ];

  styles: TaglineStyles = defaultStyles;

  isPanelOpen = true;
  activePanel: Panel = "main";

  draftText = "";

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  get canAddDraft() {
    return this.draftText.trim().length > 0;
  }

  openPanel(panel: Panel) {
    this.isPanelOpen = true;
    this.activePanel = panel;
  }

  closePanel() {
    this.isPanelOpen = false;
    this.activePanel = "main";
  }

  setDraftText(value: string) {
    this.draftText = value;
  }

  addDraftItem() {
    const text = this.draftText.trim();
    if (!text) return;
    this.items.push({ id: nanoid(), text });
    this.draftText = "";
    this.activePanel = "main";
  }

  removeItem(id: string) {
    this.items = this.items.filter((i) => i.id !== id);
  }

  moveItem(fromIndex: number, toIndex: number) {
    if (fromIndex === toIndex) return;
    if (fromIndex < 0 || toIndex < 0) return;
    if (fromIndex >= this.items.length || toIndex >= this.items.length) return;

    const next = [...this.items];
    const [moved] = next.splice(fromIndex, 1);
    next.splice(toIndex, 0, moved);
    this.items = next;
  }

  updateStyles(patch: Partial<TaglineStyles>) {
    this.styles = { ...this.styles, ...patch };
  }

  resetStyles() {
    this.styles = defaultStyles;
  }

  toJSON(): TaglineStateSnapshot {
    return {
      items: this.items,
      styles: this.styles,
      activePanel: this.activePanel,
      isPanelOpen: this.isPanelOpen,
    };
  }

  hydrate(snapshot: TaglineStateSnapshot) {
    this.items = snapshot.items;
    this.styles = snapshot.styles;
    this.activePanel = snapshot.activePanel;
    this.isPanelOpen = snapshot.isPanelOpen;
  }
}

export default TaglineStore;
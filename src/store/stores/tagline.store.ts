// Core
import { makeAutoObservable } from "mobx";
import { nanoid } from "nanoid";
// Types
import type {
  Panel,
  TagItem,
  TaglineStyles,
  TaglineStateSnapshot,
} from "@/types";
import {
  DEFAULT_MENU_POSITION,
  DEFAULT_TAGLINE_RADIUS,
  MIN_INDEX,
  MIN_LABEL_LENGTH,
  NO_DELETE_COUNT,
  PERSIST_DRAFT_DEBOUNCE_MS,
  REMOVE_ONE_ITEM,
} from "@/constants";

const defaultStyles: TaglineStyles = {
  variant: "solid",
  size: "m",
  radius: DEFAULT_TAGLINE_RADIUS,
  align: "left",
};

class TaglineStore {
  items: TagItem[] = [
    { id: nanoid(), label: "Marketing", link: "" },
    { id: nanoid(), label: "Design", link: "" },
    { id: nanoid(), label: "Development", link: "" },
    { id: nanoid(), label: "Front", link: "" },
    { id: nanoid(), label: "AI Engineering", link: "" },
  ];

  styles: TaglineStyles = defaultStyles;

  isPanelOpen = false;
  activePanel: Panel = "main";
  menuPosition = { ...DEFAULT_MENU_POSITION };

  editingItemId: string | null = null;
  draftLabel = "";
  draftLink = "";
  labelError: "required" | "duplicate" | null = null;
  draftPersistTimer: ReturnType<typeof setTimeout> | null = null;

  constructor() {
    makeAutoObservable(this, { draftPersistTimer: false }, { autoBind: true });
  }

  get canSaveDraft() {
    return this.draftLabel.trim().length >= MIN_LABEL_LENGTH;
  }

  get normalizedDraftLabel() {
    return this.draftLabel.trim().toLowerCase();
  }

  hasDuplicateLabel() {
    const normalized = this.normalizedDraftLabel;
    if (!normalized) return false;
    return this.items.some(
      (item) =>
        item.id !== this.editingItemId &&
        item.label.trim().toLowerCase() === normalized
    );
  }

  openPanel(panel: Panel) {
    this.isPanelOpen = true;
    this.activePanel = panel;
  }

  openContextMenu(x: number, y: number) {
    this.menuPosition = { x, y };
    this.isPanelOpen = true;
    this.activePanel = "main";
  }

  closePanel() {
    this.cancelDraft();
    this.isPanelOpen = false;
    this.activePanel = "main";
  }

  setDraftLabel(value: string) {
    this.draftLabel = value;
    if (this.labelError) {
      this.labelError = null;
    }
    this.scheduleDraftPersist();
  }

  setDraftLink(value: string) {
    this.draftLink = value;
    this.scheduleDraftPersist();
  }

  startCreate() {
    this.editingItemId = null;
    this.draftLabel = "";
    this.draftLink = "";
    this.labelError = null;
    this.clearDraftPersistTimer();
    this.openPanel("item");
  }

  startEdit(id: string) {
    const item = this.items.find((candidate) => candidate.id === id);
    if (!item) return;
    this.editingItemId = id;
    this.draftLabel = item.label;
    this.draftLink = item.link;
    this.labelError = null;
    this.clearDraftPersistTimer();
    this.openPanel("item");
  }

  cancelDraft() {
    this.editingItemId = null;
    this.draftLabel = "";
    this.draftLink = "";
    this.labelError = null;
    this.clearDraftPersistTimer();
    this.activePanel = "main";
  }

  attemptSave() {
    if (!this.canSaveDraft) {
      this.labelError = "required";
      return false;
    }
    if (this.hasDuplicateLabel()) {
      this.labelError = "duplicate";
      return false;
    }
    this.labelError = null;
    this.saveDraft();
    return true;
  }

  finishDraft() {
    if (!this.canSaveDraft) {
      this.cancelDraft();
      return true;
    }
    if (this.hasDuplicateLabel()) {
      this.labelError = "duplicate";
      return false;
    }
    this.labelError = null;
    this.saveDraft();
    return true;
  }

  finishDraftAndClose() {
    if (this.finishDraft()) {
      this.isPanelOpen = false;
    }
  }

  saveDraft() {
    const label = this.draftLabel.trim();
    if (!label) return;

    if (this.editingItemId) {
      this.items = this.items.map((item) =>
        item.id === this.editingItemId
          ? { ...item, label, link: this.draftLink.trim() }
          : item
      );
    } else {
      this.items.push({
        id: nanoid(),
        label,
        link: this.draftLink.trim(),
      });
    }

    this.clearDraftPersistTimer();
    this.persist();
    this.activePanel = "main";
    this.editingItemId = null;
    this.draftLabel = "";
    this.draftLink = "";
  }

  removeItem(id: string) {
    this.items = this.items.filter((i) => i.id !== id);
    this.persist();
  }

  moveItem(fromIndex: number, toIndex: number) {
    if (fromIndex === toIndex) return;
    if (fromIndex < MIN_INDEX || toIndex < MIN_INDEX) return;
    if (fromIndex >= this.items.length || toIndex >= this.items.length) return;

    const next = [...this.items];
    const [moved] = next.splice(fromIndex, REMOVE_ONE_ITEM);
    next.splice(toIndex, NO_DELETE_COUNT, moved);
    this.items = next;
    this.persist();
  }

  updateStyles(patch: Partial<TaglineStyles>) {
    this.styles = { ...this.styles, ...patch };
    this.persist();
  }

  resetStyles() {
    this.styles = defaultStyles;
    this.persist();
  }

  persist(items: TagItem[] = this.items, styles: TaglineStyles = this.styles) {
    console.log("POST http://api/tagline", {
      items,
      styles,
    });
  }

  private clearDraftPersistTimer() {
    if (!this.draftPersistTimer) return;
    clearTimeout(this.draftPersistTimer);
    this.draftPersistTimer = null;
  }

  private scheduleDraftPersist() {
    if (this.activePanel !== "item") return;
    this.clearDraftPersistTimer();
    this.draftPersistTimer = setTimeout(() => {
      this.persist(this.previewItems, this.styles);
      this.draftPersistTimer = null;
    }, PERSIST_DRAFT_DEBOUNCE_MS);
  }

  get previewItems() {
    if (this.activePanel !== "item") return this.items;

    const label = this.draftLabel.trim();
    if (!label) return this.items;

    if (this.editingItemId) {
      return this.items.map((item) =>
        item.id === this.editingItemId
          ? { ...item, label, link: this.draftLink.trim() }
          : item
      );
    }

    return [
      ...this.items,
      {
        id: "__draft__",
        label,
        link: this.draftLink.trim(),
      },
    ];
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

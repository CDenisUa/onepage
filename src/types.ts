export type Panel = "main" | "item" | "styles";

export type TagItem = {
  id: string;
  label: string;
  link: string;
};

export type TaglineVariant = "solid" | "soft" | "outline" | "ghost";
export type TaglineSize = "xl" | "l" | "m" | "s" | "xs";
export type TaglineRadius = 0 | 4 | 8 | 12 | 100;
export type TaglineAlign = "left" | "center" | "right";

export type TaglineStyles = {
  variant: TaglineVariant;
  size: TaglineSize;
  radius: TaglineRadius;
  align: TaglineAlign;
};

export type TaglineStateSnapshot = {
  items: TagItem[];
  styles: TaglineStyles;
  activePanel: Panel;
  isPanelOpen: boolean;
};

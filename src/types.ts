export type Panel = "main" | "create" | "styles";

export type TagItem = {
  id: string;
  text: string;
};

export type TaglineStyles = {
  chipRadius: number;
  chipPaddingX: number;
  chipPaddingY: number;
  chipGap: number;
  chipFontSize: number;
};

export type TaglineStateSnapshot = {
  items: TagItem[];
  styles: TaglineStyles;
  activePanel: Panel;
  isPanelOpen: boolean;
};
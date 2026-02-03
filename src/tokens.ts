// Types
import type { TaglineSize } from "@/types";

type ChipSizeToken = {
  fontSize: number;
  padX: number;
  padY: number;
  gap: number;
};

export const chipSizeTokens: Record<TaglineSize, ChipSizeToken> = {
  xl: { fontSize: 16, padX: 16, padY: 10, gap: 10 },
  l: { fontSize: 15, padX: 14, padY: 9, gap: 9 },
  m: { fontSize: 14, padX: 12, padY: 8, gap: 8 },
  s: { fontSize: 13, padX: 10, padY: 7, gap: 7 },
  xs: { fontSize: 12, padX: 8, padY: 6, gap: 6 },
};

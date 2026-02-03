import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { TagItem, TaglineRadius, TaglineSize, TaglineVariant } from "@/types";
import {
  DND_DRAG_OPACITY,
  DND_IDLE_OPACITY,
  DND_SCALE_LOCK,
} from "@/constants";
import Chip from "@/components/ui/chip/Chip";
import styles from "./styles.module.css";

type SortableChipProps = {
  item: TagItem;
  disabled?: boolean;
  variant: TaglineVariant;
  size: TaglineSize;
  radius: TaglineRadius;
};

const SortableChip = ({ item, disabled, variant, size, radius }: SortableChipProps) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: item.id, disabled });

  const normalizedTransform = transform
    ? { ...transform, scaleX: DND_SCALE_LOCK, scaleY: DND_SCALE_LOCK }
    : null;
  const chipStyle = {
    transform: CSS.Transform.toString(normalizedTransform),
    transition: isDragging ? undefined : transition,
    opacity: isDragging ? DND_DRAG_OPACITY : DND_IDLE_OPACITY,
  } as const;

  return (
    <Chip
      ref={setNodeRef}
      label={item.label}
      href={item.link || undefined}
      variant={variant}
      size={size}
      radius={radius}
      className={styles.draggableChip}
      style={chipStyle}
      {...attributes}
      {...listeners}
    />
  );
};

export default SortableChip;

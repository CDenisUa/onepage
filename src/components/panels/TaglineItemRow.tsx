import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { TagItem } from "@/types";
import styles from "./styles.module.css";

type TaglineItemRowProps = {
  item: TagItem;
  onEdit: () => void;
  onRemove: () => void;
};

const TaglineItemRow = ({ item, onEdit, onRemove }: TaglineItemRowProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`${styles.listItem} ${isDragging ? styles.listItemDragging : ""}`}
    >
      <button
        ref={setActivatorNodeRef}
        className={styles.dragHandle}
        type="button"
        {...attributes}
        {...listeners}
        aria-label="Drag item"
      >
        ⋮⋮
      </button>
      <button className={styles.itemButton} type="button" onClick={onEdit}>
        {item.label}
      </button>
      <span className={styles.itemSpacer} />
      <button
        className={styles.itemRemove}
        type="button"
        onClick={onRemove}
        aria-label="Remove item"
      >
        ×
      </button>
    </div>
  );
};

export default TaglineItemRow;

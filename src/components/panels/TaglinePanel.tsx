// Core
import { observer } from "mobx-react-lite";
// Styles
import styles from "./styles.module.css";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  type DragEndEvent,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
// Types
import { DND_ACTIVATION_DISTANCE, NOT_FOUND_INDEX } from "@/constants";
// Hooks
import { useTaglineStore } from "@hooks";
// Components
import PanelShell from "./PanelShell";
import TaglineItemRow from "./TaglineItemRow";

const TaglinePanel = observer(() => {
  const store = useTaglineStore();
  const hasItems = store.items.length > 0;
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: DND_ACTIVATION_DISTANCE } })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = store.items.findIndex((item) => item.id === active.id);
    const newIndex = store.items.findIndex((item) => item.id === over.id);
    if (oldIndex === NOT_FOUND_INDEX || newIndex === NOT_FOUND_INDEX) return;

    store.moveItem(oldIndex, newIndex);
  };

  return (
    <PanelShell title="Tagline" onClose={() => store.closePanel()}>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={store.items.map((item) => item.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className={styles.list}>
            {hasItems ? (
              store.items.map((item) => (
                <TaglineItemRow
                  key={item.id}
                  item={item}
                  onEdit={() => store.startEdit(item.id)}
                  onRemove={() => store.removeItem(item.id)}
                />
              ))
            ) : (
              <div className={styles.emptyList}>
                <div className={styles.emptyListTitle}>No items yet</div>
                <div className={styles.emptyListHint}>
                  Click "Add item" to create the first tag.
                </div>
              </div>
            )}
          </div>
        </SortableContext>
      </DndContext>

      <div className={styles.menuSection}>
        <button
          className={`${styles.menuRow} ${styles.menuRowMuted}`}
          type="button"
          onClick={() => store.startCreate()}
        >
          <span className={styles.menuIconText}>＋</span>
          Add item
        </button>
      </div>
      <div className={styles.menuDivider} />
      <button
        className={styles.menuRow}
        type="button"
        onClick={() => store.openPanel("styles")}
      >
        <img className={styles.menuIcon} src="/svg/style.svg" alt="" />
        Styles
        <span className={styles.menuArrow}>›</span>
      </button>
    </PanelShell>
  );
});

export default TaglinePanel;

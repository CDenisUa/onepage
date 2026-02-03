import { observer } from "mobx-react-lite";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  type DragEndEvent,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { useTaglineStore } from "@hooks";
import { chipSizeTokens } from "@/tokens";
import {
  DND_ACTIVATION_DISTANCE,
  NOT_FOUND_INDEX,
} from "@/constants";
import SortableChip from "./SortableChip";
// Styles
import styles from "./styles.module.css";

const Preview = observer(() => {
  const store = useTaglineStore();
  const { styles: styleConfig } = store;
  const gap = chipSizeTokens[styleConfig.size].gap;
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
    <div className={styles.preview}>
      <h2 className={styles.title}>Tagline element</h2>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={store.previewItems.map((item) => item.id)}
          strategy={rectSortingStrategy}
        >
          <div
            className={`${styles.chips} ${styles[`align-${styleConfig.align}`]}`}
            style={{ gap: `${gap}px` }}
          >
            {store.previewItems.map((item) => (
              <SortableChip
                key={item.id}
                item={item}
                disabled={item.id === "__draft__"}
                variant={styleConfig.variant}
                size={styleConfig.size}
                radius={styleConfig.radius}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
});

export default Preview;

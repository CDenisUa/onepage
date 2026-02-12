// Core
import { observer } from "mobx-react-lite";
import { useEffect, useRef } from "react";
import type { MouseEvent, TouchEvent } from "react";
// Styles
import styles from "@/App.module.css";
// Hooks
import { useTaglineStore } from "@hooks";
// Constants
import {
  MOBILE_MENU_LONG_PRESS_MS,
  MOBILE_MENU_TOUCH_MOVE_TOLERANCE_PX,
} from "@/constants";
// Components
import Preview from "@/components/preview/Preview";
import Panels from "@/components/panels/Panels";

const App = observer(() => {
  const store = useTaglineStore();
  const longPressTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  const clearLongPressTimer = () => {
    if (!longPressTimerRef.current) return;
    clearTimeout(longPressTimerRef.current);
    longPressTimerRef.current = null;
  };

  useEffect(() => {
    return () => {
      if (!longPressTimerRef.current) return;
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    };
  }, []);

  const handleContextMenu = (event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    store.openContextMenu(event.clientX, event.clientY);
  };

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    if (event.touches.length !== 1) return;
    const touch = event.touches[0];
    const point = { x: touch.clientX, y: touch.clientY };
    touchStartRef.current = point;
    clearLongPressTimer();
    longPressTimerRef.current = setTimeout(() => {
      store.openContextMenu(point.x, point.y);
      longPressTimerRef.current = null;
    }, MOBILE_MENU_LONG_PRESS_MS);
  };

  const handleTouchMove = (event: TouchEvent<HTMLDivElement>) => {
    if (!touchStartRef.current) return;
    if (event.touches.length !== 1) {
      clearLongPressTimer();
      touchStartRef.current = null;
      return;
    }

    const touch = event.touches[0];
    const deltaX = touch.clientX - touchStartRef.current.x;
    const deltaY = touch.clientY - touchStartRef.current.y;
    const movedDistance = Math.hypot(deltaX, deltaY);

    if (movedDistance > MOBILE_MENU_TOUCH_MOVE_TOLERANCE_PX) {
      clearLongPressTimer();
      touchStartRef.current = null;
    }
  };

  const handleTouchEnd = () => {
    clearLongPressTimer();
    touchStartRef.current = null;
  };

  return (
    <div className={styles.app}>
      <section className={styles.stage}>
        <div
          className={styles.canvas}
          onContextMenu={handleContextMenu}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={handleTouchEnd}
        >
          <Preview />
        </div>
      </section>
      <aside className={styles.sidebar}>
        <Panels />
      </aside>
    </div>
  );
});

export default App;

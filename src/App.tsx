// Core
import { observer } from "mobx-react-lite";
import type { MouseEvent } from "react";
// Styles
import styles from "@/App.module.css";
// Hooks
import { useTaglineStore } from "@hooks";
// Components
import Preview from "@/components/preview/Preview";
import Panels from "@/components/panels/Panels";

const App = observer(() => {
  const store = useTaglineStore();

  const handleContextMenu = (event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    store.openContextMenu(event.clientX, event.clientY);
  };

  return (
    <div className={styles.app}>
      <section className={styles.stage}>
        <div className={styles.canvas} onContextMenu={handleContextMenu}>
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

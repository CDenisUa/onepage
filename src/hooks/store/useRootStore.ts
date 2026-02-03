// Core
import { useContext } from "react";
// Store
import { StoreContext } from "@/store/store.context";

const useRootStore = () => {
  const store = useContext(StoreContext);
  if (!store) {
    throw new Error("useRootStore must be used within StoreProvider");
  }
  return store;
};

export default useRootStore;

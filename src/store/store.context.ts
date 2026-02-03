// Core
import { createContext } from "react";
// Store
import { rootStore } from "@stores";

export const StoreContext = createContext<typeof rootStore | undefined>(undefined);

export const StoreProvider = StoreContext.Provider;

// Stores
import TaglineStore from "./tagline.store";

export class RootStore {
  taglineStore: TaglineStore;

  constructor() {
    this.taglineStore = new TaglineStore();
  }
}

export const rootStore = new RootStore();

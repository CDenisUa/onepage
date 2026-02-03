// Store
import useRootStore from "./useRootStore";
 
const useTaglineStore = () => useRootStore().taglineStore;

export default useTaglineStore;

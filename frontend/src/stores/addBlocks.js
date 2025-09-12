import { create } from "zustand";
import apiClient from "../api/config/axios";
import endpoints from "../api/config/endpoints";
import { UseDashboardStore} from "./dashboard";


export const UseAddBlocksStore = create((set, get) => ({
  loaders: {
    addLoading: false,
  },
  addBlocks: async (block) => {
    const currentState = UseDashboardStore.getState();
    try {
      set((prev) => ({
        ...prev,
        loaders: {
          ...prev.loaders,
          addLoading: true,
        },
      }));

      const response = await apiClient.post(endpoints.BLOCK.ADDBLOCKS, {
        block,
      });
      const newBlock = response?.data?.data; 
      const blocks = currentState.blocks;

      UseDashboardStore.setState({blocks:[...blocks,newBlock]});
       set((prev) => ({
         ...prev,
         loaders: {
           ...prev.loaders,
           addLoading: false,
         },
       }));
      return { state: true, message: response?.data?.message };
    } catch (err) {
      set((prev) => ({
        ...prev,
        loaders: {
          ...prev.loaders,
          addLoading: false,
        },
      }));
      return {
        state: false,
        message: err?.response?.data?.message || "Error occurred",
      };
    }
  },
}));
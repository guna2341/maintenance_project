import { create } from "zustand";
import apiClient from "../api/config/axios";
import endpoints from "../api/config/endpoints";
import { UseDashboardStore } from "./index";

export const UseAddBlocksStore = create((set, get) => ({
  blocks: { block: "", blockId: "", floors: [] },
  loaders: {
    addLoading: false,
  },

  resetBlocks: () => { 
    set({ blocks: { block: "", blockId: "", floors: [] } });
  },
  setBlock: (block) => { 
    set({ blocks: block });
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

      UseDashboardStore.setState({ blocks: [...blocks, newBlock] });
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
        message: err?.response?.data?.message || "Network Error Occurred",
      };
    }
  },
}));

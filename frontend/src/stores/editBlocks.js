import { create } from "zustand";
import apiClient from "../api/config/axios";
import endpoints from "../api/config/endpoints";
import { UseDashboardStore } from "./dashboard";

export const UseEditBlockStore = create((set,get) => ({
    loading: false,
    deleteLoading:false,
    setBlock: (block) => set({ editBlock: block }),

    editBlock: async (block) => {
        const state = UseDashboardStore.getState();
        try {
            set({loading:true});
const response = await apiClient.patch(endpoints.BLOCK.EDITBLOCKS, {
  data: block,
  id: block._id,
});     
set({loading:false});

    const updatedBlocks = state.blocks.map((item) =>
      item._id === block._id ? response?.data?.data : item
    );
    UseDashboardStore.setState({ blocks: updatedBlocks });
return {state: true, message: response?.data?.message};

}
catch (err) {
    return { state: false, message: err?.response?.data?.message };
}

},

deleteBlock: async (id) => {
    try {
          const state = UseDashboardStore.getState();
          const blocks = state.blocks;
      set({deleteLoading:true});
      const response = await apiClient.delete(`${endpoints.BLOCK.DELETEBLOCKS}?id=${id}`);
          const filteredBlocks = blocks.filter((item) => item._id !== id);
          UseDashboardStore.setState({ blocks: filteredBlocks });
      set({deleteLoading:false});
      return {state:true,message: response?.data?.message};
    }
    catch (err) {
      return { state: false, message: err?.response?.data?.message };
    }
}

})); 
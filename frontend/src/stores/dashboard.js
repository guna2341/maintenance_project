import { create } from "zustand";
import apiClient from "../api/config/axios";
import endpoints from "../api/config/endpoints";

export const UseDashboardStore = create((set, get) => ({
  blocks: [],
  filteredBlocks: [],
  menuExpanded:true,
  fetched:false,
  loaders: {
    getLoading: false,
    editLoading: false,
  },

  setDashboard: (key,value) => {
    set({[key]:value})
  },

  setFilter: (blocks) => {
    set((state) => ({
      ...state,
      filteredBlocks: blocks
    }))
  },

  getBlocks: async () => {
    const state = get();
    if (state.fetched || state.blocks.length > 0) {
      return {state:true};
    }
    try {
      set((state) => ({
        ...state,
        loaders: { ...state.loaders, getLoading: true },
      }));
      const response = await apiClient.get(endpoints.BLOCK.GETBLOCKS);
      set({fetched: true});
      set((state) => ({
        ...state,
        blocks: response?.data?.blocks,
        filteredBlocks: response?.data?.blocks
      }));
      return { state: true, data: response?.data };
    } catch (err) {
      return { state: false, message: err.response?.data?.message };
    } finally {   
      set((state) => ({
        ...state,
        loaders: { ...state.loaders, getLoading: false },
        fetched: false
      }));
    }
  },

  editState: async (data) => {
    try {
      set((state) => ({
          ...state,
          loaders: { ...state.loaders, editLoading: true },
        }));
      const state = get();
     let roomState;
     const block = state.blocks.map((block) => {
       if (block._id !== data.blockId) return block;

       return {
         ...block,
         floors: block.floors.map((floor) => {
           if (floor._id !== data.floorId) return floor;

           return {
             ...floor,
             rooms: floor.rooms.map((room) => {
               if (room._id === data.roomId) {
                 roomState = room.state === "active" ? "inactive" : "active";
                 return {
                   ...room,
                   state: roomState,
                 };
               }
               return room;
             }),
           };
         }),
       };
     });

      const response = await apiClient.post(endpoints.SWITCHSTATUS, {
        blockId: data.blockId,
        floorId: data.floorId,
        roomId: data.roomId,
        status:roomState
      });
      const updatedBlocks = state.blocks.map((item) => {
          if (String(item._id) === String(response.data.data._id)) {
          return response.data.data;
        } else {
          return item;
        }
      });
      set((state) => ({
        ...state,
        blocks: updatedBlocks,
        loaders: { ...state.loaders, editLoading: false },
      }));
      return { state: true, message: "Room updated successfully." };
    } catch (err) {
      return { state: false, message: err.response?.data?.message };
    } finally {
      set((state) => ({
        ...state,
        loaders: {
          ...state.loaders,
          editLoading: false,
        },
      }));
    }
  },
}));

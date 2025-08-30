import { create } from "zustand";
import apiClient from "../api/config/axios";
import endpoints from "../api/config/endpoints";

export const UseDashboardStore = create((set, get) => ({
  blocks: [],
  filteredBlocks: [],
  loaders: {
    getLoading: false,
    editLoading: false,
  },

  setFilter: (blocks) => {
    set((state) => ({
      ...state,
      filteredBlocks: blocks
    }))
  },

  getBlocks: async () => {
    try {
      set((state) => ({
        ...state,
        loaders: { ...state.loaders, getLoading: true },
      }));
      const response = await apiClient.get(endpoints.BLOCK.GETBLOCKS);
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
      const block = state.blocks.map((block) => {
        if (block._id !== data.blockId) return block;
        return {
          ...block,
          states: {
            ...block.states,
            active:
              data.state === "active"
                ? block.states.active - 1
                : block.states.active + 1,
            inactive:
              data.state === "active"
                ? block.states.inactive + 1
                : block.states.inactive - 1,
          },
          floors: block.floors.map((floor) => {
            if (floor._id !== data.floorId) return floor;

            return {
              ...floor,
              states: {
                ...floor.states,
                active:
                  data.state === "active"
                    ? floor.states.active - 1
                    : floor.states.active + 1,
                inactive:
                  data.state === "active"
                    ? floor.states.inactive + 1
                    : floor.states.inactive - 1,
              },
              rooms: floor.rooms.map((room) =>
                room._id === data.roomId
                  ? {
                      ...room,
                      state: room.state === "active" ? "inactive" : "active",
                    }
                  : room
              ),
            };
          }),
        };
      });
      const newBlock = block.find((block) => block._id === data.blockId);
      const response = await apiClient.patch(endpoints.BLOCK.EDITBLOCKS, {
        data: newBlock,
        id: data.blockId,
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

import { create } from "zustand";
import apiClient from "../api/config/axios";
import endpoints from "../api/config/endpoints";
import { UseDashboardStore } from "./dashboard";

export const UseSwitchStore = create((set, get) => ({
  loading: false,
  error: "",
  switchState: (blockId, floorId, roomId, state) => {
    const dashboardStore = UseDashboardStore.getState();
    const blocks = dashboardStore.blocks;
    const block = blocks.find((block) => block.blockId === blockId);
    const floor = block.floors.find((floor) => floor.floorId === floorId);
    const room = floor.rooms.find((room) => room.roomId === roomId);
    if (!block || !floor || !room) return;
    const temp = room.state;
    room.state = state;
    const newBlocks = blocks.map((block) =>
      block.blockId === blockId
        ? {
            ...block,
            floors: block.floors.map((floor) =>
              floor.floorId === floorId
                ? {
                    ...floor,
                    rooms: floor.rooms.map((room) =>
                      room.Id === roomId ? { ...room, state: state } : room
                    ),
                  }
                : floor
            ),
          }
        : block
    );
    console.log("switch: ", newBlocks); 

    UseDashboardStore.setState({ blocks: newBlocks });
    return {
      state: temp != state,
      message: `${block.block}-${floor.block}-Room-${room.room} has been turned ${state == "active" ? "on" : "off"}`,
      status: state,
    };
  },

  setSwitchState: async (blockId, floorId, roomId, state) => {
    try {
      set({ loading: true });
      const dashboardStore = UseDashboardStore.getState();
      UseDashboardStore.setState({
        loaders: { ...state.loaders, editLoading: true },
      });
      const blocks = dashboardStore.blocks;
      const response = await apiClient.post(endpoints.SWITCHSTATUS, {
        blockId,
        floorId,
        roomId,
        status: state == "active" ? "inactive" : "active",
      });
      const block = blocks.find((block) => block.blockId === blockId);
      const floor = block.floors.find((floor) => floor.floorId === floorId);
      const room = floor.rooms.find((room) => room.roomId === roomId);
      if (!block || !floor || !room) return;
      const temp = room.state;
      room.state = state;
      await new Promise((resolve) => set(resolve, 30000));
      UseDashboardStore.setState({
        loaders: { ...state.loaders, editLoading: false },
      });
      return {
        state: !get().loading,
        message: "Some error occured.Refresh the page and try again.",
      };
      // const newBlocks = blocks.map((block) =>
      //   block._id === blockId
      //     ? {
      //         ...block,
      //         floors: block.floors.map((floor) =>
      //           floor._id === floorId
      //             ? {
      //                 ...floor,
      //                 rooms: floor.rooms.map((room) =>
      //                   room._id === roomId ? { ...room, state: state == "active" ? "inactive" : "active" } : room
      //                 ),
      //               }
      //             : floor
      //         ),
      //       }
      //     : block
      // );
      // UseDashboardStore.setState({ blocks: newBlocks });
    } catch (err) {
      UseDashboardStore.setState({
        loaders: { ...state.loaders, editLoading: false },
      });
      return { state: false, message: err?.response?.data?.message };
    } finally {
      set({ loading: false });
    }
  },
}));

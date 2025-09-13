import { create } from "zustand";
import { UseDashboardStore } from "./dashboard";


export const UseSwitchStore = create((set,get) => ({

    switchState: (blockId, floorId, roomId, state) => {
        const dashboardStore = UseDashboardStore.getState();
        const blocks = dashboardStore.blocks;
        const block = blocks.find((block) => block._id === blockId);
        const floor = block.floors.find((floor) => floor._id === floorId);
        const room = floor.rooms.find((room) => room._id === roomId);
        if (!block || !floor || !room) return;
        const temp = room.state;
        room.state = state;

      const newBlocks = blocks.map((block) =>
        block._id === blockId
          ? {
              ...block,
              floors: block.floors.map((floor) =>
                floor._id === floorId
                  ? {
                      ...floor,
                      rooms: floor.rooms.map((room) =>
                        room._id === roomId ? { ...room, state: state } : room
                      ),
                    }
                  : floor
              ),
            }
          : block
      );
      UseDashboardStore.setState({ blocks: newBlocks });
      return {state: temp != state , message:`${block.block}-${floor.block}-Room-${room.room} has been turned ${state == "active" ? "on" : "off"}`, status:state}
    }

}));
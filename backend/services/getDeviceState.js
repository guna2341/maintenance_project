const blockModel = require("../model/blockModel");

const getDeviceState = async (blockId, floorId, roomId) => {
  try {
    const block = await blockModel.findOne(
      {
        blockId,
        "floors.floorId": floorId,
        "floors.rooms.roomId": roomId,
      },
      {
        "floors.$": 1, // only return the matched floor
      }
    );

    if (!block) {
      return null;
    }

    // Extract matched floor
    const floor = block.floors.find((f) => f.floorId === floorId);
    if (!floor) return null;

    // Extract matched room
    const room = floor.rooms.find((r) => r.roomId === roomId);
    if (!room) return null;
    return {
      state: room.state,
      status: room.status,
    };
  } catch (err) {
    console.error("Error fetching device state:", err);
    throw err;
  }
};

module.exports = { getDeviceState };
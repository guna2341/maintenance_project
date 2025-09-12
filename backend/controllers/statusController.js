const mongoose = require("mongoose");
const blockModel = require("../model/blockModel");

const switchStatus = async (req, res) => {
  try {
    const { blockId, floorId, roomId, status } = req.body;

    if (!blockId || !floorId || !roomId || !status) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const updated = await blockModel.findOneAndUpdate(
      { _id: blockId },
      {
        $set: {
          "floors.$[floor].rooms.$[room].state": status,
        },
      },
      {
        new: true,
        arrayFilters: [
          { "floor._id": new mongoose.Types.ObjectId(floorId) },
          { "room._id": new mongoose.Types.ObjectId(roomId) },
        ],
      }
    );

    if (!updated) {
      return res.status(404).json({ message: "Block/Floor/Room not found" });
    }

    res.json({ message: "Status updated successfully", data: updated });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = { switchStatus };

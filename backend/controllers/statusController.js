const mongoose = require("mongoose");
const blockModel = require("../model/blockModel");
const { publishMessage } = require("../services/mqtt");

const switchStatus = async (req, res) => {
  try {
    const { blockId, floorId, roomId, status } = req.body;

    if (!blockId || !floorId || !roomId || !status) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const topic = `acer_devices/${blockId}/${floorId}/${roomId}`;
   const payload = JSON.stringify({
     deviceId: `${blockId}/${floorId}/${roomId}`,
     command: status === "active" ? "ON" : "OFF",
   });

    publishMessage(topic , payload);

    res.json({ message: "Status updated successfully"});
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = { switchStatus };

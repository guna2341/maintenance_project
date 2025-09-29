const { publishMessage } = require("../services/mqtt");
const { ack, devices } = require("../sharedState");

const switchStatus = async (req, res) => {
  try {
    const { blockId, floorId, roomId, status } = req.body;

    if (!blockId || !floorId || !roomId || !status) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const index = `${blockId}/${floorId}/${roomId}`;

    // for testing
    // const index = "SF-1";
    const topic = `devices/${index}/control`;
    // devices[index] = status == "active" ? "ON" : "OFF";
    
  const payload = JSON.stringify({
     deviceId: `${index}`,
     command: status === "active" ? "ON" : "OFF",
   });

    publishMessage(topic, payload);

    res.json({ message: "Status updated successfully"});
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = { switchStatus };

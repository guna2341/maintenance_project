const mqtt = require("mqtt");
const blockModel = require("../model/blockModel");
const { default: mongoose } = require("mongoose");

let client;

const brokerUrl = process.env.BROKER_URL;

const connectMqtt = async () => {
  client = mqtt.connect(brokerUrl);

  client.on("connect", () => {
    console.log("✅ Connected to MQTT broker");
    client.subscribe(`${process.env.MQTT_CLIENT}/+/+/+`, (err) => {
      if (!err) {
        console.log("Subscribed to device topics")
      };
    });
  });

  client.on("message", async (topic, message) => {
    console.log();
    console.log("Received Message:");
    console.log(`${topic}: ${message.toString()}`);
    const msg = JSON.parse(message);
    try {
      const parts = topic.split("/");
      const blockId = parts[1];
      const floorId = parts[2];
      const roomId = parts[3];
      const state = msg.status == "ON" ? "active" : "inactive";
      const updated = await blockModel.findOneAndUpdate(
            { _id: blockId },
            {
              $set: {
                "floors.$[floor].rooms.$[room].state": state,
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
      console.log(`Updated Block with ${blockId} and updated Floor with ${floorId} updated room ${roomId} with state: ${state}`);
      console.log();
    } catch (err) {
      console.error("❌ Error updating room:", err);
    }
  });
};

const publishMessage = (topic, message) => {
  console.log();
  console.log("Published message:")
  console.log(topic, message);
  if (client) {
    client.publish(topic, message);
  };
};

module.exports = { connectMqtt, publishMessage };

const mqtt = require("mqtt");
const blockModel = require("../model/blockModel");
const { default: mongoose } = require("mongoose");

const ack = {};
const devices = {};

let client;

const brokerUrl = process.env.BROKER_URL;

const connectMqtt = async () => {
  client = mqtt.connect(brokerUrl);

  client.on("connect", () => {
    console.log("✅ Connected to MQTT broker");
    client.subscribe(`client_devices/+/+/+`, (err) => {
      if (!err) {
        console.log("Subscribed to device topics")
      };
    });
  });

  client.on("message", async (topic, message) => {
    console.log("Received Message:");
    const top = topic.toString();
    const msg = message.toString().split(" ");
    console.log(top + " " + msg);
    const status = msg[1];
    try {
      const parts = top?.split("/");
      console.log(parts);
      const blockId = parts[1];
      const floorId = parts[2];
      const roomId = parts[3];
      const state = msg.status == "ON" ? "active" : "inactive";
      await blockModel.findOneAndUpdate(
        { blockId: blockId },
        {
          $set: {
            "floors.$[floor].rooms.$[room].state": state,
          },
        },
        {
          new: true,
          arrayFilters: [
            { "floor.floorId": floorId },
            { "room.roomId": roomId },
          ],
        }
      );
      // console.log(`Updated Block with ${blockId} and updated Floor with ${floorId} updated room ${roomId} with state: ${state}`);
      console.log();
    } catch (err) {
      console.error("❌ Error updating room:", err);
    }
  });
};

const publishMessage = (topic, message) => {
  console.log();
  console.log("Published message:")
  console.log(topic + " " + message);
  if (client) {
    client.publish(topic, message);
  };
};

module.exports = { connectMqtt, publishMessage };

const mqtt = require("mqtt");

let client;

const brokerUrl = process.env.BROKER_URL;

const connectMqtt = async () => {
  client = mqtt.connect(brokerUrl);

  client.on("connect", () => {
    console.log("✅ Connected to MQTT broker");
    client.subscribe("AcerDevices/+/+/+/status", (err) => {
      if (!err) {
        console.log("Subscribed to device topics")
      };
    });
  });

  client.on("message", async (topic, message) => {
    console.log();
    console.log("Received Message:");
    console.log(`${topic}: ${message.toString()}`);

    try {
      const parts = topic.split("/");
      const blockId = parts[1];
      const floorId = parts[2];
      const roomId = parts[3];
      const state = message.toString();
      console.log(`Updated Block with ${blockId} and updated Floor with ${floorId} updated room ${roomId} with state: ${state}`);
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
  }
};

module.exports = { connectMqtt, publishMessage };

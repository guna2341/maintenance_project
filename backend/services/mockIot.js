const mqtt = require("mqtt");
const { publishMessage } = require("./mqtt");

let client;

const brokerUrl = process.env.BROKER_URL;

const mockIOT = async () => {
  client = mqtt.connect(brokerUrl);

  client.on("connect", () => {
    console.log("✅ Connected to mock MQTT IOT");
    client.subscribe(`acer_devices/+/+/+`, (err) => {
      if (!err) {
        console.log("Subscribed to client topics");
      }
    });
  });

  client.on("message", async (topic, message) => {
    console.log();
    console.log("Received Message:");
    message = JSON.parse(message);
    console.log(message);    
    try {
      const parts = topic.split("/");
      const blockId = parts[1];
      const floorId = parts[2];
      const roomId = parts[3];
      const status = JSON.stringify({
        status: message.command
      })
      publishMessage(`client/${blockId}/${floorId}/${roomId}`, status);
      console.log();
    } catch (err) {
      console.error("❌ Error updating room:", err);
    }
  });
};



module.exports = { mockIOT };

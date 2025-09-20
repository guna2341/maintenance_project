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
    try {
      console.log("Received Message:");
      const json = JSON.parse(message);
      console.log(`Topic: ${topic} ${json?.command}`);
      const top = topic.split("/");
      let publishTopic = `client_devices/${top[1]}/${top[2]}/${top[3]}`;
      const state = json.command == "ON" ? "ON" : "OFF";
      let publishMsg = JSON.stringify({ status: state });
      publishMessage(publishTopic, publishMsg);
    }
    catch (err) {
      console.log(err);
    }
   
  });
};



module.exports = { mockIOT };

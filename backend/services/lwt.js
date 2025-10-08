const mqtt = require("mqtt");
const blockModel = require("../model/blockModel");

const brokerUrl = process.env.BROKER_URL;

const lastWill = async () => {

  // connect broker
  const client = mqtt.connect(brokerUrl);

  client.on("connect", () => {
    console.log("✅ Connected to lastwill MQTT broker");

    // subscribe to will
    client.subscribe("devices/+/+/+/lastwill", (err) => {
      if (!err) console.log("Subscribed to LWT topic");
    });
  });


  // get messages
  client.on("message", async (topic, message) => {
    try {
      let msg;

      // parsing message
      try {
        msg = JSON.parse(message.toString());
      } catch (e) {
        msg = { status: message.toString() };
      }

      // filtering id
      const parts = topic.split("/");
      const blockId = parts[1];
      const floorId = parts[2];
      const roomId = parts[3];
      // set state
      if (msg?.status == "device disconnected") {
        await blockModel.updateOne(
          { blockId },
          {
            $set: {
              "floors.$[floor].rooms.$[room].status": "disconnected",
              "floors.$[floor].rooms.$[room].state": "inactive",
            },
          },
          {
            arrayFilters: [
              { "floor.floorId": floorId },
              { "room.roomId": roomId },
            ],
          }
        );
      };

      console.log(`${topic} : ${message.toString()}`);

    } catch (err) {
      console.log(err);
    }
  });
};

module.exports = { lastWill };

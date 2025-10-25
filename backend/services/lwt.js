const mqtt = require("mqtt");
const blockModel = require("../model/blockModel");
const { getDeviceState } = require("./getDeviceState");

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
      }
      if (msg?.status == "device connected") {
        await blockModel.updateOne(
          { blockId },
          {
            $set: {
              "floors.$[floor].rooms.$[room].status": "connected",
            },
          },
          {
            arrayFilters: [
              { "floor.floorId": floorId },
              { "room.roomId": roomId },
            ],
          }
        );
      }
      if (msg?.status == "device connected") {
        const top = topic.split("/");
        const blockId = top[1];
        const floorId = top[2];
        const roomId = top[3];
        const index = `${blockId}/${floorId}/${roomId}`;
        const deviceState = await getDeviceState(blockId, floorId, roomId);
        console.log(deviceState);
        if (
          msg?.status == "device connected" &&
          deviceState.previousState == "active"
        ) {
          let payload = { deviceId: `${index}`, command: "ON" };
          setTimeout(() => {
            client.publish(`devices/${index}/control`, JSON.stringify(payload));
            console.log(
              `published from lastwill: devices/${index}/control`,
              payload
            );
          }, 3000);
        }
      }

      console.log(`${topic} : ${message.toString()}`);
    } catch (err) {
      console.log(err);
    }
  });
};

module.exports = { lastWill };

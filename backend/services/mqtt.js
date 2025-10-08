const mqtt = require("mqtt");
const blockModel = require("../model/blockModel");
const { devices } = require("../sharedState");
const { getDeviceState } = require("./getDeviceState");

let client;

const brokerUrl = process.env.BROKER_URL;

const connectMqtt = async () => {

  // connect broker
  client = mqtt.connect(brokerUrl);

  client.on("connect", () => {
    console.log("✅ Connected to MQTT broker");

    // subscribe to status
    client.subscribe(`devices/+/+/+/status`, (err) => {
      if (!err) {
        console.log("Subscribed to client_device topics in Backend");
      }
    });
  });

  // get messages
  client.on("message", async (topic, message) => {

    let msg;

    // filtering id
    const top = topic.split("/");
    const blockId = top[1];
    const floorId = top[2];
    const roomId = top[3];
    const index = `${blockId}/${floorId}/${roomId}`;

    // parse message
    try {
      msg = message.toString();
      msg = JSON.parse(msg);
      // publish status again on device connect
      console.log(msg)
      if (msg?.status == "device connected") {
          console.log(msg.status)
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
      const deviceState = await getDeviceState(blockId, floorId, roomId);
      if (client && msg?.status == "device connected" && (deviceState.previousState == "active")) {
          let payload = { deviceId: `${index}`, command: "ON" };
          console.log(`published: devices/${index}/control`, payload);
          client.publish(`devices/${index}/control`, JSON.stringify(payload));
          return;
        }

      // get state
      const state = msg?.status == "ON" ? "active" : "inactive";

      // update db
      await blockModel.updateOne(
        { blockId },
        {
          $set: {
            "floors.$[floor].rooms.$[room].state": state,
            "floors.$[floor].rooms.$[room].previousState": state,
            
           },
        },
        {
          arrayFilters: [
            { "floor.floorId": floorId },
            { "room.roomId": roomId },
          ],
        }
      );

      console.log("Received Message: ", msg);
      
    } catch (err) {
      console.error("Invalid JSON received:", message.toString());
      return;
    }
  });
};

// publish message
const publishMessage = (topic, payload) => {
  const send = () => {
    if (client) client.publish(topic, payload);
    console.log("Published Message: ", topic + " " + payload);
  };
  send();
};

module.exports = { connectMqtt, publishMessage };

import mqtt from "mqtt";
import { addToast } from "@heroui/toast";
import { UseDashboardStore } from "../stores";

const brokerURL = import.meta.env.VITE_BROKER_URL;

let client;

export const lastWill = async () => {
  // connect broker
  client = mqtt.connect(brokerURL);

  client.on("connect", () => {
    console.log("Connected to LAST WILL");

    // subscribe to will topic
    client.subscribe("devices/+/+/+/lastwill", (err) => {
      if (!err) console.log("Subscribed to LWT topic");
    });
  });

  // handle incoming messages
  client.on("message", async (topic, message) => {
    try {
      let msg;
      try {
        msg = JSON.parse(message.toString());
      } catch {
        msg = { status: message.toString() };
      }
      console.log("Last Will:", topic + " status:" + msg.status);

      const parts = topic.split("/");
      const blockId = parts[1];
      const floorId = parts[2];
      const roomId = parts[3];

      // handle device disconnected
      if (msg.status === "device disconnected") {
        UseDashboardStore.setState((prev) => {
          const updatedBlocks = prev.blocks.map((block) => {
            if (block.blockId !== blockId) return block;

            return {
              ...block,
              floors: block.floors.map((floor) => {
                if (floor.floorId !== floorId) return floor;

                return {
                  ...floor,
                  rooms: floor.rooms.map((room) =>
                    room.roomId === roomId
                      ? {
                          ...room,
                          state: "inactive",
                          status: "disconnected",
                        }
                      : room
                  ),
                };
              }),
            };
          });

          return { blocks: updatedBlocks };
        });

        // Optional toast
        // addToast({
        //   title: "MQTT Update",
        //   description: `${roomId} has been disconnected`,
        //   color: "danger",
        // });
      }

      // handle device connected
      if (msg.status === "device connected") {
        UseDashboardStore.setState((prev) => {
          const updatedBlocks = prev.blocks.map((block) => {
            if (block.blockId !== blockId) return block;

            return {
              ...block,
              floors: block.floors.map((floor) => {
                if (floor.floorId !== floorId) return floor;

                return {
                  ...floor,
                  rooms: floor.rooms.map((room) =>
                    room.roomId === roomId
                      ? {
                          ...room,
                          status: "connected",
                        }
                      : room
                  ),
                };
              }),
            };
          });

          return { blocks: updatedBlocks };
        });

        // Optional toast
        // addToast({
        //   title: "MQTT Update",
        //   description: `${roomId} has been connected`,
        //   color: "success",
        // });
      }
    } catch (err) {
      console.error("Error processing last will:", err);
    }
  });
};

export const lastWillDisconnect = () => {
  if (client) {
    console.log("Disconnecting LAST WILL client...");
    client.removeAllListeners();
    client.end(true, () => {
      console.log("LAST WILL client disconnected");
    });
    client = null;
  }
};

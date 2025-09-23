import mqtt from "mqtt";
import { addToast } from "@heroui/toast";
import { UseDashboardStore } from "../stores";

const brokerURL = import.meta.env.VITE_BROKER_URL;

export const lastWill = async () => {

  // connect broker
  const client = mqtt.connect(brokerURL);

  client.on("connect", () => {
    console.log("✅ Connected to LAST WILL");

    // subscribe to will
    client.subscribe("devices/+/+/+/lastwill", (err) => {
      if (!err) console.log("Subscribed to LWT topic");
    });
  });


  // get messages
    client.on("message", async (topic, message) => {
        let msg;
        try {
            try {
              msg = JSON.parse(message.toString());
            } catch (e) {
              msg = { status: message.toString() };
            }
            const blocks = UseDashboardStore.getState().blocks;
            const parts = topic.split("/");
            const blockId = parts[1];
            const floorId = parts[2];
            const roomId = parts[3];
            if (msg.status == "device disconnected") {
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
                                  status: "disconnected"
                                }
                              : room
                          ),
                        };
                      }),
                    };
                  });

                  return { blocks: updatedBlocks };
                });
                  
            }
            addToast({
              title: "MQTT Update",
              description: `${roomId} has been disconnected`,
              color: "danger",
            });
        }
        catch (err) {
            console.log(err);
        }

    })
};

export const lastWillDisconnect = () => {
  if (lastWillClient) {
    console.log("🔌 Disconnecting LAST WILL client...");
    lastWillClient.removeAllListeners();
    lastWillClient.end(true, () => {
      console.log("🛑 LAST WILL client disconnected");
    });
    lastWillClient = null;
  }
};
  
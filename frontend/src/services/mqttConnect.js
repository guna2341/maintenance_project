import mqtt from "mqtt";
import { UseSwitchStore } from "../stores/switchStore";
import { addToast } from "@heroui/toast";
import { UseDashboardStore } from "../stores";

let mqttClient;

const brokerURL = import.meta.env.VITE_BROKER_URL;
const sub = import.meta.env.VITE_SUB;

export const mqttConnect = () => {
  if (mqttClient) return;
  if (!mqttClient) mqttClient = mqtt.connect(brokerURL);

  mqttClient.on("connect", () => {
    addToast({
      title: "Broker connected",
      description: "MQTT broker connected successfully",
      color: "success",
    });
    UseDashboardStore.setState({ broker: true });
    mqttClient.subscribe(`devices/+/+/+/status`, (err) => {
      if (!err) {
        console.log("Subscribed to devices/+/+/+/status", sub);
      }
    });
  });

  mqttClient.on("offline", () => {
    console.log("⚠️ MQTT broker went offline");
    UseDashboardStore.setState({ broker: false });
    addToast({
      title: "Connection Lost",
      description: "MQTT broker disconnected unexpectedly",
      color: "danger",
    });
  });

  mqttClient.on("disconnect", () => {
    console.log("🔌 Disconnected from MQTT broker");
    UseDashboardStore.setState({ broker: false });
  });

  mqttClient.on("error", (error) => {
    console.error("❌ MQTT connection error:", error);
    UseDashboardStore.setState({ broker: false });
    addToast({
      title: "Connection Error",
      description: "Failed to connect to MQTT broker",
      color: "danger",
    });
  });

  mqttClient.on("reconnect", () => {
    console.log("🔄 Attempting to reconnect to MQTT broker...");
    // addToast({
    //   title: "Reconnecting",
    //   description: "Attempting to reconnect to broker...",
    //   color: "warning",
    // });
  });

  mqttClient.removeAllListeners("message");
  mqttClient.on("message", (topic, message) => {
    console.log(topic + " " + message.toString());
    UseSwitchStore.setState({ loading: false });
    const store = UseSwitchStore.getState();
    try {
      const msg = JSON.parse(message.toString());
      const parts = topic.split("/");
      const blockId = parts[1];
      const floorId = parts[2];
      const roomId = parts[3];
      if (
        msg?.status == "device connected" ||
        msg?.status == "device disconnected"
      ) {
        const deviceState =
          msg?.status == "device connected" ? "connected" : "disconnected";
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
                          status: deviceState,
                        }
                      : room
                  ),
                };
              }),
            };
          });
          addToast({
            title: "MQTT Update",
            description: `${roomId} Device Connected`,
            color: "success",
          });
          return { blocks: updatedBlocks };
        });
        return;
      }
      message = message.toString();
      console.log(message);
      const response = store.switchState(
        blockId,
        floorId,
        roomId,
        msg.status == "ON" ? "active" : "inactive"
      );
      if (response.state) {
        addToast({
          title: "MQTT Update",
          description: response.message,
          color: response.status == "active" ? "success" : "danger",
        });
      }
    } catch (err) {
      console.log(err);
    }
  });
};

export const mqttDisconnect = () => {
  if (mqttClient) {
    console.log("Disconnecting MQTT client...");
    mqttClient.removeAllListeners();
    mqttClient.end();
    mqttClient = null;
    UseDashboardStore.setState({ broker: false });
  }
};

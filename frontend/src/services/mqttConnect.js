import mqtt from "mqtt";
import { UseSwitchStore } from "../stores/switchStore";
import { addToast } from "@heroui/toast";
import { UseDashboardStore } from "../stores";

let mqttClient;

const brokerURL = import.meta.env.VITE_BROKER_URL;
const client = import.meta.env.VITE_CLIENT;

export const mqttConnect = () => {
  if (mqttClient) return;
  if (!mqttClient) mqttClient = mqtt.connect(brokerURL);

  mqttClient.on("connect", () => {
    console.log("✅ Connected to MQTT broker");
    mqttClient.subscribe(`client_devices/+/+/+`, (err) => {
      if (!err) {
        UseDashboardStore.setState({ broker: true });
        console.log("Subscribed to devices/+/+/+");
      }
    });
  });
  mqttClient.removeAllListeners("message");
  mqttClient.on("message", (topic, message) => {
    console.log(topic + " " + message.toString());
    UseSwitchStore.setState({ loading: false });
    const store = UseSwitchStore.getState();
    try {
      const topics = topic.split("/");
      message = message.toString();
      const msg = JSON.parse(message.toString());
      // console.log(`${topic}: ${message.toString()}`);
      const response = store.switchState(
        topics[1],
        topics[2],
        topics[3],
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
    console.log("🔌 Disconnecting MQTT client...");
    mqttClient.removeAllListeners();
    mqttClient = null;
  }
};

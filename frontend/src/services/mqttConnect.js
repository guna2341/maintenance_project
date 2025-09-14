import mqtt from "mqtt";
import { UseSwitchStore } from "../stores/switchStore";
import { addToast } from "@heroui/toast";

let mqttClient;

const brokerURL = import.meta.env.VITE_BROKER_URL;
const client = import.meta.env.VITE_CLIENT;

export const mqttConnect = () => {
  if (mqttClient) return;
  if (!mqttClient) mqttClient = mqtt.connect(brokerURL);

  mqttClient.on("connect", () => {
    console.log("✅ Connected to MQTT broker");
    mqttClient.subscribe(`client/+/+/+`, (err) => {
      if (!err) {
        // console.log("Subscribed to AcerDevices/+/+/+");
      }
    });
  });
  mqttClient.removeAllListeners("message");
  mqttClient.on("message", (topic, message) => {
    console.log("Message listeners:", mqttClient.listeners("message").length);
    const store = UseSwitchStore.getState();
    const topics = topic.split("/");
    const msg = JSON.parse(message);
    const state = msg.status == "ON" ? "active" : "inactive";
    UseSwitchStore.setState({ loading: false });
    console.log(`${topic}: ${message.toString()}`);
    const response = store.switchState(topics[1], topics[2], topics[3], state);
    if (response.state) {
      addToast({
        title: "MQTT Update",
        description: response.message,
        color: response.status == "active" ? "success" : "danger",
      });
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
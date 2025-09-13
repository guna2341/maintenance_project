import mqtt from "mqtt";
import { UseSwitchStore } from "../stores/switchStore";
import { addToast } from '@heroui/toast';

let mqttClient;

const brokerURL = import.meta.env.VITE_BROKER_URL;

export const mqttConnect = () => {

    if (mqttClient) return;

     mqttClient = mqtt.connect(brokerURL);
    
            mqttClient.on("connect", () => {
                console.log("✅ Connected to MQTT broker");
                mqttClient.subscribe("AcerDevices/+/+/+", (err) => {
                    if (!err) {
                        console.log("📡 Subscribed to AcerDevices/+/+/+");
                    }
                });
            });
    
            mqttClient.on("message", (topic, message) => {
                const store = UseSwitchStore.getState();
                const topics = topic.split("/");
                const response = store.switchState(topics[1],topics[2],topics[3],message.toString());
                if (response.state) {
                  addToast({
                    title: "MQTT Update",
                    description: response.message,
                    color: response.status == "active" ? "success" : "danger",
                  });
                }
                console.log(`📥 ${topic}: ${message.toString()}`);
            });
};

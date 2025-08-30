import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@heroui/modal";
import { Button } from "@heroui/button";
import { cn } from "@heroui/theme";

export const ControlModal = ({ isOpen, onClose, roomName, action, loading }) => {
    return (
        <Modal
            isOpen={isOpen}
            hideCloseButton
            onClose={onClose}
            placement="center"
            classNames={{
                base: "rounded-2xl shadow-xl",
                body: "text-center",
            }}
        >
            <ModalContent>
                    <>
                        <ModalHeader className="flex flex-col items-center gap-2">
                            <span className="text-lg font-semibold">Confirm Action</span>
                        </ModalHeader>

                        <ModalBody>
                            <p className="text-gray-600">
                                Are you sure you want to{" "}
                            <span className={cn("font-semibold", {
                                "text-custom-500": action === "off",
                                "text-custom-400": action === "on"
                            })}>
                                    {action === "off" ? "turn off" : "turn on"}
                                </span>{" "}
                                the power supply for
                                <span className="font-semibold"> {roomName}</span>?
                            </p>
                        </ModalBody>

                        <ModalFooter className="flex justify-center gap-4">
                            <Button
                                variant="bordered"
                                radius="sm"
                                color="default"
                                onPress={() => !loading && onClose("close")}
                            className="px-6"
                            >
                                Cancel
                            </Button>
                        <Button
                                isLoading = {loading}
                                color={action === "off" ? "danger" : "success"}
                                radius="sm"
                                className="px-6 border text-white"
                                onPress={() => {
                                    onClose("confirm");
                                }}
                            >
                                {loading ? action === "off" ? "Turning off" : "Turning on" :  action === "off" ? "Turn Off" : "Turn On"}
                            </Button>
                        </ModalFooter>
                    </>
            </ModalContent>
        </Modal>
    );
};

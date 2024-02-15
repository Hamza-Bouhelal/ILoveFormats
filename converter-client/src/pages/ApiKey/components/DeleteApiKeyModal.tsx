import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { useRef, useState } from "react";
import { createApiKey } from "../api/createApiKey";
import toast from "react-hot-toast";
import { useAuthContext } from "../../../Common/Providers/AuthContext";
import { AxiosError } from "axios";
import { deleteApiKey } from "../api/deleteApiKey";

interface DeleteApiKeyModalProps {
  id: string;
  name: string;
  onDelete: () => void;
}

export const DeleteApiKeyModal = ({
  id,
  name,
  onDelete,
}: DeleteApiKeyModalProps) => {
  const { accessToken } = useAuthContext();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleDelete = async () => {
    try {
      const response = await deleteApiKey(accessToken!, id);
      if (response.status === 204) {
        onClose();
        onDelete();
        toast.success("API Key deleted successfully");
      } else {
        onClose();
        toast.error(response.data.error || "Failed to delete API Key");
      }
    } catch (e: AxiosError | any) {
      onClose();
      toast.error(e.response?.data?.error || "Failed to delete API Key");
    }
  };

  return (
    <>
      <Button variant="faded" onPress={onOpen} color="danger" size="sm">
        Delete
      </Button>
      <Modal size="lg" isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Delete API Key
              </ModalHeader>
              <ModalBody>
                <p>Are you sure you want to delete the API Key {name}?</p>
              </ModalBody>
              <ModalFooter>
                <Button color="default" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="danger" onPress={handleDelete}>
                  Delete
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

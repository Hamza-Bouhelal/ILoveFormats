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
import { IApiKey } from "../hooks/useGetApiKeys";

interface CreateApiKeyModalProps {
  onAddKey: (key: IApiKey) => void;
}

export const CreateApiKeyModal = ({ onAddKey }: CreateApiKeyModalProps) => {
  const { accessToken } = useAuthContext();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const nameInputRef = useRef<HTMLInputElement>(null);
  const dateInputRef = useRef<HTMLInputElement>(null);
  const [nameError, setNameError] = useState<string | null>(null);
  const [dateError, setDateError] = useState<string | null>(null);

  const handleCreate = async () => {
    setNameError(null);
    setDateError(null);
    const name = nameInputRef.current?.value;
    const expiresAt = dateInputRef.current?.value;
    if (!name || !name.length) {
      return setNameError("Name is required");
    }
    if (!expiresAt || !expiresAt.length) {
      return setDateError("Expiry date is required");
    }
    if (new Date(expiresAt) < new Date()) {
      return setDateError("Expiry date must be in the future");
    }
    try {
      const res = await createApiKey(accessToken!, { name, expiresAt });
      if (res.status === 201) {
        onAddKey(res.data);
        onClose();
        toast.success("API Key created successfully");
      }
    } catch (e: AxiosError | any) {
      setDateError(e.response?.data?.error || "Failed to create API Key");
    }
  };

  return (
    <>
      <div className="relative w-[100%] mb-16">
        <Button
          variant="faded"
          onPress={onOpen}
          className="mb-6 absolute top-0 right-0"
        >
          Create new API Key
        </Button>
      </div>
      <Modal size="sm" isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Create new API Key
              </ModalHeader>
              <ModalBody>
                <Input
                  labelPlacement="outside"
                  label="Name"
                  placeholder="Key Name"
                  ref={nameInputRef}
                  errorMessage={nameError}
                />
                <div className="relative max-w-sm">
                  <Input
                    labelPlacement="outside"
                    label="Expiry Date"
                    type="date"
                    placeholder="Select Expiry Date"
                    id="expiry-date"
                    ref={dateInputRef}
                    errorMessage={dateError}
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={handleCreate}>
                  Create
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

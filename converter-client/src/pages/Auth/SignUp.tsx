import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from "@nextui-org/react";
import { Icons } from "../../assets/Icons";
import { apiRegister } from "./api/authApi";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useAuthContext } from "../../Common/Providers/AuthContext";
import { validateEmail } from "../../utils/common";
import "./index.css";
import { useTheme } from "next-themes";

const UNEXPECTED_ERROR = "An unexpected error occurred";

export default function SignUp() {
  const { theme } = useTheme();
  const { setAuthInfo } = useAuthContext();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [emailError, setEmailError] = React.useState<null | string>(null);
  const [passwordError, setPasswordError] = React.useState<null | string>(null);
  const [signUpError, setSignUpError] = React.useState<null | string>(null);

  const handleLogin = () => {
    if (!validateEmail(email)) {
      return setEmailError("Invalid email Address");
    }
    if (password.length < 6 || password.length > 30) {
      return setPasswordError("Password length must be between 6 and 30");
    }
    apiRegister(email, password)
      .then((res) => {
        if (res.status === 201) {
          setAuthInfo({ email }, res.data.accessToken, res.data.refreshToken);
          toast.success("Login successfully");
          window.location.href = "/dashboard";
        } else {
          setSignUpError(res.data.error || UNEXPECTED_ERROR);
        }
      })
      .catch((err) => {
        if (err instanceof AxiosError) {
          setSignUpError(err.response?.data.error || UNEXPECTED_ERROR);
        } else {
          setSignUpError(UNEXPECTED_ERROR);
        }
      });
  };

  return (
    <>
      <Button
        onPress={onOpen}
        color="primary"
        size="sm"
        variant="flat"
        className="hover:bg-primary/50"
      >
        Sign Up
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
        backdrop="blur"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Log in</ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  endContent={<Icons.EmailIcon />}
                  label="Email"
                  placeholder="Enter your email"
                  variant="bordered"
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setEmailError(null);
                    setSignUpError(null);
                  }}
                  errorMessage={emailError}
                  className={theme === "light" ? "light-input" : "dark-input"}
                />
                <Input
                  endContent={<Icons.PasswordIcon />}
                  label="Password"
                  placeholder="Choose a password"
                  type="password"
                  variant="bordered"
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setPasswordError(null);
                    setSignUpError(null);
                  }}
                  maxLength={30}
                  errorMessage={passwordError || signUpError}
                  className={theme === "light" ? "light-input" : "dark-input"}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  onPress={handleLogin}
                  disabled={email.length === 0 || password.length <= 6}
                >
                  Sign Up
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Checkbox,
  Input,
  Link,
} from "@nextui-org/react";
import { Icons } from "../../assets/Icons";
import { apiLogin } from "./api/authApi";
import { AxiosError } from "axios";
import { validateEmail } from "../../utils/common";
import toast from "react-hot-toast";
import { useAuthContext } from "../../Common/Providers/AuthContext";
import "./index.css";
import { useTheme } from "next-themes";

const UNEXPECTED_ERROR = "An unexpected error occurred";

export default function Login() {
  const { theme } = useTheme();
  const { setAuthInfo } = useAuthContext();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [emailError, setEmailError] = React.useState<null | string>(null);
  const [passwordError, setPasswordError] = React.useState<null | string>(null);
  const [loginError, setLoginError] = React.useState<null | string>(null);

  const handleLogin = () => {
    if (!validateEmail(email)) {
      return setEmailError("Invalid email Address");
    }
    if (password.length < 6 || password.length > 30) {
      return setPasswordError("Password length must be between 6 and 30");
    }
    apiLogin(email, password)
      .then((res) => {
        if (res.status === 200) {
          setAuthInfo({ email }, res.data.accessToken, res.data.refreshToken);
          toast.success("Login successfully");
          window.location.href = "/dashboard";
        } else {
          setLoginError(res.data.error || UNEXPECTED_ERROR);
        }
      })
      .catch((err) => {
        if (err instanceof AxiosError) {
          setLoginError(err.response?.data.error || UNEXPECTED_ERROR);
        } else {
          setLoginError(UNEXPECTED_ERROR);
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
        Login
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
                    setLoginError(null);
                  }}
                  errorMessage={emailError}
                  className={theme === "light" ? "light-input" : "dark-input"}
                />
                <Input
                  endContent={<Icons.PasswordIcon />}
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
                  variant="bordered"
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setPasswordError(null);
                    setLoginError(null);
                  }}
                  errorMessage={passwordError || loginError}
                  className={theme === "light" ? "light-input" : "dark-input"}
                />
                <div className="flex py-2 px-1 justify-between">
                  <Checkbox
                    classNames={{
                      label: "text-small",
                    }}
                  >
                    Remember me
                  </Checkbox>
                  <Link color="primary" href="#" size="sm">
                    Forgot password?
                  </Link>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={handleLogin}>
                  Sign in
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

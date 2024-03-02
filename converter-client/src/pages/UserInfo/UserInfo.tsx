import { useAuthentificatedPage } from "../../Common/Hooks/useIsAuthentificated";
import { Button, Input } from "@nextui-org/react";
import { useTheme } from "next-themes";
import { useRef, useState } from "react";
import { updatePassword } from "./api/UserInfoApi";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

export const UserInfo = () => {
  const { user, accessToken } = useAuthentificatedPage();
  const { theme } = useTheme();
  const oldPasswordRef = useRef<HTMLInputElement | any>();
  const newPasswordRef = useRef<HTMLInputElement | any>();
  const confirmNewPasswordRef = useRef<HTMLInputElement | any>();
  const [changePasswordError, setChangePasswordError] = useState<string>();

  const handleChangePassword = () => {
    const innerUpdatePassword = async () => {
      setChangePasswordError("");
      const oldPassword = oldPasswordRef.current.value;
      const newPassword = newPasswordRef.current.value;
      const confirmNewPassword = confirmNewPasswordRef.current.value;
      if (newPassword !== confirmNewPassword) {
        return setChangePasswordError("Passwords do not match");
      }
      try {
        const response = await updatePassword(
          accessToken!,
          oldPassword,
          newPassword
        );
        if (response.status === 200) {
          toast.success("Password updated successfully");
        } else {
          const data = await response.json();
          setChangePasswordError(data.error || "An unexpected error occurred");
        }
      } catch (err) {
        if (err instanceof AxiosError) {
          setChangePasswordError(
            err.response?.data.error || "An unexpected error occurred"
          );
        } else {
          setChangePasswordError("An unexpected error occurred");
        }
      }
    };
    innerUpdatePassword();
  };

  return (
    <>
      <div className=""></div>
      <div className="mx-auto w-[500px] mt-[50px]">
        <Input
          disabled
          variant="faded"
          label="Email"
          value={user?.email || ""}
          className="mb-8"
        />
        <h3>Change your password</h3>
        <Input
          label="Current Password"
          labelPlacement="inside"
          placeholder="Enter your current Password"
          variant="bordered"
          type="password"
          className="my-4"
          ref={oldPasswordRef}
          autoComplete="new-password"
        />
        <Input
          label="New Password"
          labelPlacement="inside"
          placeholder="Enter your New Password"
          variant="faded"
          type="password"
          className="mb-4"
          ref={newPasswordRef}
        />
        <Input
          label="Confirm Password"
          labelPlacement="inside"
          placeholder="Confirm Password"
          variant="faded"
          type="password"
          className="mb-4"
          errorMessage={changePasswordError}
          ref={confirmNewPasswordRef}
        />
        <Button
          onPress={handleChangePassword}
          color="primary"
          size="sm"
          variant="flat"
          className="hover:bg-primary/50"
        >
          Change Password
        </Button>
      </div>
    </>
  );
};

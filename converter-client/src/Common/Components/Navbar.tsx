import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
} from "@nextui-org/react";
import ThemeSwitcher from "./ThemeSwitcher";
import Login from "../../pages/Auth/Login";
import SignUp from "../../pages/Auth/SignUp";
import { useAuthContext } from "../Providers/AuthContext";
import { BrandTitle } from "./BrandTitle";
import { logout } from "../../pages/Auth/api/authApi";

export default function Nav() {
  const { user, clearAuthInfo, accessToken } = useAuthContext();

  const handleLogout = () => {
    logout(accessToken || "").finally(() => {
      clearAuthInfo();
    });
  };

  return (
    <Navbar className="w-full border-b-2" position="sticky">
      <NavbarBrand className="">
        <Link
          color="foreground"
          href={user ? "/dashboard" : "/"}
          className="font-bold text-inherit hover:text-primary"
        >
          <BrandTitle />
        </Link>
        <Link
          href="/docs"
          aria-current="page"
          color="secondary"
          className="px-4"
        >
          Developer
        </Link>
        <Link href="/pricing" color="secondary" aria-current="page">
          Pricing
        </Link>
      </NavbarBrand>

      <NavbarContent justify="center">
        <ThemeSwitcher />
      </NavbarContent>

      <NavbarContent as="div" justify="end">
        {user ? (
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="secondary"
                name="Jason Hughes"
                size="sm"
                src={`https://ui-avatars.com/api/?name=${user.email.slice(
                  0,
                  1
                )}&background=random`}
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">{user.email}</p>
              </DropdownItem>
              <DropdownItem key="api-key" href="/api-key">
                Api Keys
              </DropdownItem>
              <DropdownItem key="settings">My Settings</DropdownItem>
              <DropdownItem key="analytics">Analytics</DropdownItem>
              <DropdownItem key="system">System</DropdownItem>
              <DropdownItem key="configurations">Configurations</DropdownItem>
              <DropdownItem key="help_and_feedback">
                Help & Feedback
              </DropdownItem>
              <DropdownItem key="logout" color="danger" onPress={handleLogout}>
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        ) : (
          <>
            <NavbarItem>
              <Login />
            </NavbarItem>
            <NavbarItem>
              <SignUp />
            </NavbarItem>
          </>
        )}
      </NavbarContent>
    </Navbar>
  );
}

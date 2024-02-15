import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Button } from "@nextui-org/button";
import { Toaster } from "react-hot-toast";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";

export default function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: theme === "light" ? "#fff" : "#333",
            color: theme === "light" ? "#333" : "#fff",
          },
        }}
      />
      <div className="flex gap-4">
        <Dropdown placement="bottom">
          <DropdownTrigger>
            <Button variant="bordered">{theme}</Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Dynamic Actions"
            items={["Light", "Dark", "Modern"]}
          >
            <DropdownItem
              onClick={() => setTheme("light")}
              className="hover:bg-primary/50"
            >
              Light
            </DropdownItem>
            <DropdownItem
              onClick={() => setTheme("dark")}
              className="hover:bg-primary/50"
            >
              Dark
            </DropdownItem>
            <DropdownItem
              onClick={() => setTheme("modern")}
              className="hover:bg-primary/50"
            >
              Modern
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </>
  );
}

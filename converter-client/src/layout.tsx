import "./globals.css";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { getConfig } from "./utils/config";
import Navbar from "./Common/Components/Navbar";
import Footer from "./Common/Components/Footer";
import { AuthProvider } from "./Common/Providers/AuthContext";

const { THEMES } = getConfig();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NextUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="dark" themes={THEMES}>
        <AuthProvider>
          <Navbar />
          <main>{children}</main>
          {!window.location.href.includes("docs") && (
            <div className="h-[100px] hidden sm:block"></div>
          )}
          <Footer />
        </AuthProvider>
      </NextThemesProvider>
    </NextUIProvider>
  );
}

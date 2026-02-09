import {HeroUIProvider} from "@heroui/react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "OpenClaw Toolbox",
  description: "A multi-function toolbox with gold price and tech news",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-TW" className="dark">
      <body className="bg-gray-950 min-h-screen">
        <HeroUIProvider>
          {children}
        </HeroUIProvider>
      </body>
    </html>
  );
}

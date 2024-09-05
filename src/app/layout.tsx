import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "../globals.css";
import { AppProvider } from "./Provider/AppProvider";

export const metadata: Metadata = {
  title: "Boss Nation",
  description: "Authentic Fashion",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={GeistSans.className}>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}

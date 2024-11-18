import "./globals.css";
import { ReactNode } from "react";

export const metadata = {
  title: "Landing Page",
  description: "A simple landing page with a navigation bar",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
import { ReactNode } from 'react'; // Import ReactNode
import "./globals.css";

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

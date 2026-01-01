import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Knowledge Parlour | Intimate Lectures in Unexpected Places",
  description: "Where brilliant minds meet bourbon. Experience thought-provoking 40-minute lectures from world-class speakers in the most atmospheric bars and speakeasies.",
  keywords: ["lectures", "events", "education", "bars", "speakeasy", "learning"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <div className="noise-overlay" />
        {children}
      </body>
    </html>
  );
}

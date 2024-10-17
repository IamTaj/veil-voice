import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/navbar";
const inter = Inter({ subsets: ["latin"] });


export const metadata = {
  title: "Veil Voice",
  description: "Veil Voice - Where your identity remains a secret.",
  icons: {
    icon: "/veilvoice.ico",
    type: "image/x-icon",
    sizes: "48x48",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}

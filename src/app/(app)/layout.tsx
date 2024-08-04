import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/navbar";
import { VEILVOICE_FAVICON } from "@/lib/constant";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Veil Voice",
  description: "Veil Voice - Where your identity remains a secret.",
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

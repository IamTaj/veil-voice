import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/context/AuthProviders";
import { Toaster } from "@/components/ui/toaster";
import { VEILVOICE_FAVICON } from "@/lib/constant";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Veil Voice",
  description: "Veil Voice - Where your identity remains a secret.",
  icons: {
    icon: "/veilvoice.png",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">

      <AuthProvider>
        <body className={inter.className}>
          <div>
            {children}
            <Toaster />
          </div>

        </body>
      </AuthProvider>
    </html>
  );
}

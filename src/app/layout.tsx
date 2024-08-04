import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/context/AuthProviders";
import { Toaster } from "@/components/ui/toaster";
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
      <head>
        <link rel="icon" href={VEILVOICE_FAVICON} sizes="any" />
      </head>
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

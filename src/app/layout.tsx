import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/context/AuthProviders";
import { Toaster } from "@/components/ui/toaster";
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

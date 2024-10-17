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
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

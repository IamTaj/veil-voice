export const metadata = {
  title: "Veil Voice",
  description: "Veil Voice - Where your identity remains a secret.",
  icons: {
    icon: "/veilvoice.png",
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

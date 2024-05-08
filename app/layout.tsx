import LoginAuthListener from "./firebase/listeners"

export default async function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <html lang="he" suppressHydrationWarning>
        <body>
          {children}
          </body>
      </html>
    )
  }
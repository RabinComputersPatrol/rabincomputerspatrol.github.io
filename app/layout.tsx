import { Open_Sans } from 'next/font/google';

const open_sans = Open_Sans({
    weight: "400",
    display: 'swap',
    subsets: ['hebrew']
})

export default function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <html lang="he" dir="rtl" className={open_sans.className}>  
        <body>{children}</body>
      </html>
    )
  } 
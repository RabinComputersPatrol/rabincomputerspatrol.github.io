import { Open_Sans } from 'next/font/google';
import '../../public/styles/support.css';
import { Metadata } from 'next';

const open_sans = Open_Sans({
  weight: "400",
  display: 'swap',
  subsets: ['hebrew']
})

export const metadata: Metadata = {
  title: 'טופס בעיות מחשבים',
  openGraph: {
    title: 'טופס בעיות מחשבים',
    siteName: "טופס בעיות מחשבים",
    description: "טופס למילוי לבקשת עזרה בנוגע בעיות מחשבים",
    url: "https://rabincomputerspatrol.github.io/pages/support",
    images: "https://raw.githubusercontent.com/RabinComputersPatrol/rabincomputerspatrol.github.io/main/app/public/assets/rabin-logo-small.png",
    locale: 'he_IL',
    type: "website"
  }
}

export default async function SupportLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="he" dir="rtl" className={open_sans.className} suppressHydrationWarning>
      <body>{children}</body>
    </html>
  )
} 
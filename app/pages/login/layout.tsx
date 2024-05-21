import { Open_Sans } from 'next/font/google';
import '../../public/styles/login.css';
import { Metadata } from 'next';
import LoginAuthListener from '@/app/firebase/listeners';


const open_sans = Open_Sans({
  weight: "400",
  display: 'swap',
  subsets: ['hebrew']
})

export const metadata: Metadata = {
  title: 'התחברות',
  openGraph: {
    title: 'התחברות',
    siteName: "התחברות",
    description: "טופס למילוי לבקשת עזרה בנוגע בעיות מחשבים",
    url: "https://rabincomputerspatrol.github.io/pages/support",
    images: "https://raw.githubusercontent.com/RabinComputersPatrol/rabincomputerspatrol.github.io/main/app/public/assets/rabin-logo-small.png",
    locale: 'he_IL',
    type: "website"
  }
}

export default function SupportLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="he" dir="rtl" className={open_sans.className} suppressHydrationWarning>
      <body>{children}
      <LoginAuthListener/>
      </body>
    </html>
  )
} 
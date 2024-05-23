import { Open_Sans } from 'next/font/google';
import '../../../public/styles/reports.css';
import { Metadata } from 'next';
import { DashboardAuthListener } from '@/app/firebase/listeners';


const open_sans = Open_Sans({
    weight: "400",
    display: 'swap',
    subsets: ['latin-ext']
})

export const metadata: Metadata = {
    title: 'report',
    openGraph: {
        title: 'report',
        siteName: "dashboard",
        description: "support dashboard",
        url: "https://rabincomputerspatrol.github.io/pages/dashboard",
        images: "https://raw.githubusercontent.com/RabinComputersPatrol/rabincomputerspatrol.github.io/main/app/public/assets/rabin-logo-small.png",
        locale: 'en_UK',
        type: "website"
    }
}

export default function SupportLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="he" dir="ltr" className={open_sans.className} suppressHydrationWarning>
            <body>{children}
            <DashboardAuthListener/>
            </body>
        </html>
    )
} 
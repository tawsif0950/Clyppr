import { ClerkProvider } from '@clerk/nextjs';
import type {Metadata} from 'next';
import { Recursive, Montserrat } from 'next/font/google';
import './globals.css';

const recursive = Recursive({
  subsets: ['latin'],
  variable: '--font-recursive',
  display: 'swap',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Clyppr | The Premier Video Clip Marketplace',
  description: 'Turn views into income. Turn content into reach. The performance-based clip marketplace for brands and creators.',
  openGraph: {
    title: 'Clyppr | The Premier Video Clip Marketplace',
    description: 'Turn views into income. Turn content into reach.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Clyppr',
    description: 'Turn views into income. Turn content into reach.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className="dark">
      <body className={`${recursive.variable} ${montserrat.variable} font-sans bg-[#050505] text-zinc-50 antialiased selection:bg-white/20`} suppressHydrationWarning>
        <ClerkProvider>
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
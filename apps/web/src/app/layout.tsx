import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'evomstay — luxury rental platform',
  description: 'Stay safely, just like home. A members-only platform for hand-picked stays in Türkiye and beyond — every host identity-verified, every property insured.',
  keywords: 'luxury rental, verified hosts, insured stays, Türkiye, vacation homes',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={plusJakartaSans.variable}>{children}</body>
    </html>
  );
}

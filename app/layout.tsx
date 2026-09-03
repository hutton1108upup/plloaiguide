import type { Metadata } from 'next';
import { SITE } from '@/lib/site-content';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(SITE.domain),
  title: SITE.title,
  description: SITE.description,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: SITE.domain,
    siteName: SITE.name,
    title: SITE.title,
    description: SITE.description,
    images: [SITE.ogImagePath],
  },
  twitter: {
    card: 'summary',
    title: SITE.title,
    description: SITE.description,
    images: [SITE.ogImagePath],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

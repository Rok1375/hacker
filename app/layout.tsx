import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Henry Heffernan - Portfolio 2022',
  description:
    "I'm Henry, a Software Engineer based in NY. Rensselaer Polytechnic Institute Graduate with my B.S. in Computer Science, currently looking for a full time role.",
  openGraph: {
    title: 'Henry Heffernan - Software Engineer',
    description:
      "I'm Henry, a Software Engineer based in NY. Rensselaer Polytechnic Institute Graduate with my B.S. in Computer Science, currently looking for a full time role.",
    type: 'website',
    url: 'https://henryheffernan.com/',
    images: '/images/preview-new.jpg',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Henry Heffernan - Software Engineer',
    description:
      "I'm Henry, a Software Engineer based in NY. Rensselaer Polytechnic Institute Graduate with my B.S. in Computer Science, currently looking for a full time role.",
    images: '/images/preview-new.jpg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
      </head>
      <body>{children}</body>
    </html>
  );
}

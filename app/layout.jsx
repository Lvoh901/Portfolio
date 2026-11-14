import { DM_Serif_Display, Raleway } from 'next/font/google';
import './globals.css';
import { ContentProvider } from '../src/contexts/ContentContext';
import ScrollManager from '../src/components/ScrollManager';
import { defaultContent } from '../src/data/defaultContent';

const raleway = Raleway({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-raleway',
  display: 'swap',
});

const dmSerif = DM_Serif_Display({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-dm-serif',
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL('https://odhiambolvis.tech'),
  title: defaultContent.seo.title,
  description: defaultContent.seo.description,
  keywords: [
    'Elvis Odhiambo',
    'Software Developer Nairobi',
    'Product Designer Kenya',
    'Full-Stack Developer',
    'React Developer',
    'Next.js Developer',
    'UI/UX Design',
    'Brand Identity',
    'Portfolio',
  ],
  authors: [{ name: 'Elvis Odhiambo' }],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: 'Elvis Odhiambo',
    url: '/',
    title: defaultContent.seo.title,
    description:
      'I design and build web products that do real work. Selected projects, services, and a direct line to start yours.',
    images: ['/portfolio_card.webp'],
  },
  twitter: {
    card: 'summary_large_image',
    title: defaultContent.seo.title,
    description:
      'Web products designed and built end to end, from Nairobi. Selected work, services, and contact.',
    images: ['/portfolio_card.webp'],
  },
  icons: { icon: '/profile0.png' },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#fbfaf7',
};

const RootLayout = ({ children }) => (
  <html lang="en" className={`${raleway.variable} ${dmSerif.variable}`}>
    <body>
      <ContentProvider>
        <ScrollManager />
        {children}
      </ContentProvider>
    </body>
  </html>
);

export default RootLayout;

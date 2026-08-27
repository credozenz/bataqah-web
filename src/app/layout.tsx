import type { Metadata } from 'next';
import { Bebas_Neue, Inter, Montserrat, Poppins } from 'next/font/google';
import { Toaster } from 'sonner';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });
const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700'], // you can add more
  variable: '--font-montserrat',
});
const bebas = Bebas_Neue({
  subsets: ['latin'],
  weight: '400', // Bebas Neue only has one weight
  variable: '--font-bebas',
});
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: 'Bataqah',
  description: 'Digital Business Cards by bataqah',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${montserrat.variable} ${bebas.variable} ${poppins.variable}`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}

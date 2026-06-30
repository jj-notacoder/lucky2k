import { Bitter, Lora, Lalezar } from 'next/font/google';
import { LangProvider } from '@/lib/i18n';
import CursorTrail from '@/components/CursorTrail';
import './globals.css';

/* Clarendon stand-in (heavy retro serif) until a licensed Clarendon is added. */
const bitter = Bitter({ subsets: ['latin'], weight: ['600', '700', '800', '900'], variable: '--font-display', display: 'swap' });
const lora = Lora({ subsets: ['latin'], weight: ['400', '500', '600'], style: ['normal', 'italic'], variable: '--font-body', display: 'swap' });
/* Modhesh stand-in (rounded retro Arabic display). */
const lalezar = Lalezar({ subsets: ['arabic', 'latin'], weight: '400', variable: '--font-ar', display: 'swap' });

export const metadata = {
  title: 'Lucky 2000 — doughnuts from sunset',
  description: 'Lucky 2000 — a retro pop-art doughnut brand. Doughnuts from sunset.',
};

export const viewport = {
  themeColor: '#FFC5D0',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" dir="ltr">
      <body className={`${bitter.variable} ${lora.variable} ${lalezar.variable}`}>
        <LangProvider>{children}</LangProvider>
        <CursorTrail />
      </body>
    </html>
  );
}

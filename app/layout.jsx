import { Bitter, Lora, Tajawal } from 'next/font/google';
import { LangProvider } from '@/lib/i18n';
import FluidCursor from '@/components/FluidCursor';
import './globals.css';

/* Clarendon stand-in (heavy retro serif) until a licensed Clarendon is added. */
const bitter = Bitter({ subsets: ['latin'], weight: ['600', '700', '800', '900'], variable: '--font-display', display: 'swap' });
const lora = Lora({ subsets: ['latin'], weight: ['400', '500', '600'], style: ['normal', 'italic'], variable: '--font-body', display: 'swap' });
/* Premium Arabic fallback for RTL content. */
const tajawal = Tajawal({ subsets: ['arabic', 'latin'], weight: ['400', '500', '700', '800', '900'], variable: '--font-ar', display: 'swap' });

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
      <body className={`${bitter.variable} ${lora.variable} ${tajawal.variable}`}>
        <FluidCursor />
        <LangProvider>{children}</LangProvider>
      </body>
    </html>
  );
}

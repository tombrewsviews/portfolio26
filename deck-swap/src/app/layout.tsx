import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'deck-swap',
  description: 'Presenter-synced deck with per-slide variants.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-black text-white antialiased">{children}</body>
    </html>
  );
}

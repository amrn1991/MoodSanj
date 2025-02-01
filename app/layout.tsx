import type { Metadata } from "next";
import localFont from 'next/font/local'
import "./globals.css";

const myFont = localFont({
  src: '../public/Vazirmatn-Regular.woff2',
  display: 'swap',
})

export const metadata: Metadata = {
  title: "مودسنج",
  description: "حال و هواتو بسنج",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${myFont.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Script from 'next/script'

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Clicker",
  description: "Click, click, click!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Script src="https://telegram.org/js/telegram-web-app.js" strategy="beforeInteractive" />

      <body className={montserrat.className + ' text-white bg-black'} >
        <div className="px-4 py-3">
          {children}
        </div>


      </body>
    </html>
  );
}

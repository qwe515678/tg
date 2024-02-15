import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Head from "next/head";
const inter = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <script src="https://telegram.org/js/telegram-web-app.js"></script>
      </Head>
      <body className={inter.className}>
          <div className=" px-4">
            {children}
          </div>

      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import { Footer, Header } from "./components";
import "./globals.css";

const notoSans = Noto_Sans({
  subsets: ["latin"],
  weight: ["400", "700"]
});

export const metadata: Metadata = {
  title: "Fun with Flags",
  description: "Flags of the world",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${notoSans.className} antialiased p-8 lg:px-24`}
      >
        <Header />
          <main className="flex-1 flex flex-col">
            {children}
          </main>
        <Footer />
      </body>
    </html>
  );
}

import "./globals.css";
import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";

const FigtreeFont = Figtree({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "getritely - Copilot for social growth",
  description:
    "Your AI Copilot for Social Media Growth",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <meta property="og:image" content="/opengraph-imag.png" />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:width" content="1280" />
      <meta property="og:image:height" content="832" />
      <meta
        property="og:site_name"
        content="GetRitely"
      />
      <meta
        property="og:url"
        content="https://getritely.com/"
      />
      <meta name="twitter:image" content="/twitter-imag.png" />
      <meta name="twitter:image:type" content="image/png" />
      <meta name="twitter:image:width" content="1280" />
      <meta name="twitter:image:height" content="832" />
      <body className={FigtreeFont.className}>
        {children}
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}

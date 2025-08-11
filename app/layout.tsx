import "./globals.css";
import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";

const FigtreeFont = Figtree({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://getritely.com"),
  title: {
    default: "getritely - Copilot for social growth",
    template: "%s | GetRitely",
  },
  description: "Your AI Copilot for Social Media Growth",
  openGraph: {
    title: "getritely - Copilot for social growth",
    description: "Your AI Copilot for Social Media Growth",
    url: "https://getritely.com/",
    siteName: "GetRitely",
    images: [
      {
        url: "/opengraph-image2.png",
        width: 1280,
        height: 832,
        type: "image/png",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "getritely - Copilot for social growth",
    description: "Your AI Copilot for Social Media Growth",
    images: ["/opengraph-image2.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={FigtreeFont.className}>
        {children}
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}

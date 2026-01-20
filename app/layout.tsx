import type { Metadata } from "next";
import { House, Loader } from "lucide-react"
import "./globals.css";
import { pixelify } from "@/app/ui/fonts"
import Link from "next/link"
import { LoaderProvider } from "@/components/LoaderContext";
import NavBar from "@/components/NavFoot";
import { Footer } from "@/components/NavFoot";
import { BootOverlay } from "@/components/LoadingOverlay";

export const metadata: Metadata = {
  title: "Akin Tewe. Product Designer",
  description: "Akin Tewe's portfolio website.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <LoaderProvider>
          <NavBar/>
          <main>{children}</main>
          <Footer/>
        </LoaderProvider>
      </body>
    </html>
  );
}

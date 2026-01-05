import type { Metadata } from "next";
import { House, Loader } from "lucide-react"
import "./globals.css";
import { pixelify } from "@/app/ui/fonts"
import Link from "next/link"
import { LoaderProvider } from "@/components/LoaderContext";
import NavBar from "@/components/NavFoot";
import { Footer } from "@/components/NavFoot";

export const metadata: Metadata = {
  title: "Akin Tewe. Front End Developer",
  description: "akin tewe's portfolio page",
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

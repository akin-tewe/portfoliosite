import type { Metadata } from "next";
import "./globals.css";
import { LoaderProvider } from "@/components/LoaderContext";
import NavBar from "@/components/NavFoot";
import { Footer } from "@/components/NavFoot";

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

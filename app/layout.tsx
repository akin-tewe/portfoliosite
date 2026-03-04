import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { LoaderProvider } from "@/components/LoaderContext";
import { CursorProvider } from "@/components/CursorContext";
import CustomCursor from "@/components/CustomCursor";
import NavBar from "@/components/NavFoot";
import { Footer } from "@/components/NavFoot";

export const metadata: Metadata = {
  title: "Akin Tewe",
  description: "Portfolio website of Akin Tewe. Product Designer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head suppressHydrationWarning>
      </head>
      <body>
        <LoaderProvider>
          <CursorProvider>
            <CustomCursor />
            <NavBar/>
            <main>{children}</main>
            <Footer/>
          </CursorProvider>
        </LoaderProvider>
        <Analytics />
      </body>
    </html>
  );
}

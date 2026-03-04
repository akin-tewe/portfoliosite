import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { BootOverlay } from "@/components/LoadingOverlay";
import PageTransition from "@/components/PageTransition";
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
        <BootOverlay />
          <CursorProvider>
            <CustomCursor />
            <NavBar/>
            <main><PageTransition>{children}</PageTransition></main>
            <Footer/>
          </CursorProvider>
        <Analytics />
      </body>
    </html>
  );
}

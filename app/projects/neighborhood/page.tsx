import Neighborhood from "./Neighborhood";
import { Metadata } from "next";
import { Space_Grotesk, DM_Sans } from "next/font/google";

const spaceGrotesk = Space_Grotesk({ variable: '--font-space-grotesk', subsets: ['latin'] });
const dmSans = DM_Sans({ variable: '--font-dm-sans', subsets: ['latin'] });

export const metadata: Metadata = {
  title: "Neighborhood - Akin Tewe",
  description: "A component library and design system with warmth, motion, and personality baked into every token.",
};

export default function Page() {
    return (
        <main className={`${spaceGrotesk.variable} ${dmSans.variable}`}>
            <Neighborhood />
        </main>
    )
}

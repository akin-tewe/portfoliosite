import Neighborhood from "./Neighborhood";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Neighborhood - Akin Tewe",
  description: "A component library and design system with warmth, motion, and personality baked into every token.",
};

export default function Page() {
    return (
        <main>
            <Neighborhood />
        </main>
    )
}

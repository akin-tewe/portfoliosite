import Instagram from "./Instagram";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Instagram Concept - Akin Tewe",
  description: "Redesigning the Instagram mobile app with a focus on user experience and visual aesthetics.",
};

export default function Page() {
    return (
        <main>
            <Instagram/>
        </main>
    )
}
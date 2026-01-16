import D3Project from "./3DResearch";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "3D Research - Akin Tewe",
  description: "A qualitative UX Research study exploring the nature of creative work in an online economy.",
};

export default function Page() {
    return (
        <main>
            <D3Project/>
        </main>
    )
}
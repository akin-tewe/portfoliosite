import AboutMe from "./AboutMe";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Me — Akin Tewe",
  description: "A few selected works by Akin Tewe.",
};

export default function About() {
    return (
        <main>
            <AboutMe/>
        </main>
    )
}
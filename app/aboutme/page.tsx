import AboutMe from "./AboutMe";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Me — Akin Tewe",
  description: "A few selected works by Akin Tewe.",
};

export default function Page() {
    return (
        <main>
            <AboutMe/>
        </main>
    )
}
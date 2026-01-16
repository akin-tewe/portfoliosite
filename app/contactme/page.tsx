import ContactMe from "./ContactMe";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Me — Akin Tewe",
  description: "Get in touch with Akin Tewe.",
};

export default function Page() {
    return (
        <main>
            <ContactMe/>
        </main>
    )
}
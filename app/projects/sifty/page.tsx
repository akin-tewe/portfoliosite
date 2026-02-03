import Sifty from "./Sifty";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "sifty - Akin Tewe",
  description: "A lightweight project tracking application for freelancers and small studios.",
};

export default function Page() {
    return (
        <main>
            <Sifty />
        </main>
    )
}

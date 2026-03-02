import Bluboy from "./BluBoy";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bluboy Commercial - Akin Tewe",
  description: "A short-form commercial created to introduce the release of fashion designer 'Bluboy's' art prints.",
};

export default function Page() {
    return (
        <main>
            <Bluboy/>
        </main>
    )
}
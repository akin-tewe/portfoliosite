import Sprite from "./Sprite";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sprite - Akin Tewe",
  description: "3D commercial collaboration with Sprite.",
};

export default function Page() {
    return (
        <main>
            <Sprite />
        </main>
    )
}

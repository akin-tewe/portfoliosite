import Rage from "./YourRage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "YourRage Intro - Akin Tewe",
  description: "Stream intro animation for YourRage, a well known streamer on twitch.tv.",
};

export default function Page() {
    return (
        <main>
            <Rage/>
        </main>
    )
}
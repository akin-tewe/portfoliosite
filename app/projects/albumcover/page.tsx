import AlbumCover from "./AlbumCover";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Album Cover Design - Akin Tewe",
  description: "Design of a remix album cover for Young Nudy's 'Peaches and Eggplants'.",
};

export default function Page() {
    return (
        <main>
            <AlbumCover/>
        </main>
    )
}

import TruReligion from "./TruReligion";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "True Religion x Bluboy - Akin Tewe",
  description: "A 3D animated commercial developed entirely by me made to promote the collaborative clothing drop between True Religion Brand Jeans and clothing designer “Bluboy.”",
};

export default function Page() {
    return (
        <main>
            <TruReligion/>
        </main>
    )
}
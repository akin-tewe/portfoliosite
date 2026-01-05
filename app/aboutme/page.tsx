import Image from "next/image";
import { pixelify,roboto } from "../ui/fonts";
import TransparentVideo from "@/components/SplashVideo";

type Props = {
    word: string,
}

const ListText = ({word}: Props) => { return(<div className={`${roboto.className} text-gray-400 font-light`}>{word}</div>) }

export default function About() {
    return (
        <main>
            <section className="bg-white">
                <div className="grid grid-cols-2 px-75 py-20 gap-20 w-fit">
                    <div>
                        <h1 className={`${pixelify.className} text-black text-7xl`}>about me.</h1>
                        <p className={`${roboto.className} font-light text-black text-xl mt-10`}>I'm driven by a child-like sense of curiosity and a deep attention to detail. With a strong educational
                            background in Product Design (Go Jackets!), and practical experience in 3D Design and Animation, I'm able to approach problems with a
                            wide set of flexible tools. Each project is an opportunity for me to grow, iterate, and raise the quality standard.
                        </p>
                    </div>
                    <div className="justify-self-center">
                        <Image
                        src="/placeholder.png"
                        alt="Profile picture"
                        width={800}
                        height={900}
                        />
                    </div>
                </div>
            </section>
        </main>
    )
}
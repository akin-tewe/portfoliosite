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
            <section className="bg-white md:h-[87vh]">
                <div className="flex flex-col px-5 md:grid md:grid-cols-2 md:px-[10vw] py-5 gap-10 w-fit h-full items-center">
                    <div>
                        <h1 className={`${pixelify.className} text-black text-4xl md:text-5xl`}>about me.</h1>
                        <div className="border-1 border-gray-100 mt-5"></div>
                        <p className={`${roboto.className} font-light text-black text-xl mt-5`}>I'm driven by a child-like sense of curiosity and a deep attention to detail. With a strong educational
                            background in Product Design (go jackets!), and practical experience in 3D Design and Animation, I'm able to approach problems with a
                            wide set of flexible tools. Each project is an opportunity for me to grow, iterate, and raise the quality standard.
                        </p>
                    </div>
                    <div className="relative justify-self-center h-auto w-[70vw] md:w-[30vw] ml-auto mr-auto">
                        <Image
                        src="/profilephoto.png"
                        alt="Profile picture"
                        width={500}
                        height={500}
                        />
                    </div>
                </div>
            </section>
        </main>
    )
}
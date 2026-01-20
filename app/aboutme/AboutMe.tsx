import Image from "next/image";
import { roboto } from "../ui/fonts";

type Props = {
    word: string,
}

const ListText = ({word}: Props) => { return(<div className={`${roboto.className} text-gray-400 font-light`}>{word}</div>) }

export default function AboutMe() {
    return (
        <main>
            <section className="bg-white md:pt-40 pt-20 pb-10 md:pb-20">
                <h1 className={`${roboto.className} font-light text-black text-5xl md:text-6xl px-[10vw] md:max-w-9xl`}>
                    Driven by a child-like sense of curiosity and a deep attention to detail.
                </h1>
                <div className="mx-auto w-[80vw] border-black/20 border-t-1 mt-20 mb-10"></div>
                <div className="flex flex-col px-11 md:flex md:flex-row md:px-[10vw] gap-10 w-full h-auto md:justify-between md:px-[10vw]">
                    <div className="mt-10 text-black">
                        <p className={`${roboto.className} font text-xl mt-5 md:max-w-md`}>{`With an educational
                            background in Product Design from Georgia Institute of Technology, and practical experience in 3D Design and Web Development, I'm able to approach problems with a
                            wide set of flexible tools. Each project is an opportunity for me to grow, iterate, and raise the quality standard`}.
                        </p>
                    </div>
                    <div className=" flex mt-10 relative overflow-hidden bg-white/20 p-[1vw] rounded-sm">
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
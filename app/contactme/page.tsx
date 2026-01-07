import TransparentVideo from "@/components/SplashVideo"
import { pixelify } from "../ui/fonts"
import Link from "next/link"

export default function Page() {

    const instalink = <Link className="hover:opacity-50 transition-all duration-100" target="_blank" href="https://www.instagram.com/eightybot/"> this Instagram</Link>
    const instalink2 = <Link className="hover:opacity-50 transition-all duration-100" target="_blank" href="https://www.instagram.com/n8ghbr/"> the cooler Instagram</Link>
    const linkedlink = <Link className="hover:opacity-50 transition-all duration-100" target="_blank" href="https://www.linkedin.com/in/akin-tewe-38523418a/"> LinkedIn</Link>
    const emaillink = <Link className="hover:opacity-50 transition-all duration-100" href="mailto:atewebiz@gmail.com"> email</Link>

    return(
        <div>
            <div className="flex h-[70vh] md:h-[85vh]">
                <div className="flex flex-col relative h-full mt-[10vh]">
                    <div className={`${pixelify.className} md:absolute text-white text-3xl md:text-7xl pl-2 md:pl-10 max-w-sm md:max-w-4xl z-30 mt-5`}>
                        Want to talk? Contact me via {instalink}, {instalink2}, {linkedlink}, or send me an {emaillink}.
                    </div>
                    <div className="flex w-[100vw] h-auto"><TransparentVideo webmSrc="contactvid.webm"/></div>
                </div>
            </div>
        </div>
    )
}

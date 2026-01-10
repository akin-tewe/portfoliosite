import TransparentVideo from "@/components/SplashVideo"
import { pixelify } from "../ui/fonts"
import Link from "next/link"


export default function Page() {

    const instalink = <Link className="hover:opacity-50 transition-all duration-100 text-blue-800" target="_blank" href="https://www.instagram.com/eightybot/"> Instagram</Link>
    const instalink2 = <Link className="hover:opacity-50 transition-all duration-100 text-blue-800" target="_blank" href="https://www.instagram.com/n8ghbr/"> Instagram</Link>
    const linkedlink = <Link className="hover:opacity-50 transition-all duration-100 text-blue-800" target="_blank" href="https://www.linkedin.com/in/akin-tewe-38523418a/"> LinkedIn</Link>
    const emaillink = <Link className="hover:opacity-50 transition-all duration-100 text-blue-800" href="mailto:atewebiz@gmail.com"> email</Link>

    return(
        <div>
            <div className="flex h-[100vh] md:h-[85vh]">
                <div className="flex flex-col relative h-full">
                    <div className={`${pixelify.className} md:absolute text-white text-5xl md:text-7xl pl-8 md:pl-10 max-w-sm md:max-w-4xl z-30 mt-8`}>
                        Want to talk? Contact me via this {instalink}, the cooler {instalink2}, {linkedlink}, or send me an {emaillink}.
                    </div>
                    <div className="flex w-[100vw] h-auto"><TransparentVideo mp4Src="contactvid.mp4"/></div>
                </div>
            </div>
        </div>
    )
}

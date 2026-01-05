import TransparentVideo from "@/components/SplashVideo"
import { pixelify } from "../ui/fonts"
import Link from "next/link"

export default function Page() {

    const instalink = <Link className="hover:opacity-50 transition-all duration-100" href="https://www.instagram.com/eightybot/"> this Instagram</Link>
    const instalink2 = <Link className="hover:opacity-50 transition-all duration-100" href="https://www.instagram.com/n8ghbr/"> the cooler Instagram</Link>
    const linkedlink = <Link className="hover:opacity-50 transition-all duration-100" href="https://www.linkedin.com/in/akin-tewe-38523418a/"> LinkedIn</Link>
    const emaillink = <Link className="hover:opacity-50 transition-all duration-100" href="mailto:atewebiz@gmail.com"> email</Link>

    return(
        <div>
            <div className="flex items-center justify-end h-[83svh] w-full">
                <div>
                    <div className={`${pixelify.className} absolute text-white left-0 text-7xl top-50 pl-20 max-w-4xl z-30`}>
                        Want to talk? Contact me via {instalink}, {instalink2}, {linkedlink}, or send me an {emaillink}.
                    </div>
                    <div className="relative w-[1500px] h-[900px]"><TransparentVideo webmSrc="contactvid.webm"/></div>
                </div>
            </div>
        </div>
    )
}

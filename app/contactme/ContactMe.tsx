import TransparentVideo from "@/components/SplashVideo"
import { pixelify } from "../ui/fonts"
import Link from "next/link"


export default function ContactMe() {

    const instalink = <Link className="hover:opacity-50 transition-all duration-100 text-blue-800" target="_blank" href="https://www.instagram.com/eightybot/"> Instagram</Link>
    const instalink2 = <Link className="hover:opacity-50 transition-all duration-100 text-blue-800" target="_blank" href="https://www.instagram.com/n8ghbr/"> Instagram</Link>
    const linkedlink = <Link className="hover:opacity-50 transition-all duration-100 text-blue-800" target="_blank" href="https://www.linkedin.com/in/akin-tewe"> LinkedIn</Link>
    const emaillink = <Link className="hover:opacity-50 transition-all duration-100 text-blue-800" href="mailto:atewebiz@gmail.com"> email</Link>

    return(
        <div>
            <div className="flex flex-col md:block md:relative h-[100vh] md:h-[85vh]">
                {/* Text */}
                <div className={`${pixelify.className} md:absolute text-white text-5xl md:text-7xl px-8 md:pl-10 md:max-w-4xl z-30 pt-8 md:mt-8`}>
                    Want to talk? Contact me via {linkedlink}, this{instalink}, the cooler{instalink2}, or send me an{emaillink}.
                </div>

                {/* Video - override absolute to static on mobile via wrapper */}
                <div className="relative flex-1 md:absolute md:inset-0 [&>video]:static [&>video]:h-auto md:[&>video]:absolute md:[&>video]:inset-0 md:[&>video]:h-full mt-15 md:mt-0">
                    <TransparentVideo mp4Src="contactvid.mp4"/>
                </div>
            </div>
        </div>
    )
}

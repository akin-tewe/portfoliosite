"use client";

import Link from "next/link"
import { pixelify } from "@/app/ui/fonts"
import { House } from "lucide-react"
import { useLoader } from "./LoaderContext"

export default function NavBar() {
    const { show, hide } = useLoader();

    return(
        <header className="flex flex-col md:flex-row justify-between gap-[2vh] px-8 py-[1vh]">
            <Link href="/" className="text-white/30 hover:text-white/100 transition-all z-20 ml-auto md:ml-0" onClick={() => {show(); setTimeout(hide,800)}}><House/></Link>
            <nav className={`flex md:flex-row flex-col gap-[2vh] z-10 text-right ${pixelify.className}`}>
                <Link href="/#projects" className="text-[#1650a7] opacity-75 transform-all duration-200 hover:text-white hover:opacity-100" onClick={() => {show(); setTimeout(hide,800)}}>projects</Link>
                <Link href="/aboutme" className="text-[#1650a7] opacity-75 transform-all duration-200 hover:text-white hover:opacity-100" onClick={() => {show(); setTimeout(hide,800)}}>about me</Link>
                <Link href="/contactme" className="text-[#1650a7] opacity-75 transform-all duration-200 hover:text-white hover:opacity-100" onClick={() => {show(); setTimeout(hide,800)}}>get in touch</Link>
            </nav>
        </header>
    )
}

export function Footer() {
    const { show, hide } = useLoader();

    return(
          <footer  className="flex justify-between p-5 md:p-10 gap-5 md:gap-0"> {/* Footer Element */}
            <span className={`text-[#1650a7] opacity-70  text-md md:text-xl ${pixelify.className}`}>©coded by akin tewe</span>
            <Link href="/contactme" className={`text-white/60 text-xl hover:text-white transition-all ${pixelify.className}`} onClick={() => {show(); setTimeout(hide,800)}}>contact me</Link>
          </footer>
    )
}
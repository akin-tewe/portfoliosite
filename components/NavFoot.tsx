"use client";

import Link from "next/link"
import { pixelify } from "@/app/ui/fonts"
import { House } from "lucide-react"
import { useLoader } from "./LoaderContext"
import { useRef, useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

export default function NavBar() {
    const { show, hide } = useLoader();
    const navbarRef= useRef<HTMLDivElement | null>(null);
    const [navSee, setNavSee] = useState(true);
    const router = useRouter();
    const pathname = usePathname();
    const isHome = pathname === "/";
    const aboutMe = pathname === "/aboutme"
    const [open, setOpen] = useState(false);

    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "";
        return () => {
            document.body.style.overflow=""
        }
    }, [open]);

    useEffect(() => {
        if (!navbarRef.current) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setNavSee(entry.isIntersecting);
            },
            {threshold: 0}
        )

        observer.observe(navbarRef.current);

        return () => observer.disconnect();
    }, [])

    return(
        <div>
            <>
                <button
                aria-label="Open menu"
                onClick={() => setOpen(true)}
                className="md:hidden fixed top-10 right-10 z-100 scale-180 opacity-60 hover:opacity-100 transition-all"
                >
                    <div className="bg-black p-4 text-white rounded-full">
                        <Menu />
                    </div>
                </button>
                <div
                    onClick={() => setOpen(false)}
                    className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 md:hidden
                    ${open ? "opacity-100" : "opacity-0 pointer-events-none"}`}
                />
                <aside
                    className={`${pixelify.className} uppercase fixed top-0 right-0 z-100 h-dvh w-[82vw] max-w-sm bg-black shadow-xl md:hidden
                    transition-transform duration-300 ease-out text-3xl text-white p-7
                    ${open ? "translate-x-0" : "translate-x-full"}
                    `}
                >
                    <div className="flex items-center justify-between p-4">
                    <span className="font-medium">Menu</span>
                    <button aria-label="Close menu" onClick={() => setOpen(false)} className="p-2">
                        <X />
                    </button>
                    </div>
                    <nav className="p-4 flex flex-col">
                        <Link href="/" onClick={() => {setOpen(false); show(); setTimeout(hide,800)}} className="border-t-2 py-5 border-white/20 border-white/10 hover:opacity-50 transition-all">
                            Home
                        </Link>
                        <Link href="/#projects" onClick={() => {setOpen(false); show(); setTimeout(hide,800)}} className="border-t-2 py-5 border-white/20 border-white/10 hover:opacity-50 transition-all">
                            Projects
                        </Link>
                        <Link href="/aboutme" onClick={() => {setOpen(false); show(); setTimeout(hide,800)}} className="border-t-2 py-5 border-white/20 border-white/10 hover:opacity-50 transition-all">
                            About
                        </Link>
                        <Link href="/contactme" onClick={() => {setOpen(false); show(); setTimeout(hide,800)}} className="border-t-2 py-5 border-white/20 border-white/10 hover:opacity-50 transition-all">
                            Contact
                        </Link>
                    </nav>
                </aside>
            </>
            <header className={`hidden md:block bg-black px-3 md:px-3 py-[1vh] flex flex-col md:flex-row justify-between w-full px-2 md:px-12 py-[3vh] gap-[2vh]`}>
                <Link href="/" className={`${!aboutMe ? 'text-white' : 'text-white'} hover:text-white/100 transition-all z-20 ml-auto md:ml-0`} onClick={() => {show(); setTimeout(hide,800)}}><House/></Link>
                <nav ref={navbarRef} className={`flex md:flex-row flex-col text-xl gap-[2vw] z-10 text-right uppercase ${pixelify.className} text-white`}>
                    <Link href="/#projects" className="opacity-75 transform-all duration-200 hover:text-white hover:opacity-100" onClick={() => {show(); setTimeout(hide,800)}}>projects</Link>
                    <Link href="/aboutme" className="opacity-75 transform-all duration-200 hover:text-white hover:opacity-100" onClick={() => {show(); setTimeout(hide,800)}}>about me</Link>
                    <Link href="/contactme" className="opacity-75 transform-all duration-200 hover:text-white hover:opacity-100" onClick={() => {show(); setTimeout(hide,800)}}>get in touch</Link>
                </nav>
            </header>
        </div>
    )
}

export function Footer() {
    const { show, hide } = useLoader();

    return(
          <footer  className="bg-black flex justify-between p-5 md:p-10 gap-5 md:gap-0"> {/* Footer Element */}
            <span className={`text-white opacity-50  text-md md:text-xl ${pixelify.className}`}>©coded by akin tewe</span>
            <Link href="/contactme" className={`text-white/60 text-xl hover:text-white transition-all ${pixelify.className}`} onClick={() => {show(); setTimeout(hide,800)}}>contact me</Link>
          </footer>
    )
}
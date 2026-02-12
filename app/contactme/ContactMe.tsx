"use client";
import TransparentVideo from "@/components/SplashVideo"
import { pixelify } from "../ui/fonts"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"

export default function ContactMe() {
    const containerRef = useRef(null)
    const isInView = useInView(containerRef, { once: true })

    const linkStyle = "text-blue-900 hover:opacity-70 transition-opacity duration-200"

    return (
        <div className="relative min-h-[100vh] bg-blue-500 overflow-hidden">

            {/* Background Character - Desktop */}
            <div className="hidden md:block absolute bottom-0 right-0 w-[50vw] h-[70vh] pointer-events-none">
                <TransparentVideo mp4Src="contactvid.mp4"/>
            </div>

            {/* Content */}
            <div
                ref={containerRef}
                className="relative z-10 flex flex-col min-h-[100vh] px-8 md:px-12 lg:px-20 py-12 md:py-20"
            >
                {/* Heading */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const }}
                    className={`${pixelify.className} text-white text-5xl md:text-7xl lg:text-8xl text-center md:text-left`}
                >
                    Want to talk?
                </motion.h1>

                {/* Paragraph with inline links */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] as const }}
                    className={`${pixelify.className} text-white text-2xl md:text-3xl lg:text-4xl mt-6 md:mt-10 max-w-xl leading-relaxed text-center md:text-left`}
                >
                    Contact me via{" "}
                    <Link href="https://www.linkedin.com/in/akin-tewe-38523418a/" target="_blank" className={linkStyle}>
                        LinkedIn
                    </Link>
                    , this{" "}
                    <Link href="https://www.instagram.com/eightybot/" target="_blank" className={linkStyle}>
                        Instagram
                    </Link>
                    , the cooler{" "}
                    <Link href="https://www.instagram.com/n8ghbr/" target="_blank" className={linkStyle}>
                        Instagram
                    </Link>
                    , or send me an{" "}
                    <Link href="mailto:atewebiz@gmail.com" className={linkStyle}>
                        email
                    </Link>
                    .
                </motion.p>

                {/* Spacer */}
                <div className="flex-1" />

                {/* Background Character - Mobile */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="md:hidden relative h-[40vh] mt-8 -mx-8"
                >
                    <TransparentVideo mp4Src="contactvid.mp4"/>
                </motion.div>

            </div>
        </div>
    )
}

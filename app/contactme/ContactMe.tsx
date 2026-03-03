"use client";
import { roboto } from "@/app/ui/fonts";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const ease: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

function GridOverlayLight() {
    return (
        <div className="absolute inset-0 flex h-full w-full justify-center pointer-events-none">
            <div className="flex w-full max-w-[1400px] h-full">
                <div className="flex-1 border-l border-black/[0.07]"></div>
                <div className="flex-1 border-l border-black/[0.07]"></div>
                <div className="flex-1 border-l border-black/[0.07]"></div>
                <div className="flex-1 border-l border-black/[0.07]"></div>
                <div className="flex-1 border-l border-r border-black/[0.07]"></div>
            </div>
        </div>
    );
}

export default function ContactMe() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    return (
        <main
            ref={ref}
            className="h-dvh overflow-hidden"
            style={{ backgroundColor: "#ebebeb" }}
        >
            <section className="relative h-full px-6 md:px-[clamp(4rem,10vw,11rem)]">
                <GridOverlayLight />
                {/* Headline */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.15, ease }}
                    className={`${roboto.className} pt-32 md:pt-40 font-light text-4xl md:text-5xl lg:text-6xl leading-tight text-gray-800 max-w-[700px]`}
                >
                    Want to chat?
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.25, ease }}
                    className={`${roboto.className} mt-6 md:mt-8 font-light text-4xl md:text-5xl lg:text-6xl leading-tight text-gray-800 max-w-[700px]`}
                >
                    Reach out via{" "}
                    <a
                        href="https://www.linkedin.com/in/akin-tewe/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 font-normal hover:text-blue-600 transition-colors"
                    >
                        LinkedIn
                    </a>
                    ,{" "}
                    <a
                        href="mailto:akintewe.work@gmail.com"
                        className="text-blue-500 font-normal hover:text-blue-600 transition-colors"
                    >
                        email
                    </a>
                    , or Instagram at{" "}
                    <a
                        href="https://www.instagram.com/eightybot/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 font-normal hover:text-blue-600 transition-colors"
                    >
                        @eightybot
                    </a>
                    {" "}&{" "}
                    <a
                        href="https://www.instagram.com/n8ghbr/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 font-normal hover:text-blue-600 transition-colors"
                    >
                        @n8ghbr
                    </a>
                    .
                </motion.p>

                {/* Bottom-right video */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.6, delay: 0.4, ease }}
                    className="absolute bottom-0 left-1/2 [transform:translateX(-50%)] md:[transform:none] md:left-auto md:right-[clamp(1rem,3vw,3rem)] w-[350px] h-[350px] md:w-[770px] md:h-[770px] pointer-events-none"
                >
                    <video
                        className="absolute inset-0 w-full h-full object-contain object-bottom"
                        autoPlay
                        loop
                        muted
                        playsInline
                    >
                        <source src="/walkingM.mp4" type="video/mp4;codecs=hvc1" />
                        <source src="/walkingW.webm" type="video/webm" />
                    </video>
                </motion.div>
            </section>
        </main>
    );
}

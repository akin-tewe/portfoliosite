"use client";
import Image from "next/image"
import { useState } from "react";
import { pixelify, roboto } from "@/app/ui/fonts";
import projectsdata from "@/data/ProjectThumbData"
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link"
import { useLoader } from "./LoaderContext";



export default function Projects() {

    const {show,hide} = useLoader();
    const [index, setIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    const next = () => {
        setDirection(1);
        setIndex((i) => (i + 1) % projectsdata.length);
    }

    const prev = () => {
        setDirection(-1);
        setIndex((i) => (i - 1 + projectsdata.length) % projectsdata.length);
    }

    const project = projectsdata[index];

    const slideVariants = {
        enter: (dir: number) => ({
            x: dir > 0 ? 80 : -80,
            opacity: 0,
        }),
        center: {
            x: 0,
            opacity: 1,
        },
        exit: (dir: number) => ({
            x: dir > 0 ? -80 : 80,
            opacity: 0,
        }),
    }

    return (
        <section className="w-full grid grid-cols-[1fr_auto_1fr] z-20">
            <motion.button
                onClick={prev}
                className="mr-10 relative -scale-x-100"
                aria-label="Previous project"
                type="button"
                animate={{ y: [0, -8, 0]}}
                transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                whileHover={{ y: 0}}
            >
                <Image
                    src="/arrow.png"
                    alt="Arrow Button"
                    width={130}
                    height={130}
                    className="transition-all hover:scale-120"
                />
            </motion.button>

            <div className="">
                <AnimatePresence mode="wait" initial={false} custom={direction}>
                    <motion.div
                        key={project.id}
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.3, ease: "easeOut"}}
                        className="w-full"
                    >
                        <Link href={project.link}>
                            <button
                                onClick={() => {show(); setTimeout(hide,800)}}
                                className="relative block mx-auto grid w-full max-w-5xl grid-cols-[1fr_auto_1fr] items-center z-20 transition-transform hover:-translate-y-2 hover:scale-102 hover:bg-blue-400 border-3 bg-blue-600 p-7 rounded-full">
                                <div className={`${pixelify.className} relative grid grid-cols-1 text-white uppercase`}>
                                    <h1 className="text-4xl pl-10 justify-self-end text-right pointer-events-none">{project.title}</h1>
                                    <div className="justify-self-end text-right pointer-events-none font-bold opacity-60">{project.subtitle}</div>
                                </div>
                                <div className="relative w-[200px] h-[200px] pointer-events-none">
                                    {project.image}
                                </div>
                                <div className={`text-white max-w-xl text-xl ${roboto.className} font-light pr-9`}>
                                    <p>{project.body}</p>
                                </div>
                            </button>
                        </Link>
                    </motion.div>
                </AnimatePresence>
            </div>

            <motion.button
                onClick={next}
                className="ml-10 relative"
                aria-label="Previous project"
                type="button"
                animate={{ y: [0, -8, 0]}}
                transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                whileHover={{ y: 0}}
            >
                <Image
                    src="/arrow.png"
                    alt="Arrow Button"
                    width={130}
                    height={130}
                    className="transition-all hover:scale-120"
                />
            </motion.button>
        </section>
    )
}
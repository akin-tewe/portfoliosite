"use client";
import Image from "next/image"
import { useState, useRef } from "react";
import { pixelify, roboto } from "@/app/ui/fonts";
import projectsdata from "@/data/ProjectThumbData"
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation"
import { useLoader } from "./LoaderContext";

export default function Projects() {
    const { show, hide } = useLoader();
    const router = useRouter();
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

    const isDragging = useRef(false);

    const project = projectsdata[index];

    const slideVariants = {
        enter: (dir: number) => ({
            x: dir > 0 ? 100 : -100,
            opacity: 0,
            scale: 1,
        }),
        center: {
            x: 0,
            opacity: 1,
            scale: 1,
        },
        exit: (dir: number) => ({
            x: dir > 0 ? -100 : 100,
            opacity: 0,
            scale: 1,
        }),
    }

    const SWIPE_DIST = 30;
    const SWIPE_VELOCITY = 200;

    const handleDragStart = () => {
        isDragging.current = true;
    };

    const handleDragEnd = (_: unknown, info: { offset: { x: number }, velocity: { x: number } }) => {
        const { x } = info.offset;
        const vx = info.velocity.x;

        if (Math.abs(x) > SWIPE_DIST || Math.abs(vx) > SWIPE_VELOCITY) {
            if (x < -SWIPE_DIST || vx < -SWIPE_VELOCITY) next();
            else if (x > SWIPE_DIST || vx > SWIPE_VELOCITY) prev();
        }

        // Reset after a short delay so the click handler can check it
        setTimeout(() => { isDragging.current = false; }, 50);
    };


    return (
        <div className="w-full">
            <section className="items-self-center w-full grid lg:grid-cols-[1fr_5fr_1fr] md:grid-cols-[1fr_7fr_1fr] px-5 md:px-2 z-20">
                <motion.button
                    onClick={prev}
                    className="hidden md:block mr-10 relative -scale-x-100"
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
                            className="w-full cursor-pointer"
                            drag="x"
                            dragConstraints={{ left: 0, right: 0 }}
                            dragElastic={0.18}
                            onDragStart={handleDragStart}
                            onDragEnd={handleDragEnd}
                            onTap={() => {
                                if (!isDragging.current) {
                                    show();
                                    setTimeout(hide, 800);
                                    router.push(project.link);
                                }
                            }}
                        >
                            <div
                                className="relative block mx-auto flex flex-col w-full max-w-5xl md:grid md:grid-cols-[1fr_auto_1fr] items-center z-20 transition-transform hover:scale-103 border-3 bg-blue-600 p-7 rounded-3xl md:rounded-full pointer-events-none text-center md:text-left">
                                <div className={`${pixelify.className} relative grid grid-cols-1 text-white justify-center uppercase`}>
                                    <h1 className="text-4xl max-w-s md:text-right">{project.title}</h1>
                                    <div className="md:text-right font-bold opacity-60 md:hidden lg:block">{project.subtitle}</div>
                                </div>
                                <div className="relative w-[200px] h-[200px]">
                                    {project.image}
                                </div>
                                <div className={`text-white max-w-xs text-xl justify-self-center ${roboto.className} font-light pr-9 hidden md:block`}>
                                    <p>{project.body}</p>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Pagination Dots - Mobile */}
                    <div className="flex justify-center gap-0 mt-4 md:hidden">
                        {projectsdata.map((_, i) => (
                            <motion.button
                                key={i}
                                onClick={() => {
                                    setDirection(i > index ? 1 : -1);
                                    setIndex(i);
                                }}
                                className="relative flex items-center justify-center w-8 h-10"
                                whileTap={{ scale: 0.9 }}
                                aria-label={`Go to project ${i + 1}`}
                            >
                                <span className={`block rounded-full transition-all duration-300 ${i === index
                                    ? 'w-8 h-2 bg-white'
                                    : 'w-2 h-2 bg-white/30'
                                    }`}
                                />
                            </motion.button>
                        ))}
                    </div>
                </div>

                <motion.button
                    onClick={next}
                    className="hidden md:block ml-10 relative"
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
                {/* Project Counter - Desktop */}
            </section>
            <div className="hidden relative lg:flex justify-center w-full mt-3">
                <div className={`${pixelify.className} text-lg flex items-center gap-2`}>
                    {["Sifty", "Instagram Concept", "Research Study", "True Religion"].map((name, i) => (
                        <div key={name} className="flex items-center gap-2">
                            <motion.button
                                onClick={() => {
                                    setDirection(i > index ? 1 : -1);
                                    setIndex(i);
                                }}
                                className={`transition-all duration-300 uppercase ${i === index ? 'text-white' : 'text-white/40 hover:text-white/60'}`}
                                whileTap={{ scale: 0.95 }}
                            >
                                {name}
                            </motion.button>
                            {i < 3 && <span className="text-white/20">—</span>}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}


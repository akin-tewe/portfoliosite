"use client";
import { pixelify, roboto } from "@/app/ui/fonts"
import { projectminis } from "@/data/ProjectThumbData"
import Link from "next/link"
import { useLoader } from "./LoaderContext"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { ArrowRight } from "lucide-react"

export default function ExtraProjects() {
    const { show, hide } = useLoader();
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: "easeOut" as const
            }
        }
    };

    return (
        <motion.div
            ref={ref}
            className="flex flex-col p-8 md:p-10 md:px-30 mt-6 md:mt-10 w-full mx-auto max-w-6xl"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
        >
            <motion.div
                className="h-px bg-gradient-to-r from-transparent via-black/15 to-transparent"
                variants={itemVariants}
            />

            {projectminis.map((proj, index) => (
                <motion.div key={proj.id} variants={itemVariants}>
                    <Link href={proj.link} onClick={() => { show(); setTimeout(hide, 800) }}>
                        <motion.button
                            className="group py-10 md:py-12 flex text-gray-900 items-center justify-between w-full px-4 md:px-8 relative overflow-hidden"
                            whileHover={{ x: 5 }}
                            whileTap={{ scale: 0.99 }}
                        >
                            {/* Hover background */}
                            <motion.div
                                className="absolute inset-0 bg-black/5 -z-10"
                                initial={{ scaleX: 0 }}
                                whileHover={{ scaleX: 1 }}
                                transition={{ duration: 0.3 }}
                                style={{ originX: 0 }}
                            />

                            {/* Project number */}
                            <span className={`${pixelify.className} text-black/20 text-sm md:text-base mr-4 md:mr-8`}>
                                0{index + 1}
                            </span>

                            {/* Title */}
                            <h2 className={`${pixelify.className} text-2xl md:text-3xl uppercase group-hover:text-blue-500 transition-colors duration-300 flex-1 text-left`}>
                                {proj.title}
                            </h2>

                            {/* Description - Desktop */}
                            <span className={`${roboto.className} font-light text-black/40 group-hover:text-black/60 transition-all duration-300 hidden md:block max-w-xs text-right`}>
                                {proj.desc}
                            </span>

                            {/* Arrow indicator */}
                            <motion.div
                                className="ml-4 md:ml-8 text-black/20 group-hover:text-black/60 transition-colors"
                                initial={{ x: 0, opacity: 0.5 }}
                                whileHover={{ x: 5, opacity: 1 }}
                            >
                                <ArrowRight size={20} />
                            </motion.div>
                        </motion.button>
                    </Link>
                    <motion.div
                        className="h-px bg-gradient-to-r from-transparent via-black/10 to-transparent"
                        variants={itemVariants}
                    />
                </motion.div>
            ))}

        </motion.div>
    )
}

"use client";
import { pixelify, roboto } from "@/app/ui/fonts"
import MagneticButton from "@/components/MagneticButton";
import { useState, useRef } from "react";
import { Video, ChevronDown } from "lucide-react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import ProjectSummary from "@/components/ProjectSummary";

const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
};

function AnimatedSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className={className}
        >
            {children}
        </motion.div>
    );
}

export default function Rage() {
    const [open, setOpen] = useState(false);
    const heroRef = useRef(null);
    const isHeroInView = useInView(heroRef, { once: true });

    return (
        <main className="overflow-x-hidden">
            <div className="fixed inset-0 flex h-full w-full gap-[1vw] text-white/5 justify-center pointer-events-none z-0">
                <div className="border w-[15vw] md:w-[12.1vw] border-white/5"></div>
                <div className="border w-[15vw] md:w-[12.1vw] border-white/5"></div>
                <div className="border w-[15vw] md:w-[12.1vw] border-white/5"></div>
                <div className="border w-[15vw] md:w-[12.1vw] border-white/5"></div>
                <div className="border w-[15vw] md:w-[12.1vw] border-white/5"></div>
                <div className="border w-[15vw] md:w-[12.1vw] border-white/5"></div>
            </div>

            <section
                ref={heroRef}
                id="splash"
                className="relative w-full min-h-[100vh] md:min-h-[60vh] flex items-center justify-center md:justify-start px-5 md:px-[5vw] py-20"
            >
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="flex flex-col md:flex-row md:gap-20 w-full max-w-7xl"
                >
                    <div className="relative flex flex-col gap-6 md:gap-10">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className={`${pixelify.className} text-4xl md:text-5xl lg:text-6xl text-white max-w-xs md:max-w-2xl leading-tight`}
                        >
                            {`stream intro animation for "yourrage"`}
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className={`${roboto.className} text-white/80 font-light text-lg md:text-xl lg:text-2xl md:max-w-2xl leading-relaxed`}
                        >
                            {`Streamer animation created for "YourRage", a well known streamer on twitch.tv.`}
                        </motion.p>
                    </div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={isHeroInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        className={`${pixelify.className} text-xl flex flex-col items-center md:flex-row gap-15 mt-10 md:mt-auto justify-center md:ml-auto`}
                    >
                        <button
                            className="flex justify-center items-center w-auto h-auto z-10"
                            onClick={() => document.getElementById('body')?.scrollIntoView({ behavior: 'smooth' })}
                        >
                            <MagneticButton icon={<ChevronDown className="md:hidden text-white z-50" />} parameter="w-15 h-15 md:w-40 md:h-15 bg-blue-600/50 md:bg-blue-500/0 hover:bg-blue-600/50 z-20" text="Read More" />
                        </button>
                        <button
                            className="flex justify-center items-center w-auto h-auto z-10"
                            onClick={() => setOpen(true)}
                        >
                            <MagneticButton icon={<Video className="md:hidden text-white z-50" />} parameter="w-15 h-15 md:w-50 md:h-15 bg-blue-600/50 md:bg-blue-500/0 hover:bg-blue-600/50 z-20" text="Watch Video" />
                        </button>

                        {open && (
                            <div
                                className="fixed inset-0 z-40 flex items-center justify-center bg-black/70 p-4"
                                onClick={() => setOpen(false)}
                            >
                                <div
                                    className="w-full max-w-6xl overflow-hidden rounded-2xl bg-black shadow-2xl"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <video
                                        className="aspect-video w-full z-50"
                                        src="/projects/yourrage/ragelowq.mp4"
                                        controls
                                        autoPlay
                                    />
                                </div>
                            </div>
                        )}
                    </motion.div>
                </motion.div>
            </section>

            <section className="h-[50px] md:h-0"></section>

            <section id="body" className="relative pb-20 md:pb-40 px-5 md:px-[8vw] lg:px-[11vw] z-10">
                <div className="flex flex-col gap-16 md:gap-24 max-w-4xl">

                    <AnimatedSection className="flex flex-col gap-8 md:gap-12">
                        <motion.div variants={fadeInUp}>
                            <h2 className={`${pixelify.className} text-white text-2xl md:text-3xl lg:text-4xl mb-6`}>
                                scope and audience.
                            </h2>
                            <p className={`${roboto.className} text-white/80 text-base md:text-xl lg:text-2xl font-light leading-relaxed`}>
                                I had actually reached out to YourRage personally for this opportunity,
                                being a fan of his content and wanting to make something I felt could leave my mark with his community. Not only did I need to do an amazing
                                job, I needed to prove value—to him and his community.
                            </p>
                        </motion.div>

                        <motion.div variants={fadeInUp}>
                            <div className="flex relative overflow-hidden bg-white/10 p-2 md:p-[1vw] rounded-lg">
                                <Image
                                    src="/projects/yourrage/character.jpg"
                                    alt="Character Sheet"
                                    className="rounded-md pointer-events-none w-full h-auto"
                                    width={700}
                                    height={700}
                                />
                            </div>
                            <div className={`${roboto.className} text-white/40 text-center mt-2 italic text-sm md:text-base`}>
                                {`original render shots for "yourrage" character.`}
                            </div>
                        </motion.div>

                        <motion.div variants={fadeInUp}>
                            <p className={`${roboto.className} text-white/80 text-base md:text-xl lg:text-2xl font-light leading-relaxed`}>
                                {`His chat (another term for a streamer's community) is fast and hyper-aware.
                                They exist through pivotal moments and inside-jokes. As someone on the inside, I was able to leverage this to set the theme for the piece. A robotic
                                scene and mechanical legs reference a background in knee surgery he constantly jokes about on his stream. We capture Rage as an event in motion, shown
                                through themes of pursuit, confrontation and release.`}
                            </p>
                        </motion.div>

                        <motion.div variants={fadeInUp}>
                            <div className="flex relative overflow-hidden bg-white/10 p-2 md:p-[1vw] rounded-lg">
                                <Image
                                    src="/projects/yourrage/motionreference.gif"
                                    alt="Motion Reference Scene"
                                    className="rounded-md pointer-events-none w-full h-auto"
                                    width={700}
                                    height={700}
                                />
                            </div>
                            <div className={`${roboto.className} text-white/40 text-center mt-2 italic text-sm md:text-base`}>
                                action pacing reference - image credit: Pinterest
                            </div>
                        </motion.div>
                    </AnimatedSection>

                    <AnimatedSection className="flex flex-col gap-8 md:gap-12">
                        <motion.div variants={fadeInUp}>
                            <h2 className={`${pixelify.className} text-white text-2xl md:text-3xl lg:text-4xl mb-6`}>
                                reception.
                            </h2>
                            <p className={`${roboto.className} text-white/80 text-base md:text-xl lg:text-2xl font-light leading-relaxed`}>
                                {`Twitch is a platform molded by timing, not explanation.
                                The job was to meet the audience where they were, speak their language, and leave them ready for more. During this animation's
                                lifetime, it was incredible seeing the community (and Rage's) initial reaction, and constantly getting to live in that moment with them.`}
                            </p>
                        </motion.div>

                        <motion.div variants={fadeInUp}>
                            <div className="flex relative overflow-hidden bg-white/10 p-2 md:p-[1vw] rounded-lg">
                                <video
                                    className="aspect-video w-full z-50 rounded-md"
                                    src="/projects/yourrage/ragelowq.mp4"
                                    controls
                                />
                            </div>
                            <div className={`${roboto.className} text-white/40 text-center mt-2 italic text-sm md:text-base`}>
                                final rendered animation.
                            </div>
                        </motion.div>

                        <motion.div variants={fadeInUp} className="mt-8">
                            <ProjectSummary
                                items={[
                                    { label: "Client", value: "YourRage" },
                                    { label: "Platform", value: "Twitch.tv" },
                                    { label: "Deliverable", value: "Stream Intro" },
                                    { label: "Focus", value: "Community Design" }
                                ]}
                            />
                        </motion.div>
                    </AnimatedSection>
                </div>
            </section>
        </main>
    )
}

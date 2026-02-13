"use client";
import { pixelify, roboto } from "@/app/ui/fonts"
import { useState, useRef } from "react";
import { Video } from "lucide-react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

// Animation variants
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

// Grid container for content alignment
function GridContainer({ children, className = "" }: { children: React.ReactNode; className?: string }) {
    return (
        <div className={`w-full max-w-[1400px] mx-auto px-5 md:px-8 ${className}`}>
            {children}
        </div>
    );
}

// Section wrapper for animations
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
            {/* Visible Grid Overlay */}
            <div className="fixed inset-0 flex h-full w-full justify-center pointer-events-none z-0">
                <div className="flex w-full max-w-[1400px] h-full">
                    <div className="flex-1 border-l border-white/[0.07]"></div>
                    <div className="flex-1 border-l border-white/[0.07]"></div>
                    <div className="flex-1 border-l border-white/[0.07]"></div>
                    <div className="flex-1 border-l border-white/[0.07]"></div>
                    <div className="flex-1 border-l border-r border-white/[0.07]"></div>
                </div>
            </div>

            {/* Hero Section */}
            <section
                ref={heroRef}
                className="relative w-full pt-32 md:pt-40 pb-16 md:pb-24"
            >
                <GridContainer>
                    <div className="md:w-[60%] lg:w-[50%] md:ml-[20%]">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className={`${pixelify.className} text-5xl md:text-6xl lg:text-7xl text-white leading-tight`}
                        >
                            stream intro for
                            <br />
                            <span className="text-blue-400 italic">{`"yourrage"`}</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className={`${roboto.className} text-white/70 font-light text-lg md:text-xl mt-6 leading-relaxed`}
                        >
                            {`Streamer animation created for "YourRage", a well known streamer on twitch.tv.`}
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.6 }}
                            className="flex flex-wrap gap-4 mt-10"
                        >
                            <button
                                onClick={() => document.getElementById('body')?.scrollIntoView({ behavior: 'smooth' })}
                                className={`${roboto.className} px-6 py-3 border border-white/30 rounded-full text-white/80 text-base hover:bg-white/10 transition-colors`}
                            >
                                View Project
                            </button>
                            <button
                                onClick={() => setOpen(true)}
                                className={`${roboto.className} px-6 py-3 bg-blue-600 rounded-full text-white text-base hover:bg-blue-700 transition-colors flex items-center gap-2`}
                            >
                                <Video className="w-4 h-4" />
                                Watch Video
                            </button>
                        </motion.div>
                    </div>
                </GridContainer>

                {/* Video Modal */}
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
            </section>

            {/* Hero Character Image */}
            <section className="relative w-full pb-16 md:pb-24">
                <GridContainer>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="md:ml-[20%] md:w-[60%]"
                    >
                        <div className="overflow-hidden bg-white/5 p-4 md:p-6 rounded-lg">
                            <Image
                                src="/projects/yourrage/character.jpg"
                                alt="Character Sheet"
                                width={600}
                                height={600}
                                className="w-full h-auto rounded-md"
                            />
                        </div>
                        <span className={`${roboto.className} text-white/40 text-sm md:text-base mt-3 block`}>
                            {`Original render shots for "yourrage" character`}
                        </span>
                    </motion.div>
                </GridContainer>
            </section>

            {/* Main Content */}
            <section id="body" className="relative py-12 md:py-20">
                {/* Section 1: Scope */}
                <GridContainer>
                    <AnimatedSection className="md:ml-[20%] md:w-[50%]">
                        <motion.span
                            variants={fadeInUp}
                            className={`${roboto.className} text-blue-400 text-base md:text-lg tracking-wide`}
                        >
                            Scope
                        </motion.span>

                        <motion.p
                            variants={fadeInUp}
                            className={`${roboto.className} text-white/80 font-light text-lg md:text-xl leading-relaxed mt-4`}
                        >
                            I had actually reached out to YourRage personally for this opportunity,
                            being a fan of his content and wanting to make something I felt could leave my mark with his community.
                        </motion.p>

                        <motion.p
                            variants={fadeInUp}
                            className={`${roboto.className} text-white/80 font-light text-lg md:text-xl leading-relaxed mt-6`}
                        >
                            Not only did I need to do an amazing job, I needed to prove value—to him and his community.
                        </motion.p>
                    </AnimatedSection>
                </GridContainer>

                {/* Pull Quote */}
                <GridContainer className="py-10 md:py-16">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="md:ml-[20%] md:w-[60%]"
                    >
                        <div className="border-l-2 border-blue-400 pl-6 md:pl-8">
                            <span className={`${roboto.className} text-white text-2xl md:text-3xl font-light leading-relaxed`}>
                                {`His chat is fast and hyper-aware. They exist through pivotal moments and inside-jokes.`}
                            </span>
                            <span className={`${roboto.className} text-white/50 text-base block mt-4`}>
                                As someone on the inside, I was able to leverage this to set the theme for the piece.
                            </span>
                        </div>
                    </motion.div>
                </GridContainer>

                <GridContainer>
                    <AnimatedSection className="md:ml-[20%] md:w-[50%]">
                        <motion.p
                            variants={fadeInUp}
                            className={`${roboto.className} text-white/80 font-light text-lg md:text-xl leading-relaxed`}
                        >
                            {`A robotic scene and mechanical legs reference a background in knee surgery he constantly jokes about on his stream.`}
                        </motion.p>

                        <motion.p
                            variants={fadeInUp}
                            className={`${roboto.className} text-white/80 font-light text-lg md:text-xl leading-relaxed mt-6`}
                        >
                            We capture Rage as an event in motion, shown through themes of pursuit, confrontation and release.
                        </motion.p>
                    </AnimatedSection>
                </GridContainer>

                {/* Motion Reference */}
                <GridContainer className="mt-12 md:mt-16">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="md:ml-[20%] md:w-[60%]"
                    >
                        <div className="overflow-hidden bg-white/5 p-4 md:p-6 rounded-lg">
                            <Image
                                src="/projects/yourrage/motionreference.gif"
                                alt="Motion Reference"
                                width={600}
                                height={400}
                                className="w-full h-auto rounded-md"
                            />
                        </div>
                        <span className={`${roboto.className} text-white/40 text-sm md:text-base mt-3 block`}>
                            Action pacing reference - image credit: Pinterest
                        </span>
                    </motion.div>
                </GridContainer>
            </section>

            {/* Section 2: Reception */}
            <section className="relative py-12 md:py-20">
                <GridContainer>
                    <AnimatedSection className="md:ml-[20%] md:w-[50%]">
                        <motion.span
                            variants={fadeInUp}
                            className={`${roboto.className} text-blue-400 text-base md:text-lg tracking-wide`}
                        >
                            Reception
                        </motion.span>

                        <motion.p
                            variants={fadeInUp}
                            className={`${roboto.className} text-white/80 font-light text-lg md:text-xl leading-relaxed mt-4`}
                        >
                            Twitch is a platform molded by timing, not explanation.
                            The job was to meet the audience where they were, speak their language, and leave them ready for more.
                        </motion.p>

                        <motion.p
                            variants={fadeInUp}
                            className={`${roboto.className} text-white/80 font-light text-lg md:text-xl leading-relaxed mt-6`}
                        >
                            {`During this animation's lifetime, it was incredible seeing the community (and Rage's) initial reaction, and constantly getting to live in that moment with them.`}
                        </motion.p>
                    </AnimatedSection>
                </GridContainer>

                {/* Final Video */}
                <GridContainer className="mt-12 md:mt-16">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="md:ml-[20%] md:w-[65%]"
                    >
                        <div className="overflow-hidden">
                            <video
                                className="aspect-video w-full rounded-lg"
                                src="/projects/yourrage/ragelowq.mp4"
                                controls
                            />
                        </div>
                        <span className={`${roboto.className} text-white/40 text-sm md:text-base mt-3 block`}>
                            Final rendered animation
                        </span>
                    </motion.div>
                </GridContainer>
            </section>
        </main>
    )
}

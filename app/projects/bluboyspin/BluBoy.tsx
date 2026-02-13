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

export default function Bluboy() {
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
                            print launch video
                            <br />
                            <span className="text-blue-400 italic">{`for "bluboy"`}</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className={`${roboto.className} text-white/70 font-light text-lg md:text-xl mt-6 leading-relaxed`}
                        >
                            {`A short-form commercial created to introduce
                            the release of fashion designer "Bluboy's" art prints.`}
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
                                src="/projects/bluboyspin/printsvid.mp4"
                                controls
                                autoPlay
                            />
                        </div>
                    </div>
                )}
            </section>

            {/* Hero Image Grid */}
            <section className="relative w-full pb-16 md:pb-24">
                <div className="grid grid-cols-3 gap-2 md:gap-3">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="aspect-[3/4] overflow-hidden"
                    >
                        <Image
                            src="/projects/bluboyspin/fit1.jpg"
                            alt="Reference Print Image"
                            width={560}
                            height={560}
                            className="w-full h-full object-cover"
                        />
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="aspect-[3/4] overflow-hidden"
                    >
                        <Image
                            src="/projects/bluboyspin/fit2.jpg"
                            alt="Reference Print Image"
                            width={560}
                            height={560}
                            className="w-full h-full object-cover"
                        />
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="aspect-[3/4] overflow-hidden"
                    >
                        <Image
                            src="/projects/bluboyspin/fit3.jpg"
                            alt="Reference Print Image"
                            width={560}
                            height={560}
                            className="w-full h-full object-cover"
                        />
                    </motion.div>
                </div>
                <GridContainer>
                    <span className={`${roboto.className} text-white/40 text-sm md:text-base mt-3 block`}>
                        {`"bluboy" art direction reference - image credit: @bluboy on instagram`}
                    </span>
                </GridContainer>
            </section>

            {/* Main Content */}
            <section id="body" className="relative py-12 md:py-20">
                {/* Section 1: Assessment */}
                <GridContainer>
                    <AnimatedSection className="md:ml-[20%] md:w-[50%]">
                        <motion.span
                            variants={fadeInUp}
                            className={`${roboto.className} text-blue-400 text-base md:text-lg tracking-wide`}
                        >
                            Assessment
                        </motion.span>

                        <motion.p
                            variants={fadeInUp}
                            className={`${roboto.className} text-white/80 font-light text-lg md:text-xl leading-relaxed mt-4`}
                        >
                            {`Bluboy is an individual I've done a number of works for in the past.
                            As it had been a notable amount of time since our last project, this required re-engaging with his current audience and demographic.`}
                        </motion.p>

                        <motion.p
                            variants={fadeInUp}
                            className={`${roboto.className} text-white/80 font-light text-lg md:text-xl leading-relaxed mt-6`}
                        >
                            {`What they're looking for now is continuity. Not a throwback to the past, but something fresh that aligns
                            with his current image.`}
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
                                {`Character-driven imagery is a focal point of his narrative, but he wanted to reduce its prominence for this video.`}
                            </span>
                            <span className={`${roboto.className} text-white/50 text-base block mt-4`}>
                                Let the pieces speak on their own.
                            </span>
                        </div>
                    </motion.div>
                </GridContainer>

                {/* Character Reference Images */}
                <GridContainer>
                    <div className="grid grid-cols-3 gap-3 md:gap-4 md:ml-[20%] md:w-[60%]">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="overflow-hidden"
                        >
                            <Image
                                src="/projects/bluboyspin/char1.jpg"
                                alt="Character Reference"
                                width={560}
                                height={560}
                                className="w-full h-auto"
                            />
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="overflow-hidden"
                        >
                            <Image
                                src="/projects/bluboyspin/char2.jpg"
                                alt="Character Reference"
                                width={560}
                                height={560}
                                className="w-full h-auto"
                            />
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="overflow-hidden"
                        >
                            <Image
                                src="/projects/bluboyspin/char3.jpg"
                                alt="Character Reference"
                                width={560}
                                height={560}
                                className="w-full h-auto"
                            />
                        </motion.div>
                    </div>
                    <span className={`${roboto.className} text-white/40 text-sm md:text-base mt-3 block md:ml-[20%]`}>
                        Character visual direction reference - image credit: @bluboy on instagram
                    </span>
                </GridContainer>
            </section>

            {/* Section 2: Motion */}
            <section className="relative py-12 md:py-20">
                <GridContainer>
                    <AnimatedSection className="md:ml-[20%] md:w-[50%]">
                        <motion.span
                            variants={fadeInUp}
                            className={`${roboto.className} text-blue-400 text-base md:text-lg tracking-wide`}
                        >
                            Motion
                        </motion.span>

                        <motion.p
                            variants={fadeInUp}
                            className={`${roboto.className} text-white/80 font-light text-lg md:text-xl leading-relaxed mt-4`}
                        >
                            With the characters taking a backseat, the paintings had to absorb the magic.
                        </motion.p>

                        <motion.p
                            variants={fadeInUp}
                            className={`${roboto.className} text-white/80 font-light text-lg md:text-xl leading-relaxed mt-6`}
                        >
                            To possess the paintings with some of that creative spirit, we had to hone back in on our animation principles. Timing, spacing, and anticipation
                            become essential, allowing otherwise static pieces to feel alive and intentional.
                        </motion.p>
                    </AnimatedSection>
                </GridContainer>

                {/* Principles GIF */}
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
                                src="/projects/bluboyspin/principles.gif"
                                alt="Principles of Animation"
                                width={490}
                                height={490}
                                className="w-full h-auto rounded-md"
                            />
                        </div>
                        <span className={`${roboto.className} text-white/40 text-sm md:text-base mt-3 block`}>
                            12 principles of animation - image credit: Chris Totten via Medium
                        </span>
                    </motion.div>
                </GridContainer>

                <GridContainer className="mt-12 md:mt-16">
                    <AnimatedSection className="md:ml-[20%] md:w-[50%]">
                        <motion.p
                            variants={fadeInUp}
                            className={`${roboto.className} text-white/80 font-light text-lg md:text-xl leading-relaxed`}
                        >
                            Breathing life into the paintings was the most fun part of this process.
                            Organization and placement were two very important factors in getting everything into a position that both felt and looked incredible.
                        </motion.p>
                    </AnimatedSection>
                </GridContainer>
            </section>

            {/* Section 3: Final */}
            <section className="relative py-12 md:py-20">
                <GridContainer>
                    <AnimatedSection className="md:ml-[20%] md:w-[50%]">
                        <motion.span
                            variants={fadeInUp}
                            className={`${roboto.className} text-blue-400 text-base md:text-lg tracking-wide`}
                        >
                            Result
                        </motion.span>

                        <motion.p
                            variants={fadeInUp}
                            className={`${roboto.className} text-white/80 font-light text-lg md:text-xl leading-relaxed mt-4`}
                        >
                            The final piece reads less like an advertisement and more like a visual gesture.
                        </motion.p>

                        <motion.p
                            variants={fadeInUp}
                            className={`${roboto.className} text-white/80 font-light text-lg md:text-xl leading-relaxed mt-6`}
                        >
                            {`Without an ironed-out brief to work from, this entire project was produced through responsiveness and paying close attention to the client's needs.
                            The result was a piece that supports their message without diluting their voice.`}
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
                                src="/projects/bluboyspin/printsvid.mp4"
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

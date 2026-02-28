"use client";
import { pixelify, roboto } from "@/app/ui/fonts"
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MagneticWrapper } from "@/components/MagneticButton";

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
function GridContainer({ children, className = "", id }: { children: React.ReactNode; className?: string; id?: string }) {
    return (
        <div id={id} className={`w-full max-w-[1400px] mx-auto px-5 md:px-8 ${className}`}>
            {children}
        </div>
    );
}

// Gradient divider between sections
function SectionDivider() {
    return (
        <div className="w-full max-w-[1400px] mx-auto px-5 md:px-8">
            <div className="h-px bg-gradient-to-r from-transparent via-black/15 to-transparent" />
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

export default function Sprite() {
    const heroRef = useRef(null);
    const isHeroInView = useInView(heroRef, { once: true });

    return (
        <main className="overflow-x-hidden">
            {/* Hero Section */}
            <section
                ref={heroRef}
                className="relative w-full pt-32 md:pt-40 pb-16 md:pb-24 bg-gray-200"
            >
                <GridContainer>
                    <div className="md:w-[60%] lg:w-[50%] md:ml-[20%]">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className={`${pixelify.className} text-5xl md:text-6xl lg:text-7xl text-gray-800 leading-tight`}
                        >
                            sprite
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className={`${pixelify.className} text-blue-500 text-xl md:text-2xl tracking-wide uppercase mt-2`}
                        >
                            [Placeholder: tagline]
                        </motion.p>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className={`${roboto.className} text-black/50 font-light text-lg md:text-xl mt-6 leading-relaxed`}
                        >
                            [Placeholder: description of the Sprite commission — what was made, the scope, and the deliverable.]
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.6 }}
                            className="flex flex-wrap gap-4 mt-10 justify-center md:justify-start"
                        >
                            <MagneticWrapper>
                                <button
                                    onClick={() => document.getElementById('body')?.scrollIntoView({ behavior: 'smooth' })}
                                    className={`${pixelify.className} px-6 py-3 border border-black/20 rounded text-gray-800 text-base tracking-wide uppercase hover:bg-black/5 transition-colors`}
                                >
                                    View Project
                                </button>
                            </MagneticWrapper>
                            <MagneticWrapper>
                                <button
                                    onClick={() => document.getElementById('video')?.scrollIntoView({ behavior: 'smooth' })}
                                    className={`${pixelify.className} px-6 py-3 bg-gray-900 rounded text-white text-base tracking-wide uppercase hover:bg-gray-800 transition-colors`}
                                >
                                    Watch Video
                                </button>
                            </MagneticWrapper>
                        </motion.div>
                    </div>
                </GridContainer>
            </section>

            {/* Preview Section */}
            <section className="relative w-full pb-6 md:pb-8">
                <GridContainer>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="aspect-video w-full bg-white rounded-2xl flex items-center justify-center">
                            <span className={`${roboto.className} text-black/30 italic`}>
                                [Placeholder: hero image or video]
                            </span>
                        </div>
                        <span className={`${roboto.className} text-black/35 text-sm md:text-base mt-5 block text-center italic`}>
                            [Placeholder: caption]
                        </span>
                    </motion.div>
                </GridContainer>
            </section>

            <SectionDivider />

            {/* Premise */}
            <section id="body" className="relative py-12 md:py-20">
                <GridContainer>
                    <AnimatedSection className="md:ml-[20%] md:w-[50%]">
                        <motion.span
                            variants={fadeInUp}
                            className={`${pixelify.className} text-blue-500 text-2xl md:text-3xl tracking-wide uppercase`}
                        >
                            Premise
                        </motion.span>

                        <motion.p
                            variants={fadeInUp}
                            className={`${roboto.className} text-black/80 font-light text-lg md:text-xl leading-relaxed mt-4`}
                        >
                            [Placeholder: brief description of the commission — the client relationship, the goal, and the creative direction.]
                        </motion.p>

                        <motion.p
                            variants={fadeInUp}
                            className={`${roboto.className} text-black/80 font-light text-lg md:text-xl leading-relaxed mt-6`}
                        >
                            [Placeholder: second paragraph expanding on the approach or constraints.]
                        </motion.p>
                    </AnimatedSection>
                </GridContainer>
            </section>

            <SectionDivider />

            {/* Pull Quote */}
            <section className="relative py-16 md:py-24 bg-gray-200">
                <GridContainer>
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="md:w-[60%] mx-auto"
                    >
                        <div className="border-l-2 border-blue-500 pl-6 md:pl-8">
                            <span className={`${roboto.className} text-gray-800 text-2xl md:text-3xl font-light leading-relaxed`}>
                                [Placeholder: pull quote — a key insight or creative philosophy from the project.]
                            </span>
                            <span className={`${roboto.className} text-black/50 text-base block mt-4`}>
                                [Placeholder: attribution or supporting context.]
                            </span>
                        </div>
                    </motion.div>
                </GridContainer>
            </section>

            <SectionDivider />

            {/* Process */}
            <section className="relative py-12 md:py-20">
                <GridContainer>
                    <AnimatedSection className="md:ml-[20%] md:w-[50%]">
                        <motion.span
                            variants={fadeInUp}
                            className={`${pixelify.className} text-blue-500 text-2xl md:text-3xl tracking-wide uppercase`}
                        >
                            Process
                        </motion.span>

                        <motion.p
                            variants={fadeInUp}
                            className={`${roboto.className} text-black/80 font-light text-lg md:text-xl leading-relaxed mt-4`}
                        >
                            [Placeholder: description of the creative process — tools, iterations, collaboration with the client.]
                        </motion.p>

                        <motion.p
                            variants={fadeInUp}
                            className={`${roboto.className} text-black/80 font-light text-lg md:text-xl leading-relaxed mt-6`}
                        >
                            [Placeholder: second paragraph on challenges or breakthroughs during production.]
                        </motion.p>
                    </AnimatedSection>
                </GridContainer>
            </section>

            <SectionDivider />

            {/* Deliverables */}
            <section className="relative py-12 md:py-20">
                <GridContainer>
                    <AnimatedSection className="md:ml-[20%] md:w-[50%]">
                        <motion.span
                            variants={fadeInUp}
                            className={`${pixelify.className} text-blue-500 text-2xl md:text-3xl tracking-wide uppercase`}
                        >
                            Deliverables
                        </motion.span>

                        <motion.p
                            variants={fadeInUp}
                            className={`${roboto.className} text-black/80 font-light text-lg md:text-xl leading-relaxed mt-4`}
                        >
                            [Placeholder: description of final deliverables — what was handed off, reception, impact.]
                        </motion.p>
                    </AnimatedSection>
                </GridContainer>

                {/* Final Video */}
                <GridContainer className="mt-12 md:mt-16" id="video">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="w-full"
                    >
                        <div className="aspect-video w-full bg-white rounded-2xl flex items-center justify-center">
                            <span className={`${roboto.className} text-black/30 italic`}>
                                [Placeholder: final video]
                            </span>
                        </div>
                        <span className={`${roboto.className} text-black/35 text-sm md:text-base mt-5 block text-center italic`}>
                            [Placeholder: caption]
                        </span>
                    </motion.div>
                </GridContainer>

                {/* Reception */}
                <GridContainer className="mt-16 md:mt-24">
                    <AnimatedSection className="md:ml-[20%] md:w-[50%]">
                        <motion.p
                            variants={fadeInUp}
                            className={`${roboto.className} text-black/80 font-light text-lg md:text-xl leading-relaxed`}
                        >
                            [Placeholder: reception and impact — views, engagement, client feedback.]
                        </motion.p>

                        <motion.p
                            variants={fadeInUp}
                            className={`${roboto.className} text-black/80 font-light text-lg md:text-xl leading-relaxed mt-6`}
                        >
                            [Placeholder: personal reflection on the project — what was learned, what would be done differently.]
                        </motion.p>
                    </AnimatedSection>
                </GridContainer>
            </section>
        </main>
    )
}

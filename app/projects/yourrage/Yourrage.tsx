"use client";
import { pixelify, roboto } from "@/app/ui/fonts"
import { useRef } from "react";
import { Video } from "lucide-react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { MagneticWrapper } from "@/components/MagneticButton";
import ProjectMetrics from "@/components/ProjectMetrics";

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

export default function Rage() {
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
                            stream intro for
                            <br />
                            <span className="text-blue-500 italic">{`"yourrage"`}</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className={`${roboto.className} text-black/50 font-light text-lg md:text-xl mt-6 leading-relaxed`}
                        >
                            {`Streamer animation created for "YourRage", a Twitch streamer with over 3M followers.`}
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
                                    className={`${pixelify.className} px-6 py-3 bg-gray-900 rounded text-white text-base tracking-wide uppercase hover:bg-gray-800 transition-colors flex items-center gap-2`}
                                >
                                    <Video className="w-4 h-4" />
                                    Watch Video
                                </button>
                            </MagneticWrapper>
                        </motion.div>
                    </div>
                </GridContainer>

            </section>

            <ProjectMetrics metrics={[
                { label: "Timeline", value: "3 Months" },
                { label: "Role", value: "3D Animator \u00B7 Director" },
                { label: "For", value: "YourRage" },
                { label: "Reach", value: "20K+ Live Viewers" },
            ]} />

            {/* Hero Character Image */}
            <section className="relative w-full pb-16 md:pb-24">
                <GridContainer>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="md:w-[60%] mx-auto"
                    >
                        <div className="overflow-hidden bg-white p-4 md:p-6 rounded-2xl">
                            <Image
                                src="/projects/yourrage/character.jpg"
                                alt="Character Sheet"
                                width={600}
                                height={600}
                                className="w-full h-auto rounded-xl"
                            />
                        </div>
                        <span className={`${roboto.className} text-black/35 text-sm md:text-base mt-5 block text-center italic`}>
                            {`Original render shots for "yourrage" character`}
                        </span>
                    </motion.div>
                </GridContainer>
            </section>

            <SectionDivider />

            {/* Main Content */}
            <section id="body" className="relative py-12 md:py-20">
                {/* Section 1: Scope */}
                <GridContainer>
                    <AnimatedSection className="md:ml-[20%] md:w-[50%]">
                        <motion.span
                            variants={fadeInUp}
                            className={`${pixelify.className} text-blue-500 text-2xl md:text-3xl tracking-wide uppercase`}
                        >
                            Scope
                        </motion.span>

                        <motion.p
                            variants={fadeInUp}
                            className={`${roboto.className} text-black/80 font-light text-lg md:text-xl leading-relaxed mt-4`}
                        >
                            I had actually reached out to YourRage personally for this opportunity,
                            being a fan of his content and wanting to make something I felt could leave my mark with his community of over 3 million.
                        </motion.p>

                        <motion.p
                            variants={fadeInUp}
                            className={`${roboto.className} text-black/80 font-light text-lg md:text-xl leading-relaxed mt-6`}
                        >
                            Not only did I need to do an amazing job, I needed to prove value to both him and his community.
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
                                {`His chat is fast and hyper aware. They exist through pivotal moments and inside jokes.`}
                            </span>
                            <span className={`${roboto.className} text-black/50 text-base block mt-4`}>
                                As someone on the inside, I was able to leverage this to set the theme for the piece.
                            </span>
                        </div>
                    </motion.div>
                </GridContainer>
            </section>

            <SectionDivider />

            {/* Continued Content */}
            <section className="relative py-12 md:py-20">
                <GridContainer>
                    <AnimatedSection className="md:ml-[20%] md:w-[50%]">
                        <motion.p
                            variants={fadeInUp}
                            className={`${roboto.className} text-black/80 font-light text-lg md:text-xl leading-relaxed`}
                        >
                            {`For his character, mechanical legs reference a background in knee surgery he constantly jokes about on his stream. Setting the scene in an industrial space adds immersion to this effect.`}
                        </motion.p>

                        <motion.p
                            variants={fadeInUp}
                            className={`${roboto.className} text-black/80 font-light text-lg md:text-xl leading-relaxed mt-6`}
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
                        className="md:w-[60%] mx-auto"
                    >
                        <div className="overflow-hidden bg-white p-4 md:p-6 rounded-2xl">
                            <Image
                                src="/projects/yourrage/motionreference.gif"
                                alt="Motion Reference"
                                width={600}
                                height={400}
                                className="w-full h-auto rounded-xl"
                            />
                        </div>
                        <span className={`${roboto.className} text-black/35 text-sm md:text-base mt-5 block text-center italic`}>
                            Action pacing reference - image credit: Pinterest
                        </span>
                    </motion.div>
                </GridContainer>
            </section>

            <SectionDivider />

            {/* Section 2: Reception */}
            <section className="relative py-12 md:py-20">
                <GridContainer>
                    <AnimatedSection className="md:ml-[20%] md:w-[50%]">
                        <motion.span
                            variants={fadeInUp}
                            className={`${pixelify.className} text-blue-500 text-2xl md:text-3xl tracking-wide uppercase`}
                        >
                            Reception
                        </motion.span>

                        <motion.p
                            variants={fadeInUp}
                            className={`${roboto.className} text-black/80 font-light text-lg md:text-xl leading-relaxed mt-4`}
                        >
                            Twitch is a platform molded by timing, not explanation.
                            The job was to meet the audience where they were, speak their language, and leave them ready for more.
                        </motion.p>

                        <motion.p
                            variants={fadeInUp}
                            className={`${roboto.className} text-black/80 font-light text-lg md:text-xl leading-relaxed mt-6`}
                        >
                            {`Seen by over 20K live viewers on launch, it was incredible seeing the community (and Rage's) initial reaction, and constantly getting to live in that moment with them.`}
                        </motion.p>
                    </AnimatedSection>
                </GridContainer>

                {/* Final Video */}
                <GridContainer id="video" className="mt-12 md:mt-16">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="w-full"
                    >
                        <div className="overflow-hidden rounded-2xl">
                            <video
                                className="aspect-video w-full"
                                src="/projects/yourrage/ragelowq.mp4"
                                controls
                            />
                        </div>
                        <span className={`${roboto.className} text-black/35 text-sm md:text-base mt-5 block text-center italic`}>
                            Final rendered animation
                        </span>
                    </motion.div>
                </GridContainer>
            </section>
        </main>
    )
}

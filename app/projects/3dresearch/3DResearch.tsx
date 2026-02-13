"use client";
import { pixelify, roboto } from "@/app/ui/fonts"
import { useState, useRef } from "react";
import { Video } from "lucide-react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import {
    HorizontalBarChart,
    VerticalBarChart,
    DonutChart,
    researchChartData
} from "@/components/Charts";

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

// Chart container with glass effect
function ChartContainer({ children, className = "" }: { children: React.ReactNode; className?: string }) {
    return (
        <div className={`bg-white/5 backdrop-blur-sm p-4 md:p-6 rounded-lg border border-white/5 ${className}`}>
            {children}
        </div>
    );
}

export default function D3Project() {
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
                    <div className="md:w-[60%] lg:w-[45%] md:ml-[20%]">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className={`${pixelify.className} text-5xl md:text-6xl lg:text-7xl text-white leading-tight`}
                        >
                            the independent
                            <br />
                            <span className="text-blue-400 italic">3d artist</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className={`${roboto.className} text-white/70 font-light text-lg md:text-xl mt-6 leading-relaxed`}
                        >
                            A qualitative UX Research study exploring the nature of creative work in an online economy.
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
                                Watch Documentary
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
                                src="/projects/3dresearch/mocpressed.mp4"
                                controls
                                autoPlay
                            />
                        </div>
                    </div>
                )}
            </section>

            {/* Hero Video Preview */}
            <section className="relative w-full pb-16 md:pb-24">
                <GridContainer>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="md:ml-[20%] md:w-[65%]"
                    >
                        <div className="overflow-hidden">
                            <video
                                src="/projects/3dresearch/biiboccvid2.mp4"
                                autoPlay loop muted playsInline
                                className="w-full h-auto"
                            />
                        </div>
                        <span className={`${roboto.className} text-white/40 text-sm md:text-base mt-3 block`}>
                            Expression of creativity - video credit: @biibocc on Instagram
                        </span>
                    </motion.div>
                </GridContainer>
            </section>

            {/* Main Content */}
            <section id="body" className="relative py-12 md:py-20">
                {/* Section 1: Framing */}
                <GridContainer>
                    <AnimatedSection className="md:ml-[20%] md:w-[50%]">
                        <motion.span
                            variants={fadeInUp}
                            className={`${roboto.className} text-blue-400 text-base md:text-lg tracking-wide`}
                        >
                            Framing
                        </motion.span>

                        <motion.p
                            variants={fadeInUp}
                            className={`${roboto.className} text-white/80 font-light text-lg md:text-xl leading-relaxed mt-4`}
                        >
                            {`What does "freedom" actually look like for independent artists once it becomes their livelihood?`}
                        </motion.p>

                        <motion.p
                            variants={fadeInUp}
                            className={`${roboto.className} text-white/80 font-light text-lg md:text-xl leading-relaxed mt-6`}
                        >
                            This central question was the driving component for the entire study.
                            From this a number of secondary themes emerged; platform dependence, the emergence of AI, {`"impostor syndrome"`}, and sustainability.
                        </motion.p>

                        <motion.p
                            variants={fadeInUp}
                            className={`${roboto.className} text-white/80 font-light text-lg md:text-xl leading-relaxed mt-6`}
                        >
                            To answer this, interview questions were designed to feel open.
                            Rather than leading participants to a presupposed narrative, these prompts focused on their lived experience.
                        </motion.p>
                    </AnimatedSection>
                </GridContainer>
            </section>

            {/* Section 2: Methodology */}
            <section className="relative py-12 md:py-20">
                <GridContainer>
                    <AnimatedSection className="md:ml-[20%] md:w-[50%]">
                        <motion.span
                            variants={fadeInUp}
                            className={`${roboto.className} text-blue-400 text-base md:text-lg tracking-wide`}
                        >
                            Methodology
                        </motion.span>

                        <motion.p
                            variants={fadeInUp}
                            className={`${roboto.className} text-white/80 font-light text-lg md:text-xl leading-relaxed mt-4`}
                        >
                            Two separate interview formats were conducted to capture the picture on both a micro and macro level:
                        </motion.p>
                    </AnimatedSection>
                </GridContainer>

                {/* Callout boxes */}
                <GridContainer className="mt-12 md:mt-16">
                    <div className="md:ml-[20%] md:w-[60%] flex flex-col gap-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="border-l-2 border-blue-400 pl-6 md:pl-8"
                        >
                            <span className={`${pixelify.className} text-white text-lg md:text-xl`}>focused, in-person interview</span>
                            <p className={`${roboto.className} mt-4 text-white/70 text-base md:text-lg font-light leading-relaxed`}>
                                {`An extensive observational interview with visual artist "Oseanworld."
                                Focuses on his journey into 3D art, motivations, and daily routine.`}
                            </p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="border-l-2 border-blue-400 pl-6 md:pl-8"
                        >
                            <span className={`${pixelify.className} text-white text-lg md:text-xl`}>remote interview panel</span>
                            <p className={`${roboto.className} mt-4 text-white/70 text-base md:text-lg font-light leading-relaxed`}>
                                A series of video calls with independent artists encompassing a broad range of
                                backgrounds and niches. Financial stability, expectations, platform usability.
                            </p>
                        </motion.div>
                    </div>
                </GridContainer>

                {/* Theme Distribution Chart */}
                <GridContainer className="mt-12 md:mt-16">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="md:ml-[20%] md:w-[60%]"
                    >
                        <ChartContainer className="flex justify-center">
                            <DonutChart
                                data={researchChartData.interviewThemes}
                                title="Theme Distribution"
                                size={220}
                            />
                        </ChartContainer>
                        <span className={`${roboto.className} text-white/40 text-sm md:text-base mt-3 block`}>
                            Distribution of themes across all interview sessions
                        </span>
                    </motion.div>
                </GridContainer>
            </section>

            {/* Section 3: Human Needs */}
            <section className="relative py-12 md:py-20">
                <GridContainer>
                    <AnimatedSection className="md:ml-[20%] md:w-[50%]">
                        <motion.span
                            variants={fadeInUp}
                            className={`${roboto.className} text-blue-400 text-base md:text-lg tracking-wide`}
                        >
                            Human Needs
                        </motion.span>

                        <motion.p
                            variants={fadeInUp}
                            className={`${roboto.className} text-white/80 font-light text-lg md:text-xl leading-relaxed mt-4`}
                        >
                            Across both formats, several consistent themes emerged:
                        </motion.p>
                    </AnimatedSection>
                </GridContainer>

                {/* Artist Concerns Chart */}
                <GridContainer className="mt-12 md:mt-16">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="md:ml-[20%] md:w-[60%]"
                    >
                        <ChartContainer>
                            <h3 className={`${pixelify.className} text-white/70 text-xl md:text-2xl mb-6`}>
                                artist concerns by frequency
                            </h3>
                            <HorizontalBarChart
                                data={researchChartData.artistConcerns}
                                showLabels={true}
                            />
                        </ChartContainer>
                        <span className={`${roboto.className} text-white/40 text-sm md:text-base mt-3 block`}>
                            Most frequently mentioned concerns across interviews
                        </span>
                    </motion.div>
                </GridContainer>

                {/* Theme breakdowns */}
                <GridContainer className="mt-16 md:mt-24">
                    <div className="md:ml-[20%] md:w-[50%] flex flex-col gap-12">
                        <AnimatedSection>
                            <motion.span
                                variants={fadeInUp}
                                className={`${pixelify.className} text-white text-lg md:text-xl`}
                            >
                                freedom vs. stability
                            </motion.span>
                            <motion.p
                                variants={fadeInUp}
                                className={`${roboto.className} mt-4 text-white/70 text-base md:text-lg font-light leading-relaxed`}
                            >
                                Artists describe the freedom provided through freelance as liberating,
                                but acknowledge unpredictability and instability of financial status.
                            </motion.p>
                        </AnimatedSection>

                        <AnimatedSection>
                            <motion.span
                                variants={fadeInUp}
                                className={`${pixelify.className} text-white text-lg md:text-xl`}
                            >
                                self-doubt vs. output
                            </motion.span>
                            <motion.p
                                variants={fadeInUp}
                                className={`${roboto.className} mt-4 text-white/70 text-base md:text-lg font-light leading-relaxed`}
                            >
                                {`Impostor syndrome was a big theme throughout the interviews.
                                Posting content makes you feel inferior, but that inferiority is only subsided through validation of that same content.`}
                            </motion.p>
                        </AnimatedSection>

                        <AnimatedSection>
                            <motion.span
                                variants={fadeInUp}
                                className={`${pixelify.className} text-white text-lg md:text-xl`}
                            >
                                technology: not an enemy or saviour
                            </motion.span>
                            <motion.p
                                variants={fadeInUp}
                                className={`${roboto.className} mt-4 text-white/70 text-base md:text-lg font-light leading-relaxed`}
                            >
                                While Blender is celebrated for its capability and accessibility, tools like A.I. are seen as emotionally empty.
                                A.I. is not seen as a large threat, and has the potential to be reformed into a tool.
                            </motion.p>
                        </AnimatedSection>
                    </div>
                </GridContainer>

                {/* Additional Charts */}
                <GridContainer className="mt-12 md:mt-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:ml-[20%] md:w-[60%]">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <ChartContainer>
                                <h3 className={`${pixelify.className} text-white/70 text-lg mb-6`}>
                                    freedom vs stability
                                </h3>
                                <VerticalBarChart
                                    data={researchChartData.freedomStability}
                                    showLabels={true}
                                />
                            </ChartContainer>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                        >
                            <ChartContainer>
                                <h3 className={`${pixelify.className} text-white/70 text-lg mb-6`}>
                                    technology perception
                                </h3>
                                <HorizontalBarChart
                                    data={researchChartData.techPerception}
                                    showLabels={true}
                                />
                            </ChartContainer>
                        </motion.div>
                    </div>
                </GridContainer>

                {/* Maslow's Hierarchy */}
                <GridContainer className="mt-16 md:mt-24">
                    <AnimatedSection className="md:ml-[20%] md:w-[50%]">
                        <motion.p
                            variants={fadeInUp}
                            className={`${roboto.className} text-white/80 font-light text-lg md:text-xl leading-relaxed`}
                        >
                            {`To better materialize these findings we can observe them using Maslow's hierarchy of needs, interpreted through the lens of creative labor.`}
                        </motion.p>
                    </AnimatedSection>
                </GridContainer>

                <GridContainer className="mt-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="md:ml-[20%] md:w-[60%]"
                    >
                        <div className="overflow-hidden bg-white/5 p-4 md:p-6 rounded-lg inline-block">
                            <Image
                                src="/projects/3dresearch/maslows.png"
                                alt="Maslow's Hierarchy Contextualized"
                                className="rounded-md"
                                width={490}
                                height={490}
                            />
                        </div>
                        <span className={`${roboto.className} text-white/40 text-sm md:text-base mt-3 block`}>
                            {`Maslow's hierarchy of needs contextualized`}
                        </span>
                    </motion.div>
                </GridContainer>
            </section>

            {/* Section 4: Impact */}
            <section className="relative py-12 md:py-20">
                <GridContainer>
                    <AnimatedSection className="md:ml-[20%] md:w-[50%]">
                        <motion.span
                            variants={fadeInUp}
                            className={`${roboto.className} text-blue-400 text-base md:text-lg tracking-wide`}
                        >
                            Impact
                        </motion.span>

                        <motion.p
                            variants={fadeInUp}
                            className={`${roboto.className} text-white/80 font-light text-lg md:text-xl leading-relaxed mt-4`}
                        >
                            This study is an anchor in human continuity.
                            The people behind the output and the platform. It demonstrates:
                        </motion.p>

                        <motion.ul
                            variants={staggerContainer}
                            className="flex flex-col gap-3 md:gap-4 mt-6"
                        >
                            {[
                                "Qualitative research planning",
                                "Interview design",
                                "Organization of large, unstructured data",
                                "Translation of research into narrative"
                            ].map((item, index) => (
                                <motion.li
                                    key={index}
                                    variants={fadeInUp}
                                    className={`${roboto.className} text-white/80 text-lg md:text-xl font-light flex items-center gap-3`}
                                >
                                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full flex-shrink-0"></span>
                                    {item}
                                </motion.li>
                            ))}
                        </motion.ul>
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
                                {`It didn't aim to "solve a problem", because their lives are not problems to be solved.`}
                            </span>
                            <span className={`${roboto.className} text-white/50 text-base block mt-4`}>
                                Rather than resolving the tension, it gives it space to exist honestly.
                            </span>
                        </div>
                    </motion.div>
                </GridContainer>

                {/* Final Video */}
                <GridContainer>
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
                                src="/projects/3dresearch/mocpressed.mp4"
                                controls
                            />
                        </div>
                        <span className={`${roboto.className} text-white/40 text-sm md:text-base mt-3 block`}>
                            Final rendered documentary
                        </span>
                    </motion.div>
                </GridContainer>
            </section>
        </main>
    )
}

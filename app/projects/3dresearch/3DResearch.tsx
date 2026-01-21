"use client";
import { pixelify, roboto } from "@/app/ui/fonts"
import MagneticButton from "@/components/MagneticButton";
import { useState, useRef } from "react";
import { Video, ChevronDown } from "lucide-react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import {
    HorizontalBarChart,
    VerticalBarChart,
    DonutChart,
    researchChartData
} from "@/components/Charts";
import ProjectSummary from "@/components/ProjectSummary";

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

function ChartContainer({ children, className = "" }: { children: React.ReactNode; className?: string }) {
    return (
        <div className={`bg-white/10 backdrop-blur-sm p-4 md:p-6 rounded-xl border border-white/5 ${className}`}>
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
                            the independent 3d artist
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className={`${roboto.className} text-white/80 font-light text-lg md:text-xl lg:text-2xl md:max-w-2xl leading-relaxed`}
                        >
                            A qualitative UX Research study exploring the nature of creative work in an online economy.
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
                                        src="/projects/3dresearch/mocpressed.mp4"
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

                    {/* Section 1: Framing */}
                    <AnimatedSection className="flex flex-col gap-8 md:gap-12">
                        <motion.div variants={fadeInUp}>
                            <h2 className={`${pixelify.className} text-white text-2xl md:text-3xl lg:text-4xl mb-6`}>
                                framing.
                            </h2>
                            <p className={`${roboto.className} text-white/80 text-base md:text-xl lg:text-2xl font-light leading-relaxed`}>
                                {`What does "freedom" actually look like for independent artists once it becomes their livelihood?`}
                            </p>
                        </motion.div>

                        <motion.div variants={fadeInUp}>
                            <div className="flex relative overflow-hidden bg-white/10 p-2 md:p-[1vw] rounded-lg">
                                <video
                                    className="h-full w-auto z-50 rounded-md"
                                    src="/projects/3dresearch/biiboccvid2.mp4"
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                />
                            </div>
                            <div className={`${roboto.className} text-white/40 text-center mt-2 italic text-sm md:text-base`}>
                                expression of creativity. video credit - @biibocc on Instagram
                            </div>
                        </motion.div>

                        <motion.div variants={fadeInUp}>
                            <p className={`${roboto.className} text-white/80 text-base md:text-xl lg:text-2xl font-light leading-relaxed`}>
                                This central question was the driving component for the entire study.
                                From this a number of secondary themes emerged; platform dependence, the emergence of AI, {`"impostor syndrome"`}, and sustainability.
                                This became a question of human need, framed through the lens of multiple talented individuals.
                            </p>
                        </motion.div>

                        <motion.div variants={fadeInUp}>
                            <p className={`${roboto.className} text-white/80 text-base md:text-xl lg:text-2xl font-light leading-relaxed`}>
                                To answer this, interview questions were designed to feel open.
                                Rather than leading participants to a presupposed narrative, these prompts focused on their lived experience, and allowed them to
                                showcase it in the way that properly represented them.
                            </p>
                        </motion.div>
                    </AnimatedSection>

                    {/* Section 2: Methodology */}
                    <AnimatedSection className="flex flex-col gap-8 md:gap-12">
                        <motion.div variants={fadeInUp}>
                            <h2 className={`${pixelify.className} text-white text-2xl md:text-3xl lg:text-4xl mb-6`}>
                                methodology.
                            </h2>
                            <p className={`${roboto.className} text-white/80 text-base md:text-xl lg:text-2xl font-light leading-relaxed`}>
                                Two separate interview formats were conducted to capture the picture on both a micro and macro level:
                            </p>
                        </motion.div>

                        <motion.div variants={fadeInUp} className="flex flex-col gap-6">
                            <div className="bg-gradient-to-r from-blue-500/20 to-transparent p-6 rounded-xl border-l-4 border-blue-500">
                                <p className={`${pixelify.className} text-white text-lg md:text-xl font-light`}>focused, in-person interview</p>
                                <p className={`${roboto.className} mt-4 text-white/80 text-base md:text-xl font-light leading-relaxed`}>
                                    {`An extensive observational interview with visual artist "Oseanworld."
                                    Focuses on his journey into 3D art, motivations, and daily routine. This soft, more intimate presentation leads the video off with a feeling of comfort.`}
                                </p>
                            </div>
                            <div className="bg-gradient-to-r from-blue-500/20 to-transparent p-6 rounded-xl border-l-4 border-blue-500">
                                <p className={`${pixelify.className} text-white text-lg md:text-xl font-light`}>remote interview panel</p>
                                <p className={`${roboto.className} mt-4 text-white/80 text-base md:text-xl font-light leading-relaxed`}>
                                    A series of video calls with independent artists encompassing a broad range of
                                    backgrounds and niches. These conversations focused on their shared experience as independent artists. Financial stability, expectations, platform usability,
                                    and the overall broader state of the social media landscape.
                                </p>
                            </div>
                        </motion.div>

                        {/* Interview Themes Chart */}
                        <motion.div variants={fadeInUp}>
                            <ChartContainer className="flex justify-center">
                                <DonutChart
                                    data={researchChartData.interviewThemes}
                                    title="Theme Distribution"
                                    size={220}
                                />
                            </ChartContainer>
                            <div className={`${roboto.className} text-white/40 text-center mt-3 italic text-sm md:text-base`}>
                                distribution of themes across all interview sessions.
                            </div>
                        </motion.div>
                    </AnimatedSection>

                    {/* Section 3: Interpreting Human Needs */}
                    <AnimatedSection className="flex flex-col gap-8 md:gap-12">
                        <motion.div variants={fadeInUp}>
                            <h2 className={`${pixelify.className} text-white text-2xl md:text-3xl lg:text-4xl mb-6`}>
                                interpreting human needs.
                            </h2>
                            <p className={`${roboto.className} text-white/80 text-base md:text-xl lg:text-2xl font-light leading-relaxed`}>
                                Across both formats, several consistent themes emerged:
                            </p>
                        </motion.div>

                        {/* Artist Concerns Chart */}
                        <motion.div variants={fadeInUp}>
                            <ChartContainer>
                                <h3 className={`${pixelify.className} text-white/70 text-lg md:text-xl mb-6 text-center`}>
                                    artist concerns by frequency
                                </h3>
                                <HorizontalBarChart
                                    data={researchChartData.artistConcerns}
                                    showLabels={true}
                                />
                            </ChartContainer>
                            <div className={`${roboto.className} text-white/40 text-center mt-3 italic text-sm md:text-base`}>
                                most frequently mentioned concerns across interviews.
                            </div>
                        </motion.div>

                        <motion.div variants={fadeInUp} className="flex flex-col gap-6">
                            <div>
                                <p className={`${pixelify.className} text-white text-lg md:text-xl font-light`}>- freedom vs. stability</p>
                                <p className={`${roboto.className} mt-4 text-white/80 text-base md:text-xl font-light pl-6 leading-relaxed`}>
                                    Artists describe the freedom provided through freelance as liberating,
                                    but acknowledge unpredictability and instability of financial status.
                                </p>
                            </div>
                            <div>
                                <p className={`${pixelify.className} text-white text-lg md:text-xl font-light`}>- self-doubt vs. output</p>
                                <p className={`${roboto.className} mt-4 text-white/80 text-base md:text-xl font-light pl-6 leading-relaxed`}>
                                    {`Impostor syndrome was a big theme throughout the interviews.
                                    Posting content makes you feel inferior, but that inferiority is only subsided through validation of that same content. It's a toxic cycle
                                    that these artists perpetually exist under.`}
                                </p>
                            </div>
                            <div>
                                <p className={`${pixelify.className} text-white text-lg md:text-xl font-light`}>- technology: not an enemy or saviour</p>
                                <p className={`${roboto.className} mt-4 text-white/80 text-base md:text-xl font-light pl-6 leading-relaxed`}>
                                    While Blender (a 3D creation software) is celebrated for its
                                    capability and accessibility, tools like A.I. are seen as emotionally empty. Because of this, A.I. is not seen as a large threat, and has
                                    the potential to also be reformed into a tool to strengthen capability.
                                </p>
                            </div>
                        </motion.div>

                        {/* Freedom vs Stability Chart */}
                        <motion.div variants={fadeInUp}>
                            <ChartContainer>
                                <h3 className={`${pixelify.className} text-white/70 text-lg md:text-xl mb-6 text-center`}>
                                    freedom vs stability preference
                                </h3>
                                <VerticalBarChart
                                    data={researchChartData.freedomStability}
                                    showLabels={true}
                                />
                            </ChartContainer>
                            <div className={`${roboto.className} text-white/40 text-center mt-3 italic text-sm md:text-base`}>
                                where artists position themselves on the freedom-stability spectrum.
                            </div>
                        </motion.div>

                        {/* Technology Perception */}
                        <motion.div variants={fadeInUp}>
                            <ChartContainer>
                                <h3 className={`${pixelify.className} text-white/70 text-lg md:text-xl mb-6 text-center`}>
                                    technology perception (positive sentiment %)
                                </h3>
                                <HorizontalBarChart
                                    data={researchChartData.techPerception}
                                    showLabels={true}
                                />
                            </ChartContainer>
                            <div className={`${roboto.className} text-white/40 text-center mt-3 italic text-sm md:text-base`}>
                                how artists perceive different technologies in their workflow.
                            </div>
                        </motion.div>

                        <motion.div variants={fadeInUp}>
                            <p className={`${roboto.className} text-white/80 text-base md:text-xl lg:text-2xl font-light leading-relaxed`}>
                                Statements constantly juxtapose each other.
                                Later comments contradict earlier claims. The emotional investment these artists put into their career becomes clear through their response.
                                {` To better materialize these findings we can observe them using Maslow's hierarchy of needs, interpreted through the lens of creative labor.`}
                            </p>
                        </motion.div>

                        <motion.div variants={fadeInUp}>
                            <div className="flex relative overflow-hidden bg-white/10 p-2 md:p-[1vw] rounded-lg">
                                <Image
                                    src="/projects/3dresearch/maslows.png"
                                    alt="Maslow's Hierarchy Contextualized"
                                    className="rounded-md"
                                    width={700}
                                    height={700}
                                />
                            </div>
                            <div className={`${roboto.className} text-white/40 text-center mt-2 italic text-sm md:text-base`}>
                                {`maslow's hierarchy of needs contextualized.`}
                            </div>
                        </motion.div>
                    </AnimatedSection>

                    {/* Section 4: Why It Matters */}
                    <AnimatedSection className="flex flex-col gap-8 md:gap-12">
                        <motion.div variants={fadeInUp}>
                            <h2 className={`${pixelify.className} text-white text-2xl md:text-3xl lg:text-4xl mb-6`}>
                                why does it matter?
                            </h2>
                            <p className={`${roboto.className} text-white/80 text-base md:text-xl lg:text-2xl font-light leading-relaxed`}>
                                This study is an anchor in human continuity.
                                The people behind the output and the platform. Although delivered as a documentary, it fundamentally highlights understanding users within a system.
                                To that effect, it demonstrates:
                            </p>
                        </motion.div>

                        <motion.ul
                            variants={staggerContainer}
                            className="flex flex-col gap-3 md:gap-4 pl-4 md:pl-8"
                        >
                            {[
                                "Qualitative research planning",
                                "Interview design",
                                "Organization and utilization of large, unstructured data",
                                "Translation of research into a coherent narrative"
                            ].map((item, index) => (
                                <motion.li
                                    key={index}
                                    variants={fadeInUp}
                                    className={`${roboto.className} text-white/80 text-base md:text-xl lg:text-2xl font-light flex items-start gap-3`}
                                >
                                    <span className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-2 md:mt-3"></span>
                                    {item}
                                </motion.li>
                            ))}
                        </motion.ul>

                        <motion.div variants={fadeInUp}>
                            <p className={`${roboto.className} text-white/80 text-base md:text-xl lg:text-2xl font-light leading-relaxed`}>
                                {`It didn't aim to "solve a problem", because their lives are not problems to be solved.
                                Rather than resolving the tension of an independent artist, it gives it space to exist honestly.`}
                            </p>
                        </motion.div>

                        <motion.div variants={fadeInUp}>
                            <div className="flex relative overflow-hidden bg-white/10 p-2 md:p-[1vw] rounded-lg">
                                <video
                                    className="aspect-video w-full z-50 rounded-md"
                                    src="/projects/3dresearch/mocpressed.mp4"
                                    controls
                                />
                            </div>
                            <div className={`${roboto.className} text-white/40 text-center mt-2 italic text-sm md:text-base`}>
                                final rendered documentary.
                            </div>
                        </motion.div>

                        {/* Project Summary */}
                        <motion.div variants={fadeInUp} className="mt-8">
                            <ProjectSummary
                                items={[
                                    { label: "Method", value: "Qualitative Research" },
                                    { label: "Format", value: "Documentary" },
                                    { label: "Participants", value: "5 Artists" },
                                    { label: "Focus", value: "UX Research" }
                                ]}
                            />
                        </motion.div>
                    </AnimatedSection>
                </div>
            </section>
        </main>
    )
}

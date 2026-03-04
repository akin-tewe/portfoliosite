"use client";
import { pixelify, roboto } from "@/app/ui/fonts"
import { useRef } from "react";
import { Video } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { MagneticWrapper } from "@/components/MagneticButton";
import {
    HorizontalBarChart,
    VerticalBarChart,
    DonutChart,
    researchChartData
} from "@/components/Charts";
import MaslowHierarchy from "@/components/MaslowHierarchy";
import ProjectMetrics from "@/components/ProjectMetrics";
import CaseStudySidebar from "@/components/CaseStudySidebar";

const researchSections = [
    { id: 'framing', label: 'Framing' },
    { id: 'methodology', label: 'Methodology' },
    { id: 'human-needs', label: 'Human Needs' },
    { id: 'impact', label: 'Impact' },
    { id: 'video', label: 'Documentary' },
];

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
        <div id={id} className={`w-full max-w-[1000px] mx-auto px-8 ${className}`}>
            {children}
        </div>
    );
}

// Gradient divider between sections
function SectionDivider() {
    return (
        <div className="w-full max-w-[1000px] mx-auto px-8">
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

// Chart container
function ChartContainer({ children, className = "" }: { children: React.ReactNode; className?: string }) {
    return (
        <div className={`bg-gray-900/80 p-4 md:p-6 rounded-2xl border border-white/5 ${className}`}>
            {children}
        </div>
    );
}

export default function D3Project() {
    const heroRef = useRef(null);
    const isHeroInView = useInView(heroRef, { once: true });

    return (
        <main className="overflow-x-clip">
            {/* Hero Section */}
            <section
                ref={heroRef}
                className="relative w-full pt-32 md:pt-40 pb-16 md:pb-24 bg-[#fafafa]"
            >
                <GridContainer>
                    <div>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className={`${pixelify.className} text-4xl md:text-5xl lg:text-6xl text-gray-800 leading-tight`}
                        >
                            the independent
                            <br />
                            <span className="text-blue-500">3d artist</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className={`${roboto.className} text-black/50 font-light text-base md:text-lg lg:text-xl mt-6 leading-relaxed`}
                        >
                            A qualitative UX Research study exploring the nature of creative work in an online economy.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.6 }}
                            className="flex flex-wrap gap-4 mt-10 justify-center md:justify-start"
                        >
                            <MagneticWrapper>
                                <button
                                    onClick={() => document.getElementById('video')?.scrollIntoView({ behavior: 'smooth' })}
                                    className={`${pixelify.className} px-6 py-3 bg-gray-900 rounded text-white text-base tracking-wide uppercase hover:bg-gray-800 transition-colors flex items-center gap-2`}
                                >
                                    <Video className="w-4 h-4" />
                                    Watch Documentary
                                </button>
                            </MagneticWrapper>
                        </motion.div>
                    </div>
                </GridContainer>

            <ProjectMetrics metrics={[
                { label: "Role", value: "UX Researcher" },
                { label: "Type", value: "Qualitative Study" },
                { label: "Method", value: "In-Person · Remote Interviews" },
                { label: "Output", value: "Research Report · Documentary" },
            ]} />
            </section>

            <div className="lg:grid lg:grid-cols-[200px_minmax(0,1fr)]">
                <CaseStudySidebar sections={researchSections} />
                <div className="lg:-translate-x-[100px]">

            {/* Hero Video Preview */}
            <section className="relative w-full pt-6 md:pt-10 pb-16 md:pb-24">
                <GridContainer>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className=""
                    >
                        <div className="overflow-hidden rounded-2xl">
                            <video
                                src="/projects/3dresearch/biiboccvid2.mp4"
                                autoPlay loop muted playsInline
                                className="w-full h-auto"
                            />
                        </div>
                        <span className={`${roboto.className} text-black/35 text-sm mt-5 block text-center italic`}>
                            Expression of creativity - video credit: @biibocc on Instagram
                        </span>
                    </motion.div>
                </GridContainer>
            </section>

            <SectionDivider />

            {/* Section 1: Framing */}
            <section id="framing" className="relative py-12 md:py-20">
                <GridContainer>
                    <AnimatedSection className="">
                        <motion.span
                            variants={fadeInUp}
                            className={`${roboto.className} text-sm md:text-base text-black/40 uppercase tracking-[0.2em] font-normal`}
                        >
                            Framing
                        </motion.span>

                        <motion.p
                            variants={fadeInUp}
                            className={`${roboto.className} text-black/80 font-light text-base md:text-lg leading-relaxed mt-4 italic`}
                        >
                            {`What does "freedom" actually look like for independent artists once it becomes their livelihood?`}
                        </motion.p>

                        <motion.p
                            variants={fadeInUp}
                            className={`${roboto.className} text-black/80 font-light text-base md:text-lg leading-relaxed mt-6`}
                        >
                            {`This central question was the driving component for the entire study. From this a number of secondary themes emerged; platform dependence, the emergence of AI, "impostor syndrome", and sustainability. This became a question of human need, framed through the lens of multiple talented individuals.`}
                        </motion.p>

                        <motion.p
                            variants={fadeInUp}
                            className={`${roboto.className} text-black/80 font-light text-base md:text-lg leading-relaxed mt-6`}
                        >
                            {`To answer this, interview questions were designed to feel open. Rather than leading participants to a presupposed narrative, these prompts focused on their lived experience, and allowed them to showcase it in the way that properly represented them.`}
                        </motion.p>
                    </AnimatedSection>
                </GridContainer>
            </section>

            <SectionDivider />

            {/* Section 2: Methodology */}
            <section id="methodology" className="relative py-12 md:py-20">
                <GridContainer>
                    <AnimatedSection className="">
                        <motion.span
                            variants={fadeInUp}
                            className={`${roboto.className} text-sm md:text-base text-black/40 uppercase tracking-[0.2em] font-normal`}
                        >
                            Methodology
                        </motion.span>

                        <motion.p
                            variants={fadeInUp}
                            className={`${roboto.className} text-black/80 font-light text-base md:text-lg leading-relaxed mt-4`}
                        >
                            Two separate interview formats were conducted to capture the picture on both a micro and macro level:
                        </motion.p>
                    </AnimatedSection>
                </GridContainer>

                {/* Callout boxes */}
                <GridContainer className="mt-12 md:mt-16">
                    <div className="flex flex-col gap-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="border-l-2 border-blue-500 pl-6 md:pl-8"
                        >
                            <span className={`${pixelify.className} text-gray-800 text-base md:text-lg`}>focused, in-person interview</span>
                            <p className={`${roboto.className} mt-4 text-black/70 text-sm md:text-base font-light leading-relaxed`}>
                                {`An extensive observational interview with visual artist "Oseanworld." Focuses on his journey into 3D art, motivations, and daily routine. This soft, more intimate presentation leads the video off with a feeling of comfort.`}
                            </p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="border-l-2 border-blue-500 pl-6 md:pl-8"
                        >
                            <span className={`${pixelify.className} text-gray-800 text-base md:text-lg`}>remote interview panel</span>
                            <p className={`${roboto.className} mt-4 text-black/70 text-sm md:text-base font-light leading-relaxed`}>
                                A series of video calls with independent artists encompassing a broad range of backgrounds and niches. These conversations focused on their shared experience as independent artists. Financial stability, expectations, platform usability, and the overall broader state of the social media landscape.
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
                        className=""
                    >
                        <ChartContainer className="flex justify-center">
                            <DonutChart
                                data={researchChartData.interviewThemes}
                                title="Theme Distribution"
                                size={220}
                                variant="dark"
                            />
                        </ChartContainer>
                        <span className={`${roboto.className} text-black/35 text-sm mt-5 block text-center italic`}>
                            Distribution of themes across all interview sessions
                        </span>
                    </motion.div>
                </GridContainer>
            </section>

            <SectionDivider />

            {/* Section 3: Human Needs */}
            <section id="human-needs" className="relative py-12 md:py-20">
                <GridContainer>
                    <AnimatedSection className="">
                        <motion.span
                            variants={fadeInUp}
                            className={`${roboto.className} text-sm md:text-base text-black/40 uppercase tracking-[0.2em] font-normal`}
                        >
                            Human Needs
                        </motion.span>

                        <motion.p
                            variants={fadeInUp}
                            className={`${roboto.className} text-black/80 font-light text-base md:text-lg leading-relaxed mt-4`}
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
                        className=""
                    >
                        <ChartContainer>
                            <h3 className={`${pixelify.className} text-white/70 text-lg md:text-xl mb-6`}>
                                artist concerns by frequency
                            </h3>
                            <HorizontalBarChart
                                data={researchChartData.artistConcerns}
                                showLabels={true}
                                variant="dark"
                            />
                        </ChartContainer>
                        <span className={`${roboto.className} text-black/35 text-sm mt-5 block text-center italic`}>
                            Most frequently mentioned concerns across interviews
                        </span>
                    </motion.div>
                </GridContainer>

                {/* Theme breakdowns */}
                <GridContainer className="mt-16 md:mt-24">
                    <div className="flex flex-col gap-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="border-l-2 border-blue-500 pl-6 md:pl-8"
                        >
                            <span className={`${pixelify.className} text-gray-800 text-base md:text-lg`}>
                                freedom vs. stability
                            </span>
                            <p className={`${roboto.className} mt-4 text-black/70 text-sm md:text-base font-light leading-relaxed`}>
                                Artists describe the freedom provided through freelance as liberating,
                                but acknowledge unpredictability and instability of financial status.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="border-l-2 border-blue-500 pl-6 md:pl-8"
                        >
                            <span className={`${pixelify.className} text-gray-800 text-base md:text-lg`}>
                                self-doubt vs. output
                            </span>
                            <p className={`${roboto.className} mt-4 text-black/70 text-sm md:text-base font-light leading-relaxed`}>
                                {`Impostor syndrome was a big theme throughout the interviews. Posting content makes you feel inferior, but that inferiority is only subsided through validation of that same content. It's a toxic cycle that these artists perpetually exist under.`}
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="border-l-2 border-blue-500 pl-6 md:pl-8"
                        >
                            <span className={`${pixelify.className} text-gray-800 text-base md:text-lg`}>
                                technology: not an enemy or saviour
                            </span>
                            <p className={`${roboto.className} mt-4 text-black/70 text-sm md:text-base font-light leading-relaxed`}>
                                {`While Blender (a 3D creation software) is celebrated for its capability and accessibility, tools like A.I. are seen as emotionally empty. Because of this, A.I. is not seen as a large threat, and has the potential to also be reformed into a tool to strengthen capability.`}
                            </p>
                        </motion.div>
                    </div>
                </GridContainer>

                {/* Additional Charts */}
                <GridContainer className="mt-12 md:mt-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="h-full"
                        >
                            <ChartContainer className="h-full">
                                <h3 className={`${pixelify.className} text-white/70 text-lg mb-6`}>
                                    freedom vs stability
                                </h3>
                                <VerticalBarChart
                                    data={researchChartData.freedomStability}
                                    showLabels={true}
                                    variant="dark"
                                />
                            </ChartContainer>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="h-full"
                        >
                            <ChartContainer className="h-full">
                                <h3 className={`${pixelify.className} text-white/70 text-lg mb-6`}>
                                    technology perception
                                </h3>
                                <HorizontalBarChart
                                    data={researchChartData.techPerception}
                                    showLabels={true}
                                    variant="dark"
                                />
                            </ChartContainer>
                        </motion.div>
                    </div>
                </GridContainer>

                {/* Maslow's Hierarchy */}
                <GridContainer className="mt-16 md:mt-24">
                    <AnimatedSection className="">
                        <motion.p
                            variants={fadeInUp}
                            className={`${roboto.className} text-black/80 font-light text-base md:text-lg leading-relaxed`}
                        >
                            {`Statements constantly juxtapose each other. Later comments contradict earlier claims. The emotional investment these artists put into their career becomes clear through their response. To better materialize these findings we can observe them using Maslow's hierarchy of needs, interpreted through the lens of creative labor.`}
                        </motion.p>
                    </AnimatedSection>
                </GridContainer>

                <GridContainer className="mt-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className=""
                    >
                        <MaslowHierarchy />
                        <span className={`${roboto.className} text-black/35 text-sm mt-5 block text-center italic`}>
                            {`Maslow's hierarchy of needs contextualized`}
                        </span>
                    </motion.div>
                </GridContainer>

                <GridContainer className="mt-8">
                    <AnimatedSection className="">
                        <motion.p
                            variants={fadeInUp}
                            className={`${roboto.className} text-black/80 font-light text-base md:text-lg leading-relaxed`}
                        >
                            This framework helps to contextualize responses without reducing them to generalizations.
                        </motion.p>
                    </AnimatedSection>
                </GridContainer>
            </section>

            <SectionDivider />

            {/* Section 4: Impact */}
            <section id="impact" className="relative py-12 md:py-20">
                <GridContainer>
                    <AnimatedSection className="">
                        <motion.span
                            variants={fadeInUp}
                            className={`${roboto.className} text-sm md:text-base text-black/40 uppercase tracking-[0.2em] font-normal`}
                        >
                            Impact
                        </motion.span>

                        <motion.p
                            variants={fadeInUp}
                            className={`${roboto.className} text-black/80 font-light text-base md:text-lg leading-relaxed mt-4`}
                        >
                            This study is an anchor in human continuity. The people behind the output and the platform. Although delivered as a documentary, it fundamentally highlights understanding users within a system. To that effect, it demonstrates:
                        </motion.p>

                        <motion.ul
                            variants={staggerContainer}
                            className="flex flex-col gap-3 md:gap-4 mt-6"
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
                                    className={`${roboto.className} text-black/80 text-base md:text-lg font-light flex items-center gap-3`}
                                >
                                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0"></span>
                                    {item}
                                </motion.li>
                            ))}
                        </motion.ul>
                    </AnimatedSection>
                </GridContainer>
            </section>

            <SectionDivider />

            {/* Pull Quote */}
            <section className="relative py-16 md:py-24 bg-[#fafafa]">
                <GridContainer>
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className=""
                    >
                        <div className="border-l-2 border-blue-500 pl-6 md:pl-8">
                            <span className={`${roboto.className} text-gray-800 text-xl md:text-2xl font-light leading-relaxed`}>
                                {`It didn't aim to "solve a problem", because their lives are not problems to be solved.`}
                            </span>
                            <span className={`${roboto.className} text-black/50 text-base block mt-4`}>
                                Rather than resolving the tension of an independent artist, it gives it space to exist honestly.
                            </span>
                        </div>
                    </motion.div>
                </GridContainer>
            </section>

            <SectionDivider />

            {/* Final Video */}
            <section className="relative py-12 md:py-20">
                <GridContainer id="video">
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
                                src="/projects/3dresearch/mocpressed.mp4"
                                controls
                            />
                        </div>
                        <span className={`${roboto.className} text-black/35 text-sm mt-5 block text-center italic`}>
                            Final rendered documentary
                        </span>
                    </motion.div>
                </GridContainer>
            </section>

                </div>
            </div>
        </main>
    )
}

"use client";
import { pixelify, roboto } from "@/app/ui/fonts"
import { useRef } from "react";
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
        <div id={id} className={`w-full max-w-[1000px] mx-auto px-5 md:px-8 ${className}`}>
            {children}
        </div>
    );
}

// Gradient divider between sections
function SectionDivider() {
    return (
        <div className="w-full max-w-[1000px] mx-auto px-5 md:px-8">
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

export default function AlbumCover() {
    const heroRef = useRef(null);
    const isHeroInView = useInView(heroRef, { once: true });

    return (
        <main className="overflow-x-hidden">
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
                            peaches and eggplants
                            <br />
                            <span className="text-blue-500">cover art design</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className={`${roboto.className} text-black/50 font-light text-base md:text-lg lg:text-xl mt-6 leading-relaxed`}
                        >
                            {`As star artists "Latto" (17M monthly Spotify listeners) and "Sexyy Red" (18M monthly listeners) were brought on to the remix of Young Nudy's
                            hit song, I was commissioned by Nudy's team to reinterpret the original cover.`}
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.6 }}
                            className="flex justify-center md:justify-start mt-10"
                        >
                            <MagneticWrapper>
                                <button
                                    onClick={() => document.getElementById('body')?.scrollIntoView({ behavior: 'smooth' })}
                                    className={`${pixelify.className} px-6 py-3 border border-black/20 rounded text-gray-800 text-base tracking-wide uppercase hover:bg-black/5 transition-colors`}
                                >
                                    View Project
                                </button>
                            </MagneticWrapper>
                        </motion.div>
                    </div>
                </GridContainer>
            </section>

            <ProjectMetrics metrics={[
                { label: "Timeline", value: "6 Hours" },
                { label: "Role", value: "Graphic Designer" },
                { label: "For", value: "Young Nudy · Sexyy Red · Latto" },
                { label: "Reach", value: "33M+ Streams on Spotify" },
            ]} />

            {/* Hero Image - Original Cover */}
            <section className="relative w-full pb-16 md:pb-24">
                <GridContainer>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className=""
                    >
                        <div className="overflow-hidden rounded-2xl">
                            <Image
                                src="/projects/albumcover/originalcover.jpg"
                                alt="Original Album Cover"
                                width={600}
                                height={600}
                                className="w-full h-auto"
                            />
                        </div>
                        <span className={`${roboto.className} text-black/35 text-sm mt-5 block text-center italic`}>
                            {`"Peaches and Eggplants" by Young Nudy - original cover art`}
                        </span>
                    </motion.div>
                </GridContainer>
            </section>

            <SectionDivider />

            {/* Main Content */}
            <section id="body" className="relative py-12 md:py-20">
                {/* Section 1: Context */}
                <GridContainer>
                    <AnimatedSection className="">
                        <motion.span
                            variants={fadeInUp}
                            className={`${pixelify.className} text-gray-800 text-xl md:text-2xl lg:text-3xl tracking-wide uppercase`}
                        >
                            Context
                        </motion.span>

                        <motion.p
                            variants={fadeInUp}
                            className={`${roboto.className} text-black/80 font-light text-base md:text-lg leading-relaxed mt-4`}
                        >
                            6 short hours. This was all the time provided to make this happen. Something not unusual to the music industry but entirely unusual to my regular process. I had to rethink how I design entirely. Instead of broad stylistic changes and innovation, the focus was on precise, high impact additions that respectfully leave their mark.
                        </motion.p>
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
                                {`The original cover was a still-life composition built around indulgence: food, money, guns, and overt luxury.`}
                            </span>
                            <span className={`${roboto.className} text-black/50 text-base block mt-4`}>
                                Safe to say it would not be a light challenge introducing new elements onto an already cluttered scene.
                            </span>
                        </div>
                    </motion.div>
                </GridContainer>
            </section>

            <SectionDivider />

            {/* Section 2: Iteration */}
            <section className="relative py-12 md:py-20">
                <GridContainer>
                    <AnimatedSection className="">
                        <motion.span
                            variants={fadeInUp}
                            className={`${pixelify.className} text-gray-800 text-xl md:text-2xl lg:text-3xl tracking-wide uppercase`}
                        >
                            Iteration
                        </motion.span>

                        <motion.p
                            variants={fadeInUp}
                            className={`${roboto.className} text-black/80 font-light text-base md:text-lg leading-relaxed mt-4`}
                        >
                            After deciding what made sense to remove, we had to figure out what new elements to introduce that would both fit the existing aesthetic, and signify the presence of the new artists. To this effect, their chains were recreated to serve as the central motif of the new piece.
                        </motion.p>
                    </AnimatedSection>
                </GridContainer>

                {/* Chain References */}
                <GridContainer className="mt-12 md:mt-16">
                    <div className="grid grid-cols-2 gap-3 md:gap-4">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="overflow-hidden aspect-[3/4] rounded-2xl"
                        >
                            <Image
                                src="/projects/albumcover/red.jpg"
                                alt="Sexyy Red Chain Reference"
                                width={400}
                                height={600}
                                className="w-full h-full object-cover"
                            />
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="overflow-hidden aspect-[3/4] rounded-2xl"
                        >
                            <Image
                                src="/projects/albumcover/latto.webp"
                                alt="Latto Chain Reference"
                                width={400}
                                height={400}
                                className="w-full h-full object-cover"
                            />
                        </motion.div>
                    </div>
                    <span className={`${roboto.className} text-black/35 text-sm mt-5 block text-center italic`}>
                        {`Chain references for artists "Sexyy Red" and "Latto"`}
                    </span>
                </GridContainer>

                {/* WIP Image */}
                <GridContainer className="mt-12 md:mt-16">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className=""
                    >
                        <div className="overflow-hidden rounded-2xl">
                            <Image
                                src="/projects/albumcover/wip2.png"
                                alt="Work in Progress"
                                width={600}
                                height={600}
                                className="w-full h-auto"
                            />
                        </div>
                        <span className={`${roboto.className} text-black/35 text-sm mt-5 block text-center italic`}>
                            Initial work in progress scene
                        </span>
                    </motion.div>
                </GridContainer>

                <GridContainer className="mt-12 md:mt-16">
                    <AnimatedSection className="">
                        <motion.p
                            variants={fadeInUp}
                            className={`${roboto.className} text-black/80 font-light text-base md:text-lg leading-relaxed`}
                        >
                            {`Scale and placement were the two factors that provided the most friction. Everything needed to be set perfectly. Nearly a dozen iterations were produced in the tight timeframe, shifting pieces around (sometimes by just a few pixels) until harmony was established.`}
                        </motion.p>
                    </AnimatedSection>
                </GridContainer>
            </section>

            <SectionDivider />

            {/* Final Result */}
            <section className="relative py-12 md:py-20">
                <GridContainer>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className=""
                    >
                        <div className="overflow-hidden rounded-2xl">
                            <Image
                                src="/projects/albumcover/finalcover.jpg"
                                alt="Final Album Cover"
                                width={800}
                                height={800}
                                className="w-full h-auto"
                            />
                        </div>
                        <span className={`${roboto.className} text-black/35 text-sm mt-5 block text-center italic`}>
                            Final remix cover art
                        </span>
                    </motion.div>
                </GridContainer>

                <GridContainer className="mt-12 md:mt-16">
                    <AnimatedSection className="">
                        <motion.span
                            variants={fadeInUp}
                            className={`${pixelify.className} text-gray-800 text-xl md:text-2xl lg:text-3xl tracking-wide uppercase`}
                        >
                            Conclusion
                        </motion.span>

                        <motion.p
                            variants={fadeInUp}
                            className={`${roboto.className} text-black/80 font-light text-base md:text-lg leading-relaxed mt-4`}
                        >
                            {`The final cover preserved the identity of the original release while also differentiating itself in a clear and notable manner. The remix has since accumulated over 33M streams on Spotify. While "short-lived" is an understatement for this experience, it was an important lesson in quick thinking, rapid adaptation, and distilling decisions down to their essentials.`}
                        </motion.p>
                    </AnimatedSection>
                </GridContainer>
            </section>
        </main>
    )
}

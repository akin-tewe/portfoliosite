"use client";
import { pixelify, roboto } from "@/app/ui/fonts"
import { useRef } from "react";
import Image from "next/image";
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

// Grid overlay component for dark sections
function GridOverlay() {
    return (
        <div className="absolute inset-0 flex h-full w-full justify-center pointer-events-none">
            <div className="flex w-full max-w-[1400px] h-full">
                <div className="flex-1 border-l border-white/[0.07]"></div>
                <div className="flex-1 border-l border-white/[0.07]"></div>
                <div className="flex-1 border-l border-white/[0.07]"></div>
                <div className="flex-1 border-l border-white/[0.07]"></div>
                <div className="flex-1 border-l border-r border-white/[0.07]"></div>
            </div>
        </div>
    );
}

// Grid overlay for light sections
function GridOverlayLight() {
    return (
        <div className="absolute inset-0 flex h-full w-full justify-center pointer-events-none">
            <div className="flex w-full max-w-[1400px] h-full">
                <div className="flex-1 border-l border-black/[0.07]"></div>
                <div className="flex-1 border-l border-black/[0.07]"></div>
                <div className="flex-1 border-l border-black/[0.07]"></div>
                <div className="flex-1 border-l border-black/[0.07]"></div>
                <div className="flex-1 border-l border-r border-black/[0.07]"></div>
            </div>
        </div>
    );
}

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

export default function AlbumCover() {
    const heroRef = useRef(null);
    const isHeroInView = useInView(heroRef, { once: true });

    return (
        <main className="overflow-x-hidden">
            {/* Hero Section - Dark */}
            <section
                ref={heroRef}
                className="relative w-full pt-32 md:pt-40 pb-16 md:pb-24 bg-black"
            >
                <GridOverlay />
                <GridContainer>
                    <div className="md:w-[60%] lg:w-[50%] md:ml-[20%]">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className={`${pixelify.className} text-5xl md:text-6xl lg:text-7xl text-white leading-tight`}
                        >
                            peaches and eggplants
                            <br />
                            <span className="text-blue-400 italic">cover art design</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className={`${roboto.className} text-white/70 font-light text-lg md:text-xl mt-6 leading-relaxed`}
                        >
                            {`As star artists "Latto" and "Sexyy Red" were brought on to the remix of Young Nudy's
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
                                    className={`${pixelify.className} px-6 py-3 border border-white/30 rounded text-white/80 text-base tracking-wide uppercase hover:bg-white/10 transition-colors`}
                                >
                                    View Project
                                </button>
                            </MagneticWrapper>
                        </motion.div>
                    </div>
                </GridContainer>
            </section>

            {/* Hero Image - Original Cover - Dark */}
            <section className="relative w-full pb-16 md:pb-24 bg-black">
                <GridOverlay />
                <GridContainer>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="md:w-[60%] mx-auto"
                    >
                        <div className="overflow-hidden">
                            <Image
                                src="/projects/albumcover/originalcover.jpg"
                                alt="Original Album Cover"
                                width={600}
                                height={600}
                                className="w-full h-auto"
                            />
                        </div>
                        <span className={`${roboto.className} text-white/40 text-sm md:text-base mt-5 block text-center italic`}>
                            {`"Peaches and Eggplants" by Young Nudy - original cover art`}
                        </span>
                    </motion.div>
                </GridContainer>
            </section>

            {/* Main Content - White Section */}
            <section id="body" className="relative py-12 md:py-20 bg-white">
                <GridOverlayLight />
                {/* Section 1: Context */}
                <GridContainer>
                    <AnimatedSection className="md:ml-[20%] md:w-[50%]">
                        <motion.span
                            variants={fadeInUp}
                            className={`${pixelify.className} text-blue-500 text-2xl md:text-3xl tracking-wide uppercase`}
                        >
                            Context
                        </motion.span>

                        <motion.p
                            variants={fadeInUp}
                            className={`${roboto.className} text-black/80 font-light text-lg md:text-xl leading-relaxed mt-4`}
                        >
                            6 short hours. This was all the time provided to make this happen.
                        </motion.p>

                        <motion.p
                            variants={fadeInUp}
                            className={`${roboto.className} text-black/80 font-light text-lg md:text-xl leading-relaxed mt-6`}
                        >
                            Something not unusual to the music industry but entirely unusual
                            to my regular process. I had to rethink how I design entirely.
                        </motion.p>

                        <motion.p
                            variants={fadeInUp}
                            className={`${roboto.className} text-black/80 font-light text-lg md:text-xl leading-relaxed mt-6`}
                        >
                            Instead of broad stylistic changes and innovation, the
                            focus was on precise, high impact additions that respectfully leave their mark.
                        </motion.p>
                    </AnimatedSection>
                </GridContainer>
            </section>

            {/* Pull Quote - Blue Section */}
            <section className="relative py-16 md:py-24 bg-blue-600">
                <GridOverlay />
                <GridContainer>
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="md:w-[60%] mx-auto"
                    >
                        <div className="border-l-2 border-white pl-6 md:pl-8">
                            <span className={`${roboto.className} text-white text-2xl md:text-3xl font-light leading-relaxed`}>
                                {`The original cover was a still-life composition built around indulgence: food, money, guns, and overt luxury.`}
                            </span>
                            <span className={`${roboto.className} text-white/70 text-base block mt-4`}>
                                Safe to say it would not be a light challenge introducing new elements onto an already cluttered scene.
                            </span>
                        </div>
                    </motion.div>
                </GridContainer>
            </section>

            {/* Section 2: Iteration - White */}
            <section className="relative py-12 md:py-20 bg-white">
                <GridOverlayLight />
                <GridContainer>
                    <AnimatedSection className="md:ml-[20%] md:w-[50%]">
                        <motion.span
                            variants={fadeInUp}
                            className={`${pixelify.className} text-blue-500 text-2xl md:text-3xl tracking-wide uppercase`}
                        >
                            Iteration
                        </motion.span>

                        <motion.p
                            variants={fadeInUp}
                            className={`${roboto.className} text-black/80 font-light text-lg md:text-xl leading-relaxed mt-4`}
                        >
                            After deciding what made sense to remove, we had to figure out what new elements to introduce that would both fit the existing aesthetic, and signify the presence of the new artists.
                        </motion.p>

                        <motion.p
                            variants={fadeInUp}
                            className={`${roboto.className} text-black/80 font-light text-lg md:text-xl leading-relaxed mt-6`}
                        >
                            To this effect, their chains were recreated to serve as the central motif of the new piece.
                        </motion.p>
                    </AnimatedSection>
                </GridContainer>

                {/* Chain References */}
                <GridContainer className="mt-12 md:mt-16">
                    <div className="grid grid-cols-2 gap-3 md:gap-4 md:w-[60%] mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="overflow-hidden aspect-[3/4]"
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
                            className="overflow-hidden aspect-[3/4]"
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
                    <span className={`${roboto.className} text-black/40 text-sm md:text-base mt-5 block text-center italic`}>
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
                        className="md:w-[60%] mx-auto"
                    >
                        <div className="overflow-hidden">
                            <Image
                                src="/projects/albumcover/wip2.png"
                                alt="Work in Progress"
                                width={600}
                                height={600}
                                className="w-full h-auto"
                            />
                        </div>
                        <span className={`${roboto.className} text-black/40 text-sm md:text-base mt-5 block text-center italic`}>
                            Initial work in progress scene
                        </span>
                    </motion.div>
                </GridContainer>

                <GridContainer className="mt-12 md:mt-16">
                    <AnimatedSection className="md:ml-[20%] md:w-[50%]">
                        <motion.p
                            variants={fadeInUp}
                            className={`${roboto.className} text-black/80 font-light text-lg md:text-xl leading-relaxed`}
                        >
                            Scale and placement were the two factors that provided the most friction.
                            Everything needed to be set perfectly.
                        </motion.p>

                        <motion.p
                            variants={fadeInUp}
                            className={`${roboto.className} text-black/80 font-light text-lg md:text-xl leading-relaxed mt-6`}
                        >
                            {`Nearly a dozen iterations were produced in the tight timeframe, shifting pieces around (sometimes by just a few pixels)
                            until harmony was established.`}
                        </motion.p>
                    </AnimatedSection>
                </GridContainer>
            </section>

            {/* Final Result - Dark */}
            <section className="relative py-12 md:py-20 bg-black">
                <GridOverlay />
                <GridContainer>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="md:w-[60%] mx-auto"
                    >
                        <div className="overflow-hidden">
                            <Image
                                src="/projects/albumcover/finalcover.jpg"
                                alt="Final Album Cover"
                                width={800}
                                height={800}
                                className="w-full h-auto"
                            />
                        </div>
                        <span className={`${roboto.className} text-white/40 text-sm md:text-base mt-5 block text-center italic`}>
                            Final remix cover art
                        </span>
                    </motion.div>
                </GridContainer>

                <GridContainer className="mt-12 md:mt-16">
                    <AnimatedSection className="md:ml-[20%] md:w-[50%]">
                        <motion.span
                            variants={fadeInUp}
                            className={`${pixelify.className} text-blue-400 text-2xl md:text-3xl tracking-wide uppercase`}
                        >
                            Conclusion
                        </motion.span>

                        <motion.p
                            variants={fadeInUp}
                            className={`${roboto.className} text-white/80 font-light text-lg md:text-xl leading-relaxed mt-4`}
                        >
                            The final cover preserved the identity of the original release while also
                            differentiating itself in a clear and notable manner.
                        </motion.p>

                        <motion.p
                            variants={fadeInUp}
                            className={`${roboto.className} text-white/80 font-light text-lg md:text-xl leading-relaxed mt-6`}
                        >
                            {`While "short-lived" is an understatement for this experience, it was an important lesson in
                            quick thinking, rapid adaptation, and distilling decisions down to their essentials.`}
                        </motion.p>
                    </AnimatedSection>
                </GridContainer>
            </section>
        </main>
    )
}

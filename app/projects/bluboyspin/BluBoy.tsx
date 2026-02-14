"use client";
import { pixelify, roboto } from "@/app/ui/fonts"
import { useRef, useEffect } from "react";
import { Video } from "lucide-react";
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

// Grid container for content alignment
function GridContainer({ children, className = "", id }: { children: React.ReactNode; className?: string; id?: string }) {
    return (
        <div id={id} className={`w-full max-w-[1400px] mx-auto px-5 md:px-8 ${className}`}>
            {children}
        </div>
    );
}

// Auto-scrolling carousel component
function ImageCarousel() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        let animationId: number;
        let accumulator = 0;
        const frameDelay = 4;
        const scrollAmount = 1;

        const scroll = () => {
            accumulator++;
            if (accumulator >= frameDelay) {
                accumulator = 0;
                container.scrollLeft += scrollAmount;
                if (container.scrollLeft >= container.scrollWidth - container.clientWidth) {
                    container.scrollLeft = 0;
                }
            }
            animationId = requestAnimationFrame(scroll);
        };

        animationId = requestAnimationFrame(scroll);
        return () => cancelAnimationFrame(animationId);
    }, []);

    const images = [
        { src: "/projects/bluboyspin/fit1.jpg", alt: "Reference Print Image 1" },
        { src: "/projects/bluboyspin/fit2.jpg", alt: "Reference Print Image 2" },
        { src: "/projects/bluboyspin/fit3.jpg", alt: "Reference Print Image 3" },
        { src: "/projects/bluboyspin/fit1.jpg", alt: "Reference Print Image 1" },
        { src: "/projects/bluboyspin/fit2.jpg", alt: "Reference Print Image 2" },
        { src: "/projects/bluboyspin/fit3.jpg", alt: "Reference Print Image 3" },
    ];

    return (
        <div className="relative w-full">
            {/* Left fade */}
            <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
            {/* Right fade */}
            <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

            <div
                ref={containerRef}
                className="flex gap-2 md:gap-3 overflow-x-auto scrollbar-hide"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {images.map((img, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        className="flex-shrink-0 w-[240px] md:w-[360px] lg:w-[440px] aspect-[3/4] overflow-hidden"
                    >
                        <Image
                            src={img.src}
                            alt={img.alt}
                            width={560}
                            height={560}
                            className="w-full h-full object-cover"
                        />
                    </motion.div>
                ))}
            </div>
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

// Grid overlay for dark sections
function GridOverlay() {
    return (
        <div className="absolute inset-0 flex justify-center pointer-events-none">
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

export default function Bluboy() {
    const heroRef = useRef(null);
    const isHeroInView = useInView(heroRef, { once: true });

    return (
        <main className="overflow-x-hidden">
            {/* ============================================ */}
            {/* DARK SECTION: Hero */}
            {/* ============================================ */}
            <section
                ref={heroRef}
                className="relative bg-black pt-32 md:pt-40 pb-16 md:pb-24"
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
                            className="flex flex-wrap gap-4 mt-10 justify-center md:justify-start"
                        >
                            <MagneticWrapper>
                                <button
                                    onClick={() => document.getElementById('body')?.scrollIntoView({ behavior: 'smooth' })}
                                    className={`${pixelify.className} px-6 py-3 border border-white/30 rounded text-white/80 text-base tracking-wide uppercase hover:bg-white/10 transition-colors`}
                                >
                                    View Project
                                </button>
                            </MagneticWrapper>
                            <MagneticWrapper>
                                <button
                                    onClick={() => document.getElementById('video')?.scrollIntoView({ behavior: 'smooth' })}
                                    className={`${pixelify.className} px-6 py-3 bg-blue-600 rounded text-white text-base tracking-wide uppercase hover:bg-blue-700 transition-colors flex items-center gap-2`}
                                >
                                    <Video className="w-4 h-4" />
                                    Watch Video
                                </button>
                            </MagneticWrapper>
                        </motion.div>
                    </div>
                </GridContainer>

            </section>

            {/* Hero Image Carousel - Still on dark */}
            <section className="relative bg-black pb-16 md:pb-24">
                <GridOverlay />
                <ImageCarousel />
                <GridContainer>
                    <span className={`${roboto.className} text-white/40 text-sm md:text-base mt-5 block text-center italic`}>
                        {`"bluboy" art direction reference - image credit: @bluboy on instagram`}
                    </span>
                </GridContainer>
            </section>

            {/* ============================================ */}
            {/* WHITE SECTION: Assessment */}
            {/* ============================================ */}
            <section id="body" className="relative bg-white py-16 md:py-24">
                <GridContainer>
                    <AnimatedSection className="md:ml-[20%] md:w-[50%]">
                        <motion.span
                            variants={fadeInUp}
                            className={`${pixelify.className} text-blue-500 text-2xl md:text-3xl tracking-wide uppercase`}
                        >
                            Assessment
                        </motion.span>

                        <motion.p
                            variants={fadeInUp}
                            className={`${roboto.className} text-black/80 font-light text-lg md:text-xl leading-relaxed mt-4`}
                        >
                            {`Bluboy is an individual I've done a number of works for in the past.
                            As it had been a notable amount of time since our last project, this required re-engaging with his current audience and demographic.`}
                        </motion.p>

                        <motion.p
                            variants={fadeInUp}
                            className={`${roboto.className} text-black/80 font-light text-lg md:text-xl leading-relaxed mt-6`}
                        >
                            {`What they're looking for now is continuity. Not a throwback to the past, but something fresh that aligns
                            with his current image.`}
                        </motion.p>
                    </AnimatedSection>
                </GridContainer>

                {/* Character Reference Images */}
                <GridContainer className="mt-12 md:mt-16">
                    <div className="flex gap-3 md:gap-4 overflow-x-auto md:overflow-visible md:grid md:grid-cols-3 w-full" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="flex-shrink-0 w-[75vw] md:w-auto overflow-hidden"
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
                            className="flex-shrink-0 w-[75vw] md:w-auto overflow-hidden"
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
                            className="flex-shrink-0 w-[75vw] md:w-auto overflow-hidden"
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
                    <span className={`${roboto.className} text-black/40 text-sm md:text-base mt-5 block text-center italic`}>
                        Character visual direction reference - image credit: @bluboy on instagram
                    </span>
                </GridContainer>
            </section>

            {/* ============================================ */}
            {/* BLUE SECTION: Key Insight */}
            {/* ============================================ */}
            <section className="relative bg-blue-600 py-16 md:py-24">
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
                                {`Character-driven imagery is a focal point of his narrative, but he wanted to reduce its prominence for this video.`}
                            </span>
                            <span className={`${roboto.className} text-white/70 text-base block mt-4`}>
                                Let the pieces speak on their own.
                            </span>
                        </div>
                    </motion.div>
                </GridContainer>
            </section>

            {/* ============================================ */}
            {/* WHITE SECTION: Motion */}
            {/* ============================================ */}
            <section className="relative bg-white py-16 md:py-24">
                <GridContainer>
                    <AnimatedSection className="md:ml-[20%] md:w-[50%]">
                        <motion.span
                            variants={fadeInUp}
                            className={`${pixelify.className} text-blue-500 text-2xl md:text-3xl tracking-wide uppercase`}
                        >
                            Motion
                        </motion.span>

                        <motion.p
                            variants={fadeInUp}
                            className={`${roboto.className} text-black/80 font-light text-lg md:text-xl leading-relaxed mt-4`}
                        >
                            With the characters taking a backseat, the paintings had to absorb the magic.
                        </motion.p>

                        <motion.p
                            variants={fadeInUp}
                            className={`${roboto.className} text-black/80 font-light text-lg md:text-xl leading-relaxed mt-6`}
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
                        className="md:w-[60%] mx-auto"
                    >
                        <div className="overflow-hidden bg-gray-100 p-4 md:p-6 rounded-lg">
                            <Image
                                src="/projects/bluboyspin/principles.gif"
                                alt="Principles of Animation"
                                width={490}
                                height={490}
                                className="w-full h-auto rounded-md"
                            />
                        </div>
                        <span className={`${roboto.className} text-black/40 text-sm md:text-base mt-5 block text-center italic`}>
                            12 principles of animation - image credit: Chris Totten via Medium
                        </span>
                    </motion.div>
                </GridContainer>

                <GridContainer className="mt-12 md:mt-16">
                    <AnimatedSection className="md:ml-[20%] md:w-[50%]">
                        <motion.p
                            variants={fadeInUp}
                            className={`${roboto.className} text-black/80 font-light text-lg md:text-xl leading-relaxed`}
                        >
                            Breathing life into the paintings was the most fun part of this process.
                            Organization and placement were two very important factors in getting everything into a position that both felt and looked incredible.
                        </motion.p>
                    </AnimatedSection>
                </GridContainer>
            </section>

            {/* ============================================ */}
            {/* DARK SECTION: Result */}
            {/* ============================================ */}
            <section className="relative bg-black py-16 md:py-24">
                <GridOverlay />
                <GridContainer>
                    <AnimatedSection className="md:ml-[20%] md:w-[50%]">
                        <motion.span
                            variants={fadeInUp}
                            className={`${pixelify.className} text-blue-400 text-2xl md:text-3xl tracking-wide uppercase`}
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
                <GridContainer id="video" className="mt-12 md:mt-16">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="w-full"
                    >
                        <div className="overflow-hidden">
                            <video
                                className="aspect-video w-full rounded-lg"
                                src="/projects/bluboyspin/printsvid.mp4"
                                controls
                            />
                        </div>
                        <span className={`${roboto.className} text-white/40 text-sm md:text-base mt-5 block text-center italic`}>
                            Final rendered animation
                        </span>
                    </motion.div>
                </GridContainer>
            </section>
        </main>
    )
}

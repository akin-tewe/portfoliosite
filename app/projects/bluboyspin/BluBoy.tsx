"use client";
import { pixelify, roboto } from "@/app/ui/fonts"
import { useRef, useEffect } from "react";
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
            <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-[var(--background)] to-transparent z-10 pointer-events-none" />
            {/* Right fade */}
            <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-[var(--background)] to-transparent z-10 pointer-events-none" />

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
                        className="flex-shrink-0 w-[240px] md:w-[360px] lg:w-[440px] aspect-[3/4] rounded-2xl overflow-hidden"
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

export default function Bluboy() {
    const heroRef = useRef(null);
    const isHeroInView = useInView(heroRef, { once: true });

    return (
        <main className="overflow-x-hidden">
            {/* ============================================ */}
            {/* Hero */}
            {/* ============================================ */}
            <section
                ref={heroRef}
                className="relative bg-gray-200 pt-32 md:pt-40 pb-16 md:pb-24"
            >
                <GridContainer>
                    <div className="md:w-[60%] lg:w-[50%] md:ml-[20%]">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className={`${pixelify.className} text-5xl md:text-6xl lg:text-7xl text-gray-800 leading-tight`}
                        >
                            print launch video
                            <br />
                            <span className="text-blue-500 italic">{`for "bluboy"`}</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className={`${roboto.className} text-black/50 font-light text-lg md:text-xl mt-6 leading-relaxed`}
                        >
                            {`A short-form commercial created to introduce
                            the release of fashion designer "Bluboy's" (@bluboy, 110K followers on Instagram) art prints.`}
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
                { label: "Timeline", value: "1 Month" },
                { label: "Role", value: "3D Animator \u00B7 Director" },
                { label: "For", value: "Bluboy" },
                { label: "Reach", value: "100K+ Views" },
            ]} />

            {/* Image Carousel */}
            <section className="relative pb-16 md:pb-24">
                <ImageCarousel />
                <GridContainer>
                    <span className={`${roboto.className} text-black/35 text-sm md:text-base mt-5 block text-center italic`}>
                        {`"bluboy" art direction reference - image credit: @bluboy on instagram`}
                    </span>
                </GridContainer>
            </section>

            <SectionDivider />

            {/* ============================================ */}
            {/* Assessment */}
            {/* ============================================ */}
            <section id="body" className="relative py-16 md:py-24">
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
                            {`Bluboy is an individual I've collaborated with across 5 large projects over 3 years.
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
                            className="flex-shrink-0 w-[75vw] md:w-auto rounded-2xl overflow-hidden"
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
                            className="flex-shrink-0 w-[75vw] md:w-auto rounded-2xl overflow-hidden"
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
                            className="flex-shrink-0 w-[75vw] md:w-auto rounded-2xl overflow-hidden"
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
                    <span className={`${roboto.className} text-black/35 text-sm md:text-base mt-5 block text-center italic`}>
                        Character visual direction reference - image credit: @bluboy on instagram
                    </span>
                </GridContainer>
            </section>

            <SectionDivider />

            {/* ============================================ */}
            {/* Key Insight — Pull Quote */}
            {/* ============================================ */}
            <section className="relative bg-gray-200 py-16 md:py-24">
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
                                {`Character-driven imagery is a focal point of his narrative, but he wanted to reduce its prominence for this video.`}
                            </span>
                            <span className={`${roboto.className} text-black/50 text-base block mt-4`}>
                                Let the pieces speak on their own.
                            </span>
                        </div>
                    </motion.div>
                </GridContainer>
            </section>

            <SectionDivider />

            {/* ============================================ */}
            {/* Motion */}
            {/* ============================================ */}
            <section className="relative py-16 md:py-24">
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
                        <div className="overflow-hidden bg-white p-4 md:p-6 rounded-2xl">
                            <Image
                                src="/projects/bluboyspin/principles.gif"
                                alt="Principles of Animation"
                                width={490}
                                height={490}
                                className="w-full h-auto rounded-xl"
                            />
                        </div>
                        <span className={`${roboto.className} text-black/35 text-sm md:text-base mt-5 block text-center italic`}>
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

            <SectionDivider />

            {/* ============================================ */}
            {/* Result */}
            {/* ============================================ */}
            <section className="relative py-16 md:py-24">
                <GridContainer>
                    <AnimatedSection className="md:ml-[20%] md:w-[50%]">
                        <motion.span
                            variants={fadeInUp}
                            className={`${pixelify.className} text-blue-500 text-2xl md:text-3xl tracking-wide uppercase`}
                        >
                            Result
                        </motion.span>

                        <motion.p
                            variants={fadeInUp}
                            className={`${roboto.className} text-black/80 font-light text-lg md:text-xl leading-relaxed mt-4`}
                        >
                            The final piece reads less like an advertisement and more like a visual gesture.
                        </motion.p>

                        <motion.p
                            variants={fadeInUp}
                            className={`${roboto.className} text-black/80 font-light text-lg md:text-xl leading-relaxed mt-6`}
                        >
                            {`Without an ironed-out brief to work from, this entire project was produced through responsiveness and paying close attention to the client's needs.
                            The result was a piece that supports their message without diluting their voice.`}
                        </motion.p>

                        <motion.p
                            variants={fadeInUp}
                            className={`${roboto.className} text-black/80 font-light text-lg md:text-xl leading-relaxed mt-6`}
                        >
                            {`The video generated 50K views within the first week of launch.`}
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
                                src="/projects/bluboyspin/printsvid.mp4"
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

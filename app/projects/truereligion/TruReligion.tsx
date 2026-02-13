"use client";
import { pixelify, roboto } from "@/app/ui/fonts"
import { useState, useRef, useEffect } from "react";
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
function GridContainer({ children, className = "", id }: { children: React.ReactNode; className?: string; id?: string }) {
    return (
        <div id={id} className={`w-full max-w-[1400px] mx-auto px-5 md:px-8 ${className}`}>
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

// Product carousel data
const productShots = [
    "/projects/truereligion/1.0.png",
    "/projects/truereligion/1.1.png",
    "/projects/truereligion/1.2.png",
    "/projects/truereligion/1.3.png",
    "/projects/truereligion/1.4.png",
    "/projects/truereligion/1.5.png",
    "/projects/truereligion/1.6.png",
    "/projects/truereligion/1.7.png",
];

// Auto-scrolling product carousel
function ProductCarousel() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isPaused, setIsPaused] = useState(false);
    const [isDragging, setIsDragging] = useState(false);

    // Auto-scroll effect
    useEffect(() => {
        const container = containerRef.current;
        if (!container || isPaused) return;

        let animationId: number;
        let accumulator = 0;
        const scrollAmount = 1;
        const frameDelay = 4; // Only scroll every N frames (higher = slower)

        const scroll = () => {
            accumulator++;
            if (accumulator >= frameDelay) {
                accumulator = 0;
                if (container.scrollLeft >= container.scrollWidth - container.clientWidth) {
                    container.scrollLeft = 0;
                } else {
                    container.scrollLeft += scrollAmount;
                }
            }
            animationId = requestAnimationFrame(scroll);
        };

        animationId = requestAnimationFrame(scroll);
        return () => cancelAnimationFrame(animationId);
    }, [isPaused]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative w-full"
        >
            {/* Left fade */}
            <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
            {/* Right fade */}
            <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

            <div
                ref={containerRef}
                className="flex gap-4 overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                onMouseDown={() => { setIsDragging(true); setIsPaused(true); }}
                onMouseUp={() => { setIsDragging(false); setIsPaused(false); }}
                onMouseLeave={() => { setIsDragging(false); setIsPaused(false); }}
                onTouchStart={() => setIsPaused(true)}
                onTouchEnd={() => setIsPaused(false)}
            >
                {/* Duplicate images for seamless loop */}
                {[...productShots, ...productShots].map((src, index) => (
                    <div
                        key={index}
                        className="flex-shrink-0 w-[400px] md:w-[600px] lg:w-[800px]"
                    >
                        <Image
                            src={src}
                            alt={`Product Shot ${(index % productShots.length) + 1}`}
                            width={800}
                            height={550}
                            className="w-full h-auto pointer-events-none"
                            draggable={false}
                        />
                    </div>
                ))}
            </div>
        </motion.div>
    );
}

export default function TruReligion() {
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
                            true religion x
                            <br />
                            <span className="text-blue-400 italic">{`"bluboy"`}</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className={`${roboto.className} text-white/70 font-light text-lg md:text-xl mt-6 leading-relaxed`}
                        >
                            {`A 3D animated commercial developed entirely by me made to promote the collaborative
                            clothing drop between True Religion Brand Jeans and clothing designer "Bluboy."`}
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

            {/* Product Carousel - Dark */}
            <section className="relative w-full pb-6 md:pb-8 bg-black">
                <GridOverlay />
                <ProductCarousel />
                <span className={`${roboto.className} text-white/40 text-sm md:text-base mt-4 block text-center italic`}>
                    In-scene product shot direction
                </span>
            </section>

            {/* Main Content - White Section */}
            <section id="body" className="relative py-12 md:py-20 bg-white">
                <GridOverlayLight />
                {/* Section 1: Premise */}
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
                            {`The intention here was not to make a traditional "product launch" advertisement,
                            but to frame the moment as a part of Bluboy's visual narrative, while still carrying the weight and class expected of such a well-known brand.`}
                        </motion.p>

                        <motion.p
                            variants={fadeInUp}
                            className={`${roboto.className} text-black/80 font-light text-lg md:text-xl leading-relaxed mt-6`}
                        >
                            This meant treating the collaboration less as strictly a campaign asset, and more as a shared world-building experience.
                        </motion.p>
                    </AnimatedSection>
                </GridContainer>
            </section>

            {/* Section 2: Audience - White */}
            <section className="relative py-12 md:py-20 bg-white">
                <GridOverlayLight />
                <GridContainer>
                    <AnimatedSection className="md:ml-[20%] md:w-[50%]">
                        <motion.span
                            variants={fadeInUp}
                            className={`${pixelify.className} text-blue-500 text-2xl md:text-3xl tracking-wide uppercase`}
                        >
                            Audience
                        </motion.span>

                        <motion.p
                            variants={fadeInUp}
                            className={`${roboto.className} text-black/80 font-light text-lg md:text-xl leading-relaxed mt-4`}
                        >
                            {`To represent a collaboration between two notably different visual entities,
                            this video needed to find a way to resonate with two audience groups at the same time.`}
                        </motion.p>

                        <motion.p
                            variants={fadeInUp}
                            className={`${roboto.className} text-black/80 font-light text-lg md:text-xl leading-relaxed mt-6`}
                        >
                            {`Bluboy's audience is used to whimsical, character-driven visuals.
                            The True Religion consumer base however expects familiarity, branding clarity, and to know exactly what's being presented to them.`}
                        </motion.p>
                    </AnimatedSection>
                </GridContainer>

                {/* Reference Images */}
                <GridContainer className="mt-12 md:mt-16">
                    <div className="grid grid-cols-3 gap-3 md:gap-4 w-full">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="overflow-hidden"
                        >
                            <Image
                                src="/projects/truereligion/ex1.jpg"
                                alt="Bluboy Art Direction"
                                width={600}
                                height={600}
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
                                src="/projects/truereligion/ex2.jpg"
                                alt="Bluboy Art Direction"
                                width={600}
                                height={600}
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
                                src="/projects/truereligion/ex3.jpg"
                                alt="Bluboy Art Direction"
                                width={600}
                                height={600}
                                className="w-full h-auto"
                            />
                        </motion.div>
                    </div>
                    <span className={`${roboto.className} text-black/40 text-sm md:text-base mt-5 block text-center italic`}>
                        Branding aesthetic reference - image credit: @bluboy on Instagram
                    </span>
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
                                {`The video's pacing lives comfortably between those two ideas.`}
                            </span>
                            <span className={`${roboto.className} text-white/70 text-base block mt-4`}>
                                Clear branding is established early, then the focus softly transitions to the garments.
                            </span>
                        </div>
                    </motion.div>
                </GridContainer>
            </section>

            {/* Section 3: Hero Character - White */}
            <section className="relative py-12 md:py-20 bg-white">
                <GridOverlayLight />
                <GridContainer>
                    <AnimatedSection className="md:ml-[20%] md:w-[50%]">
                        <motion.span
                            variants={fadeInUp}
                            className={`${pixelify.className} text-blue-500 text-2xl md:text-3xl tracking-wide uppercase`}
                        >
                            Our Hero
                        </motion.span>

                        <motion.p
                            variants={fadeInUp}
                            className={`${roboto.className} text-black/80 font-light text-lg md:text-xl leading-relaxed mt-4`}
                        >
                            {`The star of our video is none other than Bluboy himself.
                            Making him the focal point was crucial to selling the nature of the collaboration.`}
                        </motion.p>

                        <motion.p
                            variants={fadeInUp}
                            className={`${roboto.className} text-black/80 font-light text-lg md:text-xl leading-relaxed mt-6`}
                        >
                            {`The character was designed to be recognizable without chasing realism, breaking down the complex details of Bluboy's aesthetic into an iconic silhouette.`}
                        </motion.p>
                    </AnimatedSection>
                </GridContainer>

                {/* Character Renders */}
                <div className="mt-12 md:mt-16 grid grid-cols-3 gap-2 md:gap-3 w-[85%] md:w-[70%] mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="overflow-hidden"
                    >
                        <Image
                            src="/projects/truereligion/M1.png"
                            alt="Bluboy Character Front"
                            width={900}
                            height={450}
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
                            src="/projects/truereligion/M2.png"
                            alt="Bluboy Character Side"
                            width={900}
                            height={450}
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
                            src="/projects/truereligion/M3.png"
                            alt="Bluboy Character Back"
                            width={900}
                            height={450}
                            className="w-full h-auto"
                        />
                    </motion.div>
                </div>
                <span className={`${roboto.className} text-black/40 text-sm md:text-base mt-5 block text-center italic`}>
                    {`Original "bluboy" character render shots`}
                </span>

                <GridContainer className="mt-12 md:mt-16">
                    <AnimatedSection className="md:ml-[20%] md:w-[50%]">
                        <motion.p
                            variants={fadeInUp}
                            className={`${roboto.className} text-black/80 font-light text-lg md:text-xl leading-relaxed`}
                        >
                            This allows us to show off the clothing through the natural antics of the character
                            himself, rather than spinning dioramas or basic product renders.
                        </motion.p>
                    </AnimatedSection>
                </GridContainer>
            </section>

            {/* Section 4: Refinement - Dark */}
            <section className="relative py-12 md:py-20 bg-black">
                <GridOverlay />
                <GridContainer>
                    <AnimatedSection className="md:ml-[20%] md:w-[50%]">
                        <motion.span
                            variants={fadeInUp}
                            className={`${pixelify.className} text-blue-400 text-2xl md:text-3xl tracking-wide uppercase`}
                        >
                            Refinement
                        </motion.span>

                        <motion.p
                            variants={fadeInUp}
                            className={`${roboto.className} text-white/80 font-light text-lg md:text-xl leading-relaxed mt-4`}
                        >
                            This project was completed on a very tight one-month turnaround with constant
                            direct feedback from Bluboy and the True Religion team.
                        </motion.p>

                        <motion.p
                            variants={fadeInUp}
                            className={`${roboto.className} text-white/80 font-light text-lg md:text-xl leading-relaxed mt-6`}
                        >
                            Juggling an abstract vision alongside a tight deadline proved
                            to be a daunting challenge, but keeping two goals at the forefront guided the process: clarity and engagement.
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
                        <div className="overflow-hidden">
                            <video
                                className="aspect-video w-full rounded-lg"
                                src="/projects/truereligion/truvideo.mp4"
                                controls
                            />
                        </div>
                        <span className={`${roboto.className} text-white/40 text-sm md:text-base mt-5 block text-center italic`}>
                            Final rendered animation
                        </span>
                    </motion.div>
                </GridContainer>

                {/* Reception */}
                <GridContainer className="mt-16 md:mt-24">
                    <AnimatedSection className="md:ml-[20%] md:w-[50%]">
                        <motion.p
                            variants={fadeInUp}
                            className={`${roboto.className} text-white/80 font-light text-lg md:text-xl leading-relaxed`}
                        >
                            The video was very well received, generating thousands
                            of likes across all accounts and notably positive viewer feedback.
                        </motion.p>

                        <motion.p
                            variants={fadeInUp}
                            className={`${roboto.className} text-white/80 font-light text-lg md:text-xl leading-relaxed mt-6`}
                        >
                            {`For me, this project was a learning process in how to carry a
                            client's vision alongside my own, and present it in a way that felt natural rather than manufactured.`}
                        </motion.p>
                    </AnimatedSection>
                </GridContainer>
            </section>
        </main>
    )
}

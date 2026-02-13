"use client";
import { pixelify, roboto } from "@/app/ui/fonts"
import { useState, useRef } from "react";
import { Video } from "lucide-react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

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

export default function TruReligion() {
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
                                Watch Video
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
                                src="/projects/truereligion/truvideo.mp4"
                                controls
                                autoPlay
                            />
                        </div>
                    </div>
                )}
            </section>

            {/* Hero Image Grid */}
            <section className="relative w-full pb-16 md:pb-24">
                <div className="grid grid-cols-3 gap-2 md:gap-3">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="aspect-[2/3] overflow-hidden"
                    >
                        <Image
                            src="/projects/truereligion/outfit1.avif"
                            alt="Collaboration Release"
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
                        className="aspect-[2/3] overflow-hidden"
                    >
                        <Image
                            src="/projects/truereligion/outfit2.avif"
                            alt="Collaboration Release"
                            width={400}
                            height={600}
                            className="w-full h-full object-cover"
                        />
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="aspect-[2/3] overflow-hidden"
                    >
                        <Image
                            src="/projects/truereligion/outfit3.webp"
                            alt="Collaboration Release"
                            width={400}
                            height={600}
                            className="w-full h-full object-cover"
                        />
                    </motion.div>
                </div>
                <GridContainer>
                    <span className={`${roboto.className} text-white/40 text-sm md:text-base mt-3 block`}>
                        Outfittings released as part of collaboration - image credit: WNTD Apparel
                    </span>
                </GridContainer>
            </section>

            {/* Main Content */}
            <section id="body" className="relative py-12 md:py-20">
                {/* Section 1: Premise */}
                <GridContainer>
                    <AnimatedSection className="md:ml-[20%] md:w-[50%]">
                        <motion.span
                            variants={fadeInUp}
                            className={`${roboto.className} text-blue-400 text-base md:text-lg tracking-wide`}
                        >
                            Premise
                        </motion.span>

                        <motion.p
                            variants={fadeInUp}
                            className={`${roboto.className} text-white/80 font-light text-lg md:text-xl leading-relaxed mt-4`}
                        >
                            {`The intention here was not to make a traditional "product launch" advertisement,
                            but to frame the moment as a part of Bluboy's visual narrative, while still carrying the weight and class expected of such a well-known brand.`}
                        </motion.p>

                        <motion.p
                            variants={fadeInUp}
                            className={`${roboto.className} text-white/80 font-light text-lg md:text-xl leading-relaxed mt-6`}
                        >
                            This meant treating the collaboration less as strictly a campaign asset, and more as a shared world-building experience.
                        </motion.p>
                    </AnimatedSection>
                </GridContainer>
            </section>

            {/* Section 2: Audience */}
            <section className="relative py-12 md:py-20">
                <GridContainer>
                    <AnimatedSection className="md:ml-[20%] md:w-[50%]">
                        <motion.span
                            variants={fadeInUp}
                            className={`${roboto.className} text-blue-400 text-base md:text-lg tracking-wide`}
                        >
                            Audience
                        </motion.span>

                        <motion.p
                            variants={fadeInUp}
                            className={`${roboto.className} text-white/80 font-light text-lg md:text-xl leading-relaxed mt-4`}
                        >
                            {`To represent a collaboration between two notably different visual entities,
                            this video needed to find a way to resonate with two audience groups at the same time.`}
                        </motion.p>

                        <motion.p
                            variants={fadeInUp}
                            className={`${roboto.className} text-white/80 font-light text-lg md:text-xl leading-relaxed mt-6`}
                        >
                            {`Bluboy's audience is used to whimsical, character-driven visuals.
                            The True Religion consumer base however expects familiarity, branding clarity, and to know exactly what's being presented to them.`}
                        </motion.p>
                    </AnimatedSection>
                </GridContainer>

                {/* Reference Images */}
                <GridContainer className="mt-12 md:mt-16">
                    <div className="grid grid-cols-3 gap-3 md:gap-4 md:ml-[20%] md:w-[60%]">
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
                                width={280}
                                height={280}
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
                                width={280}
                                height={280}
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
                                width={280}
                                height={280}
                                className="w-full h-auto"
                            />
                        </motion.div>
                    </div>
                    <span className={`${roboto.className} text-white/40 text-sm md:text-base mt-3 block md:ml-[20%]`}>
                        Branding aesthetic reference - image credit: @bluboy on Instagram
                    </span>
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
                                {`The video's pacing lives comfortably between those two ideas.`}
                            </span>
                            <span className={`${roboto.className} text-white/50 text-base block mt-4`}>
                                Clear branding is established early, then the focus softly transitions to the garments.
                            </span>
                        </div>
                    </motion.div>
                </GridContainer>
            </section>

            {/* Section 3: Hero Character */}
            <section className="relative py-12 md:py-20">
                <GridContainer>
                    <AnimatedSection className="md:ml-[20%] md:w-[50%]">
                        <motion.span
                            variants={fadeInUp}
                            className={`${roboto.className} text-blue-400 text-base md:text-lg tracking-wide`}
                        >
                            Our Hero
                        </motion.span>

                        <motion.p
                            variants={fadeInUp}
                            className={`${roboto.className} text-white/80 font-light text-lg md:text-xl leading-relaxed mt-4`}
                        >
                            {`The star of our video is none other than Bluboy himself.
                            Making him the focal point was crucial to selling the nature of the collaboration.`}
                        </motion.p>

                        <motion.p
                            variants={fadeInUp}
                            className={`${roboto.className} text-white/80 font-light text-lg md:text-xl leading-relaxed mt-6`}
                        >
                            {`The character was designed to be recognizable without chasing realism, breaking down the complex details of Bluboy's aesthetic into an iconic silhouette.`}
                        </motion.p>
                    </AnimatedSection>
                </GridContainer>

                {/* Character Renders */}
                <GridContainer className="mt-12 md:mt-16">
                    <div className="grid grid-cols-3 gap-3 md:gap-4 md:ml-[20%] md:w-[65%]">
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
                                width={420}
                                height={210}
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
                                width={420}
                                height={210}
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
                                width={420}
                                height={210}
                                className="w-full h-auto"
                            />
                        </motion.div>
                    </div>
                    <span className={`${roboto.className} text-white/40 text-sm md:text-base mt-3 block md:ml-[20%]`}>
                        {`Original "bluboy" character render shots`}
                    </span>
                </GridContainer>

                <GridContainer className="mt-12 md:mt-16">
                    <AnimatedSection className="md:ml-[20%] md:w-[50%]">
                        <motion.p
                            variants={fadeInUp}
                            className={`${roboto.className} text-white/80 font-light text-lg md:text-xl leading-relaxed`}
                        >
                            This allows us to show off the clothing through the natural antics of the character
                            himself, rather than spinning dioramas or basic product renders.
                        </motion.p>
                    </AnimatedSection>
                </GridContainer>

                {/* Product Shots */}
                <GridContainer className="mt-12 md:mt-16">
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-2 md:gap-3 md:ml-[10%] md:w-[80%]">
                        {['1.0', '1.5', '1.3', '1.4', '1.1'].map((num, index) => (
                            <motion.div
                                key={num}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="overflow-hidden"
                            >
                                <Image
                                    src={`/projects/truereligion/${num}.png`}
                                    alt={`Product Shot ${index + 1}`}
                                    width={490}
                                    height={490}
                                    className="w-full h-auto"
                                />
                            </motion.div>
                        ))}
                    </div>
                    <span className={`${roboto.className} text-white/40 text-sm md:text-base mt-3 block md:ml-[10%]`}>
                        In-scene product shot direction
                    </span>
                </GridContainer>
            </section>

            {/* Section 4: Refinement */}
            <section className="relative py-12 md:py-20">
                <GridContainer>
                    <AnimatedSection className="md:ml-[20%] md:w-[50%]">
                        <motion.span
                            variants={fadeInUp}
                            className={`${roboto.className} text-blue-400 text-base md:text-lg tracking-wide`}
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
                <GridContainer className="mt-12 md:mt-16">
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
                                src="/projects/truereligion/truvideo.mp4"
                                controls
                            />
                        </div>
                        <span className={`${roboto.className} text-white/40 text-sm md:text-base mt-3 block`}>
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

"use client";
import { pixelify, roboto } from "@/app/ui/fonts";
import TransparentVideo from "@/components/SplashVideo";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MagneticWrapper } from "@/components/MagneticButton";

const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.2
        }
    }
};

function GridContainer({ children, className = "" }: { children: React.ReactNode; className?: string }) {
    return (
        <div className={`w-full max-w-[1400px] mx-auto px-5 md:px-8 ${className}`}>
            {children}
        </div>
    );
}

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

const contactLinks = [
    {
        label: "LinkedIn",
        tag: "Professional",
        href: "https://www.linkedin.com/in/akin-tewe-38523418a/",
    },
    {
        label: "@eightybot",
        tag: "Design Account 1",
        href: "https://www.instagram.com/eightybot/",
    },
    {
        label: "@n8ghbr",
        tag: "Design Account 2",
        href: "https://www.instagram.com/n8ghbr/",
    },
    {
        label: "Email",
        tag: "Direct",
        href: "mailto:akintewe.work@gmail.com",
    },
];

export default function ContactMe() {
    const heroRef = useRef(null);
    const isHeroInView = useInView(heroRef, { once: true });

    return (
        <main className="overflow-x-hidden">
            {/* ============================================ */}
            {/* BLUE ACCENT STRIP - Quote */}
            {/* ============================================ */}
            <section className="relative bg-blue-600 pt-14 md:pt-16 pb-14 md:pb-16">
                <GridOverlay />
                <GridContainer>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={isHeroInView ? { opacity: 1 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="md:w-[60%]"
                    >
                        <div className="border-l-2 border-white/70 pl-6 md:pl-8">
                            <span className={`${roboto.className} text-white text-xl md:text-3xl font-light leading-relaxed`}>
                                {`Whether it's a product, a brand, or something in between, I'm always looking for the next thing to pour intention into.`}
                            </span>
                        </div>
                    </motion.div>
                </GridContainer>
            </section>

            {/* ============================================ */}
            {/* DARK SECTION: Main Content */}
            {/* ============================================ */}
            <section
                ref={heroRef}
                className="relative bg-black pb-16 md:pb-24"
            >
                <GridOverlay />

                {/* 3D Character — Background on Desktop */}
                <div className="hidden md:block absolute right-0 top-0 bottom-0 w-[40%] pointer-events-none overflow-hidden">
                    <div className="relative w-full h-full">
                        <TransparentVideo mp4Src="contactvid.mp4" />
                    </div>
                    {/* Fade into dark bg */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />
                </div>

                <GridContainer className="relative z-10">
                    {/* Headline */}
                    <div className="md:w-[40%] pt-16 md:pt-16">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className={`${pixelify.className} text-5xl md:text-6xl lg:text-7xl text-white leading-tight`}
                        >
                            want to
                            <br />
                            <span className="text-blue-400 italic">talk?</span>
                        </motion.h1>
                    </div>

                    {/* Contact Links — Large Interactive Blocks */}
                    <div className="md:w-[60%] mt-16 md:mt-20">
                        <AnimatedSection className="flex flex-col">
                            {contactLinks.map((link, index) => (
                                <motion.div key={index} variants={fadeInUp}>
                                    <MagneticWrapper>
                                        <Link
                                            href={link.href}
                                            target={link.href.startsWith("mailto") ? undefined : "_blank"}
                                            rel={link.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                                            className="group flex flex-col gap-1 py-6 md:py-8 border-b border-white/10 hover:border-blue-500/50 transition-colors"
                                        >
                                            <span className={`${pixelify.className} text-white text-2xl md:text-3xl group-hover:text-blue-400 transition-colors`}>
                                                {link.label}
                                            </span>
                                            <span className={`${roboto.className} text-white/30 text-sm font-light uppercase tracking-wider`}>
                                                {link.tag}
                                            </span>
                                        </Link>
                                    </MagneticWrapper>
                                </motion.div>
                            ))}
                        </AnimatedSection>
                    </div>

                    {/* 3D Character — Mobile */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="md:hidden relative h-[40vh] mt-12"
                    >
                        <TransparentVideo mp4Src="contactvid.mp4" />
                        {/* Left fade */}
                        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-black to-transparent pointer-events-none z-10" />
                        {/* Right fade */}
                        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-black to-transparent pointer-events-none z-10" />
                    </motion.div>
                </GridContainer>
            </section>
        </main>
    );
}

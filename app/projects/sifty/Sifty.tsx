"use client";
import { pixelify, roboto } from "@/app/ui/fonts"
import { MagneticWrapper } from "@/components/MagneticButton";
import { useRef } from "react";
import { ExternalLink, Check, Calendar, Layers, Sun } from "lucide-react";
import Link from "next/link"
import { motion, useInView } from "framer-motion";
import { useLoader } from "@/components/LoaderContext";

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

function GridContainer({ children, className = "", id }: { children: React.ReactNode; className?: string; id?: string }) {
    return (
        <div id={id} className={`w-full max-w-[1400px] mx-auto px-5 md:px-8 ${className}`}>
            {children}
        </div>
    );
}

// Section wrapper component for consistent animations
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

// Feature card component - dark version
function FeatureCard({ icon: Icon, title, description }: { icon: React.ElementType; title: string; description: string }) {
    return (
        <motion.div
            variants={fadeInUp}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors duration-300"
        >
            <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mb-4">
                <Icon className="w-6 h-6 text-green-400" />
            </div>
            <h3 className={`${pixelify.className} text-white text-lg mb-2 uppercase`}>{title}</h3>
            <p className={`${roboto.className} text-white/60 font-light text-sm leading-relaxed`}>{description}</p>
        </motion.div>
    );
}

// Feature card for light sections
function FeatureCardLight({ icon: Icon, title, description }: { icon: React.ElementType; title: string; description: string }) {
    return (
        <motion.div
            variants={fadeInUp}
            className="bg-black/5 backdrop-blur-sm border border-black/10 rounded-2xl p-6 hover:bg-black/10 transition-colors duration-300"
        >
            <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mb-4">
                <Icon className="w-6 h-6 text-green-600" />
            </div>
            <h3 className={`${pixelify.className} text-black text-lg mb-2 uppercase`}>{title}</h3>
            <p className={`${roboto.className} text-black/60 font-light text-sm leading-relaxed`}>{description}</p>
        </motion.div>
    );
}

// Tech stack pill component
function TechPill({ name }: { name: string }) {
    return (
        <span className={`${roboto.className} text-xs md:text-sm text-white/80 bg-white/10 px-3 py-1 rounded-md border border-white/10`}>
            {name}
        </span>
    );
}

// Video container with hover effects - dark version
function VideoContainer({ src, caption }: { src: string; caption: string }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="group"
        >
            <div className="relative overflow-hidden bg-white/10 p-2 md:p-3 rounded-xl transition-all duration-300 group-hover:bg-white/15">
                <video
                    className="w-full h-auto rounded-lg"
                    src={src}
                    autoPlay
                    loop
                    muted
                    playsInline
                />
            </div>
            <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.3 }}
                className={`${roboto.className} text-white/40 text-center mt-3 italic text-sm md:text-base`}
            >
                {caption}
            </motion.div>
        </motion.div>
    );
}

// Video container for light sections
function VideoContainerLight({ src, caption }: { src: string; caption: string }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="group"
        >
            <div className="relative overflow-hidden bg-black/10 p-2 md:p-3 rounded-xl transition-all duration-300 group-hover:bg-black/15">
                <video
                    className="w-full h-auto rounded-lg"
                    src={src}
                    autoPlay
                    loop
                    muted
                    playsInline
                />
            </div>
            <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.3 }}
                className={`${roboto.className} text-black/40 text-center mt-3 italic text-sm md:text-base`}
            >
                {caption}
            </motion.div>
        </motion.div>
    );
}

export default function Sifty() {
    const { show, hide } = useLoader();
    const heroRef = useRef(null);
    const isHeroInView = useInView(heroRef, { once: true });

    return (
        <main className="overflow-x-hidden">
            {/* 1. Hero Section - Dark */}
            <section
                ref={heroRef}
                className="relative w-full min-h-[100vh] md:min-h-[70vh] flex items-center justify-center py-20 bg-black"
            >
                <GridOverlay />
                <GridContainer className="flex justify-center">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className="flex flex-col items-center text-center max-w-4xl relative z-10"
                    >
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className={`${pixelify.className} text-6xl md:text-8xl lg:text-9xl text-white mb-4`}
                    >
                        sifty
                    </motion.h1>
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className={`${pixelify.className} text-green-400 text-xl md:text-2xl uppercase tracking-wider mb-8`}
                    >
                        Project Tracking for Freelancers
                    </motion.span>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className={`${roboto.className} text-white/80 font-light text-lg md:text-xl lg:text-2xl max-w-2xl leading-relaxed mb-10`}
                    >
                        A lightweight tool for visualizing project scope and tracking progress.
                        Built for freelancers and small studios who need clarity without complexity.
                    </motion.p>

                    {/* Tech Stack Pills */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className="flex flex-wrap justify-center gap-2 md:gap-3 mb-12"
                    >
                        <TechPill name="Next.js" />
                        <TechPill name="React" />
                        <TechPill name="TypeScript" />
                        <TechPill name="Tailwind" />
                        <TechPill name="Supabase" />
                        <TechPill name="Framer Motion" />
                    </motion.div>

                    {/* Hero Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        className="flex flex-wrap gap-4 justify-center"
                    >
                        <MagneticWrapper>
                            <button
                                onClick={() => document.getElementById('preview')?.scrollIntoView({ behavior: 'smooth' })}
                                className={`${pixelify.className} px-6 py-3 border border-white/30 text-white/80 text-base hover:bg-white/10 transition-colors tracking-wide uppercase rounded-md`}
                            >
                                View Project
                            </button>
                        </MagneticWrapper>
                        <MagneticWrapper>
                            <a
                                href="https://sifty.app"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`${pixelify.className} px-6 py-3 bg-green-500 text-black text-base hover:bg-green-400 transition-colors flex items-center gap-2 tracking-wide uppercase rounded-md`}
                            >
                                <ExternalLink className="w-4 h-4" />
                                Visit Live Site
                            </a>
                        </MagneticWrapper>
                    </motion.div>
                    </motion.div>
                </GridContainer>
            </section>

            {/* 2. App Preview Section - Dark */}
            <section id="preview" className="relative py-20 md:py-24 bg-black">
                <GridOverlay />
                <GridContainer>
                    <AnimatedSection className="flex flex-col items-center relative z-10">
                        <VideoContainer
                            src="/projects/sifty/main_thumbnail_video.mp4"
                            caption="Visual timeline interface for tracking project scope"
                        />
                    </AnimatedSection>
                </GridContainer>
            </section>

            {/* Development Approach Section - White */}
            <section className="relative py-16 md:py-20 bg-white">
                <GridOverlayLight />
                <GridContainer>
                    <AnimatedSection className="md:ml-[20%] md:w-[50%] relative z-10">
                        <motion.p
                            variants={fadeInUp}
                            className={`${roboto.className} text-black/70 font-light text-base md:text-xl leading-relaxed`}
                        >
                            Built by leveraging <span className="text-black">Claude Code</span> to rapidly implement features, iterate on UI interactions, and test functionality throughout development. The backend uses <span className="text-black">Supabase</span> with PostgreSQL for secure data storage and real-time updates.
                        </motion.p>
                    </AnimatedSection>
                </GridContainer>
            </section>

            {/* 3. Core Features Section - White */}
            <section className="relative py-20 md:py-24 bg-white">
                <GridOverlayLight />
                <GridContainer>
                    <AnimatedSection className="flex flex-col gap-12 relative z-10">
                    <motion.h2
                        variants={fadeInUp}
                        className={`${pixelify.className} text-black text-2xl md:text-3xl lg:text-4xl text-center`}
                    >
                        BUILT FOR CLARITY
                    </motion.h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                        <FeatureCardLight
                            icon={Layers}
                            title="Visual Timeline"
                            description="See your entire project scope at a glance. Tasks and milestones arranged chronologically."
                        />
                        <FeatureCardLight
                            icon={Calendar}
                            title="Smart Scheduling"
                            description="Expected dates with auto-positioning. Movement restrictions keep your timeline accurate."
                        />
                        <FeatureCardLight
                            icon={Check}
                            title="Task Management"
                            description="Expandable task pills with notes. Track progress from pending to complete."
                        />
                        <FeatureCardLight
                            icon={Sun}
                            title="Light & Dark Themes"
                            description="Full theme support with carefully crafted color palettes for any environment."
                        />
                    </div>
                    </AnimatedSection>
                </GridContainer>
            </section>

            {/* Pull Quote - Green Section */}
            <section className="relative py-16 md:py-24 bg-green-600">
                <GridOverlay />
                <GridContainer className="relative z-10">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="md:w-[60%] mx-auto"
                    >
                        <div className="border-l-2 border-white pl-6 md:pl-8">
                            <span className={`${roboto.className} text-white text-2xl md:text-3xl font-light leading-relaxed`}>
                                {`Simple onboarding flow. Create a project in seconds and visualize your scope immediately.`}
                            </span>
                            <span className={`${roboto.className} text-white/70 text-base block mt-4`}>
                                Built with freelancers in mind.
                            </span>
                        </div>
                    </motion.div>
                </GridContainer>
            </section>

            {/* 4. Project Creation Section - Dark */}
            <section className="relative py-20 md:py-24 bg-black">
                <GridOverlay />
                <GridContainer>
                    <AnimatedSection className="flex flex-col gap-8 md:gap-12 relative z-10">
                    <motion.h2
                        variants={fadeInUp}
                        className={`${pixelify.className} text-white text-2xl md:text-3xl lg:text-4xl text-center`}
                    >
                        PROJECT CREATION
                    </motion.h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                        <VideoContainer
                            src="/projects/sifty/onboarding_1_form.mp4"
                            caption="Project creation form"
                        />
                        <VideoContainer
                            src="/projects/sifty/onboarding_2_project.mp4"
                            caption="Timeline onboarding"
                        />
                        </div>
                    </AnimatedSection>
                </GridContainer>
            </section>

            {/* 5. UI Components Section - White */}
            <section className="relative py-20 md:py-24 bg-white">
                <GridOverlayLight />
                <GridContainer>
                    <AnimatedSection className="flex flex-col gap-8 md:gap-12 relative z-10">
                    <motion.h2
                        variants={fadeInUp}
                        className={`${pixelify.className} text-black text-2xl md:text-3xl lg:text-4xl text-center`}
                    >
                        THE COMPONENTS
                    </motion.h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                        <VideoContainerLight
                            src="/projects/sifty/task_card.mp4"
                            caption="Task cards with expandable details"
                        />
                        <VideoContainerLight
                            src="/projects/sifty/milestone_card.mp4"
                            caption="Milestone tracking and completion"
                        />
                        </div>
                    </AnimatedSection>
                </GridContainer>
            </section>

            {/* 6. Mobile Implementation Section - Dark */}
            <section className="relative py-20 md:py-24 bg-black">
                <GridOverlay />
                <GridContainer>
                    <AnimatedSection className="flex flex-col gap-8 md:gap-12 max-w-4xl mx-auto relative z-10">
                    <motion.h2
                        variants={fadeInUp}
                        className={`${pixelify.className} text-white text-2xl md:text-3xl lg:text-4xl text-center`}
                    >
                        MOBILE FIRST
                    </motion.h2>

                    <motion.p
                        variants={fadeInUp}
                        className={`${roboto.className} text-white/80 font-light text-base md:text-xl text-center max-w-2xl mx-auto leading-relaxed`}
                    >
                        Supporting 5 distinct viewport sizes with touch-optimized components, the fully responsive design ensures a seamless experience on any device.
                    </motion.p>

                    <div className="flex justify-center">
                        <div className="w-full max-w-sm">
                            <VideoContainer
                                src="/projects/sifty/mobile_view.mp4"
                                caption="Mobile responsive layout"
                            />
                        </div>
                        </div>
                    </AnimatedSection>
                </GridContainer>
            </section>

            {/* 7. Client View Section - White */}
            <section className="relative py-20 md:py-24 bg-white">
                <GridOverlayLight />
                <GridContainer>
                    <AnimatedSection className="flex flex-col gap-8 md:gap-12 relative z-10">
                    <motion.h2
                        variants={fadeInUp}
                        className={`${pixelify.className} text-black text-2xl md:text-3xl lg:text-4xl text-center`}
                    >
                        CLIENT VIEW
                    </motion.h2>

                    <motion.p
                        variants={fadeInUp}
                        className={`${roboto.className} text-black/80 font-light text-base md:text-xl text-center max-w-2xl mx-auto leading-relaxed`}
                    >
                        Share a dedicated read-only view with clients. They see progress without the complexity of the full interface.
                    </motion.p>

                        <VideoContainerLight
                            src="/projects/sifty/client_side_view.mp4"
                            caption="Client-facing project view"
                        />
                    </AnimatedSection>
                </GridContainer>
            </section>

            {/* 8. Tech Stack Section - Dark */}
            <section className="relative py-20 md:py-24 bg-black">
                <GridOverlay />
                <GridContainer>
                    <AnimatedSection className="flex flex-col gap-12 relative z-10">
                    <motion.h2
                        variants={fadeInUp}
                        className={`${pixelify.className} text-white text-2xl md:text-3xl lg:text-4xl text-center`}
                    >
                        TECH STACK
                    </motion.h2>

                    <motion.div
                        variants={staggerContainer}
                        className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 md:gap-6"
                    >
                        {[
                            { name: "Next.js 16", role: "App Router" },
                            { name: "React 19", role: "UI Library" },
                            { name: "TypeScript", role: "Type Safety" },
                            { name: "Tailwind CSS 4", role: "Styling" },
                            { name: "Supabase", role: "PostgreSQL" },
                            { name: "Framer Motion", role: "Animations" },
                            { name: "Radix UI", role: "Primitives" },
                        ].map((tech, index) => (
                            <motion.div
                                key={index}
                                variants={fadeInUp}
                                className="flex flex-col items-center text-center p-4 bg-white/5 rounded-xl border border-white/10"
                            >
                                <span className={`${pixelify.className} text-white text-sm md:text-base`}>{tech.name}</span>
                                <span className={`${roboto.className} text-white/40 text-xs mt-1`}>{tech.role}</span>
                            </motion.div>
                        ))}
                        </motion.div>
                    </AnimatedSection>
                </GridContainer>
            </section>

        </main>
    );
}

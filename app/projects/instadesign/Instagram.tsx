"use client";
import { pixelify, roboto } from "@/app/ui/fonts"
import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import {
    HorizontalBarChart,
    VerticalBarChart,
    DonutChart,
    ComparisonChart,
    chartData
} from "@/components/Charts";

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

// Chart container with glass effect
function ChartContainer({ children, className = "" }: { children: React.ReactNode; className?: string }) {
    return (
        <div className={`bg-white/5 backdrop-blur-sm p-4 md:p-6 rounded-lg border border-white/5 ${className}`}>
            {children}
        </div>
    );
}

export default function Instagram() {
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
                    <div className="md:w-[60%] lg:w-[45%] md:ml-[20%]">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className={`${pixelify.className} text-5xl md:text-6xl lg:text-7xl text-white leading-tight`}
                        >
                            instagram web
                            <br />
                            <span className="text-blue-400 italic">application redesign</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className={`${roboto.className} text-white/70 font-light text-lg md:text-xl mt-6 leading-relaxed`}
                        >
                            A simple question: what are people trying to do when they access
                            Instagram via desktop and where does the platform fail them?
                        </motion.p>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.5 }}
                            className={`${roboto.className} text-white/40 font-light text-base mt-4 italic`}
                        >
                            All code for this project was written from scratch by me.
                        </motion.p>

                        <motion.button
                            initial={{ opacity: 0, y: 20 }}
                            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.6 }}
                            onClick={() => document.getElementById('body')?.scrollIntoView({ behavior: 'smooth' })}
                            className={`${roboto.className} mt-10 px-6 py-3 border border-white/30 rounded-full text-white/80 text-base hover:bg-white/10 transition-colors`}
                        >
                            View Project
                        </motion.button>
                    </div>
                </GridContainer>
            </section>

            {/* Hero Media */}
            <section className="relative pb-16 md:pb-24">
                <GridContainer>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="md:ml-[20%] md:w-[65%]"
                    >
                        <video
                            src="/projects/instadesign/old/figmavidwip.mp4"
                            autoPlay loop muted playsInline
                            className="w-full h-auto rounded-lg"
                        />
                        <span className={`${roboto.className} text-white/40 text-sm md:text-base mt-3 block`}>
                            Full UI overhaul demonstration
                        </span>
                    </motion.div>
                </GridContainer>
            </section>

            {/* Main Content */}
            <section id="body" className="relative py-12 md:py-20">
                {/* Section 1: Research */}
                <GridContainer>
                    <AnimatedSection className="md:ml-[20%] md:w-[50%]">
                        <motion.span
                            variants={fadeInUp}
                            className={`${roboto.className} text-blue-400 text-base md:text-lg tracking-wide`}
                        >
                            Research
                        </motion.span>

                        <motion.p
                            variants={fadeInUp}
                            className={`${roboto.className} text-white/80 font-light text-lg md:text-xl leading-relaxed mt-4`}
                        >
                            Before jumping into ideating solutions and creating interfaces,
                            it was important to ground the project in real user behavior. I conducted an open-ended survey to better understand how users currently engage
                            with the platform, and learn directly from them where misalignment stemmed.
                        </motion.p>

                        <motion.p
                            variants={fadeInUp}
                            className={`${roboto.className} text-white/80 font-light text-lg md:text-xl leading-relaxed mt-6`}
                        >
                            The survey focused on frequency of use, friction points, and perceived usability under both environments.
                        </motion.p>
                    </AnimatedSection>
                </GridContainer>

                {/* Search Comparison Chart */}
                <GridContainer className="mt-10 md:mt-16">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="md:ml-[20%] md:w-[60%]"
                    >
                        <ChartContainer>
                            <h3 className={`${pixelify.className} text-white/70 text-xl md:text-2xl mb-6`}>
                                ease of search comparison
                            </h3>
                            <ComparisonChart
                                leftData={chartData.mobileSearch}
                                rightData={chartData.webSearch}
                                leftTitle="Mobile App"
                                rightTitle="Web Application"
                                type="vertical"
                            />
                        </ChartContainer>
                        <span className={`${roboto.className} text-white/40 text-sm md:text-base mt-3 block`}>
                            Initial chart findings, ease of search comparison
                        </span>
                    </motion.div>
                </GridContainer>

                {/* Platform Usage Chart */}
                <GridContainer className="mt-8 md:mt-12">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="md:ml-[20%] md:w-[60%]"
                    >
                        <ChartContainer>
                            <h3 className={`${pixelify.className} text-white/70 text-xl md:text-2xl mb-6`}>
                                platform usage frequency
                            </h3>
                            <ComparisonChart
                                leftData={chartData.mobileUse}
                                rightData={chartData.webUse}
                                leftTitle="Mobile Usage"
                                rightTitle="Web Usage"
                                type="horizontal"
                            />
                        </ChartContainer>
                        <span className={`${roboto.className} text-white/40 text-sm md:text-base mt-3 block`}>
                            Frequency of use across platforms
                        </span>
                    </motion.div>
                </GridContainer>

                {/* Key Takeaway - Pull Quote */}
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
                                Desktop usage shifts towards utility, while mobile gears itself more towards passive consumption.
                            </span>
                            <span className={`${roboto.className} text-white/50 text-base block mt-4`}>
                                Key insight from user research
                            </span>
                        </div>
                    </motion.div>
                </GridContainer>

                {/* Additional Charts */}
                <GridContainer className="mt-8 md:mt-12">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="md:ml-[20%] md:w-[60%]"
                    >
                        <ChartContainer>
                            <h3 className={`${pixelify.className} text-white/70 text-xl md:text-2xl mb-6`}>
                                additional user insights
                            </h3>
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
                                <VerticalBarChart
                                    data={chartData.useFrequency}
                                    title="Daily Engagement"
                                />
                                <VerticalBarChart
                                    data={chartData.webInteraction}
                                    title="Web Interaction Level"
                                />
                                <VerticalBarChart
                                    data={chartData.webMessaging}
                                    title="Messaging Ease"
                                />
                            </div>
                        </ChartContainer>
                        <span className={`${roboto.className} text-white/40 text-sm md:text-base mt-3 block`}>
                            Additional findings from user research
                        </span>
                    </motion.div>
                </GridContainer>

                {/* User Frustrations */}
                <GridContainer className="mt-8 md:mt-12">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="md:ml-[20%] md:w-[60%]"
                    >
                        <ChartContainer>
                            <h3 className={`${pixelify.className} text-white/70 text-xl md:text-2xl mb-6`}>
                                reported user frustrations
                            </h3>
                            <HorizontalBarChart
                                data={chartData.frustrations}
                                showLabels={true}
                            />
                        </ChartContainer>
                        <span className={`${roboto.className} text-white/40 text-sm md:text-base mt-3 block`}>
                            Primary pain points identified through survey responses
                        </span>
                    </motion.div>
                </GridContainer>

                {/* Identified Issues */}
                <GridContainer className="mt-10 md:mt-16">
                    <AnimatedSection className="md:ml-[20%] md:w-[50%]">
                        <motion.span
                            variants={fadeInUp}
                            className={`${roboto.className} text-blue-400 text-base md:text-lg tracking-wide`}
                        >
                            Additionally Identified
                        </motion.span>

                        <motion.ul
                            variants={staggerContainer}
                            className="flex flex-col gap-3 md:gap-4 mt-6"
                        >
                            {[
                                "Messy navigation",
                                "Poor access to messaging",
                                "Poor visual hierarchy",
                                "Difficulty scanning content"
                            ].map((item, index) => (
                                <motion.li
                                    key={index}
                                    variants={fadeInUp}
                                    className={`${roboto.className} text-white/80 text-lg md:text-xl font-light flex items-center gap-3`}
                                >
                                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full flex-shrink-0"></span>
                                    {item}
                                </motion.li>
                            ))}
                        </motion.ul>
                    </AnimatedSection>
                </GridContainer>

                {/* Improvements Chart */}
                <GridContainer className="mt-8 md:mt-12">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="md:ml-[20%] md:w-[60%]"
                    >
                        <ChartContainer className="flex justify-center">
                            <DonutChart
                                data={chartData.improvements}
                                title="Desired Improvements"
                                size={220}
                            />
                        </ChartContainer>
                        <span className={`${roboto.className} text-white/40 text-sm md:text-base mt-3 block`}>
                            Overall desired changes to infrastructure
                        </span>
                    </motion.div>
                </GridContainer>
            </section>

            {/* Section 2: Ideating Solutions */}
            <section className="relative py-12 md:py-20">
                <GridContainer>
                    <AnimatedSection className="md:ml-[20%] md:w-[50%]">
                        <motion.span
                            variants={fadeInUp}
                            className={`${roboto.className} text-blue-400 text-base md:text-lg tracking-wide`}
                        >
                            Ideation
                        </motion.span>

                        <motion.p
                            variants={fadeInUp}
                            className={`${roboto.className} text-white/80 font-light text-lg md:text-xl leading-relaxed mt-4`}
                        >
                            {`No more need to jump ahead. The redesign can now be tackled with one core principle;
                            keep things clean, but make them easy. Rather than hiding key features behind mountainous clicks and burying them in a cluster of menus, let's consolidate
                            the experience so users can instantly see what's available without feeling overwhelmed.`}
                        </motion.p>

                        <motion.p
                            variants={fadeInUp}
                            className={`${roboto.className} text-white/80 font-light text-lg md:text-xl leading-relaxed mt-6`}
                        >
                            {`The focus wasn't on adding more, but better utilization of the space provided.`}
                        </motion.p>
                    </AnimatedSection>
                </GridContainer>

                {/* UI Concepts - Consolidated Grid */}
                <GridContainer className="mt-10 md:mt-16">
                    <AnimatedSection className="md:ml-[20%] md:w-[65%]">
                        <motion.span
                            variants={fadeInUp}
                            className={`${roboto.className} text-blue-400 text-base md:text-lg tracking-wide`}
                        >
                            UI Concepts
                        </motion.span>

                        <motion.p
                            variants={fadeInUp}
                            className={`${roboto.className} text-white/80 font-light text-lg md:text-xl leading-relaxed mt-4`}
                        >
                            Key interface improvements: a unified search and stories component,
                            enhanced messaging visibility with unread indicators, and a new discovery
                            tab for deliberate content browsing.
                        </motion.p>
                    </AnimatedSection>
                </GridContainer>

                <GridContainer className="mt-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="md:ml-[20%] md:w-[65%]"
                    >
                        {/* Bento Grid - Full content, asymmetric */}
                        <div className="flex flex-col gap-2 max-w-[810px]">
                            {/* Top Row - Search Widget */}
                            <div className="w-full overflow-hidden rounded-lg">
                                <video
                                    src="/projects/instadesign/old/searchwip.mp4"
                                    autoPlay loop muted playsInline
                                    className="w-full h-auto"
                                />
                            </div>

                            {/* Bottom Row - 63/35 split, full content visible */}
                            <div className="flex gap-2 items-start">
                                {/* Messaging - 63% width */}
                                <div className="flex-[61.8] overflow-hidden rounded-lg min-w-0">
                                    <video
                                        src="/projects/instadesign/old/messageswip.mp4"
                                        autoPlay loop muted playsInline
                                        className="w-full h-auto"
                                    />
                                </div>

                                {/* Discovery Tab - 35% width */}
                                <div className="flex-[38.2] overflow-hidden rounded-lg min-w-0">
                                    <Image
                                        src="/projects/instadesign/discovery.gif"
                                        alt="Discovery tab"
                                        width={400}
                                        height={600}
                                        className="w-full h-auto"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Single caption for the grid */}
                        <span className={`${roboto.className} text-white/40 text-sm md:text-base mt-4 block`}>
                            Search consolidation, messaging indicators, and discovery browsing
                        </span>
                    </motion.div>
                </GridContainer>

                {/* Full Figma Prototype */}
                <GridContainer className="mt-10 md:mt-16">
                    <AnimatedSection className="md:ml-[20%] md:w-[50%]">
                        <motion.p
                            variants={fadeInUp}
                            className={`${roboto.className} text-white/80 font-light text-lg md:text-xl leading-relaxed`}
                        >
                            A prototype of the entire layout was built using Figma, where all of these changes come together in unison.
                        </motion.p>
                    </AnimatedSection>
                </GridContainer>

                <GridContainer className="mt-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6 }}
                        className="md:ml-[20%] md:w-[65%]"
                    >
                        <video
                            src="/projects/instadesign/old/figmavidwip.mp4"
                            autoPlay loop muted playsInline
                            className="w-full h-auto rounded-lg"
                        />
                        <span className={`${roboto.className} text-white/40 text-sm md:text-base mt-3 block`}>
                            Full UI overhaul demonstration (Figma)
                        </span>
                    </motion.div>
                </GridContainer>

                {/* Additional Improvements */}
                <GridContainer className="mt-8 md:mt-12">
                    <AnimatedSection className="md:ml-[20%] md:w-[50%]">
                        <motion.span
                            variants={fadeInUp}
                            className={`${roboto.className} text-blue-400 text-base md:text-lg tracking-wide`}
                        >
                            Supporting Improvements
                        </motion.span>

                        <motion.ul
                            variants={staggerContainer}
                            className="flex flex-col gap-3 md:gap-4 mt-6"
                        >
                            {[
                                'New "pull-out" comment browser to keep scrolling as seamless as possible',
                                "Separated reels tab",
                                "Changes to readability of navigation bar",
                                "Cleaner organization of information"
                            ].map((item, index) => (
                                <motion.li
                                    key={index}
                                    variants={fadeInUp}
                                    className={`${roboto.className} text-white/80 text-lg md:text-xl font-light flex items-start gap-3`}
                                >
                                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full flex-shrink-0 mt-2"></span>
                                    {item}
                                </motion.li>
                            ))}
                        </motion.ul>
                    </AnimatedSection>
                </GridContainer>
            </section>

            {/* Section 3: Code Implementation */}
            <section className="relative py-12 md:py-20">
                <GridContainer>
                    <AnimatedSection className="md:ml-[20%] md:w-[50%]">
                        <motion.span
                            variants={fadeInUp}
                            className={`${roboto.className} text-blue-400 text-base md:text-lg tracking-wide`}
                        >
                            Implementation
                        </motion.span>

                        <motion.p
                            variants={fadeInUp}
                            className={`${roboto.className} text-white/80 font-light text-lg md:text-xl leading-relaxed mt-4`}
                        >
                            This marks the most critical phase of this project; realization.
                            Good UX does not end simply at just mockups. Not only did I want to create this visual redesign, but also to polish it into a functional
                            front-end application.
                        </motion.p>
                    </AnimatedSection>
                </GridContainer>

                {/* Code Overview */}
                <GridContainer className="mt-8 md:mt-12">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 md:ml-[20%] md:w-[65%]">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="overflow-hidden"
                        >
                            <Image
                                src="/projects/instadesign/components.gif"
                                alt="Layout Structure"
                                width={280}
                                height={280}
                                className="w-full h-auto rounded"
                            />
                            <span className={`${roboto.className} text-white/40 text-sm md:text-base mt-2 block`}>
                                Component structure
                            </span>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="overflow-hidden"
                        >
                            <Image
                                src="/projects/instadesign/data.gif"
                                alt="Data Files"
                                width={280}
                                height={280}
                                className="w-full h-auto rounded"
                            />
                            <span className={`${roboto.className} text-white/40 text-sm md:text-base mt-2 block`}>
                                Data management
                            </span>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="overflow-hidden"
                        >
                            <Image
                                src="/projects/instadesign/layout.gif"
                                alt="Layout Implementation"
                                width={280}
                                height={280}
                                className="w-full h-auto rounded"
                            />
                            <span className={`${roboto.className} text-white/40 text-sm md:text-base mt-2 block`}>
                                Layout system
                            </span>
                        </motion.div>
                    </div>
                </GridContainer>

                <GridContainer className="mt-8 md:mt-12">
                    <AnimatedSection className="md:ml-[20%] md:w-[50%]">
                        <motion.p
                            variants={fadeInUp}
                            className={`${roboto.className} text-white/80 font-light text-lg md:text-xl leading-relaxed`}
                        >
                            I focused on building a component-based architecture that mirrored the figma
                            system as closely as possible, and implementing responsive behavior that would scale cleanly between desktop breakpoints.
                        </motion.p>
                    </AnimatedSection>
                </GridContainer>

                {/* Final Implementation Video */}
                <GridContainer className="mt-8 md:mt-12">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6 }}
                        className="md:ml-[20%] md:w-[65%]"
                    >
                        <video
                            src="/projects/instadesign/old/codedvidwip.mp4"
                            autoPlay loop muted playsInline
                            className="w-full h-auto rounded-lg"
                        />
                        <span className={`${roboto.className} text-white/40 text-sm md:text-base mt-3 block`}>
                            Full overhaul implementation
                        </span>
                    </motion.div>
                </GridContainer>
            </section>

            {/* Section 4: Impact */}
            <section className="relative py-12 md:py-20">
                <GridContainer>
                    <AnimatedSection className="md:ml-[20%] md:w-[50%]">
                        <motion.span
                            variants={fadeInUp}
                            className={`${roboto.className} text-blue-400 text-base md:text-lg tracking-wide`}
                        >
                            Impact
                        </motion.span>

                        <motion.p
                            variants={fadeInUp}
                            className={`${roboto.className} text-white/80 font-light text-lg md:text-xl leading-relaxed mt-4`}
                        >
                            {`This project doesn't just serve as a fun redesign,
                            but a demonstration of end-to-end product thinking. The final outcome is less important than the capability it demonstrates;
                            the ability to move from user feedback to a functional interface without losing clarity, intent, or usability along the way.`}
                        </motion.p>
                    </AnimatedSection>
                </GridContainer>
            </section>
        </main>
    )
}

"use client";
import { pixelify, roboto } from "@/app/ui/fonts"
import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { MagneticWrapper } from "@/components/MagneticButton";
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

// Gradient divider between sections
function SectionDivider() {
    return (
        <div className="w-full max-w-[1400px] mx-auto px-5 md:px-8">
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

export default function Instagram() {
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
                    <div className="md:w-[60%] lg:w-[45%] md:ml-[20%]">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className={`${pixelify.className} text-5xl md:text-6xl lg:text-7xl text-gray-800 leading-tight`}
                        >
                            instagram web
                            <br />
                            <span className="text-blue-500 italic">application redesign</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className={`${roboto.className} text-black/50 font-light text-lg md:text-xl mt-6 leading-relaxed`}
                        >
                            A simple question: what are people trying to do when they access
                            Instagram via desktop and where does the platform fail them?
                        </motion.p>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.5 }}
                            className={`${roboto.className} text-black/35 font-light text-base mt-4 italic`}
                        >
                            All code for this project was written from scratch by me.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.6 }}
                            className="flex justify-center md:justify-start mt-10"
                        >
                            <MagneticWrapper>
                                <button
                                    onClick={() => document.getElementById('research')?.scrollIntoView({ behavior: 'smooth' })}
                                    className={`${pixelify.className} px-6 py-3 border border-black/20 rounded text-gray-800 text-base tracking-wide uppercase hover:bg-black/5 transition-colors`}
                                >
                                    View Project
                                </button>
                            </MagneticWrapper>
                        </motion.div>
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
                        className="md:w-[65%] mx-auto"
                    >
                        <div className="overflow-hidden rounded-2xl">
                            <video
                                src="/projects/instadesign/old/figmavidwip.mp4"
                                autoPlay loop muted playsInline
                                className="w-full h-auto"
                            />
                        </div>
                        <span className={`${roboto.className} text-black/35 text-sm md:text-base mt-5 block text-center italic`}>
                            Full Figma UI Prototype
                        </span>
                    </motion.div>
                </GridContainer>
            </section>

            <SectionDivider />

            {/* ============================================ */}
            {/* Research */}
            {/* ============================================ */}
            <section id="research" className="relative py-16 md:py-24">
                <GridContainer>
                    <AnimatedSection className="md:ml-[20%] md:w-[50%]">
                        <motion.span
                            variants={fadeInUp}
                            className={`${pixelify.className} text-blue-500 text-2xl md:text-3xl tracking-wide uppercase`}
                        >
                            Research
                        </motion.span>

                        <motion.p
                            variants={fadeInUp}
                            className={`${roboto.className} text-black/80 font-light text-lg md:text-xl leading-relaxed mt-4`}
                        >
                            Before jumping into ideating solutions and creating interfaces,
                            it was important to ground the project in real user behavior. I conducted an open-ended survey to better understand how users currently engage
                            with the platform, and learn directly from them where misalignment stemmed.
                        </motion.p>

                        <motion.p
                            variants={fadeInUp}
                            className={`${roboto.className} text-black/80 font-light text-lg md:text-xl leading-relaxed mt-6`}
                        >
                            The survey focused on frequency of use, friction points, and perceived usability under both environments.
                        </motion.p>
                    </AnimatedSection>
                </GridContainer>

                {/* Charts */}
                <GridContainer className="mt-10 md:mt-16">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="md:w-[60%] mx-auto"
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
                                variant="dark"
                            />
                        </ChartContainer>
                        <span className={`${roboto.className} text-black/35 text-sm md:text-base mt-5 block text-center italic`}>
                            Initial chart findings, ease of search comparison
                        </span>
                    </motion.div>
                </GridContainer>

                <GridContainer className="mt-8 md:mt-12">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="md:w-[60%] mx-auto"
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
                                variant="dark"
                            />
                        </ChartContainer>
                        <span className={`${roboto.className} text-black/35 text-sm md:text-base mt-5 block text-center italic`}>
                            Frequency of use across platforms
                        </span>
                    </motion.div>
                </GridContainer>

                {/* Additional Charts */}
                <GridContainer className="mt-8 md:mt-12">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="md:w-[60%] mx-auto"
                    >
                        <ChartContainer>
                            <h3 className={`${pixelify.className} text-white/70 text-xl md:text-2xl mb-6`}>
                                additional user insights
                            </h3>
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
                                <VerticalBarChart
                                    data={chartData.useFrequency}
                                    title="Daily Engagement"
                                    variant="dark"
                                />
                                <VerticalBarChart
                                    data={chartData.webInteraction}
                                    title="Web Interaction Level"
                                    variant="dark"
                                />
                                <VerticalBarChart
                                    data={chartData.webMessaging}
                                    title="Messaging Ease"
                                    variant="dark"
                                />
                            </div>
                        </ChartContainer>
                        <span className={`${roboto.className} text-black/35 text-sm md:text-base mt-5 block text-center italic`}>
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
                        className="md:w-[60%] mx-auto"
                    >
                        <ChartContainer>
                            <h3 className={`${pixelify.className} text-white/70 text-xl md:text-2xl mb-6`}>
                                reported user frustrations
                            </h3>
                            <HorizontalBarChart
                                data={chartData.frustrations}
                                showLabels={true}
                                variant="dark"
                            />
                        </ChartContainer>
                        <span className={`${roboto.className} text-black/35 text-sm md:text-base mt-5 block text-center italic`}>
                            Primary pain points identified through survey responses
                        </span>
                    </motion.div>
                </GridContainer>

                {/* Identified Issues */}
                <GridContainer className="mt-10 md:mt-16">
                    <div className="md:w-[60%] mx-auto flex flex-col gap-4">
                        <span className={`${pixelify.className} text-blue-500 text-2xl md:text-3xl tracking-wide uppercase mb-2`}>
                            Additionally Identified
                        </span>
                        {[
                            "Messy navigation",
                            "Poor access to messaging",
                            "Poor visual hierarchy",
                            "Difficulty scanning content"
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                                className="border-l-2 border-blue-500 pl-6"
                            >
                                <span className={`${roboto.className} text-black/80 text-lg md:text-xl font-light`}>
                                    {item}
                                </span>
                            </motion.div>
                        ))}
                    </div>
                </GridContainer>

                {/* Improvements Chart */}
                <GridContainer className="mt-8 md:mt-12 pb-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="md:w-[60%] mx-auto"
                    >
                        <ChartContainer className="flex justify-center">
                            <DonutChart
                                data={chartData.improvements}
                                title="Desired Improvements"
                                size={220}
                                variant="dark"
                            />
                        </ChartContainer>
                        <span className={`${roboto.className} text-black/35 text-sm md:text-base mt-5 block text-center italic`}>
                            Overall desired changes to infrastructure
                        </span>
                    </motion.div>
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
                                Desktop usage shifts towards utility, while mobile gears itself more towards passive consumption.
                            </span>
                            <span className={`${roboto.className} text-black/50 text-base block mt-4`}>
                                Key insight from user research
                            </span>
                        </div>
                    </motion.div>
                </GridContainer>
            </section>

            <SectionDivider />

            {/* ============================================ */}
            {/* Ideation & Solution */}
            {/* ============================================ */}
            <section className="relative py-16 md:py-24">
                <GridContainer>
                    <AnimatedSection className="md:ml-[20%] md:w-[50%]">
                        <motion.span
                            variants={fadeInUp}
                            className={`${pixelify.className} text-blue-500 text-2xl md:text-3xl tracking-wide uppercase`}
                        >
                            Ideation
                        </motion.span>

                        <motion.p
                            variants={fadeInUp}
                            className={`${roboto.className} text-black/80 font-light text-lg md:text-xl leading-relaxed mt-4`}
                        >
                            {`No more need to jump ahead. The redesign can now be tackled with one core principle;
                            keep things clean, but make them easy. Rather than hiding key features behind mountainous clicks and burying them in a cluster of menus, let's consolidate
                            the experience so users can instantly see what's available without feeling overwhelmed.`}
                        </motion.p>

                        <motion.p
                            variants={fadeInUp}
                            className={`${roboto.className} text-black/80 font-light text-lg md:text-xl leading-relaxed mt-6`}
                        >
                            {`The focus wasn't on adding more, but better utilization of the space provided.`}
                        </motion.p>
                    </AnimatedSection>
                </GridContainer>

                {/* UI Concepts */}
                <GridContainer className="mt-10 md:mt-16">
                    <AnimatedSection className="md:ml-[20%] md:w-[50%]">
                        <motion.span
                            variants={fadeInUp}
                            className={`${pixelify.className} text-blue-500 text-2xl md:text-3xl tracking-wide uppercase`}
                        >
                            UI Concepts
                        </motion.span>

                        <motion.p
                            variants={fadeInUp}
                            className={`${roboto.className} text-black/80 font-light text-lg md:text-xl leading-relaxed mt-4`}
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
                        className="md:w-[65%] mx-auto"
                    >
                        {/* Bento Grid */}
                        <div className="flex flex-col gap-2 max-w-[810px]">
                            <div className="w-full overflow-hidden rounded-2xl bg-white p-2">
                                <video
                                    src="/projects/instadesign/old/searchwip.mp4"
                                    autoPlay loop muted playsInline
                                    className="w-full h-auto rounded-xl"
                                />
                            </div>

                            <div className="flex gap-2 items-start">
                                <div className="flex-[61.8] overflow-hidden rounded-2xl bg-white p-2 min-w-0">
                                    <video
                                        src="/projects/instadesign/old/messageswip.mp4"
                                        autoPlay loop muted playsInline
                                        className="w-full h-auto rounded-xl"
                                    />
                                </div>

                                <div className="flex-[38.2] overflow-hidden rounded-2xl bg-white p-2 min-w-0">
                                    <Image
                                        src="/projects/instadesign/discovery.gif"
                                        alt="Discovery tab"
                                        width={400}
                                        height={600}
                                        className="w-full h-auto rounded-xl"
                                    />
                                </div>
                            </div>
                        </div>

                        <span className={`${roboto.className} text-black/35 text-sm md:text-base mt-6 block text-center italic`}>
                            Search consolidation, messaging indicators, and discovery browsing
                        </span>
                    </motion.div>
                </GridContainer>

                {/* Full Figma Prototype */}
                <GridContainer className="mt-10 md:mt-16">
                    <AnimatedSection className="md:ml-[20%] md:w-[50%]">
                        <motion.p
                            variants={fadeInUp}
                            className={`${roboto.className} text-black/80 font-light text-lg md:text-xl leading-relaxed`}
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
                        className="md:w-[65%] mx-auto"
                    >
                        <div className="bg-white p-3 rounded-2xl">
                            <video
                                src="/projects/instadesign/old/figmavidwip.mp4"
                                autoPlay loop muted playsInline
                                className="w-full h-auto rounded-xl"
                            />
                        </div>
                        <span className={`${roboto.className} text-black/35 text-sm md:text-base mt-5 block text-center italic`}>
                            Full UI overhaul demonstration (Figma)
                        </span>
                    </motion.div>
                </GridContainer>

                {/* Additional Improvements */}
                <GridContainer className="mt-8 md:mt-12 pb-8">
                    <div className="md:w-[60%] mx-auto flex flex-col gap-4">
                        <span className={`${pixelify.className} text-blue-500 text-2xl md:text-3xl tracking-wide uppercase mb-2`}>
                            Supporting Improvements
                        </span>
                        {[
                            'New "pull-out" comment browser to keep scrolling as seamless as possible',
                            "Separated reels tab",
                            "Changes to readability of navigation bar",
                            "Cleaner organization of information"
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                                className="border-l-2 border-blue-500 pl-6"
                            >
                                <span className={`${roboto.className} text-black/80 text-lg md:text-xl font-light`}>
                                    {item}
                                </span>
                            </motion.div>
                        ))}
                    </div>
                </GridContainer>
            </section>

            <SectionDivider />

            {/* ============================================ */}
            {/* Implementation */}
            {/* ============================================ */}
            <section className="relative py-16 md:py-24">
                <GridContainer>
                    <AnimatedSection className="md:ml-[20%] md:w-[50%]">
                        <motion.span
                            variants={fadeInUp}
                            className={`${pixelify.className} text-blue-500 text-2xl md:text-3xl tracking-wide uppercase`}
                        >
                            Implementation
                        </motion.span>

                        <motion.p
                            variants={fadeInUp}
                            className={`${roboto.className} text-black/80 font-light text-lg md:text-xl leading-relaxed mt-4`}
                        >
                            This marks the most critical phase of this project; realization.
                            Good UX does not end simply at just mockups. Not only did I want to create this visual redesign, but also to polish it into a functional
                            front-end application.
                        </motion.p>
                    </AnimatedSection>
                </GridContainer>

                {/* Code Overview */}
                <GridContainer className="mt-8 md:mt-12">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 md:w-[130%] md:left-1/2 md:relative md:-translate-x-1/2">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="overflow-hidden rounded-2xl"
                        >
                            <Image
                                src="/projects/instadesign/components.gif"
                                alt="Layout Structure"
                                width={280}
                                height={280}
                                className="w-full h-auto"
                            />
                            <span className={`${roboto.className} text-black/35 text-sm md:text-base mt-4 block text-center italic`}>
                                Component structure
                            </span>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="overflow-hidden rounded-2xl"
                        >
                            <Image
                                src="/projects/instadesign/data.gif"
                                alt="Data Files"
                                width={280}
                                height={280}
                                className="w-full h-auto"
                            />
                            <span className={`${roboto.className} text-black/35 text-sm md:text-base mt-4 block text-center italic`}>
                                Data management
                            </span>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="overflow-hidden rounded-2xl"
                        >
                            <Image
                                src="/projects/instadesign/layout.gif"
                                alt="Layout Implementation"
                                width={280}
                                height={280}
                                className="w-full h-auto"
                            />
                            <span className={`${roboto.className} text-black/35 text-sm md:text-base mt-4 block text-center italic`}>
                                Layout system
                            </span>
                        </motion.div>
                    </div>
                </GridContainer>

                <GridContainer className="mt-8 md:mt-12">
                    <AnimatedSection className="md:ml-[20%] md:w-[50%]">
                        <motion.p
                            variants={fadeInUp}
                            className={`${roboto.className} text-black/80 font-light text-lg md:text-xl leading-relaxed`}
                        >
                            I focused on building a component-based architecture that mirrored the figma
                            prototype as closely as possible, and implementing responsive behavior that would scale cleanly between desktop breakpoints.
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
                        className="md:w-[65%] mx-auto"
                    >
                        <div className="overflow-hidden rounded-2xl">
                            <video
                                src="/projects/instadesign/old/codedvidwip.mp4"
                                autoPlay loop muted playsInline
                                className="w-full h-auto"
                            />
                        </div>
                        <span className={`${roboto.className} text-black/35 text-sm md:text-base mt-5 block text-center italic`}>
                            Full overhaul implementation
                        </span>
                    </motion.div>
                </GridContainer>
            </section>

            <SectionDivider />

            {/* ============================================ */}
            {/* Impact (Conclusion) */}
            {/* ============================================ */}
            <section className="relative py-16 md:py-24">
                <GridContainer>
                    <AnimatedSection className="md:ml-[20%] md:w-[50%]">
                        <motion.span
                            variants={fadeInUp}
                            className={`${pixelify.className} text-blue-500 text-2xl md:text-3xl tracking-wide uppercase`}
                        >
                            Impact
                        </motion.span>

                        <motion.p
                            variants={fadeInUp}
                            className={`${roboto.className} text-black/80 font-light text-lg md:text-xl leading-relaxed mt-4`}
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

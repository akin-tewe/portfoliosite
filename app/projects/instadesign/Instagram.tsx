"use client";
import { pixelify, roboto } from "@/app/ui/fonts"
import MagneticButton from "@/components/MagneticButton";
import { useRef } from "react";
import { ChevronDown, ExternalLink } from "lucide-react";
import Image from "next/image";
import DragScroll from "@/components/DragScroll";
import Link from "next/link"
import { motion, useInView, } from "framer-motion";
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

const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
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

// Video container with hover effects
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
            <div className="flex relative overflow-hidden bg-white/10 p-2 md:p-[1vw] rounded-lg transition-all duration-300 group-hover:bg-white/15">
                <video
                    className="h-full w-auto z-50 rounded-md"
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
                className={`${roboto.className} text-white/40 justify-self-center text-center mt-2 md:mt-[0.5vw] italic text-sm md:text-base`}
            >
                {caption}
            </motion.div>
        </motion.div>
    );
}

// Chart container with glass effect
function ChartContainer({ children, className = "" }: { children: React.ReactNode; className?: string }) {
    return (
        <div className={`bg-white/10 backdrop-blur-sm p-4 md:p-6 rounded-xl border border-white/5 ${className}`}>
            {children}
        </div>
    );
}

export default function Instagram() {
    const heroRef = useRef(null);
    const isHeroInView = useInView(heroRef, { once: true });

    return (
        <main className="overflow-x-hidden">
            {/* Subtle Grid Overlay */}
            <div className="fixed inset-0 flex h-full w-full gap-[1vw] text-white/5 justify-center pointer-events-none z-0">
                <div className="border w-[15vw] md:w-[12.1vw] border-white/5"></div>
                <div className="border w-[15vw] md:w-[12.1vw] border-white/5"></div>
                <div className="border w-[15vw] md:w-[12.1vw] border-white/5"></div>
                <div className="border w-[15vw] md:w-[12.1vw] border-white/5"></div>
                <div className="border w-[15vw] md:w-[12.1vw] border-white/5"></div>
                <div className="border w-[15vw] md:w-[12.1vw] border-white/5"></div>
            </div>

            {/* Hero Section */}
            <section
                ref={heroRef}
                id="splash"
                className="relative w-full min-h-[100vh] md:min-h-[60vh] flex items-center justify-center md:justify-start px-5 md:px-[5vw] py-20"
            >
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="flex flex-col md:flex-row md:gap-20 w-full max-w-7xl"
                >
                    <div className="relative flex flex-col gap-6 md:gap-10">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className={`${pixelify.className} text-4xl md:text-5xl lg:text-6xl text-white max-w-xs md:max-w-2xl leading-tight`}
                        >
                            instagram web application redesign
                        </motion.h1>
                        <motion.span
                            initial={{ opacity: 0, y: 20 }}
                            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className={`${roboto.className} text-white/80 font-light text-lg md:text-xl lg:text-2xl md:max-w-2xl leading-relaxed`}
                        >
                            A simple question: what are people trying to do when they access
                            Instagram via desktop and where does the platform fail them?
                            <span className="block mt-4 text-white/50 text-sm md:text-base italic">
                                ( All code for this project was written from scratch by me. )
                            </span>
                        </motion.span>
                    </div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={isHeroInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        className={`${pixelify.className} text-xl flex flex-col items-center md:flex-row gap-6 mt-10 md:mt-auto justify-center md:ml-auto`}
                    >
                        <button
                            className="flex justify-center items-center w-auto h-auto z-10"
                            onClick={() => document.getElementById('body')?.scrollIntoView({ behavior: 'smooth' })}
                        >
                            <MagneticButton
                                icon={<ChevronDown className="md:hidden text-white z-50" />}
                                parameter="w-15 h-15 md:w-50 md:h-15 bg-blue-600/50 md:bg-blue-500/0 hover:bg-blue-600/50 z-20"
                                text="Read More"
                            />
                        </button>
                    </motion.div>
                </motion.div>
            </section>

            {/* Spacer for mobile */}
            <section className="h-[50px] md:h-0"></section>

            {/* Main Content */}
            <section id="body" className="relative pb-20 md:pb-40 px-5 md:px-[8vw] lg:px-[11vw] z-10">
                <div className="flex flex-col gap-16 md:gap-24 max-w-4xl">

                    {/* Section 1: Learning from Users */}
                    <AnimatedSection className="flex flex-col gap-8 md:gap-12">
                        <VideoContainer
                            src="/projects/instadesign/old/figmavidwip.mp4"
                            caption="figma overhaul implementation."
                        />

                        <motion.div variants={fadeInUp}>
                            <h2 className={`${pixelify.className} text-white text-2xl md:text-3xl lg:text-4xl mb-6`}>
                                learning from their users
                            </h2>
                            <p className={`${roboto.className} text-white/80 text-base md:text-xl lg:text-2xl font-light leading-relaxed`}>
                                Before jumping into ideating solutions and creating interfaces,
                                it was important to ground the project in real user behavior. I conducted an open-ended survey to better understand how users currently engage
                                with the platform, and learn directly from them where misalignment stemmed. I chose an open-ended approach to avoid bias and capture patterns
                                beyond my personal social circle. The survey focused on frequency of use, friction points, and perceived usability under both environments.
                            </p>
                        </motion.div>

                        {/* Search Comparison Charts */}
                        <motion.div variants={fadeInUp}>
                            <ChartContainer>
                                <h3 className={`${pixelify.className} text-white/70 text-lg md:text-xl mb-6 text-center`}>
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
                            <div className={`${roboto.className} text-white/40 text-center mt-3 italic text-sm md:text-base`}>
                                initial chart findings, ease of search comparison.
                            </div>
                        </motion.div>

                        {/* Use Frequency Comparison Charts */}
                        <motion.div variants={fadeInUp}>
                            <ChartContainer>
                                <h3 className={`${pixelify.className} text-white/70 text-lg md:text-xl mb-6 text-center`}>
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
                            <div className={`${roboto.className} text-white/40 text-center mt-3 italic text-sm md:text-base`}>
                                frequency of use across platforms.
                            </div>
                        </motion.div>

                        {/* Key Takeaway */}
                        <motion.div
                            variants={fadeInUp}
                            className="bg-gradient-to-r from-blue-500/20 to-transparent p-6 md:p-8 rounded-xl border-l-4 border-blue-500"
                        >
                            <span className={`${roboto.className} text-white text-lg md:text-xl lg:text-2xl font-medium`}>key takeaway - </span>
                            <span className={`${roboto.className} text-white/80 text-lg md:text-xl lg:text-2xl font-light leading-relaxed`}>
                                desktop usage shifts towards utility (posting and managing content,
                                messaging friends, deliberate browsing), while mobile gears itself more towards passive consumption (scrolling, watching reels, etc.).
                            </span>
                            <span className={`${roboto.className} text-white text-lg md:text-xl lg:text-2xl leading-relaxed block mt-2`}>
                                This shift in behavior became the foundation for the redesign.
                            </span>
                        </motion.div>

                        {/* Additional Findings */}
                        <motion.div variants={fadeInUp}>
                            <ChartContainer>
                                <h3 className={`${pixelify.className} text-white/70 text-lg md:text-xl mb-6 text-center`}>
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
                            <div className={`${roboto.className} text-white/40 text-center mt-3 italic text-sm md:text-base`}>
                                additional findings from user research.
                            </div>
                        </motion.div>

                        {/* User Frustrations Chart */}
                        <motion.div variants={fadeInUp}>
                            <ChartContainer>
                                <h3 className={`${pixelify.className} text-white/70 text-lg md:text-xl mb-6 text-center`}>
                                    reported user frustrations
                                </h3>
                                <HorizontalBarChart
                                    data={chartData.frustrations}
                                    showLabels={true}
                                />
                            </ChartContainer>
                            <div className={`${roboto.className} text-white/40 text-center mt-3 italic text-sm md:text-base`}>
                                primary pain points identified through survey responses.
                            </div>
                        </motion.div>

                        {/* Identified Issues */}
                        <motion.div variants={fadeInUp} className="flex flex-col gap-4">
                            <p className={`${roboto.className} text-white text-lg md:text-xl lg:text-2xl font-light`}>
                                additionally identified:
                            </p>
                            <motion.ul
                                variants={staggerContainer}
                                className="flex flex-col gap-3 md:gap-4 pl-4 md:pl-8"
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
                                        className={`${roboto.className} text-white/80 text-base md:text-xl lg:text-2xl font-light flex items-center gap-3`}
                                    >
                                        <span className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></span>
                                        {item}
                                    </motion.li>
                                ))}
                            </motion.ul>
                        </motion.div>

                        {/* Improvements Chart */}
                        <motion.div variants={fadeInUp}>
                            <ChartContainer className="flex justify-center">
                                <DonutChart
                                    data={chartData.improvements}
                                    title="Desired Improvements"
                                    size={220}
                                />
                            </ChartContainer>
                            <div className={`${roboto.className} text-white/40 text-center mt-3 italic text-sm md:text-base`}>
                                overall desired changes to infrastructure.
                            </div>
                        </motion.div>
                    </AnimatedSection>

                    {/* Section 2: Ideating Solutions */}
                    <AnimatedSection className="flex flex-col gap-8 md:gap-12">
                        <motion.div variants={fadeInUp}>
                            <h2 className={`${pixelify.className} text-white text-2xl md:text-3xl lg:text-4xl mb-6`}>
                                ideating solutions and creating interfaces.
                            </h2>
                            <p className={`${roboto.className} text-white/80 text-base md:text-xl lg:text-2xl font-light leading-relaxed`}>
                                {`No more need to jump ahead. The redesign can now be tackled with one core principle;
                                keep things clean, but make them easy. Rather than hiding key features behind mountainous clicks and burying them in a cluster of menus, let's consolidate
                                the experience so users can instantly see what's available without feeling overwhelmed.`}
                            </p>
                            <p className={`${roboto.className} mt-6 text-white/80 text-base md:text-xl lg:text-2xl font-light leading-relaxed`}>
                                {`The focus wasn't on adding more, but better utilization of the space provided`}.
                            </p>
                        </motion.div>

                        <motion.div variants={fadeInUp}>
                            <p className={`${roboto.className} mb-6 text-white/80 text-base md:text-xl lg:text-2xl font-light leading-relaxed`}>
                                Search bar and stories merge into one co-existing component. Lives together while
                                maintaining separate identities, and creates a central place for the user to access two monumental features in an intelligent fashion.
                            </p>
                            <VideoContainer
                                src="/projects/instadesign/old/searchwip.mp4"
                                caption="conceptual new search widget."
                            />
                        </motion.div>

                        <motion.div variants={fadeInUp}>
                            <p className={`${roboto.className} mb-6 text-white/80 text-base md:text-xl lg:text-2xl font-light leading-relaxed`}>
                                Implement solid color when unread messages exist. Creates stronger profile and pulls user attention to new information.
                            </p>
                            <VideoContainer
                                src="/projects/instadesign/old/messageswip.mp4"
                                caption="conceptual messaging changes."
                            />
                        </motion.div>

                        <motion.div variants={fadeInUp}>
                            <p className={`${roboto.className} mb-6 text-white/80 text-base md:text-xl lg:text-2xl font-light leading-relaxed`}>
                                New discovery tab implementation. Aids deliberate browsing and helps the user find new topics of interest to them.
                            </p>
                            <div className="flex relative overflow-hidden bg-white/10 p-2 md:p-[1vw] rounded-lg justify-center">
                                <Image
                                    src="/projects/instadesign/discovery.gif"
                                    alt="Discovery Implementation"
                                    className="rounded-md pointer-events-none"
                                    width={400}
                                    height={400}
                                />
                            </div>
                            <div className={`${roboto.className} text-white/40 text-center mt-2 md:mt-[0.5vw] italic text-sm md:text-base`}>
                                New tab additions aid discovery of user-directed content.
                            </div>
                        </motion.div>

                        <motion.div variants={fadeInUp}>
                            <p className={`${roboto.className} mb-6 text-white/80 text-base md:text-xl lg:text-2xl font-light leading-relaxed`}>
                                A prototype of the entire layout was built using Figma, where all of these changes come together in unison.
                                Additional supporting improvements included:
                            </p>
                            <VideoContainer
                                src="/projects/instadesign/old/figmavidwip.mp4"
                                caption="full UI overhaul demonstration (figma)."
                            />
                        </motion.div>

                        <motion.ul
                            variants={staggerContainer}
                            className="flex flex-col gap-3 md:gap-4 pl-4 md:pl-8"
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
                                    className={`${roboto.className} text-white/80 text-base md:text-xl lg:text-2xl font-light flex items-start gap-3`}
                                >
                                    <span className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-2 md:mt-3"></span>
                                    {item}
                                </motion.li>
                            ))}
                        </motion.ul>
                    </AnimatedSection>

                    {/* Section 3: Code Implementation */}
                    <AnimatedSection className="flex flex-col gap-8 md:gap-12">
                        <motion.div variants={fadeInUp}>
                            <h2 className={`${pixelify.className} text-white text-2xl md:text-3xl lg:text-4xl mb-6`}>
                                translating into code.
                            </h2>
                            <p className={`${roboto.className} text-white/80 text-base md:text-xl lg:text-2xl font-light leading-relaxed`}>
                                This marks the most critical phase of this project; realization.
                                Good UX does not end simply at just mockups. Not only did I want to create this visual redesign, but also to polish it into a functional
                                front-end application. Not only to strengthen my ability, but to validate whether the proposed improvements were practical and viable.
                            </p>
                        </motion.div>

                        <motion.div variants={fadeInUp}>
                            <DragScroll className="flex gap-3 md:gap-[1vw] relative w-full bg-white/10 p-3 md:p-[1vw] rounded-lg">
                                <Image
                                    src="/projects/instadesign/components.gif"
                                    alt="Layout Structure"
                                    className="rounded-md pointer-events-none h-48 md:h-64 lg:h-80 w-auto"
                                    width={600}
                                    height={600}
                                />
                                <Image
                                    src="/projects/instadesign/data.gif"
                                    alt="Data Files"
                                    className="rounded-md pointer-events-none h-48 md:h-64 lg:h-80 w-auto"
                                    width={600}
                                    height={600}
                                />
                                <Image
                                    src="/projects/instadesign/layout.gif"
                                    alt="Layout Implementation"
                                    className="rounded-md pointer-events-none h-48 md:h-64 lg:h-80 w-auto"
                                    width={600}
                                    height={600}
                                />
                            </DragScroll>
                            <div className={`${roboto.className} text-white/40 text-center mt-2 md:mt-[0.5vw] italic text-sm md:text-base`}>
                                overview of code implementation.
                            </div>
                        </motion.div>

                        <motion.div variants={fadeInUp}>
                            <p className={`${roboto.className} text-white/80 text-base md:text-xl lg:text-2xl font-light leading-relaxed`}>
                                I focused on building a component-based architecture that mirrored the figma
                                system as closely as possible, and implementing responsive behavior that would scale cleanly between desktop breakpoints. Preserving behavior was
                                equally important as simply recreating visuals. Adjustments were made to conceptual designs during process.
                            </p>
                        </motion.div>

                        <motion.div variants={fadeInUp}>
                            <VideoContainer
                                src="/projects/instadesign/old/codedvidwip.mp4"
                                caption="full overhaul implementation."
                            />
                        </motion.div>
                        {/* Link to GitHub*/}
                        <motion.div variants={fadeInUp} className="hidden">
                            <Link
                                target="_blank"
                                href="https://github.com/akin-tewe/akintewe-igconcept"
                                className={`${roboto.className} hidden inline-flex items-center gap-2 text-white text-base md:text-xl font-medium leading-relaxed transition-all hover:text-blue-400 hover:gap-3 group`}
                            >
                                View the full project on GitHub
                                <ExternalLink className="w-4 h-4 md:w-5 md:h-5 transition-transform group-hover:translate-x-1" />
                            </Link>
                        </motion.div>
                    </AnimatedSection>

                    {/* Section 4: Impact */}
                    <AnimatedSection className="flex flex-col gap-6 md:gap-8">
                        <motion.div variants={fadeInUp}>
                            <h2 className={`${pixelify.className} text-white text-2xl md:text-3xl lg:text-4xl mb-6`}>
                                why did this matter?
                            </h2>
                            <p className={`${roboto.className} text-white/80 text-base md:text-xl lg:text-2xl font-light leading-relaxed`}>
                                {`This project doesn't just serve as a fun redesign,
                                but a demonstration of end-to-end product thinking. The final outcome is less important than the capability it demonstrates;
                                the ability to move from user feedback to a functional interface without losing clarity, intent, or usability along the way.`}
                            </p>
                        </motion.div>

                        {/* Project Summary Card */}
                        <motion.div
                            variants={fadeInUp}
                            className="bg-gradient-to-br from-white/10 to-white/5 p-6 md:p-10 rounded-2xl border border-white/10 mt-8"
                        >
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                                {[
                                    { label: "Research", value: "User Survey" },
                                    { label: "Design", value: "Figma" },
                                    { label: "Development", value: "React/Next.js" },
                                    { label: "Focus", value: "UX Improvement" }
                                ].map((item, index) => (
                                    <div key={index} className="text-center md:text-left">
                                        <div className={`${pixelify.className} text-white/50 text-xs md:text-sm uppercase tracking-wider mb-1`}>
                                            {item.label}
                                        </div>
                                        <div className={`${roboto.className} text-white text-sm md:text-lg font-light`}>
                                            {item.value}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </AnimatedSection>
                </div>
            </section>
        </main>
    )
}

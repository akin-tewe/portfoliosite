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
import ProjectMetrics from "@/components/ProjectMetrics";
import CaseStudySidebar from "@/components/CaseStudySidebar";

const instagramSections = [
    { id: 'research', label: 'Research' },
    { id: 'ideation', label: 'Ideation' },
    { id: 'scope', label: 'Scope' },
    { id: 'impact', label: 'Impact' },
];

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
        <div className={`w-full max-w-[1000px] mx-auto px-8 ${className}`}>
            {children}
        </div>
    );
}

// Gradient divider between sections
function SectionDivider() {
    return (
        <div className="w-full max-w-[1000px] mx-auto px-8">
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
        <main className="overflow-x-clip">
            {/* ============================================ */}
            {/* Hero */}
            {/* ============================================ */}
            <section
                ref={heroRef}
                className="relative bg-[#fafafa] pt-32 md:pt-40 pb-16 md:pb-24"
            >
                <GridContainer>
                    <div>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className={`${pixelify.className} text-4xl md:text-5xl lg:text-6xl text-gray-800 leading-tight`}
                        >
                            instagram web
                            <br />
                            <span className="text-blue-500">application redesign</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className={`${roboto.className} text-black/50 font-light text-base md:text-lg lg:text-xl mt-6 leading-relaxed`}
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
                            All code for this project was written from scratch by me, without direct AI assistance.
                        </motion.p>

                    </div>
                </GridContainer>
            <ProjectMetrics metrics={[
                { label: "Role", value: "UX Research \u00B7 Design \u00B7 Development" },
                { label: "Type", value: "Concept Redesign" },
                { label: "Method", value: "Survey \u00B7 Figma Prototype \u00B7 Code" },
                { label: "Scope", value: "End-to-End" },
            ]} />
            </section>

            <div className="lg:grid lg:grid-cols-[200px_minmax(0,1fr)]">
                <CaseStudySidebar sections={instagramSections} />
                <div className="lg:-translate-x-[100px]">

            {/* Hero Media */}
            <section className="relative pb-16 md:pb-24">
                <GridContainer>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className=""
                    >
                        <div className="overflow-hidden rounded-2xl">
                            <video
                                src="/projects/instadesign/old/figmavidwip.mp4"
                                autoPlay loop muted playsInline
                                className="h-auto max-w-none"
                                style={{ width: 'calc(100% + 16px)', margin: '-8px' }}
                            />
                        </div>
                        <span className={`${roboto.className} text-black/35 text-sm mt-5 block text-center italic`}>
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
                    <AnimatedSection className="">
                        <motion.span
                            variants={fadeInUp}
                            className={`${roboto.className} text-sm md:text-base text-black/40 uppercase tracking-[0.2em] font-normal`}
                        >
                            Research
                        </motion.span>

                        <motion.p
                            variants={fadeInUp}
                            className={`${roboto.className} text-black/80 font-light text-base md:text-lg leading-relaxed mt-4`}
                        >
                            Before jumping into ideating solutions and creating interfaces,
                            it was important to ground the project in real user behavior. I conducted an open-ended survey to better understand how users currently engage
                            with the platform, and learn directly from them where misalignment stemmed.
                        </motion.p>

                        <motion.p
                            variants={fadeInUp}
                            className={`${roboto.className} text-black/80 font-light text-base md:text-lg leading-relaxed mt-6`}
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
                        className=""
                    >
                        <ChartContainer>
                            <h3 className={`${pixelify.className} text-white/70 text-lg md:text-xl mb-6`}>
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
                        <span className={`${roboto.className} text-black/35 text-sm mt-5 block text-center italic`}>
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
                        className=""
                    >
                        <ChartContainer>
                            <h3 className={`${pixelify.className} text-white/70 text-lg md:text-xl mb-6`}>
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
                        <span className={`${roboto.className} text-black/35 text-sm mt-5 block text-center italic`}>
                            Frequency of use across platforms
                        </span>
                    </motion.div>
                </GridContainer>

                <GridContainer className="mt-8">
                    <p className={`${roboto.className} text-black/80 font-light text-base md:text-lg leading-relaxed`}>
                        Across both charts, one pattern remained consistent. Mobile users found things easy, and engaged with the app on a more frequent basis. Web users struggled on the same tasks and visited notably less frequently. Generally, web users also engaged only with a primary goal in mind, while mobile users engaged in a more casual format. The web app is treated differently than the mobile app, but the web app does nothing to aid that difference.
                    </p>
                </GridContainer>

                {/* Additional Charts */}
                <GridContainer className="mt-8 md:mt-12">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className=""
                    >
                        <ChartContainer>
                            <h3 className={`${pixelify.className} text-white/70 text-lg md:text-xl mb-6`}>
                                additional user insights
                            </h3>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
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
                        <span className={`${roboto.className} text-black/35 text-sm mt-5 block text-center italic`}>
                            Additional findings from user research
                        </span>
                    </motion.div>
                </GridContainer>

                <GridContainer className="mt-8">
                    <p className={`${roboto.className} text-black/80 font-light text-base md:text-lg leading-relaxed`}>
                        Messaging was a large standout here. Almost nobody rated it as &ldquo;easy&rdquo; on web. Interaction levels were moderate across the board, but messaging ease was lopsided enough to justify it as a core focus of the redesign.
                    </p>
                </GridContainer>

                {/* User Frustrations */}
                <GridContainer className="mt-8 md:mt-12">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className=""
                    >
                        <ChartContainer>
                            <h3 className={`${pixelify.className} text-white/70 text-lg md:text-xl mb-6`}>
                                reported user frustrations
                            </h3>
                            <HorizontalBarChart
                                data={chartData.frustrations}
                                showLabels={true}
                                variant="dark"
                            />
                        </ChartContainer>
                        <span className={`${roboto.className} text-black/35 text-sm mt-5 block text-center italic`}>
                            Primary pain points identified through survey responses
                        </span>
                    </motion.div>
                </GridContainer>

                {/* Identified Issues */}
                <GridContainer className="mt-10 md:mt-16">
                    <div className="flex flex-col gap-4">
                        <span className={`${roboto.className} text-sm md:text-base text-black/40 uppercase tracking-[0.2em] font-normal mb-2`}>
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
                                className="border-l-2 border-blue-500 pl-6 md:pl-8"
                            >
                                <span className={`${roboto.className} text-black/80 text-base md:text-lg font-light`}>
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
                        className=""
                    >
                        <ChartContainer className="flex justify-center">
                            <DonutChart
                                data={chartData.improvements}
                                title="Desired Improvements"
                                size={220}
                                variant="dark"
                            />
                        </ChartContainer>
                        <span className={`${roboto.className} text-black/35 text-sm mt-5 block text-center italic`}>
                            Overall desired changes to infrastructure
                        </span>
                    </motion.div>
                </GridContainer>
            </section>

            <SectionDivider />

            {/* ============================================ */}
            {/* Ideation & Solution */}
            {/* ============================================ */}
            <section id="ideation" className="relative py-16 md:py-24">
                <GridContainer>
                    <AnimatedSection className="">
                        <motion.span
                            variants={fadeInUp}
                            className={`${roboto.className} text-sm md:text-base text-black/40 uppercase tracking-[0.2em] font-normal`}
                        >
                            Ideation
                        </motion.span>

                        <motion.p
                            variants={fadeInUp}
                            className={`${roboto.className} text-black/80 font-light text-base md:text-lg leading-relaxed mt-4`}
                        >
                            The survey made one thing clear: desktop users come to Instagram with intent. They&apos;re searching for specific accounts, responding to messages, or browsing content they&apos;ve already been pointed to. The mobile app handles passive scrolling well, but the web app forces that same passive layout onto users who are trying to do something specific.
                        </motion.p>

                        <motion.p
                            variants={fadeInUp}
                            className={`${roboto.className} text-black/80 font-light text-base md:text-lg leading-relaxed mt-6`}
                        >
                            That reframing shaped every decision. Instead of redesigning the entire platform, I focused on three areas where desktop behavior diverged most from what the interface supported: search, messaging, and content discovery.
                        </motion.p>
                    </AnimatedSection>
                </GridContainer>

                {/* UI Concepts */}
                <GridContainer className="mt-10 md:mt-16">
                    <AnimatedSection className="">
                        <motion.span
                            variants={fadeInUp}
                            className={`${roboto.className} text-sm md:text-base text-black/40 uppercase tracking-[0.2em] font-normal`}
                        >
                            UI Concepts
                        </motion.span>

                        <motion.div variants={fadeInUp} className="mt-4">
                            <div className="mb-8">
                                <span className={`${roboto.className} font-light text-xs md:text-sm uppercase tracking-wider text-gray-800`}>
                                    Unified search and stories
                                </span>
                                <p className={`${roboto.className} text-black/80 font-light text-base md:text-lg leading-relaxed mt-2`}>
                                    The existing web app separates search and stories into different interaction points, requiring users to navigate away from their feed to access either. Putting them in one component keeps the user in context while giving both features a persistent home. It does make the top section denser, but the survey showed users cared more about quick access than visual breathing room. The other option was improving search and stories independently, keeping them in separate places. But that still would have required users to leave their feed for either one, which was the core problem.
                                </p>
                            </div>
                            <div className="mb-8">
                                <span className={`${roboto.className} font-light text-xs md:text-sm uppercase tracking-wider text-gray-800`}>
                                    Persistent messaging
                                </span>
                                <p className={`${roboto.className} text-black/80 font-light text-base md:text-lg leading-relaxed mt-2`}>
                                    Messaging was buried behind navigation that mirrored the mobile app&apos;s icon-based layout. On desktop, users have the screen space for a visible messaging panel with unread indicators. Making it visible drops the clicks to check messages from three to zero; that matters when &quot;respond to messages&quot; is one of the main reasons people open the web app at all. I considered a chat overlay that pops up on demand, similar to Facebook&apos;s web messenger. But an overlay still hides conversations by default, and the survey showed that people were specifically frustrated by not being able to see unread messages without clicking through.
                                </p>
                            </div>
                            <div>
                                <span className={`${roboto.className} font-light text-xs md:text-sm uppercase tracking-wider text-gray-800`}>
                                    Discovery tab
                                </span>
                                <p className={`${roboto.className} text-black/80 font-light text-base md:text-lg leading-relaxed mt-2`}>
                                    The current explore page mixes algorithmic recommendations with search results. I split these into a dedicated discovery tab, separate from search. Users can browse for new content on their own terms instead of having it show up in their search flow. The simpler approach would have been to just improve the existing explore page. But the explore page tries to serve two different goals at once, and the survey data showed that users who wanted to search and users who wanted to browse were frustrated for different reasons. Splitting them apart was cleaner than trying to fix both problems in one view.
                                </p>
                            </div>
                        </motion.div>
                    </AnimatedSection>
                </GridContainer>

                <GridContainer className="mt-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className=""
                    >
                        {/* Bento Grid */}
                        <div className="flex flex-col gap-2 max-w-[810px] mx-auto">
                            <div className="w-full overflow-hidden rounded-2xl bg-white p-2">
                                <div className="overflow-hidden rounded-xl">
                                    <video
                                        src="/projects/instadesign/old/searchwip.mp4"
                                        autoPlay loop muted playsInline
                                        className="w-full h-auto"
                                        style={{ marginTop: '-8px', marginBottom: '-8px' }}
                                    />
                                </div>
                            </div>

                            <div className="flex gap-2 items-start">
                                <div className="flex-[61.8] overflow-hidden rounded-2xl bg-white p-2 min-w-0">
                                    <div className="overflow-hidden rounded-xl">
                                        <video
                                            src="/projects/instadesign/old/messageswip.mp4"
                                            autoPlay loop muted playsInline
                                            className="h-auto max-w-none"
                                            style={{ width: 'calc(100% + 8px)' }}
                                        />
                                    </div>
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

                        <span className={`${roboto.className} text-black/35 text-sm mt-6 block text-center italic`}>
                            Search consolidation, messaging indicators, and discovery browsing
                        </span>
                    </motion.div>
                </GridContainer>

                {/* Additional Improvements */}
                <GridContainer className="mt-8 md:mt-12 pb-8">
                    <div className="flex flex-col gap-4">
                        <span className={`${roboto.className} text-sm md:text-base text-black/40 uppercase tracking-[0.2em] font-normal mb-2`}>
                            Supporting Improvements
                        </span>
                        {[
                            { title: "Pull-out comment browser", explanation: "Comments expand in a sliding panel instead of navigating to a new view, so users never lose their scroll position in the feed." },
                            { title: "Separated reels tab", explanation: "Reels were mixed into the main feed despite being a fundamentally different content format. A separate tab lets users opt into short-form video instead of having it interrupt their browsing." },
                            { title: "Revised navigation hierarchy", explanation: "Reduced the nav bar from icon-only to labeled items for the most-used actions. Desktop users have the space for text labels, and the survey showed navigation clarity was a top frustration." },
                            { title: "Cleaner information density", explanation: "Post metadata, interaction counts, and timestamps were reorganized to create a clearer visual hierarchy. The most important information (who posted, what they said) gets emphasis over secondary metrics." }
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                                className="border-l-2 border-blue-500 pl-6 md:pl-8"
                            >
                                <span className={`${roboto.className} text-black/80 text-base md:text-lg font-light`}>
                                    {item.title}
                                </span>
                                <p className={`${roboto.className} text-black/50 text-sm md:text-base font-light mt-1`}>
                                    {item.explanation}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </GridContainer>
            </section>

            <SectionDivider />

            {/* ============================================ */}
            {/* Implementation */}
            {/* ============================================ */}
            <section id="scope" className="relative py-16 md:py-24">
                <GridContainer>
                    <AnimatedSection className="">
                        <motion.span
                            variants={fadeInUp}
                            className={`${roboto.className} text-sm md:text-base text-black/40 uppercase tracking-[0.2em] font-normal`}
                        >
                            Scope & Constraints
                        </motion.span>

                        <motion.p
                            variants={fadeInUp}
                            className={`${roboto.className} text-black/80 font-light text-base md:text-lg leading-relaxed mt-4`}
                        >
                            This is a concept redesign, not a shipped product. I kept the scope to the desktop web experience only, and didn&apos;t touch the mobile app, account management, ad placements, or creator tools. The goal was to show that the desktop experience could better serve its actual usage patterns without requiring a platform overhaul.
                        </motion.p>

                        <motion.p
                            variants={fadeInUp}
                            className={`${roboto.className} text-black/80 font-light text-base md:text-lg leading-relaxed mt-6`}
                        >
                            The prototype was built to be realistic enough to evaluate without artificial guidance. I intentionally avoided adding click indicators or interaction hints to the Figma prototype because if the interface needs labels to explain what&apos;s clickable, that&apos;s an affordance problem, not a presentation problem.
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
                        className=""
                    >
                        <div className="overflow-hidden rounded-2xl">
                            <video
                                src="/projects/instadesign/old/codedvidwip.mp4"
                                autoPlay loop muted playsInline
                                className="h-auto max-w-none"
                                style={{ width: 'calc(100% + 12px)', marginTop: '-8px', marginBottom: '-8px' }}
                            />
                        </div>
                        <span className={`${roboto.className} text-black/35 text-sm mt-5 block text-center italic`}>
                            Full overhaul implementation
                        </span>
                    </motion.div>
                </GridContainer>
            </section>

            <SectionDivider />

            {/* ============================================ */}
            {/* Impact (Conclusion) */}
            {/* ============================================ */}
            <section id="impact" className="relative py-16 md:py-24">
                <GridContainer>
                    <AnimatedSection className="">
                        <motion.span
                            variants={fadeInUp}
                            className={`${roboto.className} text-sm md:text-base text-black/40 uppercase tracking-[0.2em] font-normal`}
                        >
                            Impact
                        </motion.span>

                        <motion.p
                            variants={fadeInUp}
                            className={`${roboto.className} text-black/80 font-light text-base md:text-lg leading-relaxed mt-4`}
                        >
                            Navigation was consolidated around the actions people actually use on desktop. Messaging moved from a buried menu to a visible panel. And discovery got its own space, separate from algorithmic recommendations. None of these changes came from aesthetic preference; they all started with something specific from the survey.
                        </motion.p>

                        <motion.p
                            variants={fadeInUp}
                            className={`${roboto.className} text-black/80 font-light text-base md:text-lg leading-relaxed mt-6`}
                        >
                            Looking back, the biggest thing I&apos;d revisit is the research sample. The survey gave me a clear direction, but a larger pool or follow-up interviews would have helped confirm whether the patterns I found hold up more broadly. The decisions feel grounded, but I&apos;m aware they&apos;re grounded in a relatively small dataset.
                        </motion.p>
                    </AnimatedSection>
                </GridContainer>
            </section>

                </div>
            </div>
        </main>
    )
}

"use client";
import { pixelify, roboto } from "@/app/ui/fonts"
import Image from "next/image"
import { MagneticWrapper } from "@/components/MagneticButton";
import { useRef } from "react";
import { ExternalLink } from "lucide-react";
import { motion, useInView } from "framer-motion";
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

function GridContainer({ children, className = "", id }: { children: React.ReactNode; className?: string; id?: string }) {
    return (
        <div id={id} className={`w-full max-w-[1000px] mx-auto px-5 md:px-8 ${className}`}>
            {children}
        </div>
    );
}

// Gradient divider between sections
function SectionDivider() {
    return (
        <div className="w-full max-w-[1000px] mx-auto px-5 md:px-8">
            <div className="h-px bg-gradient-to-r from-transparent via-black/15 to-transparent" />
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

// Tech stack pill component
function TechPill({ name }: { name: string }) {
    return (
        <span className={`${roboto.className} text-xs md:text-sm text-white bg-gray-900 px-3 py-1 rounded-full`}>
            {name}
        </span>
    );
}

// Video container
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
            <div className="relative overflow-hidden bg-gray-900 p-2 md:p-3 rounded-2xl transition-all duration-300">
                <video
                    className="w-full h-auto rounded-xl"
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
                className={`${roboto.className} text-black/35 text-center mt-3 italic text-sm`}
            >
                {caption}
            </motion.div>
        </motion.div>
    );
}

// Tradeoff callout block
function TradeoffBlock({ children }: { children: React.ReactNode }) {
    return (
        <div className="bg-gray-100 rounded-2xl p-6 md:p-8 mt-6">
            <p className={`${roboto.className} text-black/60 font-light text-sm md:text-base italic leading-relaxed`}>
                {children}
            </p>
        </div>
    );
}

// Solution subsection with numbered header
function SolutionSubsection({ number, title, children }: { number: string; title: string; children: React.ReactNode }) {
    return (
        <motion.div variants={fadeInUp} className="mb-16 md:mb-20">
            <div className="flex items-baseline gap-4 mb-6">
                <span className={`${pixelify.className} text-3xl md:text-4xl text-gray-300`}>{number}.</span>
                <h3 className={`${pixelify.className} text-lg md:text-xl text-gray-800 uppercase`}>{title}</h3>
            </div>
            {children}
        </motion.div>
    );
}

export default function Sifty() {
    const heroRef = useRef(null);
    const isHeroInView = useInView(heroRef, { once: true });

    return (
        <main className="overflow-x-hidden">
            {/* 1. Hero Section */}
            <section
                ref={heroRef}
                className="relative w-full flex items-center justify-center pt-32 md:pt-40 pb-16 md:pb-24 bg-gray-200"
            >
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
                        className={`${pixelify.className} text-4xl md:text-5xl lg:text-6xl text-gray-800 mb-4`}
                    >
                        sifty
                    </motion.h1>
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className={`${pixelify.className} text-blue-500 italic text-lg md:text-xl uppercase tracking-wider mb-8`}
                    >
                        Scope Clarity for Freelancers
                    </motion.span>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className={`${roboto.className} text-black/50 font-light text-base md:text-lg lg:text-xl max-w-2xl leading-relaxed mb-10`}
                    >
                        A lightweight scoping tool that makes project boundaries visible before they become disputes. Built for freelancers and small studios who need clarity without complexity.
                    </motion.p>

                    {/* Hero Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className="flex flex-wrap gap-4 justify-center"
                    >
                        <MagneticWrapper>
                            <button
                                onClick={() => document.getElementById('overview')?.scrollIntoView({ behavior: 'smooth' })}
                                className={`${pixelify.className} px-6 py-3 border border-black/20 text-gray-800 text-base hover:bg-black/5 transition-colors tracking-wide uppercase rounded-md`}
                            >
                                View Project
                            </button>
                        </MagneticWrapper>
                        <MagneticWrapper>
                            <a
                                href="https://sifty.app"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`${pixelify.className} px-6 py-3 bg-gray-900 text-white text-base hover:bg-gray-800 transition-colors flex items-center gap-2 tracking-wide uppercase rounded-md`}
                            >
                                <ExternalLink className="w-4 h-4" />
                                Visit Live Site
                            </a>
                        </MagneticWrapper>
                    </motion.div>
                    </motion.div>
                </GridContainer>
            </section>

            <ProjectMetrics metrics={[
                { label: "Role", value: "Sole Designer & Developer" },
                { label: "Timeline", value: "2 Months" },
                { label: "Type", value: "Web Application" },
                { label: "Status", value: "Live at sifty.app" },
            ]} />

            {/* Leading visual - main app video */}
            <section className="relative py-12 md:py-16">
                <GridContainer>
                    <VideoContainer
                        src="/projects/sifty/main_thumbnail_video.mp4"
                        caption="Sifty's timeline-first interface"
                    />
                </GridContainer>
            </section>

            <SectionDivider />

            {/* 2. Overview */}
            <section id="overview" className="relative py-16 md:py-20">
                <GridContainer>
                    <AnimatedSection className="relative z-10">
                        <motion.p
                            variants={fadeInUp}
                            className={`${roboto.className} font-light text-base md:text-lg leading-relaxed text-black/80`}
                        >
                            Sifty is a project scoping and tracking tool designed and built from research through production code. The goal was to give freelancers a single source of truth that makes scope boundaries as visible as the work itself, without adding process overhead to their existing workflow.
                        </motion.p>
                    </AnimatedSection>
                </GridContainer>
            </section>

            <SectionDivider />

            {/* 3. The Problem */}
            <section className="relative py-16 md:py-20">
                <GridContainer>
                    <AnimatedSection className="flex flex-col gap-10 md:gap-12 relative z-10">
                        <motion.h2
                            variants={fadeInUp}
                            className={`${pixelify.className} text-xl md:text-2xl lg:text-3xl text-gray-800 uppercase`}
                        >
                            THE PROBLEM
                        </motion.h2>

                        <motion.p
                            variants={fadeInUp}
                            className={`${roboto.className} font-light text-base md:text-lg leading-relaxed text-black/80`}
                        >
                            Scope creep is the most common source of conflict in freelance work. Not because anyone is acting in bad faith, but because client and freelancer each build a different mental model of what&#39;s &ldquo;included.&rdquo; As the project progresses, these invisible misalignments surface as disputes about deliverables, timelines, and cost.
                        </motion.p>

                        <div className="flex flex-col gap-10">
                            <motion.div variants={fadeInUp}>
                                <h3 className={`${pixelify.className} text-xs md:text-sm uppercase tracking-wider text-gray-800 mb-3`}>
                                    Invisible boundaries
                                </h3>
                                <p className={`${roboto.className} font-light text-base md:text-lg leading-relaxed text-black/80`}>
                                    Most projects rely on a proposal email or a brief conversation to define scope. These informal agreements live in different inboxes, different memories, and different interpretations. There&#39;s no single artifact both parties reference.
                                </p>
                            </motion.div>

                            <motion.div variants={fadeInUp}>
                                <h3 className={`${pixelify.className} text-xs md:text-sm uppercase tracking-wider text-gray-800 mb-3`}>
                                    Tools that manage tasks, not scope
                                </h3>
                                <p className={`${roboto.className} font-light text-base md:text-lg leading-relaxed text-black/80`}>
                                    Existing project management tools like Trello, Asana, and Notion track what you&#39;re doing, but none of them make what you&#39;re NOT doing equally visible. Scope is an afterthought, buried in a notes field if it&#39;s documented at all.
                                </p>
                            </motion.div>

                            <motion.div variants={fadeInUp}>
                                <h3 className={`${pixelify.className} text-xs md:text-sm uppercase tracking-wider text-gray-800 mb-3`}>
                                    Documentation friction
                                </h3>
                                <p className={`${roboto.className} font-light text-base md:text-lg leading-relaxed text-black/80`}>
                                    When a client changes something on a call, the freelancer needs to document it immediately or it&#39;s lost. But existing tools require navigating to a project, finding the right section, and filling out forms. The overhead means most changes go unrecorded.
                                </p>
                            </motion.div>
                        </div>
                    </AnimatedSection>
                </GridContainer>
            </section>

            <SectionDivider />

            {/* Research */}
            <section className="relative py-16 md:py-20">
                <GridContainer>
                    <AnimatedSection className="flex flex-col gap-10 md:gap-12 relative z-10">
                        <motion.h2
                            variants={fadeInUp}
                            className={`${pixelify.className} text-xl md:text-2xl lg:text-3xl text-gray-800 uppercase`}
                        >
                            RESEARCH
                        </motion.h2>

                        {/* Competitive analysis */}
                        <motion.p
                            variants={fadeInUp}
                            className={`${roboto.className} font-light text-base md:text-lg leading-relaxed text-black/80`}
                        >
                            Before designing anything, I looked at how freelancers currently handle scoping and what tools already exist. The landscape is full of project management tools (Trello, Asana, Notion, Basecamp), but they all treat scope as one feature among many. Scope lives in a notes field, a description box, or a shared doc that nobody updates after week one. None of them make scope boundaries the primary organizing principle.
                        </motion.p>

                        {/* Trello dashboard screenshot */}
                        <motion.div variants={fadeInUp}>
                            <div className="overflow-hidden rounded-2xl border border-black/5">
                                <Image
                                    src="/projects/sifty/example-trello.png"
                                    alt="Trello analytics dashboard showing cycle time metrics, scatterplot, and process filters"
                                    width={1390}
                                    height={860}
                                    className="w-full h-auto"
                                />
                            </div>
                            <p className={`${roboto.className} text-black/35 text-sm mt-3 italic text-center`}>
                                A Trello analytics dashboard via <a href="https://getnave.com/dashboard-for-trello" target="_blank" rel="noopener noreferrer" className="underline hover:text-black/50 transition-colors">Nave</a>. Detailed task metrics, but no indication of what's in or out of scope.
                            </p>
                        </motion.div>

                        {/* The data */}
                        <motion.div variants={fadeInUp} className="flex flex-col">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                <div className="text-center">
                                    <p className={`${pixelify.className} text-2xl md:text-3xl text-gray-800`}>25-40%</p>
                                    <p className={`${roboto.className} font-light text-sm md:text-base text-black/80 mt-2`}>Average budget overrun caused by scope creep</p>
                                </div>
                                <div className="text-center">
                                    <p className={`${pixelify.className} text-2xl md:text-3xl text-gray-800`}>42%</p>
                                    <p className={`${roboto.className} font-light text-sm md:text-base text-black/80 mt-2`}>Of scope creep cases traced to insufficient requirement analysis</p>
                                </div>
                                <div className="text-center">
                                    <p className={`${pixelify.className} text-2xl md:text-3xl text-gray-800`}>23%</p>
                                    <p className={`${roboto.className} font-light text-sm md:text-base text-black/80 mt-2`}>Of digital projects have clearly defined acceptance criteria</p>
                                </div>
                            </div>
                            <p className={`${roboto.className} text-black/35 text-sm italic mt-2 text-center`}>
                                Data from MIT Sloan Management Center and PwC survey of 1,500 project managers
                            </p>
                        </motion.div>

                        {/* What freelancers told us */}
                        <motion.p
                            variants={fadeInUp}
                            className={`${roboto.className} font-light text-base md:text-lg leading-relaxed text-black/80`}
                        >
                            I also looked at how freelancers talk about scoping problems in practice. The pattern was consistent: unclear briefs, no documentation of verbal changes, revision limits that were never formally agreed on, and clients who genuinely believed something was included because nobody wrote down that it wasn&#39;t. The problem wasn&#39;t bad faith on either side. It was that informal communication doesn&#39;t leave a paper trail, and by the time a disagreement surfaces, there&#39;s nothing to point back to.
                        </motion.p>

                        {/* Research questions */}
                        <motion.div variants={fadeInUp} className="flex flex-col items-center">
                            <div className="max-w-2xl w-full flex flex-col items-center text-center gap-4">
                                <h3 className={`${pixelify.className} text-xs md:text-sm uppercase tracking-wider text-gray-800 mb-2`}>
                                    QUESTIONS THAT SHAPED THE DESIGN
                                </h3>
                                <p className={`${roboto.className} font-light text-base md:text-lg text-black/70 italic`}>
                                    &ldquo;What information do freelancers wish they had before starting work?&rdquo;
                                </p>
                                <p className={`${roboto.className} font-light text-base md:text-lg text-black/70 italic`}>
                                    &ldquo;How do they currently document requirements and changes?&rdquo;
                                </p>
                                <p className={`${roboto.className} font-light text-base md:text-lg text-black/70 italic`}>
                                    &ldquo;Where does the disconnect between client and freelancer actually begin?&rdquo;
                                </p>
                                <p className={`${roboto.className} font-light text-base md:text-lg text-black/70 italic`}>
                                    &ldquo;What level of effort can realistically be expected from clients?&rdquo;
                                </p>
                            </div>
                        </motion.div>
                    </AnimatedSection>
                </GridContainer>
            </section>

            <SectionDivider />

            {/* 4. The Opportunity */}
            <section className="relative py-16 md:py-20">
                <GridContainer>
                    <AnimatedSection className="flex flex-col gap-8 relative z-10">
                        <motion.h2
                            variants={fadeInUp}
                            className={`${pixelify.className} text-xl md:text-2xl lg:text-3xl text-gray-800 uppercase`}
                        >
                            THE OPPORTUNITY
                        </motion.h2>

                        <motion.p
                            variants={fadeInUp}
                            className={`${roboto.className} font-light text-base md:text-lg leading-relaxed text-black/80`}
                        >
                            While existing tools addressed task management or team collaboration, none focused specifically on making scope boundaries the primary interface. There was an opportunity to build something that sits alongside a freelancer&#39;s informal workflow (Slack messages, emails, quick calls) and turns those scattered decisions into a visible, shared record. Not a project management suite. A scoping tool.
                        </motion.p>

                        <motion.p
                            variants={fadeInUp}
                            className={`${roboto.className} font-light text-base md:text-lg leading-relaxed text-black/80`}
                        >
                            I looked at Trello, Asana, Notion, and Basecamp specifically through the lens of scope visibility. All four are strong task management tools. But in every one of them, scope definition is buried: a description field in Trello, a page property in Notion, a message thread in Basecamp. There&#39;s no persistent, visible boundary between &ldquo;what we agreed to build&rdquo; and &ldquo;what we didn&#39;t.&rdquo; That gap was the opportunity.
                        </motion.p>
                    </AnimatedSection>
                </GridContainer>
            </section>

            <SectionDivider />

            {/* 5. Defining the Scope */}
            <section className="relative py-16 md:py-20">
                <GridContainer>
                    <AnimatedSection className="flex flex-col gap-8 md:gap-10 relative z-10">
                        <motion.h2
                            variants={fadeInUp}
                            className={`${pixelify.className} text-xl md:text-2xl lg:text-3xl text-gray-800 uppercase`}
                        >
                            DEFINING THE SCOPE
                        </motion.h2>

                        <motion.p
                            variants={fadeInUp}
                            className={`${roboto.className} font-light text-base md:text-lg leading-relaxed text-black/80`}
                        >
                            To validate the core concept quickly, cutting aggressively was essential. The guiding principle: do one thing exceptionally well rather than many things adequately.
                        </motion.p>

                        <motion.div variants={fadeInUp} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Included */}
                            <div className="border-l-2 border-green-500 pl-6">
                                <h3 className={`${pixelify.className} text-xs md:text-sm uppercase tracking-wider text-gray-800 mb-4`}>
                                    INCLUDED
                                </h3>
                                <ul className={`${roboto.className} font-light text-sm md:text-base leading-relaxed text-black/80 space-y-2`}>
                                    <li>• Project brief with deliverables and timeline</li>
                                    <li>• Explicit &ldquo;out of scope&rdquo; section, making exclusions as visible as inclusions</li>
                                    <li>• Revision counter per deliverable with visual progress</li>
                                    <li>• Vertical timeline as the primary (and only) interface</li>
                                    <li>• Quick-add for logging changes in under 30 seconds</li>
                                    <li>• Read-only client view via shareable link</li>
                                    <li>• Light and dark theme support</li>
                                </ul>
                            </div>

                            {/* Excluded */}
                            <div className="border-l-2 border-red-400/50 pl-6">
                                <h3 className={`${pixelify.className} text-xs md:text-sm uppercase tracking-wider text-gray-800 mb-4`}>
                                    DELIBERATELY EXCLUDED
                                </h3>
                                <ul className={`${roboto.className} font-light text-sm md:text-base leading-relaxed text-black/80 space-y-2`}>
                                    <li>• Client-side editing or collaboration, which keeps the freelancer in control as project lead</li>
                                    <li>• Payment processing, just terms documentation, not transactions</li>
                                    <li>• Team management or resource allocation, built for solo practitioners, not enterprises</li>
                                    <li>• Real-time collaboration, which would require auth, sync, conflict resolution, delaying launch for a feature that doesn&#39;t serve the core use case</li>
                                    <li>• Client-initiated revision requests, since shifting control to clients creates obligation, undermining the freelancer-first model</li>
                                </ul>
                            </div>
                        </motion.div>
                    </AnimatedSection>
                </GridContainer>
            </section>

            <SectionDivider />

            {/* 6. Solution Design */}
            <section className="relative py-16 md:py-20">
                <GridContainer>
                    <AnimatedSection className="flex flex-col gap-8 relative z-10">
                        <motion.h2
                            variants={fadeInUp}
                            className={`${pixelify.className} text-xl md:text-2xl lg:text-3xl text-gray-800 uppercase mb-4`}
                        >
                            SOLUTION DESIGN
                        </motion.h2>

                        {/* 1. Timeline as the primary interface */}
                        <SolutionSubsection number="1" title="Timeline as the primary interface">
                            <p className={`${roboto.className} font-light text-base md:text-lg leading-relaxed text-black/80`}>
                                The main challenge was choosing how to organize project information. Dashboard views and tab-based layouts are standard in project tools, but freelancers checking in mid-project think chronologically: &ldquo;What&#39;s next? What did we finish? When is this due?&rdquo;
                            </p>
                            <p className={`${roboto.className} font-light text-base md:text-lg leading-relaxed text-black/80 mt-4`}>
                                The timeline was designed as the only primary view. Not one tab among many, but the entire interface. Project details, exclusions, and the changelog are accessed via expandable overlays from the timeline context.
                            </p>
                            <p className={`${roboto.className} font-light text-base md:text-lg leading-relaxed text-black/80 mt-4`}>
                                I considered a horizontal Gantt-style timeline, which is standard in project management. It follows the natural reading direction left-to-right and can show parallel work tracks. But horizontal timelines require horizontal scrolling, they&#39;re difficult on mobile, and they feel corporate. A vertical timeline follows how people already consume content (social feeds, messaging apps). Since most freelance projects are sequential rather than heavily parallel, vertical was the better fit.
                            </p>

                            <TradeoffBlock>
                                This meant sacrificing a birds-eye dashboard view of all deliverables at once. But for freelancers managing 3–10 projects with sequential workflows, the chronological view matched their mental model more naturally than a grid of cards.
                            </TradeoffBlock>

                            <div className="mt-8">
                                <VideoContainer
                                    src="/projects/sifty/onboarding_2_project.mp4"
                                    caption="Timeline generated from a completed project brief"
                                />
                            </div>
                        </SolutionSubsection>

                        {/* 2. Making exclusions visible */}
                        <SolutionSubsection number="2" title="Making exclusions visible">
                            <p className={`${roboto.className} font-light text-base md:text-lg leading-relaxed text-black/80`}>
                                Most tools only track what you&#39;re building. Sifty makes what&#39;s NOT included equally prominent. The &ldquo;out of scope&rdquo; section uses a badge showing the count of excluded items, and it&#39;s always visible on the client view, collapsible on the freelancer side, but never hidden from the client.
                            </p>
                            <p className={`${roboto.className} font-light text-base md:text-lg leading-relaxed text-black/80 mt-4`}>
                                The simpler option would have been a single &ldquo;notes&rdquo; field where freelancers could type whatever they wanted about scope. But unstructured notes don&#39;t create accountability. A dedicated exclusions section with a visible item count turns &ldquo;I think we mentioned that wasn&#39;t included&rdquo; into &ldquo;there are 4 items explicitly listed as out of scope, and here they are.&rdquo;
                            </p>

                            <TradeoffBlock>
                                Surfacing exclusions this prominently risks feeling negative, like leading with limitations. But in freelance work, the conversations that go wrong are almost always about what someone assumed was included. Making exclusions visible up front prevents those conversations entirely.
                            </TradeoffBlock>
                        </SolutionSubsection>

                        {/* 3. Client view: read-only by design */}
                        <SolutionSubsection number="3" title="Client view: read-only by design">
                            <p className={`${roboto.className} font-light text-base md:text-lg leading-relaxed text-black/80`}>
                                Clients access their project via a separate shareable link. Rather than disabling edit controls, they were removed entirely. No greyed-out buttons, no &ldquo;you don&#39;t have permission&rdquo; tooltips. The client view is a clean, read-only document.
                            </p>

                            <TradeoffBlock>
                                The alternative was showing disabled controls so clients could see the full interface. But greyed-out buttons create confusion (&ldquo;why can&#39;t I click this?&rdquo;) and imply the client should have editing power. Removing UI elements entirely creates a professional, published-document experience where the freelancer&#39;s role as project lead is architecturally reinforced.
                            </TradeoffBlock>

                            <div className="mt-8">
                                <VideoContainer
                                    src="/projects/sifty/client_side_view.mp4"
                                    caption="Client view with all edit controls removed, not just disabled"
                                />
                            </div>
                        </SolutionSubsection>

                        {/* 4. Form design: validation on submit, not on blur */}
                        <SolutionSubsection number="4" title="Form design: validation on submit">
                            <p className={`${roboto.className} font-light text-base md:text-lg leading-relaxed text-black/80`}>
                                The project creation form collects 9 fields (5 mandatory, 4 optional behind toggles). A critical design question was when to show validation errors.
                            </p>
                            <p className={`${roboto.className} font-light text-base md:text-lg leading-relaxed text-black/80 mt-4`}>
                                On-blur validation catches errors early but feels aggressive. Red borders appearing while you&#39;re still filling out the form. On-change validation is worse, flagging errors mid-keystroke. The choice was to validate only on submit: errors appear when the user signals &ldquo;I think I&#39;m ready,&rdquo; not while they&#39;re still thinking. After the first submit attempt, fields update in real-time as the user corrects them.
                            </p>

                            <TradeoffBlock>
                                This means a user could fill out the entire form before seeing any errors. But respecting user agency, letting them work at their own pace without the interface presuming they&#39;re making mistakes. That produces a calmer, more confident interaction. The real-time feedback after first submit catches the practical concern.
                            </TradeoffBlock>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mt-8">
                                <VideoContainer
                                    src="/projects/sifty/onboarding_1_form.mp4"
                                    caption="Project creation form with submit-triggered validation"
                                />
                                <VideoContainer
                                    src="/projects/sifty/onboarding_2_project.mp4"
                                    caption="Timeline generated from project brief"
                                />
                            </div>
                        </SolutionSubsection>

                        {/* 5. Quick-add: 30-second documentation */}
                        <SolutionSubsection number="5" title="Quick-add: 30-second documentation">
                            <p className={`${roboto.className} font-light text-base md:text-lg leading-relaxed text-black/80`}>
                                The biggest barrier to consistent scope documentation is friction. When a freelancer finishes a client call where something changed, they need to capture it immediately, not navigate through menus and fill out detailed forms. The Quick Add button is always visible and opens a contextual mini-form: select the type (deliverable, milestone, scope change), fill in the essentials, and it&#39;s on the timeline in under 30 seconds. Details can be added later, but the facts are preserved now.
                            </p>
                            <p className={`${roboto.className} font-light text-base md:text-lg leading-relaxed text-black/80 mt-4`}>
                                The alternative was a full form that captures everything at once: description, category, time impact, cost impact, approval status. That&#39;s thorough, but it takes 3-5 minutes per entry. For a freelancer who just got off a call and has another one starting in 10 minutes, that&#39;s too much. The Quick Add approach treats initial capture and detailed documentation as two separate actions, and only the first one needs to be fast.
                            </p>

                            <TradeoffBlock>
                                Quick capture means incomplete entries. A 30-second log won&#39;t have the detail of a carefully written scope amendment. But incomplete documentation that actually gets created is far more useful than detailed documentation that doesn&#39;t exist because the friction was too high.
                            </TradeoffBlock>

                            <div className="flex flex-col md:flex-row justify-center gap-6 mt-8">
                                <div className="w-full max-w-[480px]">
                                    <VideoContainer
                                        src="/projects/sifty/task_card.mp4"
                                        caption="Task cards with expandable detail and revision tracking"
                                    />
                                </div>
                                <div className="w-full max-w-[480px]">
                                    <VideoContainer
                                        src="/projects/sifty/milestone_card.mp4"
                                        caption="Milestone tracking and completion states"
                                    />
                                </div>
                            </div>
                        </SolutionSubsection>
                    </AnimatedSection>
                </GridContainer>
            </section>

            <SectionDivider />

            {/* 7. Responsive Design */}
            <section className="relative py-16 md:py-20">
                <GridContainer>
                    <AnimatedSection className="flex flex-col gap-8 md:gap-10 relative z-10">
                        <motion.h2
                            variants={fadeInUp}
                            className={`${pixelify.className} text-xl md:text-2xl lg:text-3xl text-gray-800 uppercase`}
                        >
                            RESPONSIVE DESIGN
                        </motion.h2>

                        <motion.p
                            variants={fadeInUp}
                            className={`${roboto.className} font-light text-base md:text-lg leading-relaxed text-black/80`}
                        >
                            Freelancers check project status on their phone between client meetings. The mobile implementation isn&#39;t a compressed desktop. It&#39;s a separate experience designed for viewing and quick actions. The timeline stem renders at 65% scale while task cards remain full-size, because the timeline is contextual decoration but the cards contain content users need to read and tap.
                        </motion.p>

                        <motion.div variants={fadeInUp}>
                            <TradeoffBlock>
                                Complex editing (rearranging timeline items, detailed brief changes) is desktop-only. Mobile users can view everything and mark items complete, but deep project management happens at a keyboard. This constraint kept the mobile experience focused instead of cramped.
                            </TradeoffBlock>
                        </motion.div>

                        <motion.div variants={fadeInUp} className="flex justify-center">
                            <div className="w-full max-w-sm">
                                <VideoContainer
                                    src="/projects/sifty/mobile_view.mp4"
                                    caption="Mobile: timeline scales down, content stays readable"
                                />
                            </div>
                        </motion.div>
                    </AnimatedSection>
                </GridContainer>
            </section>

            <SectionDivider />

            {/* 8. Tech Stack */}
            <section className="relative py-16 md:py-20">
                <GridContainer>
                    <AnimatedSection className="flex flex-col gap-8 md:gap-10 relative z-10">
                        <motion.h2
                            variants={fadeInUp}
                            className={`${pixelify.className} text-xl md:text-2xl lg:text-3xl text-gray-800 uppercase text-center`}
                        >
                            BUILT WITH
                        </motion.h2>

                        <motion.div
                            variants={fadeInUp}
                            className="flex flex-wrap justify-center gap-2 md:gap-3"
                        >
                            <TechPill name="Next.js 16" />
                            <TechPill name="React 19" />
                            <TechPill name="TypeScript" />
                            <TechPill name="Tailwind CSS 4" />
                            <TechPill name="Supabase" />
                            <TechPill name="Framer Motion" />
                            <TechPill name="Radix UI" />
                        </motion.div>

                        <motion.p
                            variants={fadeInUp}
                            className={`${roboto.className} font-light text-base md:text-lg leading-relaxed text-black/80 mx-auto text-center`}
                        >
                            The backend uses Supabase with PostgreSQL for project storage and real-time updates. Radix UI provides accessible, unstyled primitives that allowed full design control without fighting a component library&#39;s opinions. The entire application was built using Claude Code for implementation, with specifications written as detailed task documents.
                        </motion.p>
                    </AnimatedSection>
                </GridContainer>
            </section>

            <SectionDivider />

            {/* 9. Closing / CTA */}
            <section className="relative py-16 md:py-24">
                <GridContainer>
                    <AnimatedSection className="flex flex-col items-center text-center gap-8 relative z-10">
                        <motion.p
                            variants={fadeInUp}
                            className={`${roboto.className} font-light text-base md:text-lg leading-relaxed text-black/80 max-w-2xl`}
                        >
                            Sifty is live and in use. Future iterations will introduce export functionality, email and message logging for informal change documentation, and enhanced dependency tracking.
                        </motion.p>

                        <motion.p
                            variants={fadeInUp}
                            className={`${roboto.className} font-light text-base md:text-lg leading-relaxed text-black/80 max-w-2xl`}
                        >
                            If I could go back, I&#39;d invest more time in user testing before launch. The research grounded the initial design decisions, but I moved into building relatively quickly once the direction felt right. Running the prototype past a few freelancers earlier would have surfaced usability issues sooner, especially around the timeline interaction model which took several iterations to get right during development.
                        </motion.p>

                        <motion.div variants={fadeInUp}>
                            <MagneticWrapper>
                                <a
                                    href="https://sifty.app"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`${pixelify.className} px-6 py-3 bg-gray-900 text-white text-base hover:bg-gray-800 transition-colors flex items-center gap-2 tracking-wide uppercase rounded-md`}
                                >
                                    <ExternalLink className="w-4 h-4" />
                                    Visit Sifty
                                </a>
                            </MagneticWrapper>
                        </motion.div>
                    </AnimatedSection>
                </GridContainer>
            </section>
        </main>
    );
}

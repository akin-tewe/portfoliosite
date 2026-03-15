"use client";
import { pixelify, roboto } from "@/app/ui/fonts"
import { MagneticWrapper } from "@/components/MagneticButton";
import { useRef } from "react";
import { ExternalLink, Github } from "lucide-react";
import { motion, useInView } from "framer-motion";
import ProjectMetrics from "@/components/ProjectMetrics";
import CaseStudySidebar from "@/components/CaseStudySidebar";

const neighborhoodSections = [
    { id: 'why', label: 'Why' },
    { id: 'methodology', label: 'Methodology' },
    { id: 'extraction', label: 'Extraction' },
    { id: 'tokens', label: 'Tokens' },
    { id: 'components', label: 'Components' },
    { id: 'demos', label: 'Demos' },
    { id: 'whats-next', label: "What's Next" },
];

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
        <div id={id} className={`w-full max-w-[1000px] mx-auto px-8 ${className}`}>
            {children}
        </div>
    );
}

function SectionDivider() {
    return (
        <div className="w-full max-w-[1000px] mx-auto px-8">
            <div className="h-px bg-gradient-to-r from-transparent via-black/15 to-transparent" />
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

function TechPill({ name }: { name: string }) {
    return (
        <span className={`${roboto.className} text-xs md:text-sm text-white bg-gray-900 px-3 py-1 rounded-full`}>
            {name}
        </span>
    );
}

function TradeoffBlock({ children }: { children: React.ReactNode }) {
    return (
        <div className="bg-gray-100 rounded-2xl p-6 md:p-8 mt-6">
            <p className={`${roboto.className} text-black/60 font-light text-sm md:text-base italic leading-relaxed`}>
                {children}
            </p>
        </div>
    );
}

export default function Neighborhood() {
    const heroRef = useRef(null);
    const isHeroInView = useInView(heroRef, { once: true });

    return (
        <main className="overflow-x-clip">
            {/* Hero Section */}
            <section
                ref={heroRef}
                className="relative w-full flex flex-col pt-32 md:pt-40 pb-16 md:pb-24 bg-[#fafafa]"
            >
                <GridContainer>
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className="flex flex-col items-start text-left max-w-4xl relative z-10"
                    >
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className={`${pixelify.className} text-4xl md:text-5xl lg:text-6xl text-gray-800 mb-4`}
                    >
                        Neighborhood
                    </motion.h1>
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className={`${pixelify.className} text-green-500 italic text-lg md:text-xl uppercase tracking-wider mb-8`}
                    >
                        Design System v0.1
                    </motion.span>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className={`${roboto.className} text-black/50 font-light text-base md:text-lg lg:text-xl mt-6 leading-relaxed`}
                    >
                        A component library and design system built from the ground up, with warmth, motion, and personality baked into every token. 18 components, 6 token categories, a living documentation site, and three full demo pages proving the system at scale. This case study covers the initial conception and v0.1 implementation. Neighborhood is actively under development.
                    </motion.p>

                    {/* Hero Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className="flex flex-wrap gap-4 mt-10 justify-center md:justify-start"
                    >
                        <MagneticWrapper>
                            <a href="https://nbhd.dev" target="_blank" rel="noopener noreferrer"
                                className={`${pixelify.className} px-6 py-3 bg-gray-900 rounded text-white text-base tracking-wide uppercase hover:bg-gray-800 transition-colors flex items-center gap-2`}>
                                <ExternalLink className="w-4 h-4" />
                                Documentation Site
                            </a>
                        </MagneticWrapper>
                        <MagneticWrapper>
                            <a href="https://github.com/akin-tewe/neighborhood-ui" target="_blank" rel="noopener noreferrer"
                                className={`${pixelify.className} px-6 py-3 bg-white border border-gray-300 rounded text-gray-800 text-base tracking-wide uppercase hover:bg-gray-50 transition-colors flex items-center gap-2`}>
                                <Github className="w-4 h-4" />
                                GitHub
                            </a>
                        </MagneticWrapper>
                    </motion.div>
                    </motion.div>
                </GridContainer>

            <ProjectMetrics metrics={[
                { label: "Role", value: "Sole Designer · Developer" },
                { label: "Components", value: "18 (11 Atomic, 7 Compositional)" },
                { label: "Type", value: "Design System + Documentation" },
                { label: "Status", value: "v0.1 Shipped · Active Development" },
            ]} />
            </section>

            {/* Grid layout for sidebar + content */}
            <div className="lg:grid lg:grid-cols-[200px_minmax(0,1fr)]">
                <CaseStudySidebar sections={neighborhoodSections} />
                <div className="lg:-translate-x-[100px]">

            {/* Overview */}
            <section className="relative py-16 md:py-20">
                <GridContainer>
                    <AnimatedSection className="relative z-10">
                        <motion.p variants={fadeInUp}
                            className={`${roboto.className} font-light text-base md:text-lg leading-relaxed text-black/80`}>
                            Neighborhood is a design system I built from scratch: a fully packaged npm component library, a token architecture spanning six categories, and a documentation site that consumes its own components as proof they work. The system was extracted from a structured cross-product audit of three real products (Notion, Discord, and Stripe), and every component included earned its place through observed frequency and compositional value, not from a checklist.
                        </motion.p>
                        <motion.p variants={fadeInUp}
                            className={`${roboto.className} font-light text-base md:text-lg leading-relaxed text-black/80 mt-4`}>
                            This case study documents the initial v0.1 release: the reasoning behind the system, the methodology that shaped it, the extraction decisions that defined the component inventory, and the token and composition philosophy that ties it together. Neighborhood is an actively evolving product, and future versions will expand the component set, deepen documentation, and introduce additional demo contexts.
                        </motion.p>
                    </AnimatedSection>
                </GridContainer>
            </section>

            <SectionDivider />

            {/* WHY */}
            <section id="why" className="relative py-16 md:py-20">
                <GridContainer>
                    <AnimatedSection className="flex flex-col gap-10 md:gap-12 relative z-10">
                        <motion.h2 variants={fadeInUp}
                            className={`${roboto.className} text-sm md:text-base text-black/40 uppercase tracking-[0.2em] font-normal`}>
                            WHY BUILD A DESIGN SYSTEM
                        </motion.h2>

                        <motion.p variants={fadeInUp}
                            className={`${roboto.className} font-light text-base md:text-lg leading-relaxed text-black/80`}>
                            As a designer who also writes production code, I think in systems. When I build an interface, I think about how its pieces compose, which values should be tokens and which should be hardcoded, and how the same component behaves across three different screen sizes. A design system is the purest expression of that instinct: it forces every decision to be explicit, documented, and reusable. Rather than demonstrating this thinking implicitly through project work, Neighborhood makes it the entire point.
                        </motion.p>

                        <motion.p variants={fadeInUp}
                            className={`${roboto.className} font-light text-base md:text-lg leading-relaxed text-black/80`}>
                            The specific motivation was strategic. My portfolio read well as creative and technical work, but it didn&#39;t immediately signal the systematic design thinking that product design roles require. Shipping a design system (not just designing one in Figma) sends a clear message: I understand token architecture, component APIs, documentation, accessibility, composition patterns, and scaling considerations, and I can build all of it in production code.
                        </motion.p>

                        <div className="flex flex-col gap-10">
                            <motion.div variants={fadeInUp}>
                                <h3 className={`${roboto.className} font-light text-xs md:text-sm uppercase tracking-wider text-gray-800 mb-3`}>
                                    Not a Figma library
                                </h3>
                                <p className={`${roboto.className} font-light text-base md:text-lg leading-relaxed text-black/80`}>
                                    Many portfolio design systems exist only in Figma: token swatches, component frames, auto-layout demonstrations. Neighborhood is shipped code. The component library is an npm package installed from GitHub. The documentation site imports from that package. Every component, token, and composition pattern exists in TypeScript, renders in a browser, and handles real user interaction with keyboard navigation, focus states, and responsive breakpoints. The docs site doesn&#39;t just describe the system. It eats its own cooking.
                                </p>
                            </motion.div>

                            <motion.div variants={fadeInUp}>
                                <h3 className={`${roboto.className} font-light text-xs md:text-sm uppercase tracking-wider text-gray-800 mb-3`}>
                                    Its own identity
                                </h3>
                                <p className={`${roboto.className} font-light text-base md:text-lg leading-relaxed text-black/80`}>
                                    Neighborhood has its own visual language, separate from my portfolio site and from Sifty. The warm stone neutral palette, the Space Grotesk and DM Sans type pairing, the grass-green primary accent, the bracket selection pattern, the role-based radius and elevation tokens: these decisions were all made independently to demonstrate range. A recruiter seeing Neighborhood alongside Sifty sees two distinct design languages, not one project repeated twice.
                                </p>
                            </motion.div>
                        </div>
                    </AnimatedSection>
                </GridContainer>
            </section>

            <SectionDivider />

            {/* METHODOLOGY */}
            <section id="methodology" className="relative py-16 md:py-20">
                <GridContainer>
                    <AnimatedSection className="flex flex-col gap-10 md:gap-12 relative z-10">
                        <motion.h2 variants={fadeInUp}
                            className={`${roboto.className} text-sm md:text-base text-black/40 uppercase tracking-[0.2em] font-normal`}>
                            METHODOLOGY
                        </motion.h2>

                        <motion.p variants={fadeInUp}
                            className={`${roboto.className} font-light text-base md:text-lg leading-relaxed text-black/80`}>
                            Most design system case studies start with a component list and work backward to justify it. Neighborhood started with a question: how do real products actually compose their interfaces? Rather than pulling components from a UI kit or a personal wishlist, I conducted structured audits of three shipping products, analyzing their interfaces at three layers of abstraction: full-page layouts, mid-level compositional patterns, and individual atomic elements.
                        </motion.p>

                        <motion.div variants={fadeInUp}>
                            <h3 className={`${roboto.className} font-light text-xs md:text-sm uppercase tracking-wider text-gray-800 mb-3`}>
                                Why three products
                            </h3>
                            <p className={`${roboto.className} font-light text-base md:text-lg leading-relaxed text-black/80`}>
                                Three products were chosen as a deliberate triangle. Notion represents warmth, composition, and content-first interfaces. Stripe represents rigor, data density, and form and table patterns. Discord represents personality, real-time feedback, and communication. Together they cover the full range of interface contexts a design system should handle: content tools, data dashboards, and social platforms. If a component appeared in all three, it was non-negotiable. If it appeared in two, it was strongly considered. If it appeared in only one but demonstrated high compositional value, it earned a place as a distinctive pattern.
                            </p>
                        </motion.div>

                        {/* Audit stats */}
                        <motion.div variants={fadeInUp} className="flex flex-col">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                <div className="text-center">
                                    <p className={`${pixelify.className} text-2xl md:text-3xl text-gray-800`}>29</p>
                                    <p className={`${roboto.className} font-light text-sm md:text-base text-black/80 mt-2`}>Distinct screens analyzed across three products</p>
                                </div>
                                <div className="text-center">
                                    <p className={`${pixelify.className} text-2xl md:text-3xl text-gray-800`}>3</p>
                                    <p className={`${roboto.className} font-light text-sm md:text-base text-black/80 mt-2`}>Layers of extraction: page, composition, atom</p>
                                </div>
                                <div className="text-center">
                                    <p className={`${pixelify.className} text-2xl md:text-3xl text-gray-800`}>18</p>
                                    <p className={`${roboto.className} font-light text-sm md:text-base text-black/80 mt-2`}>Components shipped with cross-product justification</p>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div variants={fadeInUp}>
                            <h3 className={`${roboto.className} font-light text-xs md:text-sm uppercase tracking-wider text-gray-800 mb-3`}>
                                Three-layer analysis
                            </h3>
                            <p className={`${roboto.className} font-light text-base md:text-lg leading-relaxed text-black/80`}>
                                Each product was audited through live authenticated sessions, not marketing screenshots. For Notion, nine views were analyzed including the app shell, home page, database views, detail/split views, settings modal, and command palette. Discord covered twelve views across text chat, user settings, server management, and profile popovers. Stripe covered eight views including the overview dashboard, transactions list, customer detail, revenue recovery, and subscription management.
                            </p>
                            <p className={`${roboto.className} font-light text-base md:text-lg leading-relaxed text-black/80 mt-4`}>
                                At every screen, I looked at three things. First, the page-level pattern: how is the full view structured? Where is the sidebar, what does the header contain, how does the content area organize itself? Second, the compositional patterns: what mid-level groupings repeat? A setting row with a label, description, and control. A property display with a key and typed value. A section header organizing content beneath it. Third, the atomic components: what individual elements appear, what states do they have, and how are they styled? This three-layer approach meant I wasn&#39;t just cataloging widgets. I was understanding how interfaces are composed.
                            </p>
                        </motion.div>

                        <TradeoffBlock>
                            Auditing live products rather than referencing existing design system documentation (like Polaris or Primer) was a deliberate choice. Existing systems document what they built, not how real interfaces compose. By analyzing Notion, Discord, and Stripe directly, I could observe which patterns are truly universal versus which are product-specific, and make informed decisions about what Neighborhood should include.
                        </TradeoffBlock>
                    </AnimatedSection>
                </GridContainer>
            </section>

            <SectionDivider />

            {/* EXTRACTION */}
            <section id="extraction" className="relative py-16 md:py-20">
                <GridContainer>
                    <AnimatedSection className="flex flex-col gap-10 md:gap-12 relative z-10">
                        <motion.h2 variants={fadeInUp}
                            className={`${roboto.className} text-sm md:text-base text-black/40 uppercase tracking-[0.2em] font-normal`}>
                            EXTRACTION
                        </motion.h2>

                        <motion.p variants={fadeInUp}
                            className={`${roboto.className} font-light text-base md:text-lg leading-relaxed text-black/80`}>
                            The audits produced hundreds of observations. The synthesis phase compressed them into a prioritized component inventory using a single principle: a component earns inclusion if it appears across multiple products confirming universality, or represents a distinctively valuable pattern that demonstrates design range. Components that only existed in one product and solved a narrow problem were documented as v0.2 candidates rather than forced into the initial build.
                        </motion.p>

                        <motion.div variants={fadeInUp}>
                            <h3 className={`${roboto.className} font-light text-xs md:text-sm uppercase tracking-wider text-gray-800 mb-3`}>
                                Three tiers of inclusion
                            </h3>
                            <p className={`${roboto.className} font-light text-base md:text-lg leading-relaxed text-black/80`}>
                                Universal patterns (all three products) formed the non-negotiable base: Button, Badge, Avatar, Tabs, Input, Select, Divider, and Menu all appeared in Notion, Discord, and Stripe with functionally identical roles. Strong patterns (two of three) included Toggle, SettingRow, PropertyRow, DataTable, Checkbox, and Banner, each confirmed by at least two products. Distinctive patterns (one product, high value) included SegmentedControl from Stripe and Tooltip, which were included because they demonstrate range and serve real compositional needs even though they appeared in fewer products.
                            </p>
                        </motion.div>

                        <motion.div variants={fadeInUp}>
                            <h3 className={`${roboto.className} font-light text-xs md:text-sm uppercase tracking-wider text-gray-800 mb-3`}>
                                Same need, different implementations
                            </h3>
                            <p className={`${roboto.className} font-light text-base md:text-lg leading-relaxed text-black/80`}>
                                The most valuable extraction insight came from cases where all three products solved the same problem differently. PropertyRow is the clearest example. In Notion, property display is an icon plus a label plus a typed value, all inline within a detail view. In Discord, it&#39;s a label stacked above a value with edit buttons, used within settings. In Stripe, it&#39;s a two-column label/value layout within form sections, and also a label-above-value card in sidebars. The underlying need (displaying a labeled piece of data) is identical. The implementations diverge because the contexts diverge.
                            </p>
                            <p className={`${roboto.className} font-light text-base md:text-lg leading-relaxed text-black/80 mt-4`}>
                                Neighborhood&#39;s PropertyRow supports all three layouts as variants. The variant used depends on context, not preference. This is the design system insight: the same component serves different needs through its API, not through separate components.
                            </p>
                        </motion.div>

                        <motion.div variants={fadeInUp}>
                            <h3 className={`${roboto.className} font-light text-xs md:text-sm uppercase tracking-wider text-gray-800 mb-3`}>
                                What was deliberately excluded
                            </h3>
                            <p className={`${roboto.className} font-light text-base md:text-lg leading-relaxed text-black/80`}>
                                Seven components were documented as v0.2 roadmap items rather than built: MetricCard, CommandPalette, UserProfileCard, StatusFilterBar, FilterChipRow, Textarea, and Radio Group. Each has clear cross-product justification, but either required complexity that would delay the initial release (CommandPalette), served a narrow use case not yet demonstrated in demos (MetricCard), or represented incremental atomic additions that could be added without architectural changes (Textarea, Radio Group). Documenting them on the site with a &ldquo;coming in v0.2&rdquo; label shows roadmap thinking without overcommitting.
                            </p>
                        </motion.div>

                        <motion.div variants={fadeInUp} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="border-l-2 border-green-500 pl-6">
                                <h3 className={`${roboto.className} font-light text-xs md:text-sm uppercase tracking-wider text-gray-800 mb-4`}>
                                    v0.1 SHIPPED
                                </h3>
                                <ul className={`${roboto.className} font-light text-sm md:text-base leading-relaxed text-black/80 space-y-2`}>
                                    <li>• 11 Atomic: Avatar, Badge, Button, Checkbox, Divider, Input, SegmentedControl, Select, Tabs, Toggle, Tooltip</li>
                                    <li>• 7 Compositional: Banner, ContentSection, DataTable, EmptyState, FormSection, Menu, PropertyRow, SettingRow</li>
                                    <li>• 6 Token categories: color, typography, spacing, radius, elevation, motion</li>
                                    <li>• 3 Demo pages: Settings, Dashboard, Onboarding</li>
                                </ul>
                            </div>
                            <div className="border-l-2 border-red-400/50 pl-6">
                                <h3 className={`${roboto.className} font-light text-xs md:text-sm uppercase tracking-wider text-gray-800 mb-4`}>
                                    DOCUMENTED FOR v0.2
                                </h3>
                                <ul className={`${roboto.className} font-light text-sm md:text-base leading-relaxed text-black/80 space-y-2`}>
                                    <li>• MetricCard: rich dashboard widget from Stripe</li>
                                    <li>• CommandPalette: search + filters + results overlay from Notion</li>
                                    <li>• UserProfileCard: dense popover composition from Discord</li>
                                    <li>• StatusFilterBar: selectable status pills from Stripe</li>
                                    <li>• FilterChipRow: mixed chip types from Notion + Stripe</li>
                                    <li>• Textarea, Radio Group: incremental atomic additions</li>
                                </ul>
                            </div>
                        </motion.div>
                    </AnimatedSection>
                </GridContainer>
            </section>

            <SectionDivider />

            {/* TOKENS */}
            <section id="tokens" className="relative py-16 md:py-20">
                <GridContainer>
                    <AnimatedSection className="flex flex-col gap-10 md:gap-12 relative z-10">
                        <motion.h2 variants={fadeInUp}
                            className={`${roboto.className} text-sm md:text-base text-black/40 uppercase tracking-[0.2em] font-normal`}>
                            TOKEN SYSTEM
                        </motion.h2>

                        <motion.p variants={fadeInUp}
                            className={`${roboto.className} font-light text-base md:text-lg leading-relaxed text-black/80`}>
                            The token system was locked before any components were built. Every visual decision (color, type, spacing, radius, shadow, motion) is defined as a CSS custom property, and components reference tokens exclusively. No hardcoded hex values, no magic numbers, no one-off font sizes. The tokens are the single source of truth, defined in globals.css and shipped as tokens.css in the npm package.
                        </motion.p>

                        <motion.div variants={fadeInUp}>
                            <h3 className={`${roboto.className} font-light text-xs md:text-sm uppercase tracking-wider text-gray-800 mb-3`}>
                                Color: warm stone neutrals
                            </h3>
                            <p className={`${roboto.className} font-light text-base md:text-lg leading-relaxed text-black/80`}>
                                The neutral scale is the backbone. Most design systems use cool grays (blue-tinted) because Tailwind and Material Design normalized them. Neighborhood uses a warm stone palette: eleven steps from #faf8f6 to #0d0c0a, each with a visible warmth that makes surfaces feel approachable rather than clinical. The primary accent is grass green (--primary-500: #16a85a), chosen for its natural energy and clear separation from the neutral scale. It&#39;s used sparingly: the sidebar &ldquo;N&rdquo; wordmark, bracket selection bars, and primary buttons.
                            </p>
                            <p className={`${roboto.className} font-light text-base md:text-lg leading-relaxed text-black/80 mt-4`}>
                                Beyond the core palette, seven extended color families (Berry, Terracotta, Amber, Sky, Plum, Sage, and the primary green) provide range for semantic use, data visualization, and component category identification in documentation. Each family has a full 50-900 scale. The naming draws from tactile and natural references: grass green, strawberry red, campfire orange, gold ingot, clear-day blue, nether portal purple, prismarine teal. This isn&#39;t arbitrary whimsy. Memorable names reduce cognitive load when referencing tokens across a team.
                            </p>
                        </motion.div>

                        <motion.div variants={fadeInUp}>
                            <h3 className={`${roboto.className} font-light text-xs md:text-sm uppercase tracking-wider text-gray-800 mb-3`}>
                                Typography: display + body pairing
                            </h3>
                            <p className={`${roboto.className} font-light text-base md:text-lg leading-relaxed text-black/80`}>
                                Space Grotesk handles display and headings: geometric, slightly technical, strong at large sizes with tight tracking. DM Sans handles body and UI text: humanist, highly readable at small sizes, with a warmth that complements the stone neutrals. The pairing creates natural hierarchy without relying on weight extremes. Display text at 64px with -0.03em tracking anchors pages. Body text at 16px with 1.6 line height keeps long-form content comfortable. The scale runs from 12px captions to 64px display sizes, with each step serving a defined role (overline, caption, body small, body, H4 through H1, display).
                            </p>
                        </motion.div>

                        <motion.div variants={fadeInUp}>
                            <h3 className={`${roboto.className} font-light text-xs md:text-sm uppercase tracking-wider text-gray-800 mb-3`}>
                                Radius and elevation: role-based, not size-based
                            </h3>
                            <p className={`${roboto.className} font-light text-base md:text-lg leading-relaxed text-black/80`}>
                                Most systems define radius as small/medium/large. Neighborhood uses role-based tokens: --radius-control (8px) for interactive elements like buttons and inputs, --radius-surface (12px) for cards and containers, --radius-pill (9999px) for badges and pills. The same principle applies to elevation: --shadow-subtle for inline elements, --shadow-raised for cards, --shadow-overlay for menus and popovers. This means a developer doesn&#39;t choose a size. They choose a role. A button gets control radius because it&#39;s a control, not because 8px happens to look right. If the system later adjusts what &ldquo;control&rdquo; means, every control updates simultaneously.
                            </p>
                        </motion.div>

                        <motion.div variants={fadeInUp}>
                            <h3 className={`${roboto.className} font-light text-xs md:text-sm uppercase tracking-wider text-gray-800 mb-3`}>
                                Motion: every interaction has motion
                            </h3>
                            <p className={`${roboto.className} font-light text-base md:text-lg leading-relaxed text-black/80`}>
                                Static state changes feel dead. Neighborhood defines four easing curves (default, spring, pop, loop) and four durations (fast at 120ms, base at 200ms, slow at 350ms, loop at 1.4s), each mapped to specific interaction types. Hover states use duration-fast with ease-default for subtle, functional feedback. Entrance animations use duration-slow with ease-default so content settles without overshoot. Press and click interactions use ease-pop for tactile snap. Tab transitions use ease-spring for a subtle bounce that signals state change.
                            </p>
                            <p className={`${roboto.className} font-light text-base md:text-lg leading-relaxed text-black/80 mt-4`}>
                                Two signature selection patterns emerged during component development. The bracket pattern uses two vertical bars (primary-400 green) that spring-scale around the active item, used for primary navigation and tab selection. The landing pattern settles the active item downward with translateY and an inset shadow, as if it has physical weight pressing in. These two patterns handle every selection context in the system: brackets for strong identity moments, landing for text-heavy lists where brackets would be too busy.
                            </p>
                        </motion.div>

                        <TradeoffBlock>
                            Defining motion tokens rather than letting each component choose its own timing was a conscious constraint. It means some components use slightly faster or slower transitions than might be &ldquo;optimal&rdquo; for their specific context. But system-wide consistency matters more than per-component optimization. When everything moves at the same rhythm, the interface feels cohesive. When each component has its own timing, the interface feels assembled from parts.
                        </TradeoffBlock>
                    </AnimatedSection>
                </GridContainer>
            </section>

            <SectionDivider />

            {/* COMPONENTS */}
            <section id="components" className="relative py-16 md:py-20">
                <GridContainer>
                    <AnimatedSection className="flex flex-col gap-10 md:gap-12 relative z-10">
                        <motion.h2 variants={fadeInUp}
                            className={`${roboto.className} text-sm md:text-base text-black/40 uppercase tracking-[0.2em] font-normal`}>
                            COMPONENTS
                        </motion.h2>

                        <motion.p variants={fadeInUp}
                            className={`${roboto.className} font-light text-base md:text-lg leading-relaxed text-black/80`}>
                            The 18-component inventory splits into two layers. Eleven atomic components handle individual interaction primitives: buttons, inputs, toggles, checkboxes, badges, avatars, tabs, selects, dividers, segmented controls, and tooltips. Seven compositional components handle mid-level patterns that compose atoms into reusable groups: banners, content sections, data tables, empty states, form sections, menus, property rows, and setting rows. The compositional layer is where the real systems thinking lives. Anyone can build a button. The harder question is how buttons, toggles, and selects compose into a settings interface.
                        </motion.p>

                        <motion.div variants={fadeInUp}>
                            <h3 className={`${roboto.className} font-light text-xs md:text-sm uppercase tracking-wider text-gray-800 mb-3`}>
                                SettingRow: the key extraction
                            </h3>
                            <p className={`${roboto.className} font-light text-base md:text-lg leading-relaxed text-black/80`}>
                                SettingRow appeared more than ten times on a single Notion preferences page. It was confirmed by Discord&#39;s notification settings. Its anatomy is deceptively simple: a bold label and muted description on the left, a control slot on the right. The control slot accepts a Toggle, Select, Button, or any custom element. This is not just an atom. It&#39;s a composition that demonstrates how a design system thinks in assembled patterns rather than isolated primitives.
                            </p>
                        </motion.div>

                        <motion.div variants={fadeInUp}>
                            <h3 className={`${roboto.className} font-light text-xs md:text-sm uppercase tracking-wider text-gray-800 mb-3`}>
                                Menu: portal architecture
                            </h3>
                            <p className={`${roboto.className} font-light text-base md:text-lg leading-relaxed text-black/80`}>
                                Menu was the most architecturally complex component. Across the three audits, Notion&#39;s actions dropdown contained six distinct item types (search, segmented selectors, action items with shortcuts, toggle items, submenu indicators, and metadata footers). Discord had three separate menu variants (user, message, server) each with unique content but shared structure. Stripe&#39;s menus were compact with keyboard shortcuts. Neighborhood&#39;s Menu supports all of these through a composable item API: action, destructive, with-description, with-shortcut, grouped by dividers. The dropdown renders via React portal to document.body with position: fixed, so it&#39;s never clipped by parent overflow, stacking contexts, or table containers.
                            </p>
                        </motion.div>

                        <motion.div variants={fadeInUp}>
                            <h3 className={`${roboto.className} font-light text-xs md:text-sm uppercase tracking-wider text-gray-800 mb-3`}>
                                Two-repo architecture
                            </h3>
                            <p className={`${roboto.className} font-light text-base md:text-lg leading-relaxed text-black/80`}>
                                Components are published as a separate npm package (@neighborhood/ui) installed from GitHub. The documentation site imports from the package, not from local files. This is a real package architecture: run npm install github:akin-tewe/neighborhood-ui, and the components are available. To update a component, you edit it in the component repo, rebuild, push, and reinstall in the doc site. The separation enforces a clean API boundary. The doc site can&#39;t accidentally depend on internal implementation details, because the components are consumed through their public exports.
                            </p>
                        </motion.div>

                        <motion.div variants={fadeInUp}>
                            <h3 className={`${roboto.className} font-light text-xs md:text-sm uppercase tracking-wider text-gray-800 mb-3`}>
                                Accessibility as non-negotiable
                            </h3>
                            <p className={`${roboto.className} font-light text-base md:text-lg leading-relaxed text-black/80`}>
                                Every interactive component has a visible focus ring for keyboard navigation using :focus-visible (not :focus, so rings only appear on keyboard nav, not mouse clicks). The ring spec is consistent: 2px solid sky-400 with 2px offset. Every keyboard interaction documented on a component page actually works in the component. If the docs say &ldquo;Space or Enter to toggle,&rdquo; the component has an onKeyDown handler implementing that. Claims without implementation are worse than no claims at all.
                            </p>
                        </motion.div>
                    </AnimatedSection>
                </GridContainer>
            </section>

            <SectionDivider />

            {/* DEMOS */}
            <section id="demos" className="relative py-16 md:py-20">
                <GridContainer>
                    <AnimatedSection className="flex flex-col gap-10 md:gap-12 relative z-10">
                        <motion.h2 variants={fadeInUp}
                            className={`${roboto.className} text-sm md:text-base text-black/40 uppercase tracking-[0.2em] font-normal`}>
                            DEMOS
                        </motion.h2>

                        <motion.p variants={fadeInUp}
                            className={`${roboto.className} font-light text-base md:text-lg leading-relaxed text-black/80`}>
                            Components in isolation prove they exist. Components composed into real interfaces prove they work. Neighborhood ships three demo pages, each demonstrating a different composition context: a settings page (form-heavy, toggle-dense), a dashboard (data-dense, table-heavy), and an onboarding wizard (multi-step, progressive disclosure). None of these demos are clones of the audited products. They are original compositions using Neighborhood&#39;s visual identity and token system that happen to exercise most of the component inventory in realistic contexts.
                        </motion.p>

                        <motion.div variants={fadeInUp}>
                            <h3 className={`${roboto.className} font-light text-xs md:text-sm uppercase tracking-wider text-gray-800 mb-3`}>
                                Settings: the composition stress test
                            </h3>
                            <p className={`${roboto.className} font-light text-base md:text-lg leading-relaxed text-black/80`}>
                                The settings demo was chosen as the primary demo because it naturally requires the most component variety in a single view. It uses the sidebar rail with bracket selection, secondary panel with landing selection, tabs, multiple SettingRows with Toggle, Select, and Button controls, FormSections with Input and helper text, PropertyRows displaying user data, a Banner at the top, Badges within navigation, an EmptyState in one section, Dividers between groups, and Buttons across primary, secondary, and ghost variants. A single settings page exercises 14 of the 18 built components. The ContentSection component with its action slot pattern (using Menu for secondary actions like reset, export, import) ties entire sections together.
                            </p>
                        </motion.div>

                        <motion.div variants={fadeInUp}>
                            <h3 className={`${roboto.className} font-light text-xs md:text-sm uppercase tracking-wider text-gray-800 mb-3`}>
                                Dashboard: data density
                            </h3>
                            <p className={`${roboto.className} font-light text-base md:text-lg leading-relaxed text-black/80`}>
                                The dashboard demo exercises the data-heavy end of the system. DataTable with typed cells (text, currency, date, badge, monospace ID), selectable rows with checkboxes, column sorting, row-level Menu actions, and pagination. PropertyRows in stacked and two-column variants display summary information. This demo proves the system can handle dense information display without losing the warm, approachable aesthetic that defines Neighborhood&#39;s identity.
                            </p>
                        </motion.div>

                        <motion.div variants={fadeInUp}>
                            <h3 className={`${roboto.className} font-light text-xs md:text-sm uppercase tracking-wider text-gray-800 mb-3`}>
                                Onboarding: progressive disclosure
                            </h3>
                            <p className={`${roboto.className} font-light text-base md:text-lg leading-relaxed text-black/80`}>
                                The onboarding demo uses a multi-step card wizard pattern: a single card that transitions through steps as the user progresses. Inputs with validation, Selects, Checkboxes, and Buttons compose into form steps, with a SegmentedControl handling plan selection. The demo proves the system handles progressive and sequential flows, not just static pages. Every demo page also includes an info Banner at the top identifying it as a demo, reinforcing that these are demonstrations of the system, not standalone products.
                            </p>
                        </motion.div>

                        <TradeoffBlock>
                            Three demos is a constraint. More contexts (messaging, e-commerce, analytics) would demonstrate wider range. But three well-built demos that each exercise a different composition pattern are more convincing than ten shallow ones. The settings demo alone uses 14 components. That&#39;s a stronger proof of composition than five demos using three components each.
                        </TradeoffBlock>
                    </AnimatedSection>
                </GridContainer>
            </section>

            <SectionDivider />

            {/* WHAT'S NEXT */}
            <section id="whats-next" className="relative py-16 md:py-20">
                <GridContainer>
                    <AnimatedSection className="flex flex-col gap-8 md:gap-10 relative z-10">
                        <motion.h2 variants={fadeInUp}
                            className={`${roboto.className} text-sm md:text-base text-black/40 uppercase tracking-[0.2em] font-normal`}>
                            WHAT&#39;S NEXT
                        </motion.h2>

                        <motion.p variants={fadeInUp}
                            className={`${roboto.className} font-light text-base md:text-lg leading-relaxed text-black/80`}>
                            Neighborhood v0.1 is shipped, but the system is actively evolving. The v0.2 roadmap includes seven additional components documented on the site: MetricCard for dashboard contexts, CommandPalette for power-user search and navigation, UserProfileCard for identity-rich popovers, StatusFilterBar and FilterChipRow for data filtering patterns, and Textarea and Radio Group as foundational atomic additions.
                        </motion.p>

                        <motion.p variants={fadeInUp}
                            className={`${roboto.className} font-light text-base md:text-lg leading-relaxed text-black/80`}>
                            Beyond components, future work includes additional demo pages covering messaging and e-commerce contexts, expanded accessibility documentation with ARIA patterns and screen reader testing, and a formal dark mode implementation using the token system&#39;s architecture (every color token would resolve to a dark variant, with components inheriting automatically).
                        </motion.p>
                    </AnimatedSection>
                </GridContainer>
            </section>

            <SectionDivider />

            {/* Built With + CTA */}
            <section className="relative py-16 md:py-20">
                <GridContainer>
                    <AnimatedSection className="flex flex-col items-center gap-8 md:gap-10 relative z-10">
                        <motion.h2 variants={fadeInUp}
                            className={`${roboto.className} text-sm md:text-base text-black/40 uppercase tracking-[0.2em] font-normal text-center`}>
                            BUILT WITH
                        </motion.h2>

                        <motion.div variants={fadeInUp}
                            className="flex flex-wrap justify-center gap-2 md:gap-3">
                            <TechPill name="Next.js 16" />
                            <TechPill name="React 19" />
                            <TechPill name="TypeScript" />
                            <TechPill name="Tailwind CSS 4" />
                            <TechPill name="CSS Custom Properties" />
                        </motion.div>

                        <motion.p variants={fadeInUp}
                            className={`${roboto.className} font-light text-base md:text-lg leading-relaxed text-black/80 mx-auto text-center`}>
                            Neighborhood is built on the same stack as my portfolio and Sifty: Next.js with App Router, React 19, TypeScript in strict mode, and Tailwind CSS v4. The token system uses CSS custom properties rather than Tailwind&#39;s config-based approach, which means tokens work anywhere CSS works, not just in Tailwind utility classes. The component package is published via GitHub and installed with a single command. The documentation site consumes the package as proof of its own API.
                        </motion.p>

                        <motion.div variants={fadeInUp} className="flex flex-wrap gap-4 justify-center">
                            <MagneticWrapper>
                                <a href="https://nbhd.dev" target="_blank" rel="noopener noreferrer"
                                    className={`${pixelify.className} px-6 py-3 bg-gray-900 rounded text-white text-base tracking-wide uppercase hover:bg-gray-800 transition-colors flex items-center gap-2`}>
                                    <ExternalLink className="w-4 h-4" />
                                    Documentation Site
                                </a>
                            </MagneticWrapper>
                            <MagneticWrapper>
                                <a href="https://github.com/akin-tewe/neighborhood-ui" target="_blank" rel="noopener noreferrer"
                                    className={`${pixelify.className} px-6 py-3 bg-white border border-gray-300 rounded text-gray-800 text-base tracking-wide uppercase hover:bg-gray-50 transition-colors flex items-center gap-2`}>
                                    <Github className="w-4 h-4" />
                                    GitHub
                                </a>
                            </MagneticWrapper>
                        </motion.div>
                    </AnimatedSection>
                </GridContainer>
            </section>

                </div>
            </div>
        </main>
    );
}

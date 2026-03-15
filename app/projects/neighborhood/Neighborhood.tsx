"use client";
import { pixelify, roboto } from "@/app/ui/fonts"
import Image from "next/image"
import { MagneticWrapper } from "@/components/MagneticButton";
import { useRef, useState } from "react";
import { ExternalLink, Github } from "lucide-react";
import { motion, useInView } from "framer-motion";
import ProjectMetrics from "@/components/ProjectMetrics";
import CaseStudySidebar from "@/components/CaseStudySidebar";
import {
    Toggle, Badge, Button, SettingRow, PropertyRow,
    Avatar, Tabs, Input, Banner, Divider, EmptyState,
    SegmentedControl, Select, Checkbox, Tooltip,
} from "@neighborhood/ui";
import "@neighborhood/ui/tokens.css";

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
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
};

function GridContainer({ children, className = "", id }: { children: React.ReactNode; className?: string; id?: string }) {
    return <div id={id} className={`w-full max-w-[1000px] mx-auto px-8 ${className}`}>{children}</div>;
}

function SectionDivider() {
    return <div className="w-full max-w-[1000px] mx-auto px-8"><div className="h-px bg-gradient-to-r from-transparent via-black/15 to-transparent" /></div>;
}

function AnimatedSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });
    return (
        <motion.div ref={ref} initial="hidden" animate={isInView ? "visible" : "hidden"} variants={staggerContainer} className={className}>
            {children}
        </motion.div>
    );
}

function TechPill({ name }: { name: string }) {
    return <span className={`${roboto.className} text-xs md:text-sm text-white bg-gray-900 px-3 py-1 rounded-full`}>{name}</span>;
}

function TradeoffBlock({ children }: { children: React.ReactNode }) {
    return (
        <div className="bg-gray-100 rounded-2xl p-6 md:p-8 mt-6">
            <p className={`${roboto.className} text-black/60 font-light text-sm md:text-base italic leading-relaxed`}>{children}</p>
        </div>
    );
}

// Audit image with caption
function AuditImage({ src, alt, caption, product }: { src: string; alt: string; caption: string; product: "notion" | "discord" | "stripe" }) {
    const colors = { notion: "bg-gray-800", discord: "bg-indigo-600", stripe: "bg-violet-600" };
    const labels = { notion: "Notion", discord: "Discord", stripe: "Stripe" };
    return (
        <div className="group">
            <div className="relative overflow-hidden rounded-2xl border border-black/5">
                <div className={`absolute top-3 left-3 z-10 ${colors[product]} text-white text-xs px-2 py-1 rounded-full font-medium`}>
                    {labels[product]}
                </div>
                <Image src={src} alt={alt} width={1400} height={900} className="w-full h-auto" />
            </div>
            <span className={`${roboto.className} text-black/35 text-sm mt-3 block text-center italic`}>{caption}</span>
        </div>
    );
}

// Live component demo surface
function DemoSurface({ children, label }: { children: React.ReactNode; label?: string }) {
    return (
        <div className="rounded-2xl border border-black/10 bg-white p-6 md:p-8">
            {label && (
                <span className={`${pixelify.className} text-xs text-black/30 uppercase tracking-[0.15em] mb-4 block`}>{label}</span>
            )}
            <div className="flex flex-col gap-4">{children}</div>
        </div>
    );
}

export default function Neighborhood() {
    const heroRef = useRef(null);
    const isHeroInView = useInView(heroRef, { once: true });
    const [demoToggle1, setDemoToggle1] = useState(true);
    const [demoToggle2, setDemoToggle2] = useState(false);
    const [demoTab, setDemoTab] = useState("overview");
    const [demoSegment, setDemoSegment] = useState("monthly");
    const [demoCheck, setDemoCheck] = useState(true);

    return (
        <main className="overflow-x-clip">
            {/* Hero */}
            <section ref={heroRef} className="relative w-full flex flex-col pt-32 md:pt-40 pb-16 md:pb-24 bg-[#fafafa]">
                <GridContainer>
                    <motion.div initial={{ opacity: 0, y: 40 }} animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className="flex flex-col items-start text-left max-w-4xl relative z-10">
                    <motion.h1 initial={{ opacity: 0, y: 20 }} animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className={`${pixelify.className} text-4xl md:text-5xl lg:text-6xl text-gray-800 mb-4`}>
                        Neighborhood
                    </motion.h1>
                    <motion.span initial={{ opacity: 0, y: 20 }} animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className={`${pixelify.className} text-green-500 italic text-lg md:text-xl uppercase tracking-wider mb-8`}>
                        Design System v0.1
                    </motion.span>
                    <motion.p initial={{ opacity: 0, y: 20 }} animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className={`${roboto.className} text-black/50 font-light text-base md:text-lg lg:text-xl mt-6 leading-relaxed`}>
                        A component library and design system built from the ground up, with warmth, motion, and personality baked into every token. 18 components, 6 token categories, a living documentation site, and three full demo pages. This case study covers the initial conception and v0.1 implementation. Neighborhood is actively under development.
                    </motion.p>

                    <motion.div initial={{ opacity: 0, y: 20 }} animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className="flex flex-wrap gap-4 mt-10 justify-center md:justify-start">
                        <MagneticWrapper>
                            <a href="https://nbhd.dev" target="_blank" rel="noopener noreferrer"
                                className={`${pixelify.className} px-6 py-3 bg-gray-900 rounded text-white text-base tracking-wide uppercase hover:bg-gray-800 transition-colors flex items-center gap-2`}>
                                <ExternalLink className="w-4 h-4" />Documentation Site
                            </a>
                        </MagneticWrapper>
                        <MagneticWrapper>
                            <a href="https://github.com/akin-tewe/neighborhood-ui" target="_blank" rel="noopener noreferrer"
                                className={`${pixelify.className} px-6 py-3 bg-white border border-gray-300 rounded text-gray-800 text-base tracking-wide uppercase hover:bg-gray-50 transition-colors flex items-center gap-2`}>
                                <Github className="w-4 h-4" />GitHub
                            </a>
                        </MagneticWrapper>
                    </motion.div>
                    </motion.div>
                </GridContainer>
                <ProjectMetrics metrics={[
                    { label: "Role", value: "Sole Designer · Developer" },
                    { label: "Components", value: "18 (11 Atomic · 7 Compositional)" },
                    { label: "Type", value: "Design System + Documentation" },
                    { label: "Status", value: "v0.1 Shipped · Active Development" },
                ]} />
            </section>

            {/* Sidebar + Content */}
            <div className="lg:grid lg:grid-cols-[200px_minmax(0,1fr)]">
                <CaseStudySidebar sections={neighborhoodSections} />
                <div className="lg:-translate-x-[100px]">

            {/* Overview */}
            <section className="relative py-16 md:py-20">
                <GridContainer>
                    <AnimatedSection className="relative z-10">
                        <motion.p variants={fadeInUp} className={`${roboto.className} font-light text-base md:text-lg leading-relaxed text-black/80`}>
                            Neighborhood is a design system I built from scratch: a fully packaged npm component library, a token architecture spanning six categories, and a documentation site that consumes its own components as proof they work. The system was extracted from a structured cross-product audit of three real products (Notion, Discord, and Stripe), and every component included earned its place through observed frequency and compositional value, not from a checklist.
                        </motion.p>
                    </AnimatedSection>
                </GridContainer>
            </section>

            <SectionDivider />

            {/* WHY */}
            <section id="why" className="relative py-16 md:py-20">
                <GridContainer>
                    <AnimatedSection className="flex flex-col gap-10 md:gap-12 relative z-10">
                        <motion.h2 variants={fadeInUp} className={`${roboto.className} text-sm md:text-base text-black/40 uppercase tracking-[0.2em] font-normal`}>
                            WHY BUILD A DESIGN SYSTEM
                        </motion.h2>
                        <motion.p variants={fadeInUp} className={`${roboto.className} font-light text-base md:text-lg leading-relaxed text-black/80`}>
                            As a designer who also writes production code, I think in systems. A design system is the purest expression of that instinct: it forces every decision to be explicit, documented, and reusable. Rather than demonstrating this thinking implicitly through project work, Neighborhood makes it the entire point.
                        </motion.p>
                        <motion.p variants={fadeInUp} className={`${roboto.className} font-light text-base md:text-lg leading-relaxed text-black/80`}>
                            The specific motivation was strategic. My portfolio read well as creative and technical work, but it didn&#39;t immediately signal the systematic design thinking that product design roles require. Shipping a design system (not just designing one in Figma) sends a clear message: I understand token architecture, component APIs, documentation, accessibility, and composition patterns, and I can build all of it in production code.
                        </motion.p>

                        {/* Live demo: this IS the system */}
                        <motion.div variants={fadeInUp}>
                            <DemoSurface label="Live components — these are Neighborhood">
                                <div className="flex flex-wrap items-center gap-3">
                                    <Badge label="Shipped" color="success" />
                                    <Badge label="v0.1" color="primary" variant="subtle" />
                                    <Badge label="18 Components" color="plum" variant="outline" />
                                    <Badge label="npm Package" color="sky" />
                                </div>
                                <Divider />
                                <div className="flex flex-wrap items-center gap-3">
                                    <Button variant="primary">Primary</Button>
                                    <Button variant="secondary">Secondary</Button>
                                    <Button variant="ghost">Ghost</Button>
                                    <Button variant="destructive">Destructive</Button>
                                </div>
                            </DemoSurface>
                        </motion.div>
                    </AnimatedSection>
                </GridContainer>
            </section>

            <SectionDivider />

            {/* METHODOLOGY */}
            <section id="methodology" className="relative py-16 md:py-20">
                <GridContainer>
                    <AnimatedSection className="flex flex-col gap-10 md:gap-12 relative z-10">
                        <motion.h2 variants={fadeInUp} className={`${roboto.className} text-sm md:text-base text-black/40 uppercase tracking-[0.2em] font-normal`}>
                            METHODOLOGY
                        </motion.h2>
                        <motion.p variants={fadeInUp} className={`${roboto.className} font-light text-base md:text-lg leading-relaxed text-black/80`}>
                            Rather than pulling components from a UI kit or a personal wishlist, I conducted structured audits of three shipping products, analyzing their interfaces at three layers of abstraction: full-page layouts, mid-level compositional patterns, and individual atomic elements.
                        </motion.p>

                        {/* Audit stat cards */}
                        <motion.div variants={fadeInUp} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-gray-800 text-white rounded-2xl p-6 text-center">
                                <p className={`${pixelify.className} text-3xl mb-2`}>Notion</p>
                                <p className={`${roboto.className} text-white/60 text-sm font-light`}>9 views · Warmth, composition, content-first</p>
                            </div>
                            <div className="bg-indigo-600 text-white rounded-2xl p-6 text-center">
                                <p className={`${pixelify.className} text-3xl mb-2`}>Discord</p>
                                <p className={`${roboto.className} text-white/60 text-sm font-light`}>12 views · Personality, real-time feedback</p>
                            </div>
                            <div className="bg-violet-600 text-white rounded-2xl p-6 text-center">
                                <p className={`${pixelify.className} text-3xl mb-2`}>Stripe</p>
                                <p className={`${roboto.className} text-white/60 text-sm font-light`}>8 views · Rigor, data density, forms</p>
                            </div>
                        </motion.div>

                        <motion.p variants={fadeInUp} className={`${roboto.className} font-light text-base md:text-lg leading-relaxed text-black/80`}>
                            Three products were chosen as a deliberate triangle. Together they cover the full range of interface contexts a design system should handle: content tools, data dashboards, and social platforms. If a component appeared in all three, it was non-negotiable. If it appeared in two, it was strongly considered. If it appeared in only one but demonstrated high compositional value, it earned a place as a distinctive pattern.
                        </motion.p>

                        {/* Audit screenshots — Notion */}
                        <motion.div variants={fadeInUp}>
                            <h3 className={`${roboto.className} font-light text-xs md:text-sm uppercase tracking-wider text-gray-800 mb-4`}>
                                Notion: composition and settings patterns
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <AuditImage src="/projects/neighborhood/audit/notion-settings-preferences.png" alt="Notion settings preferences" caption="SettingRow pattern: label + description + control. Appears 10+ times on a single page." product="notion" />
                                <AuditImage src="/projects/neighborhood/audit/notion-settings-people.png" alt="Notion settings people" caption="EmptyState with dashed border, tab variants, and section organization." product="notion" />
                            </div>
                        </motion.div>

                        {/* Discord */}
                        <motion.div variants={fadeInUp}>
                            <h3 className={`${roboto.className} font-light text-xs md:text-sm uppercase tracking-wider text-gray-800 mb-4`}>
                                Discord: personality and interaction density
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <AuditImage src="/projects/neighborhood/audit/discord-user-popover.png" alt="Discord user popover" caption="The richest popover across all three audits: avatar, banner, badges, roles, bio, and inline input." product="discord" />
                                <AuditImage src="/projects/neighborhood/audit/discord-settings-notifications.png" alt="Discord notification settings" caption="Toggle rows confirming the SettingRow pattern with simpler anatomy than Notion." product="discord" />
                            </div>
                        </motion.div>

                        {/* Stripe */}
                        <motion.div variants={fadeInUp}>
                            <h3 className={`${roboto.className} font-light text-xs md:text-sm uppercase tracking-wider text-gray-800 mb-4`}>
                                Stripe: data density and form rigor
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <AuditImage src="/projects/neighborhood/audit/stripe-payments.png" alt="Stripe payments" caption="DataTable with typed cells, row selection, status badges, and pagination." product="stripe" />
                                <AuditImage src="/projects/neighborhood/audit/stripe-settings-details.png" alt="Stripe settings detail" caption="FormSection pattern: grouped inputs with labels, edit actions, and destructive buttons." product="stripe" />
                            </div>
                        </motion.div>

                        <TradeoffBlock>
                            Auditing live products rather than referencing existing design system documentation (like Polaris or Primer) was a deliberate choice. Existing systems document what they built, not how real interfaces compose. By analyzing Notion, Discord, and Stripe directly, I could observe which patterns are truly universal versus product-specific.
                        </TradeoffBlock>
                    </AnimatedSection>
                </GridContainer>
            </section>

            <SectionDivider />

            {/* EXTRACTION */}
            <section id="extraction" className="relative py-16 md:py-20">
                <GridContainer>
                    <AnimatedSection className="flex flex-col gap-10 md:gap-12 relative z-10">
                        <motion.h2 variants={fadeInUp} className={`${roboto.className} text-sm md:text-base text-black/40 uppercase tracking-[0.2em] font-normal`}>
                            EXTRACTION
                        </motion.h2>
                        <motion.p variants={fadeInUp} className={`${roboto.className} font-light text-base md:text-lg leading-relaxed text-black/80`}>
                            The audits produced hundreds of observations. The synthesis phase compressed them into a prioritized component inventory using a single principle: a component earns inclusion if it appears across multiple products confirming universality, or represents a distinctively valuable pattern that demonstrates design range.
                        </motion.p>

                        {/* PropertyRow case study — the key insight */}
                        <motion.div variants={fadeInUp}>
                            <h3 className={`${roboto.className} font-light text-xs md:text-sm uppercase tracking-wider text-gray-800 mb-4`}>
                                Same need, three implementations
                            </h3>
                            <p className={`${roboto.className} font-light text-base md:text-lg leading-relaxed text-black/80 mb-6`}>
                                PropertyRow is the clearest example of the extraction insight. All three products display labeled data, but each does it differently. Neighborhood supports all three layouts through a single component API.
                            </p>
                            {/* Live PropertyRow demos */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <DemoSurface label="Notion style">
                                    <PropertyRow label="Status" value={<Badge label="Active" color="success" size="sm" />} />
                                    <PropertyRow label="Due date" value="March 15, 2026" />
                                    <PropertyRow label="Assignee" value="Akin Tewe" />
                                </DemoSurface>
                                <DemoSurface label="Stripe style">
                                    <PropertyRow label="Email" value="akin@example.com" />
                                    <PropertyRow label="Plan" value={<Badge label="Pro" color="plum" size="sm" />} />
                                    <PropertyRow label="Balance" value="$2,450.00" />
                                </DemoSurface>
                                <DemoSurface label="Discord style">
                                    <PropertyRow label="Display Name" value="paid actor" />
                                    <PropertyRow label="Username" value="eightybot" />
                                    <PropertyRow label="Member Since" value="Jan 2024" />
                                </DemoSurface>
                            </div>
                        </motion.div>

                        {/* SettingRow — the key compositional extraction */}
                        <motion.div variants={fadeInUp}>
                            <h3 className={`${roboto.className} font-light text-xs md:text-sm uppercase tracking-wider text-gray-800 mb-4`}>
                                SettingRow: the composition that matters
                            </h3>
                            <p className={`${roboto.className} font-light text-base md:text-lg leading-relaxed text-black/80 mb-6`}>
                                SettingRow appeared more than ten times on a single Notion preferences page and was confirmed by Discord&#39;s notification settings. Its anatomy is deceptively simple: a label and description on the left, a control slot on the right. The control slot accepts any component. This is not just an atom. It&#39;s the composition that proves the system thinks in assembled patterns.
                            </p>
                            <DemoSurface label="Live SettingRow demos — try the toggles">
                                <SettingRow label="Dark mode" description="Switch between light and dark themes" control={<Toggle checked={demoToggle1} onChange={setDemoToggle1} />} />
                                <Divider />
                                <SettingRow label="Notifications" description="Receive alerts for new activity" control={<Toggle checked={demoToggle2} onChange={setDemoToggle2} />} />
                                <Divider />
                                <SettingRow label="Language" description="Choose your preferred language" control={<Select value="English" variant="form" />} />
                            </DemoSurface>
                        </motion.div>

                        {/* Included vs excluded */}
                        <motion.div variants={fadeInUp} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="border-l-2 border-green-500 pl-6">
                                <h3 className={`${roboto.className} font-light text-xs md:text-sm uppercase tracking-wider text-gray-800 mb-4`}>v0.1 SHIPPED</h3>
                                <ul className={`${roboto.className} font-light text-sm md:text-base leading-relaxed text-black/80 space-y-2`}>
                                    <li>• 11 Atomic: Avatar, Badge, Button, Checkbox, Divider, Input, SegmentedControl, Select, Tabs, Toggle, Tooltip</li>
                                    <li>• 7 Compositional: Banner, ContentSection, DataTable, EmptyState, FormSection, Menu, PropertyRow, SettingRow</li>
                                    <li>• 6 Token categories</li>
                                    <li>• 3 Demo pages</li>
                                </ul>
                            </div>
                            <div className="border-l-2 border-red-400/50 pl-6">
                                <h3 className={`${roboto.className} font-light text-xs md:text-sm uppercase tracking-wider text-gray-800 mb-4`}>DOCUMENTED FOR v0.2</h3>
                                <ul className={`${roboto.className} font-light text-sm md:text-base leading-relaxed text-black/80 space-y-2`}>
                                    <li>• MetricCard — rich dashboard widget from Stripe</li>
                                    <li>• CommandPalette — search + filters overlay from Notion</li>
                                    <li>• UserProfileCard — dense popover from Discord</li>
                                    <li>• StatusFilterBar, FilterChipRow, Textarea, Radio Group</li>
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
                        <motion.h2 variants={fadeInUp} className={`${roboto.className} text-sm md:text-base text-black/40 uppercase tracking-[0.2em] font-normal`}>
                            TOKEN SYSTEM
                        </motion.h2>
                        <motion.p variants={fadeInUp} className={`${roboto.className} font-light text-base md:text-lg leading-relaxed text-black/80`}>
                            The token system was locked before any components were built. Every visual decision is defined as a CSS custom property, and components reference tokens exclusively. No hardcoded hex values, no magic numbers. The tokens are the single source of truth.
                        </motion.p>

                        {/* Color palette visual */}
                        <motion.div variants={fadeInUp}>
                            <h3 className={`${roboto.className} font-light text-xs md:text-sm uppercase tracking-wider text-gray-800 mb-4`}>
                                Warm stone neutrals
                            </h3>
                            <div className="flex gap-1 rounded-2xl overflow-hidden mb-4">
                                {["#faf8f6","#f3f0ed","#e6e2dd","#d1cbc4","#a69f96","#7a736b","#5c554e","#45403b","#2e2a26","#1a1816","#0d0c0a"].map((c) => (
                                    <div key={c} style={{ background: c, flex: 1, height: 48 }} />
                                ))}
                            </div>
                            <p className={`${roboto.className} font-light text-base md:text-lg leading-relaxed text-black/80`}>
                                Most design systems use cool grays. Neighborhood uses a warm stone palette: eleven steps with visible warmth that makes surfaces feel approachable rather than clinical.
                            </p>
                        </motion.div>

                        {/* Extended palette */}
                        <motion.div variants={fadeInUp}>
                            <h3 className={`${roboto.className} font-light text-xs md:text-sm uppercase tracking-wider text-gray-800 mb-4`}>
                                Extended palette
                            </h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                                {[
                                    { name: "Primary", subtitle: "Grass Green", colors: ["#edfcf2","#34cc76","#0b8847","#093e24"] },
                                    { name: "Berry", subtitle: "Strawberry", colors: ["#fff1f2","#ff5c6a","#c41d35","#6e1624"] },
                                    { name: "Terracotta", subtitle: "Campfire", colors: ["#fff6ed","#ff8530","#cc5008","#6e2b10"] },
                                    { name: "Amber", subtitle: "Gold Ingot", colors: ["#fffbeb","#ffbc20","#d47d02","#72390d"] },
                                    { name: "Sky", subtitle: "Clear Day", colors: ["#eff8ff","#52a8ff","#166cd4","#163d6e"] },
                                    { name: "Plum", subtitle: "Nether Portal", colors: ["#faf4ff","#ba72ff","#8a28d8","#4e1878"] },
                                    { name: "Sage", subtitle: "Prismarine", colors: ["#eefcf8","#42c4a8","#1a8773","#18473f"] },
                                ].map((family) => (
                                    <div key={family.name} className="rounded-xl overflow-hidden border border-black/5">
                                        <div className="flex">
                                            {family.colors.map((c) => <div key={c} style={{ background: c, flex: 1, height: 32 }} />)}
                                        </div>
                                        <div className="p-3 bg-white">
                                            <p className={`${roboto.className} text-sm font-medium text-gray-800`}>{family.name}</p>
                                            <p className={`${roboto.className} text-xs text-black/40`}>{family.subtitle}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <p className={`${roboto.className} font-light text-base md:text-lg leading-relaxed text-black/80`}>
                                Seven extended color families provide range for semantic use, data visualization, and category identification. The naming draws from tactile and natural references: grass green, strawberry red, campfire orange. Memorable names reduce cognitive load when referencing tokens across a team.
                            </p>
                        </motion.div>

                        {/* Radius and elevation */}
                        <motion.div variants={fadeInUp}>
                            <h3 className={`${roboto.className} font-light text-xs md:text-sm uppercase tracking-wider text-gray-800 mb-4`}>
                                Role-based radius and elevation
                            </h3>
                            <p className={`${roboto.className} font-light text-base md:text-lg leading-relaxed text-black/80 mb-6`}>
                                Most systems define radius as small/medium/large. Neighborhood uses role-based tokens: --radius-control (8px) for interactive elements, --radius-surface (12px) for cards, --radius-pill (9999px) for badges. A developer doesn&#39;t choose a size. They choose a role.
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="bg-white border border-black/10 p-6 text-center" style={{ borderRadius: 8 }}>
                                    <p className={`${pixelify.className} text-base text-gray-800 mb-1`}>Control</p>
                                    <p className={`${roboto.className} text-xs text-black/40`}>8px — buttons, inputs</p>
                                </div>
                                <div className="bg-white border border-black/10 p-6 text-center" style={{ borderRadius: 12 }}>
                                    <p className={`${pixelify.className} text-base text-gray-800 mb-1`}>Surface</p>
                                    <p className={`${roboto.className} text-xs text-black/40`}>12px — cards, panels</p>
                                </div>
                                <div className="bg-white border border-black/10 p-6 text-center" style={{ borderRadius: 9999 }}>
                                    <p className={`${pixelify.className} text-base text-gray-800 mb-1`}>Pill</p>
                                    <p className={`${roboto.className} text-xs text-black/40`}>9999px — badges, pills</p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Motion tokens */}
                        <motion.div variants={fadeInUp}>
                            <h3 className={`${roboto.className} font-light text-xs md:text-sm uppercase tracking-wider text-gray-800 mb-4`}>
                                Motion: every interaction has motion
                            </h3>
                            <p className={`${roboto.className} font-light text-base md:text-lg leading-relaxed text-black/80 mb-6`}>
                                Four easing curves (default, spring, pop, loop) and four durations (120ms, 200ms, 350ms, 1.4s), each mapped to specific interaction types. Two signature selection patterns emerged: bracket bars for primary navigation and landing-settle for text-heavy lists.
                            </p>
                            <DemoSurface label="Live Tabs — bracket selection pattern">
                                <Tabs items={[
                                    { label: "Overview", value: "overview" },
                                    { label: "Guidelines", value: "guidelines" },
                                    { label: "Tokens", value: "tokens" },
                                ]} activeValue={demoTab} onChange={setDemoTab} />
                            </DemoSurface>
                        </motion.div>
                    </AnimatedSection>
                </GridContainer>
            </section>

            <SectionDivider />

            {/* COMPONENTS */}
            <section id="components" className="relative py-16 md:py-20">
                <GridContainer>
                    <AnimatedSection className="flex flex-col gap-10 md:gap-12 relative z-10">
                        <motion.h2 variants={fadeInUp} className={`${roboto.className} text-sm md:text-base text-black/40 uppercase tracking-[0.2em] font-normal`}>
                            COMPONENTS
                        </motion.h2>
                        <motion.p variants={fadeInUp} className={`${roboto.className} font-light text-base md:text-lg leading-relaxed text-black/80`}>
                            The 18-component inventory splits into two layers. Eleven atomic components handle individual interaction primitives. Seven compositional components handle mid-level patterns that compose atoms into reusable groups. The compositional layer is where the real systems thinking lives. Anyone can build a button. The harder question is how buttons, toggles, and selects compose into a settings interface.
                        </motion.p>

                        {/* Atomic component showcase */}
                        <motion.div variants={fadeInUp}>
                            <h3 className={`${roboto.className} font-light text-xs md:text-sm uppercase tracking-wider text-gray-800 mb-4`}>
                                Atomic components
                            </h3>
                            <DemoSurface label="11 atomic primitives">
                                <div className="flex flex-wrap items-center gap-4">
                                    <Avatar initials="AT" size="md" status="online" />
                                    <Avatar initials="NB" size="md" />
                                    <Badge label="Success" color="success" />
                                    <Badge label="Warning" color="warning" variant="subtle" />
                                    <Badge label="Error" color="error" variant="outline" />
                                </div>
                                <Divider />
                                <div className="flex flex-wrap items-center gap-3">
                                    <Toggle checked={demoToggle1} onChange={setDemoToggle1} />
                                    <Checkbox checked={demoCheck} onChange={setDemoCheck} label="Remember me" />
                                    <SegmentedControl options={[
                                        { label: "Monthly", value: "monthly" },
                                        { label: "Yearly", value: "yearly" },
                                    ]} activeValue={demoSegment} onChange={setDemoSegment} />
                                </div>
                                <Divider />
                                <div className="flex flex-wrap items-center gap-3">
                                    <Input placeholder="Search components..." variant="search" />
                                </div>
                                <Divider />
                                <div className="flex flex-wrap items-center gap-3">
                                    <Tooltip content="This is a tooltip" position="top">
                                        <Button variant="secondary">Hover me</Button>
                                    </Tooltip>
                                    <Select value="Select option" variant="form" />
                                </div>
                            </DemoSurface>
                        </motion.div>

                        {/* Compositional showcase */}
                        <motion.div variants={fadeInUp}>
                            <h3 className={`${roboto.className} font-light text-xs md:text-sm uppercase tracking-wider text-gray-800 mb-4`}>
                                Compositional components
                            </h3>
                            <DemoSurface label="Banner — four severity levels">
                                <Banner severity="info" message="This is an informational banner with an optional action." />
                                <Banner severity="success" message="Changes saved successfully." />
                                <Banner severity="warning" message="Your trial expires in 3 days." />
                                <Banner severity="error" message="Failed to save. Please try again." />
                            </DemoSurface>
                        </motion.div>

                        <motion.div variants={fadeInUp}>
                            <DemoSurface label="EmptyState — the signature dashed border">
                                <EmptyState variant="full" title="No projects yet" description="Create your first project to get started." action={<Button variant="primary">Create Project</Button>} />
                            </DemoSurface>
                        </motion.div>

                        {/* Architecture */}
                        <motion.div variants={fadeInUp}>
                            <h3 className={`${roboto.className} font-light text-xs md:text-sm uppercase tracking-wider text-gray-800 mb-3`}>
                                Two-repo architecture
                            </h3>
                            <p className={`${roboto.className} font-light text-base md:text-lg leading-relaxed text-black/80 mb-4`}>
                                Components are published as a separate npm package (@neighborhood/ui) installed from GitHub. The documentation site imports from the package, not from local files. The separation enforces a clean API boundary: the doc site can&#39;t accidentally depend on internal implementation details.
                            </p>
                            <div className="bg-gray-900 rounded-2xl p-6 font-mono text-sm text-gray-300">
                                <span className="text-gray-500">$</span> <span className="text-green-400">npm</span> install github:akin-tewe/neighborhood-ui
                            </div>
                        </motion.div>

                        {/* Accessibility */}
                        <motion.div variants={fadeInUp}>
                            <h3 className={`${roboto.className} font-light text-xs md:text-sm uppercase tracking-wider text-gray-800 mb-3`}>
                                Accessibility as non-negotiable
                            </h3>
                            <p className={`${roboto.className} font-light text-base md:text-lg leading-relaxed text-black/80`}>
                                Every interactive component has a visible focus ring for keyboard navigation using :focus-visible (not :focus, so rings only appear on keyboard nav). The spec is consistent: 2px solid sky-400 with 2px offset. Every keyboard interaction documented on a component page actually works in the component. Claims without implementation are worse than no claims at all.
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
                        <motion.h2 variants={fadeInUp} className={`${roboto.className} text-sm md:text-base text-black/40 uppercase tracking-[0.2em] font-normal`}>
                            DEMOS
                        </motion.h2>
                        <motion.p variants={fadeInUp} className={`${roboto.className} font-light text-base md:text-lg leading-relaxed text-black/80`}>
                            Components in isolation prove they exist. Components composed into real interfaces prove they work. Neighborhood ships three demo pages, each demonstrating a different composition context. None are clones of the audited products. They are original compositions using Neighborhood&#39;s visual identity.
                        </motion.p>

                        {/* Demo page screenshots */}
                        <motion.div variants={fadeInUp}>
                            <h3 className={`${roboto.className} font-light text-xs md:text-sm uppercase tracking-wider text-gray-800 mb-4`}>
                                Settings: 14 of 18 components in one view
                            </h3>
                            <p className={`${roboto.className} font-light text-base md:text-lg leading-relaxed text-black/80 mb-6`}>
                                The settings demo was chosen as the primary demo because it naturally requires the most component variety in a single view. Sidebar rail with bracket selection, tabs, SettingRows with Toggle/Select/Button controls, FormSections, PropertyRows, Banner, Badges, EmptyState, Dividers, and Buttons across all variants.
                            </p>
                            <div className="relative overflow-hidden rounded-2xl border border-black/5">
                                <Image src="/projects/neighborhood/thumbnail-dashboard.png" alt="Neighborhood dashboard demo" width={1400} height={900} className="w-full h-auto" />
                            </div>
                            <span className={`${roboto.className} text-black/35 text-sm mt-3 block text-center italic`}>Dashboard demo — DataTable with typed cells, property displays, and dense data composition</span>
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
                        <motion.h2 variants={fadeInUp} className={`${roboto.className} text-sm md:text-base text-black/40 uppercase tracking-[0.2em] font-normal`}>
                            WHAT&#39;S NEXT
                        </motion.h2>
                        <motion.p variants={fadeInUp} className={`${roboto.className} font-light text-base md:text-lg leading-relaxed text-black/80`}>
                            Neighborhood v0.1 is shipped, but the system is actively evolving. The v0.2 roadmap includes seven additional components: MetricCard for dashboard contexts, CommandPalette for power-user search, UserProfileCard for identity-rich popovers, StatusFilterBar and FilterChipRow for data filtering, and Textarea and Radio Group as foundational additions.
                        </motion.p>
                        <motion.p variants={fadeInUp} className={`${roboto.className} font-light text-base md:text-lg leading-relaxed text-black/80`}>
                            Beyond components, future work includes additional demo pages covering messaging and e-commerce contexts, expanded accessibility documentation with ARIA patterns, and a formal dark mode implementation using the token architecture.
                        </motion.p>
                    </AnimatedSection>
                </GridContainer>
            </section>

            <SectionDivider />

            {/* Built With + CTA */}
            <section className="relative py-16 md:py-20">
                <GridContainer>
                    <AnimatedSection className="flex flex-col items-center gap-8 md:gap-10 relative z-10">
                        <motion.h2 variants={fadeInUp} className={`${roboto.className} text-sm md:text-base text-black/40 uppercase tracking-[0.2em] font-normal text-center`}>
                            BUILT WITH
                        </motion.h2>
                        <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-2 md:gap-3">
                            <TechPill name="Next.js 16" />
                            <TechPill name="React 19" />
                            <TechPill name="TypeScript" />
                            <TechPill name="Tailwind CSS 4" />
                            <TechPill name="CSS Custom Properties" />
                        </motion.div>
                        <motion.p variants={fadeInUp} className={`${roboto.className} font-light text-base md:text-lg leading-relaxed text-black/80 mx-auto text-center`}>
                            The token system uses CSS custom properties rather than Tailwind&#39;s config-based approach, which means tokens work anywhere CSS works. The component package is published via GitHub and installed with a single command.
                        </motion.p>
                        <motion.div variants={fadeInUp} className="flex flex-wrap gap-4 justify-center">
                            <MagneticWrapper>
                                <a href="https://nbhd.dev" target="_blank" rel="noopener noreferrer"
                                    className={`${pixelify.className} px-6 py-3 bg-gray-900 rounded text-white text-base tracking-wide uppercase hover:bg-gray-800 transition-colors flex items-center gap-2`}>
                                    <ExternalLink className="w-4 h-4" />Documentation Site
                                </a>
                            </MagneticWrapper>
                            <MagneticWrapper>
                                <a href="https://github.com/akin-tewe/neighborhood-ui" target="_blank" rel="noopener noreferrer"
                                    className={`${pixelify.className} px-6 py-3 bg-white border border-gray-300 rounded text-gray-800 text-base tracking-wide uppercase hover:bg-gray-50 transition-colors flex items-center gap-2`}>
                                    <Github className="w-4 h-4" />GitHub
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

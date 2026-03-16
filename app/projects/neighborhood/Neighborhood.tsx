"use client";
import { pixelify, roboto } from "@/app/ui/fonts"
import { Space_Grotesk } from "next/font/google"
import Image from "next/image"
import { MagneticWrapper } from "@/components/MagneticButton";
import { useRef, useState, useEffect } from "react";
import { ExternalLink, Github } from "lucide-react";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import ProjectMetrics from "@/components/ProjectMetrics";
import CaseStudySidebar from "@/components/CaseStudySidebar";
import {
    Toggle, Badge, Button, SettingRow, PropertyRow,
    Avatar, Tabs, Input, Banner, Divider, EmptyState,
    SegmentedControl, Select, Checkbox, Tooltip, Menu,
} from "@neighborhood/ui";
import "@neighborhood/ui/tokens.css";

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], weight: ['500', '600', '700'] });

const neighborhoodSections = [
    { id: 'showcase', label: 'Showcase' },
    { id: 'tokens', label: 'Tokens' },
    { id: 'components', label: 'Components' },
    { id: 'composition', label: 'Composition' },
    { id: 'methodology', label: 'Methodology' },
    { id: 'tradeoffs', label: 'Tradeoffs & Scope' },
    { id: 'demos', label: 'Demos' },
    { id: 'whats-next', label: "What's Next" },
];

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

// ─── Layout ─────────────────────────────────────────────────

function GridContainer({ children, className = "", id }: { children: React.ReactNode; className?: string; id?: string }) {
    return <div id={id} className={`w-full max-w-[1000px] mx-auto px-6 md:px-8 ${className}`}>{children}</div>;
}

function WideContainer({ children, className = "" }: { children: React.ReactNode; className?: string }) {
    return <div className={`w-full max-w-[1200px] mx-auto px-6 md:px-8 ${className}`}>{children}</div>;
}

function SectionDivider() {
    return <div className="w-full max-w-[1000px] mx-auto px-8"><div className="h-px bg-gradient-to-r from-transparent via-black/10 to-transparent" /></div>;
}

function SectionLabel({ children }: { children: React.ReactNode }) {
    return <span className={`${spaceGrotesk.className} text-sm text-black/35 uppercase tracking-[0.15em] font-medium`}>{children}</span>;
}

function TechPill({ name }: { name: string }) {
    return <span className={`${roboto.className} text-xs md:text-sm text-white bg-gray-900 px-3 py-1 rounded-full`}>{name}</span>;
}

// ─── Animation ──────────────────────────────────────────────

function RevealOnScroll({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-60px" });
    return (
        <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay, ease: EASE }} className={className}>
            {children}
        </motion.div>
    );
}

// Auto-toggling toggle
function AutoToggle({ delay = 0, interval = 2500 }: { delay?: number; interval?: number }) {
    const [on, setOn] = useState(false);
    const ref = useRef(null);
    const inView = useInView(ref, { once: true });
    useEffect(() => {
        if (!inView) return;
        const start = setTimeout(() => {
            setOn(true);
            const flip = setInterval(() => setOn(v => !v), interval);
            return () => clearInterval(flip);
        }, delay + 800);
        return () => clearTimeout(start);
    }, [inView, delay, interval]);
    return <div ref={ref}><Toggle checked={on} onChange={setOn} /></div>;
}

// Pulsing dot for passive animation
function PulsingDot({ color, size = 6, delay = 0 }: { color: string; size?: number; delay?: number }) {
    return (
        <motion.div className="rounded-full" style={{ width: size, height: size, background: color }}
            animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2.5, delay, repeat: Infinity, ease: "easeInOut" }} />
    );
}

// ─── Color Data ─────────────────────────────────────────────

type BadgeColor = "primary" | "berry" | "terracotta" | "amber" | "sky" | "plum" | "sage";

const colorFamilies: { name: string; subtitle: string; key: BadgeColor; colors: string[]; useCases: string }[] = [
    { name: "Primary", subtitle: "Grass Green", key: "primary", colors: ["#edfcf2","#d3f8e0","#6de29e","#34cc76","#16a85a","#0b8847","#093e24"], useCases: "Primary actions, success states, CTA" },
    { name: "Berry", subtitle: "Strawberry", key: "berry", colors: ["#fff1f2","#ffe4e6","#ff8f98","#ff5c6a","#e8364a","#c41d35","#6e1624"], useCases: "Error states, destructive actions" },
    { name: "Terracotta", subtitle: "Campfire", key: "terracotta", colors: ["#fff6ed","#ffe8d0","#ffa964","#ff8530","#f06810","#cc5008","#6e2b10"], useCases: "Warm accents, activity indicators" },
    { name: "Amber", subtitle: "Gold Ingot", key: "amber", colors: ["#fffbeb","#fff3c4","#ffd04a","#ffbc20","#f5a000","#d47d02","#72390d"], useCases: "Warning states, pending, highlights" },
    { name: "Sky", subtitle: "Clear Day", key: "sky", colors: ["#eff8ff","#dbeeff","#8ac6ff","#52a8ff","#2a88f0","#166cd4","#163d6e"], useCases: "Links, info states, focus rings" },
    { name: "Plum", subtitle: "Nether Portal", key: "plum", colors: ["#faf4ff","#f2e5ff","#d3a6ff","#ba72ff","#a248f0","#8a28d8","#4e1878"], useCases: "Premium features, categories" },
    { name: "Sage", subtitle: "Prismarine", key: "sage", colors: ["#eefcf8","#d5f6ed","#79dcc4","#42c4a8","#26a88e","#1a8773","#18473f"], useCases: "Health indicators, environment" },
];

const neutralColors = ["#faf8f6","#f3f0ed","#e6e2dd","#d1cbc4","#a69f96","#7a736b","#5c554e","#45403b","#2e2a26","#1a1816","#0d0c0a"];

// ─── Token Playground ───────────────────────────────────────

function TokenPlayground() {
    const [active, setActive] = useState(0);
    const family = colorFamilies[active];

    return (
        <div className="rounded-2xl border border-black/[0.06] bg-white overflow-hidden">
            {/* Family strip selector */}
            <div className="flex border-b border-black/[0.04] overflow-x-auto">
                {colorFamilies.map((f, i) => (
                    <button key={f.key} onClick={() => setActive(i)}
                        className={`flex items-center gap-2 px-4 py-3 shrink-0 transition-all text-sm border-b-2 ${
                            active === i ? 'border-gray-900 text-gray-900' : 'border-transparent text-black/35 hover:text-black/60'
                        }`}>
                        <div className="w-3 h-3 rounded-full" style={{ background: f.colors[3] }} />
                        <span className={`${spaceGrotesk.className} font-medium text-xs`}>{f.name}</span>
                    </button>
                ))}
            </div>

            <AnimatePresence mode="wait">
                <motion.div key={family.key} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="p-5 md:p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Left: swatch + info */}
                        <div className="flex flex-col gap-4">
                            <div>
                                <p className={`${spaceGrotesk.className} text-lg font-semibold text-gray-800`}>{family.name}</p>
                                <p className={`${roboto.className} text-sm text-black/40`}>{family.subtitle} · {family.colors.length} steps</p>
                            </div>
                            <div className="flex gap-1 rounded-lg overflow-hidden">
                                {family.colors.map((c) => (
                                    <motion.div key={c} style={{ background: c, flex: 1, height: 40 }}
                                        whileHover={{ scaleY: 1.25 }} transition={{ duration: 0.15 }} className="origin-bottom cursor-default" />
                                ))}
                            </div>
                            <div className="text-sm">
                                <PropertyRow label="Token" value={<code className="text-xs bg-black/[0.04] px-1.5 py-0.5 rounded font-mono">--{family.key}-*</code>} />
                                <PropertyRow label="Use cases" value={family.useCases} />
                            </div>
                        </div>

                        {/* Right: live component preview */}
                        <div className="flex flex-col gap-4 bg-[#faf8f6] rounded-xl p-4">
                            <span className={`${spaceGrotesk.className} text-[10px] text-black/25 uppercase tracking-[0.15em] font-medium`}>Live Preview</span>
                            <div className="flex flex-wrap gap-1.5">
                                <Badge label="Active" color={family.key} />
                                <Badge label="Pending" color={family.key} variant="subtle" />
                                <Badge label="Draft" color={family.key} variant="outline" />
                                <Badge label="New" color={family.key} dot />
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold"
                                    style={{ background: family.colors[3] }}>
                                    {family.name.slice(0, 2).toUpperCase()}
                                </div>
                                <div>
                                    <p className={`${roboto.className} text-sm font-medium text-gray-800`}>{family.name}</p>
                                    <p className={`${roboto.className} text-xs text-black/35`}>{family.useCases}</p>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <Button variant="primary" size="sm">Confirm</Button>
                                <Button variant="ghost" size="sm">Cancel</Button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}

// ─── Assembly ───────────────────────────────────────────────

function AssemblyAnimation() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.5"] });

    const label = useTransform(scrollYProgress, [0, 0.1], [0, 1]);
    const row1 = useTransform(scrollYProgress, [0.1, 0.25], [0, 1]);
    const div1 = useTransform(scrollYProgress, [0.25, 0.35], [0, 1]);
    const row2 = useTransform(scrollYProgress, [0.35, 0.5], [0, 1]);
    const div2 = useTransform(scrollYProgress, [0.5, 0.6], [0, 1]);
    const row3 = useTransform(scrollYProgress, [0.6, 0.75], [0, 1]);
    const complete = useTransform(scrollYProgress, [0.8, 0.95], [0, 1]);

    const [t1, setT1] = useState(false);
    const [t2, setT2] = useState(false);

    return (
        <div ref={ref} className="min-h-[50vh] flex items-center">
            <div className="w-full">
                <div className="rounded-2xl border border-black/[0.06] bg-white p-5 md:p-6">
                    <motion.div style={{ opacity: label }} className="mb-4">
                        <span className={`${spaceGrotesk.className} text-[11px] text-black/25 uppercase tracking-[0.15em] font-medium`}>
                            Building a settings panel...
                        </span>
                    </motion.div>

                    <motion.div style={{ opacity: row1, y: useTransform(row1, [0, 1], [10, 0]) }}>
                        <SettingRow label="Dark mode" description="Switch between light and dark themes" control={<Toggle checked={t1} onChange={setT1} />} />
                    </motion.div>
                    <motion.div style={{ opacity: div1 }} className="my-1"><Divider /></motion.div>
                    <motion.div style={{ opacity: row2, y: useTransform(row2, [0, 1], [10, 0]) }}>
                        <SettingRow label="Notifications" description="Receive alerts for new activity" control={<Toggle checked={t2} onChange={setT2} />} />
                    </motion.div>
                    <motion.div style={{ opacity: div2 }} className="my-1"><Divider /></motion.div>
                    <motion.div style={{ opacity: row3, y: useTransform(row3, [0, 1], [10, 0]) }}>
                        <SettingRow label="Language" description="Choose your preferred language" control={<Menu trigger={<Select value="English" variant="form" size="sm" />} items={[{ label: "English", checked: true, onCheckedChange: () => {} }, { label: "Spanish" }, { label: "French" }]} />} />
                    </motion.div>
                </div>

                <motion.div style={{ opacity: complete }} className="flex items-center gap-2 mt-4 justify-center">
                    <PulsingDot color="#34cc76" size={8} />
                    <span className={`${roboto.className} text-sm text-black/40`}>3 atoms → 1 composed settings panel</span>
                </motion.div>
            </div>
        </div>
    );
}

// ─── Methodology ────────────────────────────────────────────

type AuditProduct = "notion" | "discord" | "stripe";

const auditImages: Record<AuditProduct, { src: string; caption: string }[]> = {
    notion: [
        { src: "/projects/neighborhood/audit/notion-settings-preferences.png", caption: "Settings preferences — the densest setting row page across all audits" },
        { src: "/projects/neighborhood/audit/notion-settings-people.png", caption: "People settings — empty states, tabs, and invite input patterns" },
        { src: "/projects/neighborhood/audit/notion-command-palette.png", caption: "Command palette — search overlay with categorized results" },
        { src: "/projects/neighborhood/audit/notion-home.png", caption: "Home — content-first layout with warm typography and sidebar navigation" },
        { src: "/projects/neighborhood/audit/notion-share-popover.png", caption: "Share popover with input, permissions, and avatar row" },
    ],
    discord: [],
    stripe: [
        { src: "/projects/neighborhood/audit/stripe-payments.png", caption: "Payments — data table with typed cells, status badges, selection" },
        { src: "/projects/neighborhood/audit/stripe-settings-details.png", caption: "Business settings — form sections with grouped inputs" },
        { src: "/projects/neighborhood/audit/stripe-dashboard.png", caption: "Dashboard — metric cards, charts, and property displays" },
        { src: "/projects/neighborhood/audit/stripe-customers.png", caption: "Customer list with filters, search, and table composition" },
        { src: "/projects/neighborhood/audit/stripe-revenue.png", caption: "Revenue metrics with chart and segment breakdown" },
    ],
};

// ─── Audit Carousel (drag-scroll) ───────────────────────────

function AuditCarousel({ product }: { product: AuditProduct }) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    const images = auditImages[product];

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        setStartX(e.pageX - (scrollRef.current?.offsetLeft || 0));
        setScrollLeft(scrollRef.current?.scrollLeft || 0);
    };
    const handleMouseUp = () => setIsDragging(false);
    const handleMouseLeave = () => setIsDragging(false);
    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - (scrollRef.current?.offsetLeft || 0);
        const walk = (x - startX) * 2;
        if (scrollRef.current) scrollRef.current.scrollLeft = scrollLeft - walk;
    };

    return (
        <AnimatePresence mode="wait">
            <motion.div key={product} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
                <div
                    ref={scrollRef}
                    onMouseDown={handleMouseDown}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseLeave}
                    onMouseMove={handleMouseMove}
                    className="cursor-grab active:cursor-grabbing select-none"
                    style={{
                        display: 'flex',
                        gap: 16,
                        overflowX: 'scroll',
                        overflowY: 'hidden',
                        paddingBottom: 16,
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none',
                        WebkitOverflowScrolling: 'touch',
                    }}
                >
                    {images.map((img, i) => (
                        <div key={`${product}-${i}`} style={{ width: 900, minWidth: 900, flexShrink: 0 }}>
                            <div className="overflow-hidden rounded-2xl border border-black/[0.06]" style={{ aspectRatio: '16/10' }}>
                                <Image src={img.src} alt={img.caption} width={1400} height={900}
                                    className="w-full h-full object-cover object-top pointer-events-none" draggable={false} />
                            </div>
                            <p className={`${roboto.className} text-black/40 text-sm font-light mt-3 line-clamp-2`} style={{ minHeight: 40 }}>{img.caption}</p>
                        </div>
                    ))}
                </div>
                <div className="flex justify-center mt-1 gap-1">
                    {images.map((_, i) => (
                        <div key={i} className="w-1.5 h-1.5 rounded-full bg-black/10" />
                    ))}
                </div>
            </motion.div>
        </AnimatePresence>
    );
}

// ═══════════════════════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════════════════════

export default function Neighborhood() {
    const heroRef = useRef(null);
    const isHeroInView = useInView(heroRef, { once: true });

    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const mq = window.matchMedia('(max-width: 640px)');
        setIsMobile(mq.matches);
        const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
        mq.addEventListener('change', handler);
        return () => mq.removeEventListener('change', handler);
    }, []);

    const [demoToggle1, setDemoToggle1] = useState(true);
    const [demoToggle2, setDemoToggle2] = useState(false);
    const [showcaseTab, setShowcaseTab] = useState("overview");
    const [showcaseSegment, setShowcaseSegment] = useState("monthly");
    const [motionBracketTab, setMotionBracketTab] = useState("overview");
    const [motionLandingTab, setMotionLandingTab] = useState("overview");
    const [demoTab, setDemoTab] = useState("general");
    const [demoSegment, setDemoSegment] = useState("us");
    const [buttonVariant, setButtonVariant] = useState("primary");
    const [auditProduct, setAuditProduct] = useState<AuditProduct>("notion");

    return (
        <main className="overflow-x-hidden bg-white">

            {/* ═══════ HERO ═══════ */}
            <section ref={heroRef} className="relative w-full pt-32 md:pt-40 pb-16 md:pb-24 overflow-hidden">
                <GridContainer className="relative z-10">
                    <motion.div initial={{ opacity: 0, y: 40 }} animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, ease: EASE }} className="max-w-4xl">
                        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className={`${pixelify.className} text-4xl md:text-5xl lg:text-6xl text-gray-800 mb-4`}>
                            Neighborhood
                        </motion.h1>
                        <motion.span initial={{ opacity: 0, y: 20 }} animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className={`${pixelify.className} text-green-500 italic text-lg md:text-xl uppercase tracking-wider mb-8 block`}>
                            Design System v0.1
                        </motion.span>
                        <motion.p initial={{ opacity: 0, y: 20 }} animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className={`${roboto.className} text-black/50 font-light text-base md:text-lg lg:text-xl mt-6 leading-relaxed`}>
                            A component library and design system built completely by me from the ground up. This case study exclusively covers the thinking and decision making behind the v0.1 release. Neighborhood is still under active development, and the system continues to evolve beyond what&apos;s documented here.
                        </motion.p>
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.5 }} className="flex flex-wrap gap-4 mt-10">
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
                    { label: "Components", value: "18 Components · 11 Atomic · 7 Compositional" },
                    { label: "Type", value: "Design System · Documentation" },
                    { label: "Status", value: "v0.1 Released · Active Development" },
                ]} />
            </section>

            {/* Hero preview */}
            <section className="relative py-12 md:py-16">
                <GridContainer>
                    <RevealOnScroll>
                        <div className="rounded-2xl overflow-hidden bg-gray-900 p-2 md:p-3">
                            <div className="flex items-center gap-2 px-2 py-2 mb-2">
                                <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                                <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                                <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                                <a href="https://nbhd.dev" target="_blank" rel="noopener noreferrer" className={`${roboto.className} text-[11px] text-white/30 ml-2 hover:text-white/50 transition-colors`}>nbhd.dev</a>
                            </div>
                            <div className="overflow-hidden rounded-xl">
                                <video src="/projects/neighborhood/thumbnail.mp4" autoPlay loop muted playsInline
                                    className="w-full h-full object-cover"
                                    style={{ transform: 'scale(1.09) translateX(-1%)', transformOrigin: 'center' }} />
                            </div>
                        </div>
                    </RevealOnScroll>
                </GridContainer>
            </section>

            <SectionDivider />

            <div className="lg:grid lg:grid-cols-[200px_minmax(0,1fr)]">
                <CaseStudySidebar sections={neighborhoodSections} />
                <div className="lg:-translate-x-[100px]">

            {/* ═══════ SHOWCASE ═══════ */}
            <section id="showcase" className="relative py-16 md:py-20">
                <GridContainer>
                    <RevealOnScroll>
                        <SectionLabel>System at a Glance</SectionLabel>
                        <p className={`${roboto.className} font-light text-base md:text-lg leading-relaxed text-black/70 mt-3 mb-8`}>
                            A small preview of Neighborhood&apos;s component library. These aren&apos;t screenshots or mockups, but the functional, live components that are packaged and ready to be installed through the GitHub. Explore them!
                        </p>
                    </RevealOnScroll>
                </GridContainer>
                <WideContainer>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {/* Each cell is dense — no wasted space */}
                        {[
                            { label: "Button", delay: 0, content: (
                                <div className="flex gap-2">
                                    <div className="flex-1"><Button variant="primary">Primary</Button></div>
                                    <div className="flex-1"><Button variant="secondary">Secondary</Button></div>
                                </div>
                            )},
                            { label: "Badge", delay: 0.04, content: (
                                <div className="flex gap-1.5 justify-center sm:justify-start flex-wrap">
                                    <Badge label="Shipped" color="success" />
                                    <Badge label="v0.1" color="primary" variant="subtle" />
                                    <Badge label="npm" color="sky" />
                                    <Badge label="18" color="plum" variant="outline" />
                                </div>
                            )},
                            { label: "Toggle", delay: 0.08, content: (
                                <div className="flex items-center justify-between flex-1">
                                    <AutoToggle /> <AutoToggle delay={400} interval={3000} /> <AutoToggle delay={800} interval={3500} />
                                </div>
                            )},
                            { label: "Tabs", delay: 0.12, content: (
                                <div className="w-full flex justify-center sm:justify-start">
                                    <Tabs items={[
                                        { label: "Overview", value: "overview" },
                                        { label: "Tokens", value: "tokens" },
                                    ]} activeValue={showcaseTab} onChange={setShowcaseTab} />
                                </div>
                            )},
                            { label: "Input", delay: 0.16, content: <Input placeholder="Search components..." variant="search" /> },
                            { label: "Avatar", delay: 0.2, content: (
                                <div className="flex items-center justify-between flex-1">
                                    <Avatar initials="AT" size="md" status="online" />
                                    <Avatar initials="NB" size="md" status="busy" />
                                    <Avatar initials="DS" size="md" status="away" />
                                    <Avatar initials="UI" size="md" />
                                </div>
                            )},
                            { label: "Switcher", delay: 0.24, content: (
                                <div className="flex justify-center sm:justify-start">
                                    <SegmentedControl options={[
                                        { label: "Monthly", value: "monthly" },
                                        { label: "Yearly", value: "yearly" },
                                        { label: "Lifetime", value: "lifetime" },
                                    ]} activeValue={showcaseSegment} onChange={setShowcaseSegment} />
                                </div>
                            )},
                            { label: "Banner", delay: 0.28, content: <Banner severity="success" message="Changes saved." /> },
                            { label: "Empty State", delay: 0.32, content: <EmptyState variant="minimal" title="No results" description="Try a different search." /> },
                        ].map((cell) => {
                            const cellRef = useRef(null);
                            const cellInView = useInView(cellRef, { once: true, margin: "-40px" });
                            return (
                                <motion.div key={cell.label} ref={cellRef}
                                    initial={{ opacity: 0, y: 16 }} animate={cellInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ duration: 0.4, delay: cell.delay, ease: EASE }}
                                    className="rounded-2xl border border-black/[0.06] bg-white p-4 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                                    <span className={`${spaceGrotesk.className} text-[10px] text-black/25 uppercase tracking-[0.15em] font-medium shrink-0 sm:w-16`}>{cell.label}</span>
                                    <div className="flex-1 min-w-0">{cell.content}</div>
                                </motion.div>
                            );
                        })}
                    </div>
                </WideContainer>
            </section>

            <SectionDivider />

            {/* ═══════ TOKENS ═══════ */}
            <section id="tokens" className="relative py-16 md:py-20">
                <GridContainer>
                    <RevealOnScroll>
                        <SectionLabel>Token System</SectionLabel>
                        <p className={`${roboto.className} font-light text-base md:text-lg leading-relaxed text-black/70 mt-3 mb-8`}>
                            Every visual decision is a CSS custom property. Components completely reference tokens (not hardcoded values), ensuring structure and consistency throughout. Currently we have six primary token categories: typography, color, spacing, radius, elevation, and motion. This token system was finalized before any components were built.
                        </p>
                    </RevealOnScroll>

                    {/* Neutrals */}
                    <RevealOnScroll>
                        <span className={`${spaceGrotesk.className} text-xs uppercase tracking-wider text-black/30 font-medium mb-3 block`}>Warm Stone Neutrals</span>
                        <div className="flex gap-0.5 rounded-xl overflow-hidden mb-2">
                            {neutralColors.map((c) => (
                                <motion.div key={c} style={{ background: c, flex: 1, height: 36 }}
                                    whileHover={{ scaleY: 1.3 }} transition={{ duration: 0.15 }} className="origin-bottom cursor-default" />
                            ))}
                        </div>
                        <p className={`${roboto.className} font-light text-sm text-black/45`}>11 warm steps. Approachable, not clinical.</p>
                    </RevealOnScroll>

                    {/* Palette playground */}
                    <RevealOnScroll className="mt-8">
                        <span className={`${spaceGrotesk.className} text-xs uppercase tracking-wider text-black/30 font-medium mb-4 block`}>Extended Palette</span>
                        <TokenPlayground />
                    </RevealOnScroll>

                    {/* Radius + Motion side by side */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
                        <RevealOnScroll>
                            <span className={`${spaceGrotesk.className} text-xs uppercase tracking-wider text-black/30 font-medium mb-3 block`}>Role-Based Radius</span>
                            <div className="flex flex-col gap-4">
                                {[
                                    { label: "Control", val: "8px", desc: "Buttons, inputs", r: 8 },
                                    { label: "Surface", val: "12px", desc: "Cards, panels", r: 12 },
                                    { label: "Pill", val: "9999px", desc: "Badges, chips", r: 9999 },
                                ].map((item) => (
                                    <motion.div key={item.label} whileHover={{ scale: 1.02 }} transition={{ duration: 0.15 }}
                                        className="bg-white p-5 flex justify-between items-center cursor-default"
                                        style={{ borderRadius: item.r, boxShadow: '0 4px 6px -1px rgba(0,0,0,0.07), 0 2px 4px -2px rgba(0,0,0,0.05)' }}>
                                        <span className={`${spaceGrotesk.className} text-sm font-semibold text-gray-800`}>{item.label}</span>
                                        <span className={`${roboto.className} text-xs text-black/35`}>{item.val}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </RevealOnScroll>

                        <RevealOnScroll delay={0.1}>
                            <span className={`${spaceGrotesk.className} text-xs uppercase tracking-wider text-black/30 font-medium mb-3 block`}>Motion Tokens</span>
                            <p className={`${roboto.className} font-light text-sm text-black/50 mb-4`}>
                                4 easing curves · 4 durations. Click to compare bracket and landing selection patterns.
                            </p>
                            <div className="flex flex-col gap-3">
                                <div className="rounded-xl border border-black/[0.06] bg-white p-4">
                                    <span className={`${roboto.className} text-[10px] text-black/25 uppercase tracking-wider mb-2 block`}>Bracket variant</span>
                                    <div className="flex justify-center">
                                        <Tabs items={isMobile ? [
                                            { label: "Overview", value: "overview" },
                                            { label: "Tokens", value: "tokens" },
                                        ] : [
                                            { label: "Overview", value: "overview" },
                                            { label: "Guidelines", value: "guidelines" },
                                            { label: "Tokens", value: "tokens" },
                                        ]} activeValue={motionBracketTab} onChange={setMotionBracketTab} variant="bracket" />
                                    </div>
                                </div>
                                <div className="rounded-xl border border-black/[0.06] bg-white p-4">
                                    <span className={`${roboto.className} text-[10px] text-black/25 uppercase tracking-wider mb-2 block`}>Landing variant</span>
                                    <div className="flex justify-center">
                                        <Tabs items={isMobile ? [
                                            { label: "Overview", value: "overview" },
                                            { label: "Tokens", value: "tokens" },
                                        ] : [
                                            { label: "Overview", value: "overview" },
                                            { label: "Guidelines", value: "guidelines" },
                                            { label: "Tokens", value: "tokens" },
                                        ]} activeValue={motionLandingTab} onChange={setMotionLandingTab} variant="landing" />
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-2 mt-3">
                                {["--ease-default","--ease-spring","--ease-pop","--ease-loop"].map((t) => (
                                    <span key={t} className={`${roboto.className} text-[10px] text-black/25 bg-black/[0.03] px-2 py-1 rounded font-mono`}>{t}</span>
                                ))}
                            </div>
                        </RevealOnScroll>
                    </div>
                </GridContainer>
            </section>

            <SectionDivider />

            {/* ═══════ COMPONENTS ═══════ */}
            <section id="components" className="relative py-16 md:py-20">
                <GridContainer>
                    <RevealOnScroll>
                        <SectionLabel>Components</SectionLabel>
                        <p className={`${roboto.className} font-light text-base md:text-lg leading-relaxed text-black/70 mt-3 mb-8`}>
                            18 components in two layers. 11 atomic primitives handle individual interactions and act as building blocks for compositional components. 7 compositional components compose those atoms into reusable patterns. This is where our systems thinking lives.
                        </p>
                    </RevealOnScroll>

                    {/* Full-width component demos — each is a self-contained block */}
                    <div className="flex flex-col gap-6">

                        {/* Button */}
                        <RevealOnScroll>
                            <div className="rounded-2xl border border-black/[0.06] bg-white p-5 md:p-6">
                                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                                    <div>
                                        <span className={`${spaceGrotesk.className} text-sm font-semibold text-gray-800`}>Button</span>
                                        <p className={`${roboto.className} text-sm text-black/45 font-light mt-1`}>
                                            4 variants · hover, active, focus, disabled, loading states
                                        </p>
                                    </div>
                                    <SegmentedControl options={[
                                        { label: "Primary", value: "primary" },
                                        { label: "Secondary", value: "secondary" },
                                        { label: "Ghost", value: "ghost" },
                                        { label: "Destructive", value: "destructive" },
                                    ]} activeValue={buttonVariant} onChange={setButtonVariant} size="sm" />
                                </div>
                                <div className="flex gap-3">
                                    <Button variant={buttonVariant as "primary" | "secondary" | "ghost" | "destructive"}>Click me</Button>
                                    <Button variant={buttonVariant as "primary" | "secondary" | "ghost" | "destructive"} disabled>Disabled</Button>
                                    <Button variant={buttonVariant as "primary" | "secondary" | "ghost" | "destructive"} loading>Loading</Button>
                                </div>
                            </div>
                        </RevealOnScroll>

                        {/* SettingRow */}
                        <RevealOnScroll>
                            <div className="rounded-2xl border border-black/[0.06] bg-white p-5 md:p-6">
                                <span className={`${spaceGrotesk.className} text-sm font-semibold text-gray-800`}>Setting</span>
                                <p className={`${roboto.className} text-sm text-black/45 font-light mt-1 mb-4`}>
                                    Appeared 10+ times on a single Notion page. Label + description left, any control right. The slot accepts any atom.
                                </p>
                                <SettingRow label="Dark mode" description="Switch themes" control={<Toggle checked={demoToggle1} onChange={setDemoToggle1} />} />
                                <div className="my-1"><Divider /></div>
                                <SettingRow label="Notifications" description="Receive alerts" control={<Toggle checked={demoToggle2} onChange={setDemoToggle2} />} />
                                <div className="my-1"><Divider /></div>
                                <SettingRow label="Language" description="Display language" control={<Menu trigger={<Select value="English" variant="form" size="sm" />} items={[{ label: "English", checked: true, onCheckedChange: () => {} }, { label: "Spanish" }, { label: "French" }]} />} />
                            </div>
                        </RevealOnScroll>

                        {/* PropertyRow */}
                        <RevealOnScroll>
                            <div className="rounded-2xl border border-black/[0.06] bg-white p-5 md:p-6">
                                <span className={`${spaceGrotesk.className} text-sm font-semibold text-gray-800`}>Property</span>
                                <p className={`${roboto.className} text-sm text-black/45 font-light mt-1 mb-4`}>
                                    All three products display labeled data differently. One component API unifies them.
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="bg-[#faf8f6] rounded-xl p-4">
                                        <span className={`${roboto.className} text-[10px] text-black/25 uppercase tracking-wider`}>Notion style</span>
                                        <div className="mt-2">
                                            <PropertyRow label="Status" value={<Badge label="Active" color="success" size="sm" />} />
                                            <PropertyRow label="Assignee" value="Akin Tewe" />
                                            <PropertyRow label="Due" value="Mar 15, 2026" />
                                        </div>
                                    </div>
                                    <div className="bg-[#faf8f6] rounded-xl p-4">
                                        <span className={`${roboto.className} text-[10px] text-black/25 uppercase tracking-wider`}>Stripe style</span>
                                        <div className="mt-2">
                                            <PropertyRow label="Plan" value={<Badge label="Pro" color="plum" size="sm" />} />
                                            <PropertyRow label="Balance" value="$2,450.00" />
                                            <PropertyRow label="Email" value="akin@example.com" />
                                        </div>
                                    </div>
                                    <div className="bg-[#faf8f6] rounded-xl p-4">
                                        <span className={`${roboto.className} text-[10px] text-black/25 uppercase tracking-wider`}>Discord style</span>
                                        <div className="mt-2">
                                            <PropertyRow label="Name" value="paid actor" />
                                            <PropertyRow label="User" value="eightybot" />
                                            <PropertyRow label="Since" value="Jan 2024" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </RevealOnScroll>

                        {/* Banner + EmptyState */}
                        <RevealOnScroll>
                            <div className="rounded-2xl border border-black/[0.06] bg-white p-5 md:p-6">
                                <span className={`${spaceGrotesk.className} text-sm font-semibold text-gray-800`}>Banner + Empty State</span>
                                <p className={`${roboto.className} text-sm text-black/45 font-light mt-1 mb-4`}>
                                    4 severity levels. Empty State uses a signature dashed border. Both support action slots.
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="flex flex-col gap-2">
                                        <Banner severity="info" message="New version available." />
                                        <Banner severity="success" message="Saved successfully." />
                                        <Banner severity="warning" message="Trial expires in 3 days." />
                                        <Banner severity="error" message="Failed to save." />
                                    </div>
                                    <EmptyState variant="full" title="No projects yet" description="Create your first project to get started." action={<Button variant="primary" size="sm">Create</Button>} />
                                </div>
                            </div>
                        </RevealOnScroll>

                        {/* Architecture + A11y */}
                        <RevealOnScroll>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="rounded-2xl border border-black/[0.06] bg-white p-5">
                                    <span className={`${spaceGrotesk.className} text-sm font-semibold text-gray-800 mb-2 block`}>Two-Repo Architecture</span>
                                    <p className={`${roboto.className} font-light text-sm text-black/50 mb-3`}>
                                        Published as @neighborhood/ui. Doc site imports from the package, not local files. This ensures a clean API boundary, and allows our doc site to live as a live consumer of the design system.
                                    </p>
                                    <div className="bg-gray-900 rounded-lg p-3 font-mono text-xs text-gray-300">
                                        <span className="text-gray-500">$</span> <span className="text-green-400">npm</span> install github:akin-tewe/neighborhood-ui
                                    </div>
                                </div>
                                <div className="rounded-2xl border border-black/[0.06] bg-white p-5">
                                    <span className={`${spaceGrotesk.className} text-sm font-semibold text-gray-800 mb-2 block`}>Accessibility</span>
                                    <p className={`${roboto.className} font-light text-sm text-black/50`}>
                                        Every component has a visible focus ring via :focus-visible. Consistent spec: 2px solid sky-400, 2px offset. Every documented keyboard interaction works.
                                    </p>
                                </div>
                            </div>
                        </RevealOnScroll>
                    </div>
                </GridContainer>
            </section>

            <SectionDivider />

            {/* ═══════ COMPOSITION ═══════ */}
            <section id="composition" className="relative py-16 md:py-20">
                <GridContainer>
                    <RevealOnScroll>
                        <SectionLabel>Composition</SectionLabel>
                        <p className={`${roboto.className} font-light text-base md:text-lg leading-relaxed text-black/70 mt-3`}>
                            Atoms compose into reusable patterns. Scroll to watch a settings panel assemble itself from individual components.
                        </p>
                    </RevealOnScroll>

                    <AssemblyAnimation />
                </GridContainer>
            </section>

            <SectionDivider />

            {/* ═══════ METHODOLOGY ═══════ */}
            <section id="methodology" className="relative py-16 md:py-20">
                <GridContainer>
                    <RevealOnScroll>
                        <SectionLabel>Methodology</SectionLabel>
                        <p className={`${roboto.className} font-light text-base md:text-lg leading-relaxed text-black/70 mt-3 mb-8`}>
                            Constructing random components to make up the initial pool would leave most of them dead and unused, which is a common problem in design systems. To ensure a strong foundation, the initial component pool was built using 3 pilots as a reference model. I performed an in-depth analysis of Notion, Stripe, and Discord&apos;s infrastructure to see which components came up consistently across all 3. From this we could decide what to extract and abstract into our usable component pools. These websites were chosen as a triangle: content tools, data dashboards, and social platforms. This ensures a valuable range of information and core use cases to abstract from.
                        </p>
                    </RevealOnScroll>

                    {/* Product selector */}
                    <RevealOnScroll>
                        <div className="grid grid-cols-3 gap-3 mb-6">
                            {([
                                { key: "notion" as AuditProduct, label: "Notion", views: "9 views", bg: "bg-gray-800", clickable: true },
                                { key: "discord" as AuditProduct, label: "Discord", views: "Screenshots omitted for privacy", bg: "bg-indigo-600", clickable: false },
                                { key: "stripe" as AuditProduct, label: "Stripe", views: "8 views", bg: "bg-violet-600", clickable: true },
                            ]).map((p) => (
                                p.clickable ? (
                                    <motion.button key={p.key} onClick={() => setAuditProduct(p.key)}
                                        whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}
                                        className={`${p.bg} text-white rounded-xl p-4 md:p-5 text-left transition-all duration-200 ${
                                            auditProduct === p.key ? 'ring-2 ring-offset-2 ring-black/15' : 'opacity-50 hover:opacity-80'
                                        }`}>
                                        <p className={`${spaceGrotesk.className} text-lg md:text-xl font-semibold`}>{p.label}</p>
                                        <p className={`${roboto.className} text-white/50 text-xs`}>{p.views}</p>
                                    </motion.button>
                                ) : (
                                    <div key={p.key} className={`${p.bg} text-white rounded-xl p-4 md:p-5 text-left opacity-50`}>
                                        <p className={`${spaceGrotesk.className} text-lg md:text-xl font-semibold`}>{p.label}</p>
                                        <p className={`${roboto.className} text-white/40 text-xs italic`}>{p.views}</p>
                                    </div>
                                )
                            ))}
                        </div>
                    </RevealOnScroll>

                    {/* Scrollable audit carousel */}
                    <AuditCarousel product={auditProduct} />

                    <RevealOnScroll className="mt-8">
                        <p className={`${roboto.className} font-light text-base leading-relaxed text-black/60`}>
                            If a component appeared in all three, it was flagged as a non-negotiable addition. Two appearances meant strong consideration. One appearance required a high compositional value to earn inclusion. Among all of our identified components, 18 were picked out thoughtfully in regards to what would best serve Neighborhood&apos;s identity.
                        </p>
                    </RevealOnScroll>
                </GridContainer>
            </section>

            <SectionDivider />

            {/* ═══════ TRADEOFFS + SCOPE ═══════ */}
            <section id="tradeoffs" className="relative py-16 md:py-20">
                <GridContainer>
                    <RevealOnScroll>
                        <SectionLabel>Tradeoffs</SectionLabel>
                        <p className={`${roboto.className} font-light text-base md:text-lg leading-relaxed text-black/70 mt-3 mb-6`}>
                            Every decision to include a component was also an active decision to exclude others. This deliberately tight inventory ensured development time wasn&apos;t bogged down with creating dead components, and set the pace on how to prioritize implementation for future development.
                        </p>
                    </RevealOnScroll>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                        <RevealOnScroll>
                            <div className="rounded-2xl border border-black/[0.06] bg-white p-5">
                                <span className={`${spaceGrotesk.className} text-sm font-semibold text-gray-800 mb-2 block`}>Same Need, Different Solutions</span>
                                <p className={`${roboto.className} font-light text-sm leading-relaxed text-black/60`}>
                                    Settings architecture alone had three valid approaches. Notion uses a modal overlay, Discord does a full-page takeover, and Stripe uses a card grid hub. Property display had three implementations. Destructive actions used consistently used a red fill throughout most observations. Neighborhood documents this analysis and picks the right approach per context, not per preference.
                                </p>
                            </div>
                        </RevealOnScroll>
                        <RevealOnScroll delay={0.05}>
                            <div className="rounded-2xl border border-black/[0.06] bg-white p-5">
                                <span className={`${spaceGrotesk.className} text-sm font-semibold text-gray-800 mb-2 block`}>Inclusion vs Exclusion</span>
                                <p className={`${roboto.className} font-light text-sm leading-relaxed text-black/60`}>
                                    Toggle appeared in Notion (10+ instances) and Discord but not Stripe. This meant it should still be included because two products confirmed universality. Switcher appeared only in Stripe but its compositional value (filtering data in place without navigating) earned inclusion as a distinctive pattern. A metric card was deliberately excluded from v0.1. It was deemed too specific to data-dense dashboards for a system still establishing its identity.
                                </p>
                            </div>
                        </RevealOnScroll>
                    </div>

                    <RevealOnScroll>
                        <SectionLabel>Scope</SectionLabel>
                        <div className="mt-4" />
                    </RevealOnScroll>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <RevealOnScroll>
                            <div className="border-l-2 border-green-500 pl-5 py-1">
                                <span className={`${spaceGrotesk.className} text-xs uppercase tracking-wider text-black/40 font-medium mb-2 block`}>In Scope — v0.1 Shipped</span>
                                <ul className={`${roboto.className} font-light text-sm leading-relaxed text-black/70 space-y-1`}>
                                    <li>• 11 Atomic: Avatar, Badge, Button, Checkbox, Divider, Input, Switcher, Select, Tabs, Toggle, Tooltip</li>
                                    <li>• 7 Compositional: Banner, Block, Table, Empty State, Form Group, Menu, Property, Setting Row</li>
                                </ul>
                            </div>
                        </RevealOnScroll>
                        <RevealOnScroll delay={0.1}>
                            <div className="border-l-2 border-red-400/40 pl-5 py-1">
                                <span className={`${spaceGrotesk.className} text-xs uppercase tracking-wider text-black/40 font-medium mb-2 block`}>Up Next — v0.2 Roadmap</span>
                                <ul className={`${roboto.className} font-light text-sm leading-relaxed text-black/70 space-y-1`}>
                                    <li>• Emerging patterns: fleshed out card system, showcase surfaces, flat strip indicator</li>
                                    <li>• New components: Command Palette, avatar color props</li>
                                    <li>• Dark mode via token architecture</li>
                                    <li>• Messaging + e-commerce demos</li>
                                </ul>
                            </div>
                        </RevealOnScroll>
                    </div>
                </GridContainer>
            </section>

            <SectionDivider />

            {/* ═══════ DEMOS ═══════ */}
            <section id="demos" className="relative py-16 md:py-20">
                <GridContainer>
                    <RevealOnScroll>
                        <SectionLabel>Demos</SectionLabel>
                        <p className={`${roboto.className} font-light text-base md:text-lg leading-relaxed text-black/70 mt-3 mb-6`}>
                            Three demo pages, each exercising different composition contexts. These utilize a number of our components in each composition to demonstrate what this design system would look like working in harmony. Switch tabs to see different context demonstrations.
                        </p>
                    </RevealOnScroll>

                    {/* Live interactive demo — content switches with tabs */}
                    <RevealOnScroll>
                        <div className="rounded-2xl border border-black/[0.06] bg-white overflow-hidden">
                            <div className="flex items-center gap-2 px-4 py-3 border-b border-black/[0.04]">
                                <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                                <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                                <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                                <a href="https://nbhd.dev/demo/settings" target="_blank" rel="noopener noreferrer" className={`${roboto.className} text-[11px] text-black/25 ml-2 hover:text-black/40 transition-colors`}>nbhd.dev/demo/settings</a>
                            </div>
                            <div className="p-5 md:p-6">
                                <Tabs items={isMobile ? [
                                    { label: "General", value: "general" },
                                    { label: "Appearance", value: "appearance" },
                                ] : [
                                    { label: "General", value: "general" },
                                    { label: "Appearance", value: "appearance" },
                                    { label: "Notifications", value: "notifications" },
                                ]} activeValue={demoTab} onChange={setDemoTab} />

                                <AnimatePresence mode="wait">
                                    <motion.div key={demoTab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }} className="mt-4">

                                        {demoTab === "general" && (
                                            <div>
                                                <SettingRow label="Display name" description="Your public username" control={<Input placeholder="Akin Tewe" size="sm" />} />
                                                <div className="my-1"><Divider /></div>
                                                <SettingRow label="Language" description="Display language" control={
                                                    <Menu trigger={<Select value="English" variant="form" size="sm" />} items={[
                                                        { label: "English", checked: true, onCheckedChange: () => {} },
                                                        { label: "Spanish" },
                                                        { label: "French" },
                                                        { label: "Japanese" },
                                                    ]} />
                                                } />
                                                <div className="my-1"><Divider /></div>
                                                <SettingRow label="Timezone" description="Set your local timezone" control={
                                                    <Menu trigger={<Select value="UTC-5 (EST)" variant="form" size="sm" />} items={[
                                                        { label: "UTC-5 (EST)", checked: true, onCheckedChange: () => {} },
                                                        { label: "UTC-8 (PST)" },
                                                        { label: "UTC+0 (GMT)" },
                                                        { label: "UTC+9 (JST)" },
                                                    ]} />
                                                } />
                                            </div>
                                        )}

                                        {demoTab === "appearance" && (
                                            <div>
                                                <SettingRow label="Dark mode" description="Use dark theme across the app" control={<Toggle checked={demoToggle1} onChange={setDemoToggle1} />} />
                                                <div className="my-1"><Divider /></div>
                                                <SettingRow label="Compact view" description="Reduce spacing in lists" control={<Toggle checked={demoToggle2} onChange={setDemoToggle2} />} />
                                                <div className="my-1"><Divider /></div>
                                                <SettingRow label="Date format" description="How dates are displayed" control={
                                                    <SegmentedControl options={[
                                                        { label: "MM/DD", value: "us" },
                                                        { label: "DD/MM", value: "eu" },
                                                    ]} activeValue={demoSegment} onChange={setDemoSegment} size="sm" />
                                                } />
                                            </div>
                                        )}

                                        {demoTab === "notifications" && (
                                            <div>
                                                <SettingRow label="Email alerts" description="Get notified about important updates" control={<Toggle checked={demoToggle1} onChange={setDemoToggle1} />} />
                                                <div className="my-1"><Divider /></div>
                                                <SettingRow label="Push notifications" description="Browser push notifications" control={<Toggle checked={demoToggle2} onChange={setDemoToggle2} />} />
                                                <div className="my-1"><Divider /></div>
                                                <Banner severity="info" message="Push notifications require browser permission." />
                                            </div>
                                        )}
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </div>
                    </RevealOnScroll>
                </GridContainer>
            </section>

            <SectionDivider />

            {/* ═══════ WHAT'S NEXT ═══════ */}
            <section id="whats-next" className="relative py-16 md:py-20">
                <GridContainer>
                    <RevealOnScroll>
                        <SectionLabel>What&apos;s Next</SectionLabel>
                        <p className={`${roboto.className} font-light text-base md:text-lg leading-relaxed text-black/70 mt-3 mb-8`}>
                            While v0.1 shipped the foundation, several patterns emerged during documentation site development that are already actively shaping the next version.
                        </p>
                    </RevealOnScroll>

                    <div className="flex flex-col gap-6">
                        {/* Emerging patterns */}
                        <RevealOnScroll>
                            <div className="rounded-2xl border border-black/[0.06] bg-white p-5 md:p-6">
                                <span className={`${spaceGrotesk.className} text-sm font-semibold text-gray-800 mb-3 block`}>Emerging Patterns</span>
                                <p className={`${roboto.className} text-sm text-black/50 font-light mb-4`}>
                                    Patterns observed during doc site construction that are candidates for formal components. Cards, showcase surfaces, and a flat strip indicator (the non-rounded sibling of Banner, purpose-built for unified card compositions) have all been documented and are being evaluated for extraction. Expanded usage guidelines and implementation guidance per component are also in progress.
                                </p>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                    {["Card System", "Showcase Surface", "Flat Strip", "Usage Guidelines"].map((p) => (
                                        <div key={p} className="bg-[#faf8f6] rounded-lg p-3 text-center">
                                            <span className={`${roboto.className} text-xs text-black/50 font-medium`}>{p}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </RevealOnScroll>

                        {/* New components */}
                        <RevealOnScroll delay={0.05}>
                            <div className="rounded-2xl border border-black/[0.06] bg-white p-5 md:p-6">
                                <span className={`${spaceGrotesk.className} text-sm font-semibold text-gray-800 mb-3 block`}>v0.2 Roadmap</span>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <span className={`${spaceGrotesk.className} text-xs text-black/30 uppercase tracking-wider font-medium mb-2 block`}>New Components</span>
                                        <ul className={`${roboto.className} font-light text-sm leading-relaxed text-black/55 space-y-1`}>
                                            <li>• Command Palette (Notion), Profile Card (Discord)</li>
                                            <li>• Avatar color prop, card system, showcase surfaces</li>
                                            <li>• Dark mode via token architecture</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <span className={`${spaceGrotesk.className} text-xs text-black/30 uppercase tracking-wider font-medium mb-2 block`}>Emerging Patterns</span>
                                        <ul className={`${roboto.className} font-light text-sm leading-relaxed text-black/55 space-y-1`}>
                                            <li>• Flat strip indicator, detailed usage + implementation guidelines</li>
                                            <li>• Doc page layout abstraction</li>
                                            <li>• Messaging + e-commerce demo pages</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </RevealOnScroll>

                        {/* Selection patterns + motion */}
                        <RevealOnScroll delay={0.1}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="rounded-2xl border border-black/[0.06] bg-white p-5">
                                    <span className={`${spaceGrotesk.className} text-sm font-semibold text-gray-800 mb-2 block`}>Selection Patterns</span>
                                    <p className={`${roboto.className} text-sm text-black/50 font-light`}>
                                        Two signature selection patterns have been established. Bracket (primary-400 vertical bars, spring animation) for primary navigation and tabs. Landing (translateY settle with inset shadow) for secondary nav and text-heavy lists. Both are documented with specific motion curves and use-case rules.
                                    </p>
                                </div>
                                <div className="rounded-2xl border border-black/[0.06] bg-white p-5">
                                    <span className={`${spaceGrotesk.className} text-sm font-semibold text-gray-800 mb-2 block`}>Responsive Infrastructure</span>
                                    <p className={`${roboto.className} text-sm text-black/50 font-light`}>
                                        CSS-first responsive system with two breakpoints (768px tablet, 640px mobile). Components also include their own mobile behavior. Setting wraps controls, Block hides descriptions, Switcher stacks vertically inside settings. Pages use layout classes and the CSS handles the rest.
                                    </p>
                                </div>
                            </div>
                        </RevealOnScroll>

                        {/* Additional demos */}
                        <RevealOnScroll delay={0.15}>
                            <p className={`${roboto.className} font-light text-base leading-relaxed text-black/60`}>
                                Additional demo pages covering messaging and e-commerce contexts are planned to demonstrate wider compositional range. Dark mode implementation via the existing token architecture is also in scope. The CSS custom property foundation means this is just a matter of defining alternate values, not restructuring components.
                            </p>
                        </RevealOnScroll>
                    </div>
                </GridContainer>
            </section>

            <SectionDivider />

            {/* ═══════ BUILT WITH ═══════ */}
            <section className="relative py-16 md:py-20">
                <GridContainer>
                    <RevealOnScroll className="flex flex-col items-center gap-6">
                        <SectionLabel>Built With</SectionLabel>
                        <div className="flex flex-wrap justify-center gap-2">
                            <TechPill name="Next.js 16" /> <TechPill name="React 19" /> <TechPill name="TypeScript" />
                            <TechPill name="Tailwind CSS 4" /> <TechPill name="CSS Custom Properties" />
                        </div>
                        <p className={`${roboto.className} font-light text-sm text-black/50 text-center max-w-xl`}>
                            Tokens use CSS custom properties — they work anywhere CSS works.
                        </p>
                        <div className="flex flex-wrap gap-4 justify-center">
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
                        </div>
                    </RevealOnScroll>
                </GridContainer>
            </section>

                </div>
            </div>
        </main>
    );
}

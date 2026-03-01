"use client";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { pixelify, roboto } from "../ui/fonts";
import TransparentVideo from "@/components/SplashVideo";
import { useLoader } from "@/components/LoaderContext";

// Grid container for content alignment
function GridContainer({ children, className = "", id }: { children: React.ReactNode; className?: string; id?: string }) {
    return (
        <div id={id} className={`w-full max-w-[1400px] mx-auto px-5 md:px-8 ${className}`}>
            {children}
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

// Grid overlay for dark/colored sections
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

// Carousel items - add new items here
const carouselItems = [
    { type: "video" as const, src: "/about-me-carousel/truvideo.mp4", href: "/projects/truereligion" },
    { type: "video" as const, src: "/about-me-carousel/crystal-collection.mp4", href: null },
    { type: "image" as const, src: "/about-me-carousel/finalcover.jpg", href: "/projects/albumcover" },
    { type: "video" as const, src: "/about-me-carousel/ragelowq.mp4", href: "/projects/yourrage" },
];

const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const }
    }
};

const fadeInLeft = {
    hidden: { opacity: 0, x: -40 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const }
    }
};

const fadeInRight = {
    hidden: { opacity: 0, x: 40 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const }
    }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.1
        }
    }
};

const skillItem = {
    hidden: { opacity: 0, y: 10 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.4 }
    }
};

// Animated section wrapper with useInView
function AnimatedSection({
    children,
    className = ""
}: {
    children: React.ReactNode;
    className?: string
}) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className={className}
        >
            {children}
        </motion.div>
    );
}

// Skills list component
function SkillsList({
    title,
    skills
}: {
    title: string;
    skills: string[]
}) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="flex flex-col gap-4"
        >
            <motion.h3
                variants={skillItem}
                className={`${pixelify.className} text-black text-base tracking-wider`}
            >
                {title}
            </motion.h3>
            <ul className="flex flex-col gap-2">
                {skills.map((skill, index) => (
                    <motion.li
                        key={index}
                        variants={skillItem}
                        className={`${roboto.className} text-gray-600 font-light text-base`}
                    >
                        {skill}
                    </motion.li>
                ))}
            </ul>
        </motion.div>
    );
}

// Auto-scrolling work carousel
function WorkCarousel({ items }: { items: { type: "video" | "image"; src: string; href: string | null }[] }) {
    const carouselRef = useRef<HTMLDivElement>(null)
    const [isHolding, setIsHolding] = useState(false)
    const [isDragging, setIsDragging] = useState(false)
    const [startX, setStartX] = useState(0)
    const [scrollLeft, setScrollLeft] = useState(0)
    const autoScrollRef = useRef<NodeJS.Timeout | null>(null)
    const resumeTimeoutRef = useRef<NodeJS.Timeout | null>(null)
    const dragDistanceRef = useRef(0)
    const { show, hide } = useLoader()

    // Auto-scroll logic
    useEffect(() => {
        const carousel = carouselRef.current
        if (!carousel) return

        const scroll = () => {
            if (!isHolding && !isDragging && carousel) {
                carousel.scrollLeft += 1

                // Loop back to start when reaching end
                if (carousel.scrollLeft >= carousel.scrollWidth - carousel.clientWidth) {
                    carousel.scrollLeft = 0
                }
            }
        }

        autoScrollRef.current = setInterval(scroll, 30)

        return () => {
            if (autoScrollRef.current) clearInterval(autoScrollRef.current)
        }
    }, [isHolding, isDragging])

    // Resume auto-scroll after inactivity
    const scheduleResume = () => {
        if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current)
        resumeTimeoutRef.current = setTimeout(() => {
            setIsHolding(false)
            setIsDragging(false)
        }, 2500)
    }

    // Mouse/touch handlers
    const handleMouseDown = (e: React.MouseEvent) => {
        setIsHolding(true)
        setIsDragging(true)
        dragDistanceRef.current = 0
        setStartX(e.pageX - (carouselRef.current?.offsetLeft || 0))
        setScrollLeft(carouselRef.current?.scrollLeft || 0)
    }

    const handleMouseUp = () => {
        setIsDragging(false)
        scheduleResume()
    }

    const handleMouseLeave = () => {
        setIsDragging(false)
        scheduleResume()
    }

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging) return
        e.preventDefault()
        const x = e.pageX - (carouselRef.current?.offsetLeft || 0)
        const walk = (x - startX) * 2
        dragDistanceRef.current += Math.abs(e.movementX)
        if (carouselRef.current) {
            carouselRef.current.scrollLeft = scrollLeft - walk
        }
    }

    // Touch handlers
    const handleTouchStart = (e: React.TouchEvent) => {
        setIsHolding(true)
        setIsDragging(true)
        dragDistanceRef.current = 0
        setStartX(e.touches[0].pageX - (carouselRef.current?.offsetLeft || 0))
        setScrollLeft(carouselRef.current?.scrollLeft || 0)
    }

    const handleTouchEnd = () => {
        setIsDragging(false)
        scheduleResume()
    }

    const handleTouchMove = (e: React.TouchEvent) => {
        if (!isDragging) return
        const x = e.touches[0].pageX - (carouselRef.current?.offsetLeft || 0)
        const walk = (x - startX) * 2
        dragDistanceRef.current += Math.abs(x - startX)
        if (carouselRef.current) {
            carouselRef.current.scrollLeft = scrollLeft - walk
        }
    }

    return (
        <div className="relative w-full">
            {/* Left fade */}
            <div className="absolute left-0 top-0 bottom-0 w-8 md:w-12 bg-gradient-to-r from-gray-900 to-transparent z-10 pointer-events-none" />

            {/* Right fade */}
            <div className="absolute right-0 top-0 bottom-0 w-8 md:w-12 bg-gradient-to-l from-gray-900 to-transparent z-10 pointer-events-none" />

            {/* Carousel */}
            <div
                ref={carouselRef}
                className="flex gap-4 overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseLeave}
                onMouseMove={handleMouseMove}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                onTouchMove={handleTouchMove}
            >
                {/* Duplicate items for seamless loop */}
                {[...items, ...items].map((item, index) => {
                    const handleClick = () => {
                        if (item.href && dragDistanceRef.current < 5) {
                            show();
                            setTimeout(hide, 800);
                            window.location.href = item.href;
                        }
                    };

                    return (
                    <div
                        key={index}
                        onClick={handleClick}
                        className={`flex-shrink-0 w-56 md:w-92 aspect-square rounded-2xl overflow-hidden select-none ${
                            item.href ? 'cursor-pointer pointer-events-auto' : 'pointer-events-none'
                        }`}
                    >
                        {item.type === "video" ? (
                            <video
                                src={item.src}
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <Image
                                src={item.src}
                                alt=""
                                width={400}
                                height={400}
                                draggable={false}
                                className="w-full h-full object-cover"
                            />
                        )}
                    </div>
                    );
                })}
            </div>
        </div>
    )
}

export default function AboutMe() {
    const heroRef = useRef(null);
    const isHeroInView = useInView(heroRef, { once: true });

    return (
        <main className="bg-[#ebebeb] min-h-screen overflow-x-hidden">

            {/* Hero Headline */}
            <section
                ref={heroRef}
                className="relative pt-28 md:pt-40 pb-16 md:pb-24"
            >
                <GridOverlayLight />
                <GridContainer>
                    <div className="md:grid md:grid-cols-5">
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as const }}
                            className={`${roboto.className} font-light text-black text-4xl md:text-5xl lg:text-6xl leading-tight md:col-span-4`}
                        >
                            Driven by a child-like sense of curiosity and a deep attention to detail.
                        </motion.h1>
                    </div>
                </GridContainer>
            </section>

            {/* Divider */}
            <GridContainer>
                <div className="border-t border-black/10"></div>
            </GridContainer>

            {/* Section 1: Intro - Text Left, Image Right */}
            <section className="relative py-16 md:py-[clamp(4rem,6vw,6rem)]">
                <GridOverlayLight />
                <GridContainer>
                    <AnimatedSection className="flex flex-col md:grid md:grid-cols-5 gap-10">
                        <motion.div
                            variants={fadeInLeft}
                            className="md:col-span-2"
                        >
                            <p className={`${roboto.className} text-black/80 font-light text-lg leading-relaxed`}>
                                Hey! I&apos;m Akin Tewe, a Product Designer with a background in Industrial Design from Georgia Tech.
                            </p>
                            <p className={`${roboto.className} text-black/80 mt-8 font-light text-lg leading-relaxed`}>
                                As a designer who can also write code, I think about how things look and how they&apos;re actually built. Whether I&apos;m wireframing in Figma,
                                conducting user research, or building responsive interfaces with React and TypeScript, I can take a project from initial concept through to functional code.
                            </p>
                        </motion.div>
                        <motion.div
                            variants={fadeInRight}
                            className="md:col-span-2 md:col-start-4"
                        >
                            <div className="relative overflow-hidden rounded-2xl shadow-xl">
                                <Image
                                    src="/profilephoto.png"
                                    alt="Akin Tewe"
                                    width={700}
                                    height={700}
                                    className="w-full h-auto"
                                />
                            </div>
                        </motion.div>
                    </AnimatedSection>
                </GridContainer>
            </section>

            {/* Section 2: Experience - Carousel Left, Text Right */}
            <section className="relative py-16 md:py-30 bg-gray-900">
                <GridOverlay />
                <GridContainer>
                    <AnimatedSection className="flex flex-col md:grid md:grid-cols-5 gap-10 items-center">
                        <motion.div
                            variants={fadeInLeft}
                            className="md:col-span-2 w-full"
                        >
                            <WorkCarousel items={carouselItems} />
                        </motion.div>
                        <motion.div
                            variants={fadeInRight}
                            className="md:col-span-2 md:col-start-4"
                        >
                            <p className={`${roboto.className} text-white/90 font-light text-lg leading-relaxed`}>
                                Throughout my time freelancing as a Visual Designer, I&apos;ve worked with large brands like True Religion and Higround, designed for musical artists with over 20M monthly listeners and 10M+ social media followers, and directed brand campaigns reaching 100K+ impressions. Across 30+ commissioned projects, each one taught me how to find the best possible outcome within real constraints. Not always the ideal outcome, but often the smartest.
                            </p>
                        </motion.div>
                    </AnimatedSection>
                </GridContainer>
            </section>

            {/* Section 3: Skills - Lists Left, Video Right */}
            <section className="relative py-16 md:py-[clamp(4rem,6vw,6rem)]">
                <GridOverlayLight />
                <GridContainer>
                    <AnimatedSection className="flex flex-col md:grid md:grid-cols-5 gap-12 items-start">
                        <motion.div
                            variants={fadeInLeft}
                            className="md:col-span-2"
                        >
                            <motion.h2
                                variants={fadeInUp}
                                className={`${pixelify.className} text-black text-2xl mb-10`}
                            >
                                SKILLS & TOOLS
                            </motion.h2>

                            <div className="grid grid-cols-2 gap-10 md:gap-8">
                                <SkillsList
                                    title="DESIGN"
                                    skills={[
                                        "UI/UX Design",
                                        "Responsive Design",
                                        "User Research",
                                        "Wireframing",
                                        "Prototyping",
                                        "Design Systems",
                                        "Visual Hierarchy",
                                        "Generative AI Workflows"
                                    ]}
                                />
                                <SkillsList
                                    title="LANGUAGES"
                                    skills={[
                                        "JavaScript",
                                        "TypeScript",
                                        "HTML",
                                        "CSS"
                                    ]}
                                />
                                <SkillsList
                                    title="FRAMEWORKS"
                                    skills={[
                                        "React",
                                        "Next.js",
                                        "Tailwind CSS",
                                        "Framer Motion",
                                        "Git"
                                    ]}
                                />
                                <SkillsList
                                    title="SOFTWARE"
                                    skills={[
                                        "Figma",
                                        "Adobe Photoshop",
                                        "Adobe Illustrator",
                                        "AutoCAD",
                                        "Solidworks"
                                    ]}
                                />
                            </div>
                        </motion.div>

                        <motion.div
                            variants={fadeInRight}
                            className="relative w-full md:col-span-2 md:col-start-4 aspect-square"
                        >
                            <TransparentVideo mp4Src="/aboutmeM.mp4" webmSrc="/aboutmeW.webm" />
                        </motion.div>
                    </AnimatedSection>
                </GridContainer>
            </section>

            {/* Bottom Padding */}
            <div className="h-2 md:h-4"></div>

        </main>
    );
}

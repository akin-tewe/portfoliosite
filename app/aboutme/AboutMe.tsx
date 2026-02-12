"use client";
import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { pixelify, roboto } from "../ui/fonts";

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

// Image placeholder component
function ImagePlaceholder({ label }: { label: string }) {
    return (
        <div className="w-full aspect-square bg-gray-100 rounded-2xl flex items-center justify-center border border-gray-200">
            <span className={`${roboto.className} text-gray-400 text-sm italic`}>{label}</span>
        </div>
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
                className={`${pixelify.className} text-black text-base md:text-lg tracking-wider`}
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

export default function AboutMe() {
    const heroRef = useRef(null);
    const isHeroInView = useInView(heroRef, { once: true });

    return (
        <main className="bg-white min-h-screen">

            {/* Hero Headline */}
            <section
                ref={heroRef}
                className="pt-28 md:pt-40 pb-16 md:pb-24 px-6 md:px-[10vw]"
            >
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as const }}
                    className={`${roboto.className} font-light text-black text-4xl md:text-5xl lg:text-6xl max-w-5xl leading-tight`}
                >
                    Driven by a child-like sense of curiosity and a deep attention to detail.
                </motion.h1>
            </section>

            {/* Divider */}
            <div className="mx-6 md:mx-[10vw] border-t border-black/10"></div>

            {/* Section 1: Intro - Text Left, Image Right */}
            <section className="py-16 md:py-24 px-6 md:px-[10vw]">
                <AnimatedSection className="flex flex-col md:flex-row gap-10 md:gap-16 lg:gap-24 justify-between">
                    <motion.div
                        variants={fadeInLeft}
                        className="flex-1 md:max-w-lg"
                    >
                        <p className={`${roboto.className} text-black/80 font-light text-lg md:text-xl leading-relaxed max-w-md`}>
                            Hey! I'm Akin Tewe, a Product Designer with a background in Industrial Design from Georgia Tech.
                        </p>
                        <p className={`${roboto.className} text-black/80 mt-8 font-light text-lg md:text-xl leading-relaxed max-w-md`}>
                            As a designer who can also write code, I think about how things look and how they're actually built. Whether I'm wireframing in Figma, 
                            conducting user research, or building responsive interfaces with React and TypeScript, I can take a project from initial concept through to functional code.
                        </p>
                    </motion.div>
                    <motion.div
                        variants={fadeInRight}
                        className="w-full md:w-[45%] lg:w-[35%]"
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
            </section>

            {/* Section 2: Experience - Image Left, Text Right */}
            <section className="py-16 md:py-24 px-6 md:px-[10vw] bg-gray-50/50">
                <AnimatedSection className="flex flex-col md:flex-row-reverse gap-10 md:gap-16 lg:gap-24 items-center justify-between">
                    <motion.div
                        variants={fadeInRight}
                        className="flex-1 md:max-w-lg"
                    >
                        <p className={`${roboto.className} text-black/80 font-light text-lg md:text-xl leading-relaxed`}>
                            Throughout my time freelancing as a Visual Designer, I've worked with large brands like True Religion and Highground, designed for musical artists with millions of listeners, and directed brand campaigns reaching 100K+ impressions. Each project taught me how to find the best possible outcome within real constraints. Not always the ideal outcome, but often the smartest.
                        </p>
                    </motion.div>
                    <motion.div
                        variants={fadeInLeft}
                        className="flex-1 max-w-sm md:max-w-md"
                    >
                        <ImagePlaceholder label="[Image 2]" />
                    </motion.div>
                </AnimatedSection>
            </section>

            {/* Section 3: Skills - Lists Left, Image Right */}
            <section className="py-16 md:py-24 px-6 md:px-[10vw]">
                <AnimatedSection className="flex flex-col md:flex-row gap-12 md:gap-16 lg:gap-24 items-start">
                    <motion.div
                        variants={fadeInLeft}
                        className="flex-1"
                    >
                        <motion.h2
                            variants={fadeInUp}
                            className={`${pixelify.className} text-black text-2xl md:text-3xl mb-10`}
                        >
                            SKILLS & TOOLS
                        </motion.h2>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8">
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
                        className="w-full md:w-64 lg:w-80 flex-shrink-0"
                    >
                        <ImagePlaceholder label="[Image 3]" />
                    </motion.div>
                </AnimatedSection>
            </section>

            {/* Bottom Padding */}
            <div className="h-20 md:h-32"></div>

        </main>
    );
}

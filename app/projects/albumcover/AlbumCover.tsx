"use client";
import { pixelify, roboto } from "@/app/ui/fonts"
import MagneticButton from "@/components/MagneticButton";
import { useRef } from "react";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import DragScroll from "@/components/DragScroll";
import { motion, useInView } from "framer-motion";
import ProjectSummary from "@/components/ProjectSummary";

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

export default function AlbumCover() {
    const heroRef = useRef(null);
    const isHeroInView = useInView(heroRef, { once: true });

    return (
        <main className="overflow-x-hidden">
            <div className="fixed inset-0 flex h-full w-full gap-[1vw] text-white/5 justify-center pointer-events-none z-0">
                <div className="border w-[15vw] md:w-[12.1vw] border-white/5"></div>
                <div className="border w-[15vw] md:w-[12.1vw] border-white/5"></div>
                <div className="border w-[15vw] md:w-[12.1vw] border-white/5"></div>
                <div className="border w-[15vw] md:w-[12.1vw] border-white/5"></div>
                <div className="border w-[15vw] md:w-[12.1vw] border-white/5"></div>
                <div className="border w-[15vw] md:w-[12.1vw] border-white/5"></div>
            </div>

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
                            {`"peaches and eggplants (remix)" cover art design`}
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className={`${roboto.className} text-white/80 font-light text-lg md:text-xl lg:text-2xl md:max-w-2xl leading-relaxed`}
                        >
                            {`As star artists "Latto" and "Sexyy Red" were brought on to the remix of Young Nudy's
                            hit song "Peaches and Eggplants", I was commissioned by Nudy's team to reinterpret the original cover to represent the new artists.`}
                        </motion.p>
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
                            <MagneticButton icon={<ChevronDown className="md:hidden text-white z-50" />} parameter="w-15 h-15 md:w-50 md:h-15 bg-blue-600/50 md:bg-blue-500/0 hover:bg-blue-600/50 z-20" text="Read More" />
                        </button>
                    </motion.div>
                </motion.div>
            </section>

            <section className="h-[50px] md:h-0"></section>

            <section id="body" className="relative pb-20 md:pb-40 px-5 md:px-[8vw] lg:px-[11vw] z-10">
                <div className="flex flex-col gap-16 md:gap-24 max-w-4xl">

                    <AnimatedSection className="flex flex-col gap-8 md:gap-12">
                        <motion.div variants={fadeInUp}>
                            <h2 className={`${pixelify.className} text-white text-2xl md:text-3xl lg:text-4xl mb-6`}>
                                context.
                            </h2>
                            <p className={`${roboto.className} text-white/80 text-base md:text-xl lg:text-2xl font-light leading-relaxed`}>
                                6 short hours.
                                This was all the time provided to make this happen, something not unusual to the music industry but entirely unusual
                                to my regular process. I had to rethink how I design entirely. Instead of broad stylistic changes and innovation, the
                                focus was on precise, high impact additions that respectfully leave their mark.
                            </p>
                        </motion.div>

                        <motion.div variants={fadeInUp}>
                            <div className="flex relative overflow-hidden bg-white/10 p-2 md:p-[1vw] rounded-lg">
                                <Image
                                    src="/projects/albumcover/originalcover.jpg"
                                    alt="Original Album Cover Art"
                                    className="rounded-md pointer-events-none w-full h-auto"
                                    width={700}
                                    height={700}
                                />
                            </div>
                            <div className={`${roboto.className} text-white/40 text-center mt-2 italic text-sm md:text-base`}>
                                {`"Peaches and Eggplants" by Young Nudy original cover art.`}
                            </div>
                        </motion.div>

                        <motion.div variants={fadeInUp}>
                            <p className={`${roboto.className} text-white/80 text-base md:text-xl lg:text-2xl font-light leading-relaxed`}>
                                {`The original cover was a still-life composition built
                                around indulgence: food, money, guns, and overt luxury engaged around a central snake serving as Nudy's motif. Safe to say
                                it would not be a light challenge introducing new elements onto an already cluttered scene.`}
                            </p>
                        </motion.div>
                    </AnimatedSection>

                    <AnimatedSection className="flex flex-col gap-8 md:gap-12">
                        <motion.div variants={fadeInUp}>
                            <h2 className={`${pixelify.className} text-white text-2xl md:text-3xl lg:text-4xl mb-6`}>
                                iteration and integration.
                            </h2>
                        </motion.div>

                        <motion.div variants={fadeInUp}>
                            <DragScroll className="flex gap-3 md:gap-[1vw] relative w-full bg-white/10 p-3 md:p-[1vw] rounded-lg">
                                <Image
                                    src="/projects/albumcover/red.jpg"
                                    alt="Red Chain Reference Image"
                                    className="rounded-md pointer-events-none h-48 md:h-64 w-auto"
                                    width={300}
                                    height={700}
                                />
                                <Image
                                    src="/projects/albumcover/latto.webp"
                                    alt="Latto Chain Reference Image"
                                    className="rounded-md pointer-events-none object-cover h-48 md:h-64 w-auto"
                                    width={600}
                                    height={400}
                                />
                            </DragScroll>
                            <div className={`${roboto.className} text-white/40 text-center mt-2 italic text-sm md:text-base`}>
                                {`chain references for artists "Sexyy Redd" and "Latto."`}
                            </div>
                        </motion.div>

                        <motion.div variants={fadeInUp}>
                            <p className={`${roboto.className} text-white/80 text-base md:text-xl lg:text-2xl font-light leading-relaxed`}>
                                After deciding what made sense to remove, we had to figure out what made sense to include.
                                To signify the presence of the two new artists, their chains were recreated to serve as the central motif of the new piece. Additional signifiers such as
                                cherries were also added to shift the tone of the image.
                            </p>
                        </motion.div>

                        <motion.div variants={fadeInUp}>
                            <div className="flex relative overflow-hidden bg-white/10 p-2 md:p-[1vw] rounded-lg">
                                <Image
                                    src="/projects/albumcover/wip2.png"
                                    alt="Work in Progress Render"
                                    className="rounded-md pointer-events-none w-full h-auto"
                                    width={700}
                                    height={700}
                                />
                            </div>
                            <div className={`${roboto.className} text-white/40 text-center mt-2 italic text-sm md:text-base`}>
                                initial work in progress scene.
                            </div>
                        </motion.div>

                        <motion.div variants={fadeInUp}>
                            <p className={`${roboto.className} text-white/80 text-base md:text-xl lg:text-2xl font-light leading-relaxed`}>
                                Scale and placement were the two factors that provided the most friction.
                                Everything needed to be set perfectly. Nearly a dozen iterations were produced in the tight timeframe, moving pieces sometimes only pixels apart
                                between each until harmony was established. These constant revisions helped to better understand both my vision and the client's, and eventually
                                align them as one.
                            </p>
                        </motion.div>
                    </AnimatedSection>

                    <AnimatedSection className="flex flex-col gap-8 md:gap-12">
                        <motion.div variants={fadeInUp}>
                            <div className="flex relative overflow-hidden bg-white/10 p-2 md:p-[1vw] rounded-lg">
                                <Image
                                    src="/projects/albumcover/finalcover.jpg"
                                    alt="Final Album Cover Art"
                                    className="rounded-md pointer-events-none w-full h-auto"
                                    width={700}
                                    height={700}
                                />
                            </div>
                        </motion.div>

                        <motion.div variants={fadeInUp}>
                            <h2 className={`${pixelify.className} text-white text-2xl md:text-3xl lg:text-4xl mb-6`}>
                                concluding.
                            </h2>
                            <p className={`${roboto.className} text-white/80 text-base md:text-xl lg:text-2xl font-light leading-relaxed`}>
                                {`The final cover preserved the identity of the original release while also
                                differentiating itself in a clear and notable manner. While "short-lived" is an understatement for this experience, it was an important lesson in
                                quick thinking, rapid adaptation, and distilling decisions down to their essentials.`}
                            </p>
                        </motion.div>

                        <motion.div variants={fadeInUp} className="mt-8">
                            <ProjectSummary
                                items={[
                                    { label: "Client", value: "Young Nudy" },
                                    { label: "Deliverable", value: "Album Cover" },
                                    { label: "Timeline", value: "6 Hours" },
                                    { label: "Focus", value: "Visual Identity" }
                                ]}
                            />
                        </motion.div>
                    </AnimatedSection>
                </div>
            </section>
        </main>
    )
}

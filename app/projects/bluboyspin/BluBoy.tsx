"use client";
import { pixelify, roboto } from "@/app/ui/fonts"
import MagneticButton from "@/components/MagneticButton";
import { useState, useRef } from "react";
import { Video, ChevronDown } from "lucide-react";
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

export default function Bluboy() {
    const [open, setOpen] = useState(false);
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
                            {`print launch video for "bluboy"`}
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className={`${roboto.className} text-white/80 font-light text-lg md:text-xl lg:text-2xl md:max-w-2xl leading-relaxed`}
                        >
                            {`A short-form commercial created to introduce
                            the release of fashion designer "Bluboy's" art prints.`}
                        </motion.p>
                    </div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={isHeroInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        className={`${pixelify.className} text-xl flex flex-col items-center md:flex-row gap-15 mt-10 md:mt-auto justify-center md:ml-auto`}
                    >
                        <button
                            className="flex justify-center items-center w-auto h-auto z-10"
                            onClick={() => document.getElementById('body')?.scrollIntoView({ behavior: 'smooth' })}
                        >
                            <MagneticButton icon={<ChevronDown className="md:hidden text-white z-50" />} parameter="w-15 h-15 md:w-40 md:h-15 bg-blue-600/50 md:bg-blue-500/0 hover:bg-blue-600/50 z-20" text="Read More" />
                        </button>
                        <button
                            className="flex justify-center items-center w-auto h-auto z-10"
                            onClick={() => setOpen(true)}
                        >
                            <MagneticButton icon={<Video className="md:hidden text-white z-50" />} parameter="w-15 h-15 md:w-50 md:h-15 bg-blue-600/50 md:bg-blue-500/0 hover:bg-blue-600/50 z-20" text="Watch Video" />
                        </button>

                        {open && (
                            <div
                                className="fixed inset-0 z-40 flex items-center justify-center bg-black/70 p-4"
                                onClick={() => setOpen(false)}
                            >
                                <div
                                    className="w-full max-w-6xl overflow-hidden rounded-2xl bg-black shadow-2xl"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <video
                                        className="aspect-video w-full z-50"
                                        src="/projects/bluboyspin/printsvid.mp4"
                                        controls
                                        autoPlay
                                    />
                                </div>
                            </div>
                        )}
                    </motion.div>
                </motion.div>
            </section>

            <section className="h-[50px] md:h-0"></section>

            <section id="body" className="relative pb-20 md:pb-40 px-5 md:px-[8vw] lg:px-[11vw] z-10">
                <div className="flex flex-col gap-16 md:gap-24 max-w-4xl">

                    <AnimatedSection className="flex flex-col gap-8 md:gap-12">
                        <motion.div variants={fadeInUp}>
                            <h2 className={`${pixelify.className} text-white text-2xl md:text-3xl lg:text-4xl mb-6`}>
                                assessment.
                            </h2>
                            <p className={`${roboto.className} text-white/80 text-base md:text-xl lg:text-2xl font-light leading-relaxed`}>
                                {`Bluboy is an individual I've done a number of works for in the past.
                                As it had been a notable amount of time since our last project, this required re-engaging with his current audience and demographic. What
                                they're looking for now is continuity. Not a throwback to the past or a character they haven't seen in months, but something fresh that aligns
                                with his current image.`}
                            </p>
                        </motion.div>

                        <motion.div variants={fadeInUp}>
                            <DragScroll className="flex gap-3 md:gap-[1vw] relative w-full bg-white/10 p-3 md:p-[1vw] rounded-lg">
                                <Image src="/projects/bluboyspin/fit1.jpg" alt="Reference Print Image 1" className="rounded-md pointer-events-none h-48 md:h-64 w-auto" width={500} height={500} />
                                <Image src="/projects/bluboyspin/fit2.jpg" alt="Reference Print Image 2" className="rounded-md pointer-events-none h-48 md:h-64 w-auto" width={500} height={500} />
                                <Image src="/projects/bluboyspin/fit3.jpg" alt="Reference Print Image 3" className="rounded-md pointer-events-none h-48 md:h-64 w-auto" width={500} height={500} />
                            </DragScroll>
                            <div className={`${roboto.className} text-white/40 text-center mt-2 italic text-sm md:text-base`}>
                                {`"bluboy" art direction reference - image credit: @bluboy on instagram`}
                            </div>
                        </motion.div>

                        <motion.div variants={fadeInUp}>
                            <p className={`${roboto.className} text-white/80 text-base md:text-xl lg:text-2xl font-light leading-relaxed`}>
                                While character-driven imagery is a focal point of his overall narrative,
                                he wanted to reduce the prominence of it for this video, and let the pieces speak on their own. As these characters are still essential to his
                                branding, we moved them to a comfortable position in the background. They make their presence known without demanding your attention.
                            </p>
                        </motion.div>

                        <motion.div variants={fadeInUp}>
                            <DragScroll className="flex gap-3 md:gap-[1vw] relative w-full bg-white/10 p-3 md:p-[1vw] rounded-lg">
                                <Image src="/projects/bluboyspin/char1.jpg" alt="Example Art Direction Image 1" className="rounded-md pointer-events-none h-48 md:h-64 w-auto" width={500} height={500} />
                                <Image src="/projects/bluboyspin/char2.jpg" alt="Example Art Direction Image 2" className="rounded-md pointer-events-none h-48 md:h-64 w-auto" width={500} height={500} />
                                <Image src="/projects/bluboyspin/char3.jpg" alt="Example Art Direction Image 3" className="rounded-md pointer-events-none h-48 md:h-64 w-auto" width={500} height={500} />
                            </DragScroll>
                            <div className={`${roboto.className} text-white/40 text-center mt-2 italic text-sm md:text-base`}>
                                character visual direction reference - image credit: @bluboy on instagram
                            </div>
                        </motion.div>
                    </AnimatedSection>

                    <AnimatedSection className="flex flex-col gap-8 md:gap-12">
                        <motion.div variants={fadeInUp}>
                            <h2 className={`${pixelify.className} text-white text-2xl md:text-3xl lg:text-4xl mb-6`}>
                                speaking through motion.
                            </h2>
                            <p className={`${roboto.className} text-white/80 text-base md:text-xl lg:text-2xl font-light leading-relaxed`}>
                                With the characters taking a backseat, the paintings had to absorb the magic.
                                To possess the paintings with some of that creative spirit, we had to hone back in on our animation principles. Timing, spacing, and anticipation
                                become essential, allowing otherwise static pieces to feel alive and intentional.
                            </p>
                        </motion.div>

                        <motion.div variants={fadeInUp}>
                            <div className="flex relative overflow-hidden bg-white/10 p-2 md:p-[1vw] rounded-lg">
                                <Image
                                    src="/projects/bluboyspin/principles.gif"
                                    alt="Principles of Animation"
                                    className="rounded-md pointer-events-none w-full h-auto"
                                    width={700}
                                    height={700}
                                />
                            </div>
                            <div className={`${roboto.className} text-white/40 text-center mt-2 italic text-sm md:text-base`}>
                                12 principles of animation - image credit: Chris Totten via Medium
                            </div>
                        </motion.div>

                        <motion.div variants={fadeInUp}>
                            <p className={`${roboto.className} text-white/80 text-base md:text-xl lg:text-2xl font-light leading-relaxed`}>
                                Breathing life into the paintings was the most fun part of this process.
                                Organization and placement were two very important factors in getting everything into a position that both felt and looked incredible.
                            </p>
                        </motion.div>
                    </AnimatedSection>

                    <AnimatedSection className="flex flex-col gap-8 md:gap-12">
                        <motion.div variants={fadeInUp}>
                            <h2 className={`${pixelify.className} text-white text-2xl md:text-3xl lg:text-4xl mb-6`}>
                                where it lands.
                            </h2>
                            <p className={`${roboto.className} text-white/80 text-base md:text-xl lg:text-2xl font-light leading-relaxed`}>
                                {`The final piece reads less like an advertisement and more like a visual gesture.
                                Without an ironed-out brief to work from, this entire project was produced through responsiveness and paying close attention to the client's needs.
                                The result was a piece that supports their message without diluting their voice.`}
                            </p>
                        </motion.div>

                        <motion.div variants={fadeInUp}>
                            <div className="flex relative overflow-hidden bg-white/10 p-2 md:p-[1vw] rounded-lg">
                                <video
                                    className="aspect-video w-full z-50 rounded-md"
                                    src="/projects/bluboyspin/printsvid.mp4"
                                    controls
                                />
                            </div>
                            <div className={`${roboto.className} text-white/40 text-center mt-2 italic text-sm md:text-base`}>
                                final rendered animation.
                            </div>
                        </motion.div>

                        <motion.div variants={fadeInUp} className="mt-8">
                            <ProjectSummary
                                items={[
                                    { label: "Client", value: "Bluboy" },
                                    { label: "Deliverable", value: "Commercial" },
                                    { label: "Medium", value: "3D Animation" },
                                    { label: "Focus", value: "Product Launch" }
                                ]}
                            />
                        </motion.div>
                    </AnimatedSection>
                </div>
            </section>
        </main>
    )
}

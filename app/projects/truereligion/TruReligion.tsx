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

export default function TruReligion() {
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
                            {`true religion x "bluboy" product launch.`}
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className={`${roboto.className} text-white/80 font-light text-lg md:text-xl lg:text-2xl md:max-w-2xl leading-relaxed`}
                        >
                            {`A 3D animated commercial developed entirely by me made to promote the collaborative
                            clothing drop between True Religion Brand Jeans and clothing designer "Bluboy."`}
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
                                        src="/projects/truereligion/truvideo.mp4"
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
                                premise.
                            </h2>
                            <p className={`${roboto.className} text-white/80 text-base md:text-xl lg:text-2xl font-light leading-relaxed`}>
                                {`The intention here was not to make a traditional "product launch" advertisement,
                                but to frame the moment as a part of Bluboy's visual narrative, while still carrying the weight and class expected of such a well-known brand.
                                This meant treating the collaboration less as strictly a campaign asset, and more as a shared world-building experience.`}
                            </p>
                        </motion.div>

                        <motion.div variants={fadeInUp}>
                            <DragScroll className="flex gap-3 md:gap-[1vw] relative w-full bg-white/10 p-3 md:p-[1vw] rounded-lg">
                                <Image
                                    src="/projects/truereligion/outfit1.avif"
                                    alt="Collaboration Release Outfittings"
                                    className="rounded-md pointer-events-none object-cover h-64 md:h-80 w-auto"
                                    width={300}
                                    height={900}
                                />
                                <Image
                                    src="/projects/truereligion/outfit2.avif"
                                    alt="Collaboration Release Outfittings"
                                    className="rounded-md pointer-events-none object-cover h-64 md:h-80 w-auto"
                                    width={300}
                                    height={900}
                                />
                                <Image
                                    src="/projects/truereligion/outfit3.webp"
                                    alt="Collaboration Release Outfittings"
                                    className="rounded-md pointer-events-none object-cover h-64 md:h-80 w-auto"
                                    width={300}
                                    height={900}
                                />
                            </DragScroll>
                            <div className={`${roboto.className} text-white/40 text-center mt-2 italic text-sm md:text-base`}>
                                outfittings released as part of collaboration - image credit: WNTD Apparel
                            </div>
                        </motion.div>
                    </AnimatedSection>

                    <AnimatedSection className="flex flex-col gap-8 md:gap-12">
                        <motion.div variants={fadeInUp}>
                            <h2 className={`${pixelify.className} text-white text-2xl md:text-3xl lg:text-4xl mb-6`}>
                                respect the audience.
                            </h2>
                            <p className={`${roboto.className} text-white/80 text-base md:text-xl lg:text-2xl font-light leading-relaxed`}>
                                {`To represent a collaboration between two notably different visual entities,
                                this video needed to find a way to resonate with two audience groups at the same time. Bluboy's audience is used to whimsical, character-driven visuals.
                                The True Religion consumer base however expects familiarity, branding clarity, and to know exactly what's being presented to them.`}
                            </p>
                        </motion.div>

                        <motion.div variants={fadeInUp}>
                            <DragScroll className="flex gap-3 md:gap-[1vw] relative w-full bg-white/10 p-3 md:p-[1vw] rounded-lg">
                                <Image
                                    src="/projects/truereligion/ex1.jpg"
                                    alt="Bluboy Example Art Direction Image"
                                    className="rounded-md pointer-events-none h-48 md:h-64 w-auto"
                                    width={400}
                                    height={400}
                                />
                                <Image
                                    src="/projects/truereligion/ex2.jpg"
                                    alt="Bluboy Example Art Direction Image"
                                    className="rounded-md pointer-events-none h-48 md:h-64 w-auto"
                                    width={400}
                                    height={400}
                                />
                                <Image
                                    src="/projects/truereligion/ex3.jpg"
                                    alt="Bluboy Example Art Direction Image"
                                    className="rounded-md pointer-events-none h-48 md:h-64 w-auto"
                                    width={400}
                                    height={400}
                                />
                            </DragScroll>
                            <div className={`${roboto.className} text-white/40 text-center mt-2 italic text-sm md:text-base`}>
                                branding aesthetic reference - image credit: @bluboy on Instagram
                            </div>
                        </motion.div>

                        <motion.div variants={fadeInUp}>
                            <p className={`${roboto.className} text-white/80 text-base md:text-xl lg:text-2xl font-light leading-relaxed`}>
                                {`The video's pacing lives comfortably between those two ideas.
                                Laying out a compelling narrative was important, but it was imperative to avoid mystifying the objective in the process.
                                Clear branding is established early into the sequence, and the focus softly transitions from the antics of our hero character,
                                to the garments that make up this collaborative partnership.`}
                            </p>
                        </motion.div>
                    </AnimatedSection>

                    <AnimatedSection className="flex flex-col gap-8 md:gap-12">
                        <motion.div variants={fadeInUp}>
                            <h2 className={`${pixelify.className} text-white text-2xl md:text-3xl lg:text-4xl mb-6`}>
                                our hero.
                            </h2>
                            <p className={`${roboto.className} text-white/80 text-base md:text-xl lg:text-2xl font-light leading-relaxed`}>
                                {`The star of our video is none other than Bluboy himself.
                                Making him the focal point was crucial to selling the nature of the collaboration, so in that effort a 3D model of Bluboy was developed for the project.
                                The character was designed to be recognizable without chasing realism, breaking down the complex details of Bluboy's aesthetic into an iconic silhouette.`}
                            </p>
                        </motion.div>

                        <motion.div variants={fadeInUp}>
                            <DragScroll className="flex gap-3 md:gap-[1vw] relative w-full bg-white/10 p-3 md:p-[1vw] rounded-lg">
                                <Image
                                    src="/projects/truereligion/M1.png"
                                    alt="Bluboy Character Front-Facing"
                                    className="rounded-md pointer-events-none h-48 md:h-64 w-auto"
                                    width={600}
                                    height={300}
                                />
                                <Image
                                    src="/projects/truereligion/M2.png"
                                    alt="Bluboy Character Side-Facing"
                                    className="rounded-md pointer-events-none h-48 md:h-64 w-auto"
                                    width={600}
                                    height={300}
                                />
                                <Image
                                    src="/projects/truereligion/M3.png"
                                    alt="Bluboy Character Back-Facing"
                                    className="rounded-md pointer-events-none h-48 md:h-64 w-auto"
                                    width={600}
                                    height={300}
                                />
                            </DragScroll>
                            <div className={`${roboto.className} text-white/40 text-center mt-2 italic text-sm md:text-base`}>
                                {`original "bluboy" character render shots.`}
                            </div>
                        </motion.div>

                        <motion.div variants={fadeInUp}>
                            <p className={`${roboto.className} text-white/80 text-base md:text-xl lg:text-2xl font-light leading-relaxed`}>
                                This also allows us to show off the clothing through the natural antics of the character
                                himself, rather than spinning dioramas or basic product renders. Not only does this sell the collaboration at an engaging level,
                                but it also allows the watcher to focus on wearability rather than display.
                            </p>
                        </motion.div>

                        <motion.div variants={fadeInUp}>
                            <DragScroll className="flex gap-3 md:gap-[1vw] relative w-full bg-white/10 p-3 md:p-[1vw] rounded-lg">
                                <Image src="/projects/truereligion/1.0.png" alt="Product Shot 1" className="rounded-md pointer-events-none h-48 md:h-64 w-auto" width={700} height={700} />
                                <Image src="/projects/truereligion/1.5.png" alt="Product Shot 2" className="rounded-md pointer-events-none h-48 md:h-64 w-auto" width={700} height={700} />
                                <Image src="/projects/truereligion/1.3.png" alt="Product Shot 3" className="rounded-md pointer-events-none h-48 md:h-64 w-auto" width={700} height={700} />
                                <Image src="/projects/truereligion/1.4.png" alt="Product Shot 4" className="rounded-md pointer-events-none h-48 md:h-64 w-auto" width={700} height={700} />
                                <Image src="/projects/truereligion/1.1.png" alt="Product Shot 5" className="rounded-md pointer-events-none h-48 md:h-64 w-auto" width={700} height={700} />
                            </DragScroll>
                            <div className={`${roboto.className} text-white/40 text-center mt-2 italic text-sm md:text-base`}>
                                in-scene product shot direction.
                            </div>
                        </motion.div>
                    </AnimatedSection>

                    <AnimatedSection className="flex flex-col gap-8 md:gap-12">
                        <motion.div variants={fadeInUp}>
                            <h2 className={`${pixelify.className} text-white text-2xl md:text-3xl lg:text-4xl mb-6`}>
                                refinement.
                            </h2>
                            <p className={`${roboto.className} text-white/80 text-base md:text-xl lg:text-2xl font-light leading-relaxed`}>
                                This project was completed on a very tight one-month turnaround with constant
                                direct feedback from Bluboy and the True Religion team. Revisions had to be done quickly, and once a base was established we were able to focus on
                                multiple layers of refinement to dial in on our key directives; clarity and engagement. Juggling an abstract vision alongside a tight deadline proved
                                to be a daunting challenge, but keeping those two goals at the forefront of the design guided the process to a result that balanced narrative ambition
                                with clear, effective communication.
                            </p>
                        </motion.div>

                        <motion.div variants={fadeInUp}>
                            <div className="flex relative overflow-hidden bg-white/10 p-2 md:p-[1vw] rounded-lg">
                                <video
                                    className="aspect-video w-full z-50 rounded-md"
                                    src="/projects/truereligion/truvideo.mp4"
                                    controls
                                />
                            </div>
                            <div className={`${roboto.className} text-white/40 text-center mt-2 italic text-sm md:text-base`}>
                                final rendered animation.
                            </div>
                        </motion.div>

                        <motion.div variants={fadeInUp}>
                            <p className={`${roboto.className} text-white/80 text-base md:text-xl lg:text-2xl font-light leading-relaxed`}>
                                The video was very well received, generating thousands
                                of likes across all accounts and notably positive viewer feedback. For me, this project was a learning process in how to carry a
                                {` client's vision alongside my own, and present it in a way that felt natural rather than manufactured.`}
                            </p>
                        </motion.div>

                        <motion.div variants={fadeInUp} className="mt-8">
                            <ProjectSummary
                                items={[
                                    { label: "Client", value: "True Religion" },
                                    { label: "Deliverable", value: "3D Animation" },
                                    { label: "Timeline", value: "1 Month" },
                                    { label: "Focus", value: "Brand Collaboration" }
                                ]}
                            />
                        </motion.div>
                    </AnimatedSection>
                </div>
            </section>
        </main>
    )
}

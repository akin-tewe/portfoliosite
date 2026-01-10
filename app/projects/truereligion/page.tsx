"use client";
import { pixelify, roboto } from "@/app/ui/fonts"
import MagneticButton from "@/components/MagneticButton";
import { useState } from "react";
import { Video,ChevronDown } from "lucide-react";
import Image from "next/image";
import DragScroll from "@/components/DragScroll";


export default function Project() {

    const [open, setOpen] = useState(false);

    return (
        <main>
            <div className="fixed inset-0 flex h-full w-full gap-[1vw] text-white/10 justify-center">
                <div className="border-2 w-[15vw] md:w-[12.1vw]"></div>
                <div className="border-2 w-[15vw] md:w-[12.1vw]"></div>
                <div className="border-2 w-[15vw] md:w-[12.1vw]"></div>
                <div className="border-2 w-[15vw] md:w-[12.1vw]"></div>
                <div className="border-2 w-[15vw] md:w-[12.1vw]"></div>
                <div className="border-2 w-[15vw] md:w-[12.1vw]"></div>
            </div>
            <section id="splash" className="w-full h-[100vh] md:justify-start md:h-[50vh] grid place-items-center md:px-[5vw]">
                <div className="flex flex-row md:gap-20 mt-auto md:mb-30 mr-[8vw] mb-[8vh] md:ml-0 w-full px-[10vw]">
                    <div className="relative flex flex-col gap-10">
                        <h1 className={`${pixelify.className} max-w-3xs md:max-w-2xl text-4xl md:text-5xl text-white pl-3 md:pl-0`}>true religion x “bluboy” product launch.</h1>
                        <p className={`${roboto.className} hidden md:block text-white font-light text-xl md:text-2xl md:max-w-2xl leading-relaxed`}>A 3D animated commercial developed entirely by me made to promote the collaborative
                             clothing drop between True Religion Brand Jeans and clothing designer “Bluboy.”
                        </p>
                    </div>
                    <div className={`${pixelify.className} text-xl flex flex-col gap-15 text-l mt-auto justify-center ml-auto md:ml-0`}>
                        <button
                        className="flex justify-center items-center w-auto h-auto z-10"
                        onClick={()=> document.getElementById('body')?.scrollIntoView({ behavior: 'smooth' })}
                        >
                            <MagneticButton icon={<ChevronDown className="md:hidden text-white z-50"/>} parameter="w-15 h-15 md:w-40 md:h-15 bg-blue-600/50 md:bg-blue-500/0 hover:bg-blue-600/50 z-20" text="Read More"/>
                        </button>
                        <>
                            <button
                                className="flex justify-center items-center w-auto h-auto z-10"
                                onClick={()=> setOpen(true)}
                            >
                                <MagneticButton icon={<Video className="md:hidden text-white z-50"/>} parameter="w-15 h-15 md:w-50 md:h-15 bg-blue-600/50 md:bg-blue-500/0 hover:bg-blue-600/50 z-20" text="Watch Video"/>
                            </button>

                            {open && (
                                <div
                                    className="fixed inset-0 z-40 flex items-center justify-center bg-black/70 p-4"
                                    onClick={()=> setOpen(false)}
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
                        </>
                    </div>
                </div>
            </section>
            < section className="h-[150px] md:h-[2vh]">
            </section>
            <section id="body" className="pb-20 md:pb-50 px-5 md:px-[11vw]">
                <div className="flex flex-col gap-10 max-w-xs md:max-w-2xl">
                    <div>
                        <h1 className={`${pixelify.className} text-white text-3xl mt-10`}>premise.</h1>
                        <p className={`${roboto.className} mt-10 text-white text-xl md:text-2xl font-light leading-relaxed`}> The intention here was not to make a traditional “product launch” advertisement,
                             but to frame the moment as a part of Bluboy’s visual narrative, while still carrying the weight and class expected of such a well-known brand.
                              This meant treating the collaboration less as strictly a campaign asset, and more as a shared world-building experience. </p>
                        <DragScroll className="flex gap-[1vw] mt-10 relative w-[90vw] md:w-[51vw] bg-white/20 p-[1vw] rounded-sm">
                            <Image
                            src="/projects/truereligion/outfit1.avif"
                            alt="Collaboration Release Outfittings"
                            className="rounded-sm pointer-events none object-cover"
                            width={300}
                            height={900}
                            />
                            <Image
                            src="/projects/truereligion/outfit2.avif"
                            alt="Collaboration Release Outfittings"
                            className="rounded-sm pointer-events none object-cover"
                            width={300}
                            height={900}
                            />
                            <Image
                            src="/projects/truereligion/outfit3.webp"
                            alt="Collaboration Release Outfittings"
                            className="rounded-sm pointer-events none object-cover"
                            width={300}
                            height={900}
                            />
                        </DragScroll>
                        <div className={` ${roboto.className} text-white/40 justify-self-center text-center mt-[0.5vw] italic`}>outfittings released as part of collaboration - image credit: WNTD Apparel</div>
                    </div>
                    <div>
                        <h1 className={`${pixelify.className} text-white text-3xl`}>respect the audience.</h1>
                        <p className={`${roboto.className} mt-10 text-white text-xl md:text-2xl font-light leading-relaxed`}>To represent a collaboration between two notably different visual entities,
                             this video needed to find a way to resonate with two audience groups at the same time. Bluboy’s audience is used to whimsical, character-driven visuals.
                              The True Religion consumer base however expects familiarity, branding clarity, and to know exactly what’s being presented to them.</p>
                        <DragScroll className="flex gap-[1vw] mt-10 relative w-[90vw] md:w-[51vw] bg-white/20 p-[1vw] rounded-sm">
                            <Image
                            src="/projects/truereligion/ex1.jpg"
                            alt="Bluboy Example Art Direction Image"
                            className="rounded-sm pointer-events none"
                            width={400}
                            height={400}
                            />
                            <Image
                            src="/projects/truereligion/ex2.jpg"
                            alt="Bluboy Example Art Direction Image"
                            className="rounded-sm pointer-events none"
                            width={400}
                            height={400}
                            />
                            <Image
                            src="/projects/truereligion/ex3.jpg"
                            alt="Bluboy Example Art Direction Image"
                            className="rounded-sm pointer-events none"
                            width={400}
                            height={400}
                            />
                        </DragScroll>
                        <div className={` ${roboto.className} text-white/40 justify-self-center text-center mt-[0.5vw] italic`}>branding aesthetic reference - image credit: @bluboy on Instagram</div>
                        <p className={`${roboto.className} mt-10 text-white text-xl md:text-2xl font-light leading-relaxed`}>The video’s pacing lives comfortably between those two ideas.
                             Laying out a compelling narrative was important, but it was imperative to avoid mystifying the objective in the process.
                              Clear branding is established early into the sequence, and the focus softly transitions from the antics of our hero character,
                               to the garments that make up this collaborative partnership. </p>
                    </div>
                    <div>
                        <h1 className={`${pixelify.className} text-white text-3xl`}>our hero.</h1>
                        <p className={`${roboto.className} mt-10 text-white text-xl md:text-2xl font-light leading-relaxed`}>The star of our video is none other than Bluboy himself.
                            Making him the focal point was crucial to selling the nature of the collaboration, so in that effort a 3D model of Bluboy was developed for the project.
                            The character was designed to be recognizable without chasing realism, breaking down the complex details of Bluboy’s aesthetic into an iconic silhouette.</p>
                        <DragScroll className="flex gap-[1vw] mt-10 relative w-[90vw] md:w-[51vw] bg-white/20 p-[1vw] rounded-sm">
                            <Image
                            src="/projects/truereligion/M1.png"
                            alt="Bluboy Character Front-Facing"
                            className="rounded-sm pointer-events none"
                            width={600}
                            height={300}
                            />
                            <Image
                            src="/projects/truereligion/M2.png"
                            alt="Bluboy Character Side-Facing"
                            className="rounded-sm pointer-events none"
                            width={600}
                            height={300}
                            />
                            <Image
                            src="/projects/truereligion/M3.png"
                            alt="Bluboy Character Back-Facing"
                            className="rounded-sm pointer-events none"
                            width={600}
                            height={300}
                            />
                        </DragScroll>
                        <div className={` ${roboto.className} text-white/40 justify-self-center text-center mt-[0.5vw] italic`}>original "bluboy" character render shots.</div>
                        <p className={`${roboto.className} mt-10 text-white text-xl md:text-2xl font-light leading-relaxed`}>This also allows us to show off the clothing through the natural antics of the character
                            himself, rather than spinning dioramas or basic product renders. Not only does this sell the collaboration at an engaging level,
                            but it also allows the watcher to focus on wearability rather than display.</p>
                        <DragScroll className="flex gap-[1vw] mt-10 relative w-[90vw] md:w-[51vw] bg-white/20 p-[1vw] rounded-sm">
                            <Image
                            src="/projects/truereligion/1.0.png"
                            alt="Product Shot 1"
                            className="rounded-sm pointer-events none"
                            width={700}
                            height={700}
                            />
                            <Image
                            src="/projects/truereligion/1.5.png"
                            alt="Product Shot 2"
                            className="rounded-sm pointer-events none"
                            width={700}
                            height={700}
                            />
                            <Image
                            src="/projects/truereligion/1.3.png"
                            alt="Product Shot 3"
                            className="rounded-sm pointer-events none"
                            width={700}
                            height={700}
                            />
                            <Image
                            src="/projects/truereligion/1.4.png"
                            alt="Product Shot 4"
                            className="rounded-sm pointer-events none"
                            width={700}
                            height={700}
                            />
                            <Image
                            src="/projects/truereligion/1.1.png"
                            alt="Product Shot 5"
                            className="rounded-sm pointer-events none"
                            width={700}
                            height={700}
                            />
                        </DragScroll>
                        <div className={` ${roboto.className} text-white/40 justify-self-center text-center mt-[0.5vw] italic`}>in-scene product shot direction.</div>
                    </div>
                    <div>
                        <h1 className={`${pixelify.className} text-white text-3xl`}>refinement.</h1>
                        <p className={`${roboto.className} mt-10 text-white text-xl md:text-2xl font-light leading-relaxed`}>This project was completed on a very tight one-month turnaround with constant
                            direct feedback from Bluboy and the True Religion team. Revisions had to be done quickly, and once a base was established we were able to focus on
                            multiple layers of refinement to dial in on our key directives; clarity and engagement. Juggling an abstract vision alongside a tight deadline proved
                            to be a daunting challenge, but keeping those two goals at the forefront of the design guided the process to a result that balanced narrative ambition
                            with clear, effective communication.</p>
                        <div className="flex mt-10 relative overflow-hidden bg-white/20 p-[1vw] rounded-sm">
                            <video
                                className="aspect-video w-full z-50"
                                src="/projects/truereligion/truvideo.mp4"
                                controls
                            />
                        </div>
                        <div className={` ${roboto.className} text-white/40 justify-self-center text-center mt-[0.5vw] italic`}>final rendered animation.</div>
                        <p className={`${roboto.className} mt-10 text-white text-xl md:text-2xl font-light leading-relaxed`}>The video was very well received, generating thousands
                            of likes across all accounts and notably positive viewer feedback. For me, this project was a learning process in how to carry a
                            client’s vision alongside my own, and present it in a way that felt natural rather than manufactured.</p>
                    </div>
                </div>
            </section>
        </main>
    )
}
"use client";
import { pixelify, roboto } from "@/app/ui/fonts"
import MagneticButton from "@/components/MagneticButton";
import { useState } from "react";
import { Video,ChevronDown } from "lucide-react";
import Image from "next/image";

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
            <section id="splash" className="w-full h-[80vh] md:justify-start md:h-[50vh] grid place-items-center md:px-[5vw]">
                <div className="flex flex-row md:gap-20 mt-auto md:mb-30 mr-[8vw] mb-[8vh] md:ml-0 w-full px-[10vw]">
                    <div className="relative flex flex-col gap-10">
                        <h1 className={`${pixelify.className} max-w-3xs md:max-w-2xl text-4xl md:text-5xl text-white pl-3 md:pl-0`}>stream intro animation for “yourrage”</h1>
                        <p className={`${roboto.className} hidden md:block text-white font-light text-2xl md:max-w-2xl leading-relaxed`}>streamer animation created for “YourRage”, a well known streamer on twitch.tv.
                        </p>
                    </div>
                    <div className={`${pixelify.className} text-xl flex flex-col items-center gap-15 text-l mt-auto justify-center ml-auto md:ml-0`}>
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
                                            src="/projects/yourrage/ragelowq.mp4"
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
                        <h1 className={`${pixelify.className} text-white text-3xl mt-10`}>scope and audience.</h1>
                        <p className={`${roboto.className} mt-10 text-white text-2xl font-light leading-relaxed`}>I had actually reached out to YourRage personally for this opportunity,
                            being a fan of his content and wanting to make something I felt could leave my mark with his community. Not only did I need to do an amazing
                            job, I needed to prove value―to him and his community.”</p>
                        <div className="flex gap-[2vw] mt-10 mb-10 relative">
                            <Image
                            src="/projects/yourrage/character.jpg"
                            alt="Character Sheet"
                            className="rounded-sm"
                            width={700}
                            height={700}
                            />
                        </div>
                        <p className={`${roboto.className} mt-10 text-white text-2xl font-light leading-relaxed`}>His chat (another term for a streamer’s community) is fast and hyper-aware.
                            They exist through pivotal moments and inside-jokes. As someone on the inside, I was able to leverage this to set the theme for the piece. A robotic
                            scene and mechanical legs reference a background in knee surgery he constantly jokes about on his stream. We capture Rage as an event in motion, shown
                            through themes of pursuit, confrontation and release.</p>
                    </div>
                    <div>
                        <h1 className={`${pixelify.className} text-white text-3xl`}>reception.</h1>
                        <p className={`${roboto.className} mt-10 text-white text-2xl font-light leading-relaxed`}>Twitch is a platform molded by timing, not explanation.
                            The job was to meet the audience where they were, speak their language, and leave them ready for more. During this animation’s
                            lifetime, it was incredible seeing the community (and Rage’s) initial reaction, and constantly getting to live in that moment with them.</p>
                    </div>
                </div>
            </section>
        </main>
    )
}
"use client";
import { pixelify, roboto } from "@/app/ui/fonts"
import TransparentVideo from "@/components/SplashVideo"
import MagneticButton from "@/components/MagneticButton";
import { useState } from "react";

export default function Project() {

    const [open, setOpen] = useState(false);

    return (
        <main>
            <section id="splash" className="w-full h-[100svh] grid place-items-center pt-80 pr-50 pl-50">
                <div className="grid grid-cols-2">
                    <div className="relative flex flex-col gap-10">
                        <h1 className={`${pixelify.className} text-white text-6xl`}>stream introduction animation for “yourrage”</h1>
                        <p className={`${roboto.className} text-white font-light text-xl max-w-[900px]`}>streamer animation created for “YourRage”, a well known streamer on twitch.tv.
                            This animation was played at the start of each stream as a “lead in” before he ultimately enters the frame.
                            The goal wasn’t to introduce who he was―his audience is already there for him. We just needed to set the temperature of the room.
                        </p>
                    </div>
                </div>
                <div className={`${pixelify.className} text-xl flex gap-20 text-l items-center mt-[-90] justify-self-center`}>
                    <button
                    className="flex justify-center items-center w-[200px] h-[50px] z-10"
                    onClick={()=> document.getElementById('body')?.scrollIntoView({ behavior: 'smooth' })}
                    >
                        <MagneticButton parameter="w-40 h-15 hover:bg-blue-600/50 z-20" text="Read More"/>
                    </button>
                    <>
                        <button
                            className="flex justify-center items-center w-[200px] h-[50px] z-10"
                            onClick={()=> setOpen(true)}
                        >
                            <MagneticButton parameter="w-50 h-15 hover:bg-blue-600/50 z-20" text="Watch Video"/>
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
                                        src="/projects/3dresearch/mocassinscomp.mp4"
                                        controls
                                        autoPlay
                                    />
                                </div>
                            </div>
                        )}
                    </>
                </div>
            </section>
            < section className="h-[150px]">
            </section>
            <section id="body" className="grid grid-cols-2 pb-50 px-50">
                <div className="flex flex-col gap-10">
                    <div>
                        <h1 className={`${pixelify.className} text-white text-3xl mt-10`}>scope and audience.</h1>
                        <p className={`${roboto.className} mt-10 text-white text-xl font-light`}>I had actually reached out to YourRage personally for this opportunity,
                            being a fan of his content and wanting to make something I felt could leave my mark with his community. Not only did I need to do an amazing
                            job, I needed to prove value―to him and his community.”</p>
                        <p className={`${roboto.className} mt-10 text-white text-xl font-light`}>His chat (another term for a streamer’s community) is fast and hyper-aware.
                            They exist through pivotal moments and inside-jokes. As someone on the inside, I was able to leverage this to set the theme for the piece. A robotic
                            scene and mechanical legs reference a background in knee surgery he constantly jokes about on his stream. We capture Rage as an event in motion, shown
                            through themes of pursuit, confrontation and release.</p>
                    </div>
                    <div>
                        <h1 className={`${pixelify.className} text-white text-3xl`}>reception.</h1>
                        <p className={`${roboto.className} mt-10 text-white text-xl font-light`}>Twitch is a platform molded by timing, not explanation.
                            The job was to meet the audience where they were, speak their language, and leave them ready for more. During this animation’s
                            lifetime, it was incredible seeing the community (and Rage’s) initial reaction, and constantly getting to live in that moment with them.</p>
                    </div>
                </div>
            </section>
        </main>
    )
}
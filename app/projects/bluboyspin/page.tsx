"use client";
import { pixelify, roboto } from "@/app/ui/fonts"
import TransparentVideo from "@/components/SplashVideo"
import MagneticButton from "@/components/MagneticButton";
import { useState } from "react";
import { Video,ChevronDown } from "lucide-react";

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
                        <h1 className={`${pixelify.className} max-w-3xs md:max-w-2xl text-4xl md:text-5xl text-white pl-3 md:pl-0`}>print launch video for “bluboy”</h1>
                        <p className={`${roboto.className} hidden md:block text-white font-light text-2xl md:max-w-2xl`}>A short-form commercial created to introduce the release of fashion designer
                             “Bluboy’s” art prints.
                        </p>
                    </div>
                    <div className={`${pixelify.className} text-xl flex-col items-center flex gap-15 text-l mt-auto justify-center ml-auto md:ml-0`}>
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
                                            src="/projects/bluboyspin/printsvid.mp4"
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
                        <h1 className={`${pixelify.className} text-white text-3xl mt-10`}>assessment.</h1>
                        <p className={`${roboto.className} mt-10 text-white text-2xl font-light`}>Bluboy is an individual I’ve done a number of works for in the past.
                            As it had been a notable amount of time since our last project, this required re-engaging with his current audience and demographic. What
                            they’re looking for now is continuity. Not a throwback to the past or a character they haven’t seen in months, but something fresh that aligns
                            with his current image.</p>
                        <p className={`${roboto.className} mt-10 text-white text-2xl font-light`}>While character-driven imagery is a focal point of his overall narrative,
                            he wanted to reduce the prominence of it for this video, and let the pieces speak on their own. As these characters are still essential to his
                            branding, we moved them to a comfortable position in the background. They make their presence known without demanding your attention.</p>
                    </div>
                    <div>
                        <h1 className={`${pixelify.className} text-white text-3xl`}>speaking through motion.</h1>
                        <p className={`${roboto.className} mt-10 text-white text-2xl font-light`}>With the characters taking a backseat, the paintings had to absorb the magic.
                            To possess the paintings with some of that creative spirit, we had to hone back in on our animation principles. Timing, spacing, and anticipation
                            become essential, allowing otherwise static pieces to feel alive and intentional. </p>
                        <p className={`${roboto.className} mt-10 text-white text-2xl font-light`}>Breathing life into the paintings was the most fun part of this process.
                            Organization and placement were two very important factors in getting everything into a position that both felt and looked incredible.</p>
                    </div>
                    <div>
                        <h1 className={`${pixelify.className} text-white text-3xl`}>where it lands.</h1>
                        <p className={`${roboto.className} mt-10 text-white text-2xl font-light`}>The final piece reads less like an advertisement and more like a visual gesture.
                            Without an ironed-out brief to work from, this entire project was produced through responsiveness and paying close attention to the client’s needs.
                            The result was a piece that supports their message without diluting their voice.</p>
                    </div>
                </div>
            </section>
        </main>
    )
}
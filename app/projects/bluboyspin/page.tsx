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
                        <h1 className={`${pixelify.className} text-white text-7xl`}>print launch video for “bluboy”</h1>
                        <p className={`${roboto.className} text-white font-light text-xl max-w-[900px]`}>A short-form commercial created to introduce the release of fashion designer
                             “Bluboy’s” art prints. The direction emerged on short notice through a spontaneous conversation, looking for a creative but informative piece.
                              The task: turn an artist’s language into motion without reducing it to marketing.
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
                                        src="/projects/bluboyspin/printsvid.mp4"
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
                        <h1 className={`${pixelify.className} text-white text-3xl mt-10`}>assessment.</h1>
                        <p className={`${roboto.className} mt-10 text-white text-xl font-light`}>Bluboy is an individual I’ve done a number of works for in the past.
                            As it had been a notable amount of time since our last project, this required re-engaging with his current audience and demographic. What
                            they’re looking for now is continuity. Not a throwback to the past or a character they haven’t seen in months, but something fresh that aligns
                            with his current image.</p>
                        <p className={`${roboto.className} mt-10 text-white text-xl font-light`}>While character-driven imagery is a focal point of his overall narrative,
                            he wanted to reduce the prominence of it for this video, and let the pieces speak on their own. As these characters are still essential to his
                            branding, we moved them to a comfortable position in the background. They make their presence known without demanding your attention.</p>
                    </div>
                    <div>
                        <h1 className={`${pixelify.className} text-white text-3xl`}>speaking through motion.</h1>
                        <p className={`${roboto.className} mt-10 text-white text-xl font-light`}>With the characters taking a backseat, the paintings had to absorb the magic.
                            To possess the paintings with some of that creative spirit, we had to hone back in on our animation principles. Timing, spacing, and anticipation
                            become essential, allowing otherwise static pieces to feel alive and intentional. </p>
                        <p className={`${roboto.className} mt-10 text-white text-xl font-light`}>Breathing life into the paintings was the most fun part of this process.
                            Organization and placement were two very important factors in getting everything into a position that both felt and looked incredible.</p>
                    </div>
                    <div>
                        <h1 className={`${pixelify.className} text-white text-3xl`}>where it lands.</h1>
                        <p className={`${roboto.className} mt-10 text-white text-xl font-light`}>The final piece reads less like an advertisement and more like a visual gesture.
                            Without an ironed-out brief to work from, this entire project was produced through responsiveness and paying close attention to the client’s needs.
                            The result was a piece that supports their message without diluting their voice.</p>
                    </div>
                </div>
            </section>
        </main>
    )
}
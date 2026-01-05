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
                    <div className="relative flex flex-col gap-10 pt-20">
                        <h1 className={`${pixelify.className} text-white text-6xl`}>The Independent 3D Artist</h1>
                        <p className={`${roboto.className} text-white font-light text-xl max-w-[900px]`}>A qualitative UX Research study exploring the nature of creative work in an
                             online economy. Through a mixture of in-person and remote interviews, I observed the story behind an entire community of “underground” 3D artists,
                              and how they stamp their own identities in an industry defined by visibility, algorithmic pressure, instability.
                        </p>
                    </div>
                    <div className="relative absolute w-[700px] h-[700px] bottom-[300px] pl-20">
                    <TransparentVideo webmSrc="/3dprojectspinner.webm"/>
                    </div>
                </div>
                <div className={`${pixelify.className} text-xl flex gap-20 text-l items-center mt-[-350] justify-self-center`}>
                    <button
                    className="flex justify-center items-center w-[170px] h-[50px] z-10"
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
                                        src="/projects/3dresearch/mocpressed.mp4"
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
                        <h1 className={`${pixelify.className} text-white text-3xl mt-10`}>framing.</h1>
                        <p className={`${roboto.className} mt-10 text-white text-xl font`}>What does “freedom” actually look like for independent artists once it becomes their livelihood?</p>
                        <p className={`${roboto.className} mt-10 text-white text-xl font-light`}>This central question was the driving component for the entire study.
                            From this a number of secondary themes emerged; platform dependence, the emergence of AI, “impostor syndrome”, and sustainability.
                            This became a question of human need, framed through the lens of multiple talented individuals.</p>
                        <p className={`${roboto.className} mt-10 text-white text-xl font-light`}>To answer this, interview questions were designed to feel open.
                            Rather than leading participants to a presupposed narrative, these prompts focused on their lived experience, and allowed them to
                            showcase it in the way that properly represented them.</p>
                    </div>
                    <div>
                        <h1 className={`${pixelify.className} text-white text-3xl`}>methodology.</h1>
                        <p className={`${roboto.className} mt-10 text-white text-xl font-light`}>Two separate interview formats were conducted to capture the picture on both a micro and macro level:</p>
                        <p className={`${pixelify.className} mt-10 text-white text-xl font-light`}>- focused, in-person interview</p>
                            <p className={`${roboto.className} mt-10 text-white text-xl font-light pl-10`}>An extensive observational interview with visual artist “Oseanworld.”
                            Focuses on his journey into 3D art, motivations, and daily routine. This soft, more intimate presentation leads the video off with a feeling of comfort.</p>
                        <p className={`${pixelify.className} mt-10 text-white text-xl font-light`}>- remote interview panel</p>
                            <p className={`${roboto.className} mt-10 text-white text-xl font-light pl-10`}>A series of video calls with independent artists encompassing a broad range of
                            backgrounds and niches. These conversations focused on their shared experience as independent artists. Financial stability, expectations, platform usability,
                            and the overall broader state of the social media landscape</p>
                    </div>
                    <div>
                        <h1 className={`${pixelify.className} text-white text-3xl`}>interpreting human needs.</h1>
                        <p className={`${roboto.className} mt-10 text-white text-xl font-light`}>Across both formats, several consistent themes emerged:</p>
                        <p className={`${pixelify.className} mt-10 text-white text-xl font-light`}>- freedom vs. stability</p>
                            <p className={`${roboto.className} mt-10 text-white text-xl font-light pl-10`}>Artists describe the freedom provided through freelance as liberating,
                            but acknowledge unpredictability and instability of financial status.</p>
                        <p className={`${pixelify.className} mt-10 text-white text-xl font-light`}>- self-doubt vs. output</p>
                            <p className={`${roboto.className} mt-10 text-white text-xl font-light pl-10`}>Impostor syndrome was a big theme throughout the interviews.
                            Posting content makes you feel inferior, but that inferiority is only subsided through validation of that same content. It’s a toxic cycle
                            that these artists perpetually exist under</p>
                        <p className={`${pixelify.className} mt-10 text-white text-xl font-light`}>- technology: not an enemy or saviour</p>
                            <p className={`${roboto.className} mt-10 text-white text-xl font-light pl-10`}>While Blender (a 3D creation software) is celebrated for its
                            capability and accessibility, tools like A.I. are seen as emotionally empty. Because of this, A.I. is not seen as a large threat, and has
                            the potential to also be reformed into a tool to strengthen capability.</p>
                        <p className={`${roboto.className} mt-10 text-white text-xl font-light`}>Statements constantly juxtapose each other.
                            Later comments contradict earlier claims. The emotional investment these artists put into their career becomes clear through their response.
                            To better materialize these findings we can observe them using Maslow’s hierarchy of needs, interpreted through the lens of creative labor.</p>
                        <p className={`${roboto.className} mt-10 text-white text-xl font-light`}>This framework helps to contextualize responses without reducing them to generalizations.</p>
                    </div>
                    <div>
                        <h1 className={`${pixelify.className} text-white text-3xl`}>why does it matter?</h1>

                        <p className={`${roboto.className} mt-10 text-white text-xl font-light`}>This study is an anchor in human continuity.
                        The people behind the output and the platform. Although delivered as a documentary, it fundamentally highlights understanding users within a system.
                        To that effect, it demonstrates:</p>
                        <p className={`${roboto.className} mt-10 text-white text-xl font-light pl-10`}>- Qualitative research planning</p>
                        <p className={`${roboto.className} mt-10 text-white text-xl font-light pl-10`}>- Interview design</p>
                        <p className={`${roboto.className} mt-10 text-white text-xl font-light pl-10`}>- Organization and utilization of large, unstructured data</p>
                        <p className={`${roboto.className} mt-10 text-white text-xl font-light pl-10`}>- Translation of research into a coherent narrative</p>

                        <p className={`${roboto.className} mt-10 text-white text-xl font-light`}>It didn’t aim to “solve a problem”, because their lives are not problems to be solved.
                            Rather than resolving the tension of an independent artist, it gives it space to exist honestly.</p>
                    </div>
                </div>
            </section>
        </main>
    )
}
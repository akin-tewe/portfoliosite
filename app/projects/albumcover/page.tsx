"use client";
import { pixelify, roboto } from "@/app/ui/fonts"
import TransparentVideo from "@/components/SplashVideo"
import MagneticButton from "@/components/MagneticButton";
import { useState } from "react";

export default function Project() {

    const [open, setOpen] = useState(false);

    return (
        <main>
            <section id="splash" className="w-full h-[83vh] md:justify-start justify-center md:min-h-[95svh] grid place-items-center md:px-[5vw]">
                <div className="flex flex-col md:flex-row gap-20 mt-auto mb-15 md:mb-30 mr-auto">
                    <div className="relative flex flex-col gap-10">
                        <h1 className={`${pixelify.className} max-w-sm md:max-w-5xl text-4xl md:text-5xl text-white pl-3 md:pl-0`}>“peaches and eggplants (remix)” cover art design</h1>
                        <p className={`${roboto.className} hidden md:block text-white font-light text-2xl max-w-3xl`}>As star artists “Latto” and “Sexyy Red” were brought on to the remix of Young Nudy’s
                             hit song “Peaches and Eggplants”, I was commissioned by Nudy’s team to reinterpret the original cover to represent the new artists.
                        </p>
                    </div>
                <div className={`${pixelify.className} text-xl flex flex-col items-center md:flex-row gap-20 text-l mt-auto justify-center`}>
                    <button
                    className="flex justify-center items-center w-[200px] h-[50px] z-10"
                    onClick={()=> document.getElementById('body')?.scrollIntoView({ behavior: 'smooth' })}
                    >
                        <MagneticButton parameter="w-40 h-15 bg-blue-600/50 md:bg-blue-500 hover:bg-blue-600/50 z-20" text="Read More"/>
                    </button>
                </div>
                </div>
            </section>
            < section className="h-[150px]">
            </section>
            <section id="body" className="grid pb-20 md:pb-50 px-5 max-w-xs md:max-w-2xl md:ml-[10vw]">
                <div className="flex flex-col gap-10">
                    <div>
                        <h1 className={`${pixelify.className} text-white text-3xl mt-10`}>context.</h1>
                        <p className={`${roboto.className} mt-10 text-white text-2xl font-light`}>One single day. 6 hours if we’re being literal.
                            This was all the time provided to make this happen, something not unusual to the music industry but entirely unusual
                            to my regular method. I had to rethink how I design entirely. Instead of broad stylistic changes and innovation, the
                            focus was on precise, high impact additions that respectfully leave their mark.</p>
                        <p className={`${roboto.className} mt-10 text-white text-2xl font-light`}>The original cover was a still-life composition built
                            around indulgence: food, money, guns, and overt luxury engaged around a central snake serving as Nudy’s motif. Safe to say
                            it would not be a light challenge introducing new elements onto an already cluttered scene.</p>
                    </div>
                    <div>
                        <h1 className={`${pixelify.className} text-white text-3xl`}>iteration and integration.</h1>
                        <p className={`${roboto.className} mt-10 text-white text-2xl font-light`}>After deciding what made sense to remove, we had to figure out what made sense to include.
                            To signify the presence of the two new artists, their chains were recreated to serve as the central motif of the new piece. Additional signifiers such as
                            cherries were also added to shift the tone of the image.</p>
                        <p className={`${roboto.className} mt-10 text-white text-2xl font-light`}>Scale and placement were the two factors that provided the most friction.
                            Everything needed to be set perfectly. Nearly a dozen iterations were produced in the tight timeframe, moving pieces sometimes only pixels apart
                            between each until harmony was established. These constant revisions helped to better understand both my vision and the client’s, and eventually
                            align them as one</p>
                    </div>
                    <div>
                        <h1 className={`${pixelify.className} text-white text-3xl`}>concluding.</h1>
                        <p className={`${roboto.className} mt-10 text-white text-2xl font-light`}>The final cover preserved the identity of the original release while also
                            differentiating itself in a clear and notable manner. While “short-lived” is an understatement for this experience, it was an important lesson in
                            quick thinking, rapid adaptation, and distilling decisions down to their essentials.</p>
                    </div>
                </div>
            </section>
        </main>
    )
}
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
            <section id="splash" className="w-full h-[80vh] md:justify-start md:h-[50vh] grid place-items-center md:px-[5vw] md:px-[5vw]">
                <div className="flex flex-row md:gap-20 mt-auto md:mb-30 mr-[8vw] mb-[8vh] md:ml-0 w-full px-[10vw]">
                    <div className="relative flex flex-col gap-10">
                        <h1 className={`${pixelify.className} max-w-3xs text-4xl md:text-5xl text-white md:max-w-2xl pl-3 md:pl-0`}>instagram web application redesign</h1>
                        <span className={`${roboto.className} hidden md:block text-white font-light text-2xl md:max-w-2xl`}>A simple question: what are people trying to do when they access
                             Instagram via desktop and where does the platform fail them?
                        </span>
                    </div>
                    <div className={`${pixelify.className} text-xl flex flex-col items-center md:flex-row gap-15 text-l mt-auto justify-center ml-auto md:ml-0`}>
                        <button
                        className="flex justify-center items-center w-auto h-auto z-10"
                        onClick={()=> document.getElementById('body')?.scrollIntoView({ behavior: 'smooth' })}
                        >
                            <MagneticButton icon={<ChevronDown className="md:hidden text-white z-50"/>} parameter="w-15 h-15 md:w-50 md:h-15 bg-blue-600/50 md:bg-blue-500/0 hover:bg-blue-600/50 z-20" text="Read More"/>
                        </button>
                    </div>
                </div>
            </section>
            < section className="h-[150px] md:h-[2vh]">
            </section>
            <section id="body" className="pb-20 md:pb-50 px-5 md:px-[11vw]">
                <div className="flex flex-col gap-10 max-w-xs md:max-w-2xl">
                    <div>
                        <h1 className={`${pixelify.className} text-white text-3xl mt-10`}>learning from their users</h1>
                        <p className={`${roboto.className} mt-10 text-white text-2xl font-light`}>Before jumping into ideating solutions and creating interfaces,
                            it was important to ground the project in real user behavior. I conducted an open-ended survey to better understand how users currently engage
                            with the platform, and learn directly from them where misalignment stemmed. I chose an open-ended approach to avoid bias and capture patterns
                            beyond my personal social circle. The survey focused on frequency of use, friction points, and perceived usability under both environments.</p>
                        <div className="mt-10">
                            <span className={`${roboto.className} text-white text-2xl`}>key takeaway -</span>
                            <span className={`${roboto.className} text-white text-xl font-light`}> desktop usage shifts towards utility (posting and managing content,
                                messaging friends, deliberate browsing), while mobile gears itself more towards passive consumption (scrolling, watching reels, etc.).</span>
                            <span className={`${roboto.className} text-white text-2xl`}>This shift in behavior became the foundation for the redesign.</span>
                        </div>
                        <p className={`${roboto.className} mt-10 text-white text-2xl font-light`}>additionally identified:</p>
                        <p className={`${roboto.className} mt-10 text-white text-2xl font-light pl-10`}>- Messy navigation</p>
                        <p className={`${roboto.className} mt-10 text-white text-2xl font-light pl-10`}>- Poor access to messaging</p>
                        <p className={`${roboto.className} mt-10 text-white text-2xl font-light pl-10`}>- Poor visual hierarchy</p>
                        <p className={`${roboto.className} mt-10 text-white text-2xl font-light pl-10`}>- Difficulty scanning content</p>
                    </div>
                    <div>
                        <h1 className={`${pixelify.className} text-white text-3xl`}>ideating solutions and creating interfaces.</h1>
                        <p className={`${roboto.className} mt-10 text-white text-2xl font-light`}>No more need to jump ahead. The redesign can now be tackled with one core principle;
                            keep things clean, but make them easy. Rather than hiding key features behind mountainous clicks and burying them in a cluster of menus, let’s consolidate
                            the experience so users can instantly see what’s available without feeling overwhelmed. </p>
                        <p className={`${roboto.className} mt-10 text-white text-2xl font-light`}>The focus wasn’t on adding more, but better utilization of the space provided.</p>
                        <p className={`${roboto.className} mt-10 text-white text-2xl font-light opacity-60`}>search bar and stories merge into one co-existing component. Lives together while
                            maintaining separate identities, and creates a central place for the user to access two monumental features in an intelligent fashion.</p>
                        <p className={`${roboto.className} mt-10 text-white text-2xl font-light opacity-60`}>solid color when unread messages exist. Creates stronger profile and pulls user attention to new information.</p>
                        <p className={`${roboto.className} mt-10 text-white text-2xl font-light opacity-60`}>new discovery tab implementation. Aids deliberate browsing and helps the user find new topics of interest to them.</p>
                        <p className={`${roboto.className} mt-10 text-white text-2xl font-light opacity-60`}>A prototype of the entire layout was built using Figma, where all of these changes come together in unison.
                            Additional supporting improvements included:</p>
                        <p className={`${roboto.className} mt-10 text-white text-2xl font-light pl-10`}>- New “pull-out” comment browser to keep scrolling as seamless as possible</p>
                        <p className={`${roboto.className} mt-10 text-white text-2xl font-light pl-10`}>- Separated reels tab</p>
                        <p className={`${roboto.className} mt-10 text-white text-2xl font-light pl-10`}>- Changes to readability of navigation bar</p>
                        <p className={`${roboto.className} mt-10 text-white text-2xl font-light pl-10`}>- Cleaner organization of information</p>
                    </div>
                    <div>
                        <h1 className={`${pixelify.className} text-white text-3xl`}>translating into code.</h1>
                        <p className={`${roboto.className} mt-10 text-white text-xl font-light`}>This marks the most critical phase of this project; realization.
                            Good UX does not end simply at just mockups. Not only did I want to create this visual redesign, but also to polish it into a functional
                            front-end application. Not only to strengthen my ability, but to validate whether the proposed improvements were practical and viable.</p>
                        <p className={`${roboto.className} mt-10 text-white text-xl font-light`}>I focused on building a component-based architecture that mirrored the figma
                            system as closely as possible, and implementing responsive behavior that would scale cleanly between desktop breakpoints. Preserving behavior was
                            equally important as simply recreating visuals.</p>
                            <p className={`${roboto.className} mt-10 text-white text-xl font-light`}>You can view the full project file below.</p>
                    </div>
                    <div>
                        <h1 className={`${pixelify.className} text-white text-3xl`}>why did this matter?</h1>
                        <p className={`${roboto.className} mt-10 text-white text-xl font-light`}>This project doesn’t just serve as a fun redesign,
                            but a demonstration of end-to-end product thinking. The final outcome is less important than the capability it demonstrates;
                            the ability to move from user feedback to a functional interface without losing clarity, intent, or usability along the way.</p>
                    </div>
                </div>
            </section>
        </main>
    )
}
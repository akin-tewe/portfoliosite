"use client";
import Image from "next/image";
import { pixelify } from "@/app/ui/fonts";
import { roboto } from "@/app/ui/fonts";
import { ChevronDown } from "lucide-react";
import Projects from "@/components/Projects";
import TransparentVideo from "@/components/SplashVideo"
import ExtraProjects from "@/components/ExtraProjects"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { useLoader } from "@/components/LoaderContext";
import { MainVideo } from "@/components/SplashVideo";
import { AboutButton } from "@/components/MagneticButton";

export default function Landing() {

  const { show, hide} = useLoader();
  const pathname = usePathname();

  return (
    <div>
      <div>
        <section className="relative flex flex-col md:flex-row h-[100vh] items-center md:h-[50vh] bg-blue-500">
          <div className={`flex flex-col text-xl pl-5 mt-20 md:mt-0 mr-auto md:mr-60 md:ml-auto text-white z-10 ${pixelify.className}`}>
            <Image
              src="/Pointer.png"
              alt="Pointer Image"
              width="15"
              height="15"
              className="mb-3"
            />
            <span>UX Engineer </span>
            <span>Product Designer</span>
          </div>
          <span className={`md:hidden ${pixelify.className} relative text-9xl text-white text-right pb-10 pr-5 mt-auto`}>
            akin tewe
          </span>
          <div key={pathname} className="absolute hidden md:block bottom-0 inset-0 z-20 translate-y-2/9">
            <MainVideo webmSrc="/splashvideo.webm" mp4Src="/safarisplash.mp4"/>
          </div>
        </section>
      </div>
      <section className="flex flex-col md:h-[46vh] items-center bg-white md:px-20"> {/* Middle White Section */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-30 py-20 md:py-30 md:border-b-gray-300 md:border-b">
          <p className={`relative text-black text-xl px-10 md:px-0 md:max-w-xl ${roboto.className} font-light`}>Product Designer positioned in UI/UX development creating interfaces that emphasize
            the user and add a touch of childhood wonder.
            I build experiences that bring people back to the joy they grew up with.
          </p>
          <Link className="text-center" href="/aboutme" onClick={() => {show(); setTimeout(hide,800)}}>
            <AboutButton parameter="w-40 h-40 bg-blue-500 z-40" text="About Me"/>
          </Link>
        </div>
        <button
        className="mt-10 mb-15 inline-flex relative gap-5 justify-center items-center text-xl text-black group px-7"
        onClick={()=> document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth'})}>
          <div className={`text-xl text-blue-500 z-10 group-hover:text-white ${pixelify.className}`}>
              PROJECTS
          </div>
          <ChevronDown className="text-blue-500 z-10 group-hover:text-white" />
          <span className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2
          -translate-y-1/2 bg-blue-500 w-50 h-20 rounded-full -z-0 scale-0
          group-hover:scale-100 transition-none duration-100 md:transition-all">
          </span>
        </button>
      </section>
      {/* Projects Section */}
      <section id="projects" className="relative flex flex-col items-center justify-center h-[auto]">
        <div className=" relative justify-center items-center">   {/* Highlight Project Section */}
          <div className= {`lg:hidden ${pixelify.className} flex mt-5 text-white/50 uppercase justify-between items-center w-full text-lg px-[10vw]`}>
            <span>←</span>
            <span>{"swipe"}</span>
            <span>→</span>
          </div>
          <div className="relative flex md:mt-10 mt-5">
            <Projects/>
          </div>
          <div className="md:hidden flex flex-row opacity-70 justify-self-center mt-5 justify-between w-full px-[8vw]">
            <p className={`${pixelify.className} uppercase text-white`}>
            mini projects Below
            </p>
            <ChevronDown className="text-white"/>
          </div>
        </div>
        <div className="relative w-full md:h-[550px] h-[300px] z-5">
          <TransparentVideo mp4Src="/walkingprojects.mp4"/>
        </div>
        <p className={`${pixelify.className} hidden md:block text-white uppercase opacity-70 py-10`}>
          mini projects Below
        </p>
        <ExtraProjects/>
      </section>
    </div>
  );
}

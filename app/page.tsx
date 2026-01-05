"use client";
import Image from "next/image";
import { pixelify } from "@/app/ui/fonts";
import { roboto } from "@/app/ui/fonts";
import { ChevronDown } from "lucide-react";
import Projects from "@/components/Projects";
import MagneticButton from "@/components/MagneticButton"
import TransparentVideo from "@/components/SplashVideo"
import ExtraProjects from "@/components/ExtraProjects"
import { usePathname } from "next/navigation"
import Link from "next/link"
import PageLoader from "@/components/LoadingOverlay"
import { useLoader } from "@/components/LoaderContext";

export default function Home() {

  const { show, hide} = useLoader();
  const pathname = usePathname();

  return (
    <div>
      <div>
        <section className="relative flex items-center justify-center h-[470px] bg-blue-500">
          <span className={`whitespace-nowrap mr-170 relative z-10 text-[200px] text-white top-44 opacity-90 ${pixelify.className}`}>
          </span>
          <div className={`flex flex-col text-xl absolute ml-120 text-white z-10 ${pixelify.className}`}>
            <Image
              src="/Pointer.png"
              alt="Pointer Image"
              width="15"
              height="15"
              className="mb-3"
            />
            <span>UI / UX Designer</span>
            <span>Front End Developer</span>
          </div>
          <div key={pathname} className="absolute bottom-[-185px] mr-35 w-[1940px] h-[725.2px] z-5">
            <TransparentVideo webmSrc="/splashvideo.webm"/>
          </div>
          <div className={`absolute text-[#1650a7] ${pixelify.className} mr-227 mt-63 opacity-90`}>coded by</div>
        </section>
      </div>
      <section className="flex flex-col items-center bg-white"> {/* Middle White Section */}
        <div className="flex items-center justify-center gap-50 p-30 border-b-gray-300 border-b">
          <p className={`relative text-black text-xl max-w-xl ${roboto.className} font-light`}>Front-End Developer and UI/UX designer creating interfaces that emphasize
            the user and add a touch of childhood wonder.
            I build experiences that bring people back to the joy they grew up with.
          </p>
          <Link href="/aboutme" className="relative inline-flex items-center justify-center" onClick={() => {show(); setTimeout(hide,800)}}>
            <MagneticButton parameter="w-40 h-40 bg-blue-500" text="About Me"/>
          </Link>
        </div>
        <button
        className="mt-10 mb-15 inline-flex relative gap-5 justify-center items-center text-xl text-black group px-7 py-3"
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
          <div className="relative flex mt-15">
            <Projects/>
          </div>
        </div>
        <div className="relative w-[550px] h-[550px] z-5">
          <TransparentVideo webmSrc="/walkingprojects.webm"/>
        </div>
        <p className={`${pixelify.className} text-white uppercase opacity-70 py-10`}>
          Other projects Below
        </p>
        <ExtraProjects/>
      </section>
    </div>
  );
}

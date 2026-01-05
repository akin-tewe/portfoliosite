import { pixelify, roboto } from "@/app/ui/fonts"
import { projectminis } from "@/data/ProjectThumbData"
import Link from "next/link"
import { useLoader } from "./LoaderContext"

const project= projectminis[1]


export default function ExtraProjects() {

    const { show, hide } = useLoader();

    return(
        <div className="flex flex-col p-10 px-30 mt-10 w-full mx-auto ">
            <div className="h-px bg-white/30"/>
        {projectminis.map(proj => (
            <div key={proj.id}>
                <Link href={proj.link} onClick={() => {show(); setTimeout(hide,800)}}>
                    <button className="group py-12 flex text-white items-center justify-between w-full px-8">
                        <h1 className={`${pixelify.className} text-3xl uppercase group-hover:-translate-x-7 transition-all group-hover:opacity-60`}>{proj.title}</h1>
                        <span className={`${roboto.className} font-light group-hover:translate-x-7 transition-all group-hover:opacity-60`}>{proj.desc}</span>
                    </button>
                </Link>
                <div className="h-px bg-white/30"/>
            </div>
        ))}
        </div>
    )
}
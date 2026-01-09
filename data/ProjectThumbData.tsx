import TransparentVideo from "@/components/SplashVideo"

const igtext = <div><span>Instagram Web App Redesign </span><span className ="text-green-400">CONCEPT</span></div>
const trutext = <div><div className= "text-green-500">Commercial Work</div><div>Research + Animation</div></div>

const projectsdata = [
    {
        id: 1,
        title: igtext,
        subtitle: "Front End + Ui/Ux",
        body: `Conceptual redesign of Instagram's web experience.`,
        image: <TransparentVideo webmSrc="/igspinner.webm" mp4Src="/projects/instadesign/igspinner.mp4"/>,
        link: "/projects/instadesign",
    },
    {
        id: 2,
        title: "3d Animator Research Study",
        subtitle: "UX Research Study",
        body: `Research-driven interview project exploring what it means to be an independent creator today.`,
        image: <TransparentVideo webmSrc="/3dprojectspinner.webm" mp4Src="/projects/3dresearch/3dspinner.mp4"/>,
        link: "/projects/3dresearch",
    },
    {
        id: 3,
        title: "True Religion Work",
        subtitle: trutext,
        body: `Commissioned 3D branding piece for True Religion.`,
        image: <TransparentVideo webmSrc="/truspinner.webm" mp4Src="/projects/truereligion/truspinner.mp4"/>,
        link: "/projects/truereligion",
    },

]

const projectminis = [
    {
        id: "peaches",
        title: `"Peaches and Eggplants" Album Cover`,
        desc: "Graphic Design",
        link: "/projects/albumcover",
    },
    {
        id: "rage",
        title: `"YourRage" Twitch Streamer Intro`,
        desc: "3D Animation",
        link: "/projects/yourrage",
    },
    {
        id: "bluboy spinners",
        title: `"BluBoy" Product Launch Commercial`,
        desc: "3D Animation",
        link: "/projects/bluboyspin",
    }
]

export default projectsdata

export { projectminis }
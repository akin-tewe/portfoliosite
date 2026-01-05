import TransparentVideo from "@/components/SplashVideo"

const igtext = <div><span>Instagram Web App Redesign </span><span className ="text-green-400">CONCEPT</span></div>
const trutext = <div><div className= "text-green-500">Commercial Work</div><div>Research + Animation</div></div>

const projectsdata = [
    {
        id: 1,
        title: "3d Animator Research Study",
        subtitle: "UX Research Study",
        body: `Research-driven interview project exploring the livelihood, creative
        sustainability, and everything else it means to be an independent creator in the modern social media landscape.`,
        image: <TransparentVideo webmSrc="/3dprojectspinner.webm"/>,
        link: "/projects/3dresearch",
    },
    {
        id: 2,
        title: igtext,
        subtitle: "Front End + Ui/Ux",
        body: `Conceptual redesign of Instagram's web experience, better aligning it with the usability and intent of the mobile application and its users.`,
        image: <TransparentVideo webmSrc="/igspinner.webm"/>,
        link: "/projects/instadesign",
    },
    {
        id: 3,
        title: "True Religion Collaboration",
        subtitle: trutext,
        body: `Commissioned 3D branding piece for True Religion. Informed by user
        and audience research to shape direction, tone, and visual storytelling.`,
        image: <TransparentVideo webmSrc="/truspinner.webm"/>,
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
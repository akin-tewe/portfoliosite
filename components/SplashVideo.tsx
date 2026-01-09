type Props = {
    mp4Src?: string;
}

type Prop2 = {
    webmSrc: string;
    mp4Src?: string;
}


export default function TransparentVideo ({ mp4Src }: Props) {
    return (
        <video
            className="absolute inset-0 w-full h-full object-contain pointer-events-none"
            autoPlay
            loop
            muted
            playsInline
            controls={false}
            preload="metadata">
            {mp4Src ? <source src={mp4Src} type="video/mp4" /> : null}
        </video>
    )
}


export function MainVideo ({ webmSrc, mp4Src }: Prop2) {
    return (
        <video
            className="absolute w-[1600px] h-full object-cover object-[26%_50%] pointer-events-none left-1/2 -translate-x-1/2"
            autoPlay
            loop
            muted
            playsInline
            controls={false}
            preload="metadata">
            {mp4Src ? <source src={mp4Src} type="video/mp4" /> : null}
            <source src= {webmSrc} type="video/webm" />
        </video>
    )
}
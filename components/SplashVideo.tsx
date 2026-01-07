type Props = {
    webmSrc: string;
    mp4Src?: string;
}


export default function TransparentVideo ({ webmSrc, mp4Src }: Props) {
    return (
        <video
            className="absolute inset-0 w-full h-full object-contain pointer-events-none"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata">
            <source src= {webmSrc} type="video/webm" />
            {mp4Src ? <source src={mp4Src} type="video/mp4" /> : null}
        </video>
    )
}


export function MainVideo ({ webmSrc, mp4Src }: Props) {
    return (
        <video
            className="absolute w-[1600px] h-full object-cover object-[26%_50%] pointer-events-none left-1/2 -translate-x-1/2"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata">
            <source src= {webmSrc} type="video/webm" />
            {mp4Src ? <source src={mp4Src} type="video/mp4" /> : null}
        </video>
    )
}
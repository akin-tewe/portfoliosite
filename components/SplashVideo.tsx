"use client";

import { useEffect, useState } from "react";


type Props = {
    mp4Src?: string;
    webmSrc?: string;
}

type Prop2 = {
    webmSrc: string;
    mp4Src?: string;
}

function useMinWidth(px: number) {
    const [ok, setOk] = useState(false);

    useEffect(() => {
        const mq = window.matchMedia(`(min-width: ${px}px)`);
        const update = () => setOk(mq.matches);
        update();
        mq.addEventListener("change", update);
        return () => mq.removeEventListener("change", update);
    }, [px]);

  return ok;
}


export default function TransparentVideo ({ mp4Src, webmSrc }: Props) {
    return (
        <video
            className="absolute inset-0 w-full h-full object-contain pointer-events-none"
            autoPlay
            loop
            muted
            playsInline
            controls={false}
            preload="metadata">
            {mp4Src ? <source src={mp4Src} type="video/mp4;codecs=hvc1" /> : null}
            {webmSrc ? <source src={webmSrc} type="video/webm" /> : null}
        </video>
    )
}

export function MainVideo ({ webmSrc, mp4Src }: Prop2) {

    const isDesktop = useMinWidth(1024);

    return (
        <video
            className="w-full h-full pointer-events-none"
            autoPlay
            loop
            muted
            playsInline
            controls={false}
            preload="metadata">
            {isDesktop && <source src={mp4Src} type="video/mp4;codecs=hvc1" />}
            {isDesktop && <source src= {webmSrc} type="video/webm" />}
        </video>
    )
}
"use client";

import { useEffect, useState, useRef } from "react";


type Props = {
    mp4Src?: string;
    webmSrc?: string;
    preload?: "auto" | "metadata" | "none";
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


export default function TransparentVideo ({ mp4Src, webmSrc, preload = "metadata" }: Props) {
    return (
        <video
            className="absolute inset-0 w-full h-full object-contain pointer-events-none"
            autoPlay
            loop
            muted
            playsInline
            controls={false}
            preload={preload}>
            {mp4Src ? <source src={mp4Src} type="video/mp4;codecs=hvc1" /> : null}
            {webmSrc ? <source src={webmSrc} type="video/webm" /> : null}
        </video>
    )
}

export function MainVideo({ webmSrc, mp4Src }: Prop2) {
  const isDesktop = useMinWidth(1024);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!isDesktop || !containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const video = videoRef.current;
        if (!video) return;

        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [isDesktop]);

  return (
    <div ref={containerRef} className="w-full h-full">
      <video
        ref={videoRef}
        className="w-full h-full pointer-events-none"
        style={{ imageRendering: 'pixelated' }}
        muted
        playsInline
        loop
        controls={false}
        preload="metadata"
      >
        {isDesktop && <source src={mp4Src} type="video/mp4;codecs=hvc1" />}
        {isDesktop && <source src={webmSrc} type="video/webm" />}
      </video>
    </div>
  );
}
"use client";
import TransparentVideo from "./SplashVideo";
import { useEffect, useState } from "react";

export default function PageLoader({loading}: {loading:boolean}) {

    return (
        <div className={`fixed inset-0 z-[500] flex items-center justify-center bg-blue-500
        ${loading ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none ease-out transition-opacity duration-200'}`}>
            <div className="relative text-white w-[400px] h-[400px]">
                <TransparentVideo webmSrc="aboutme.webm"/>
            </div>
        </div>
    )
}

export function BootOverlay() {
    const [show,setShow] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShow(false);
        }, 1200)

        return () => clearTimeout(timer);
    }, []);

    return(
        <div className={`fixed inset-0 z-[500] flex items-center justify-center pointer-events-none ${show ? 'opacity-100 transition-opacity ease-in-out' : 'opacity-0 transition-all'} bg-blue-500 duration-200`}>
            <div className="relative text-white w-[400px] h-[400px]">
                <TransparentVideo webmSrc="aboutme.webm"/>
            </div>
        </div>
    )
}
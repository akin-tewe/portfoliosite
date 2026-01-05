"use client";
import TransparentVideo from "./SplashVideo";

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
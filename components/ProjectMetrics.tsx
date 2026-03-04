"use client";
import { pixelify, roboto } from "@/app/ui/fonts";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface Metric {
    label: string;
    value: string;
}

export default function ProjectMetrics({ metrics }: { metrics: Metric[] }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="w-full max-w-[1000px] mx-auto px-5 md:px-8 py-8 md:py-10"
        >
            <div className={`grid grid-cols-2 gap-y-6 gap-x-4 md:gap-0 ${metrics.length === 4 ? 'md:grid-cols-4' : 'md:grid-cols-3'}`}>
                {metrics.map((m, i) => (
                    <div key={i} className="flex flex-col gap-1">
                        <span className={`${pixelify.className} text-black/35 text-xs md:text-sm uppercase tracking-wider`}>
                            {m.label}
                        </span>
                        <span className={`${roboto.className} text-gray-800 text-sm md:text-base font-normal leading-snug`}>
                            {m.value.includes(' · ') ? (
                                m.value.split(' · ').map((part, j) => (
                                    <span key={j} className="block">{part.trim()}</span>
                                ))
                            ) : (
                                m.value
                            )}
                        </span>
                    </div>
                ))}
            </div>
        </motion.div>
    );
}

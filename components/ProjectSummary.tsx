"use client";
import { pixelify, roboto } from "@/app/ui/fonts";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface SummaryItem {
    label: string;
    value: string;
}

interface ProjectSummaryProps {
    items: SummaryItem[];
    className?: string;
}

export default function ProjectSummary({ items, className = "" }: ProjectSummaryProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className={`bg-gradient-to-br from-white/10 to-white/5 p-6 md:p-10 rounded-2xl border border-white/10 ${className}`}
        >
            <motion.h3
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.2 }}
                className={`${pixelify.className} text-white/50 text-xs md:text-sm uppercase tracking-widest mb-6 text-center`}
            >
                project at a glance
            </motion.h3>
            <div className={`grid grid-cols-2 ${items.length > 4 ? 'md:grid-cols-5' : 'md:grid-cols-4'} gap-6 md:gap-8`}>
                {items.map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.1 * index + 0.3 }}
                        className="text-center md:text-left"
                    >
                        <div className={`${pixelify.className} text-white/50 text-xs md:text-sm uppercase tracking-wider mb-1`}>
                            {item.label}
                        </div>
                        <div className={`${roboto.className} text-white text-sm md:text-lg font-light`}>
                            {item.value}
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}

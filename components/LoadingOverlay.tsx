"use client";
import TransparentVideo from "./SplashVideo";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PageLoader({ loading }: { loading: boolean }) {
    return (
        <AnimatePresence>
            {loading && (
                <motion.div
                    className="fixed inset-0 z-[500] flex items-center justify-center bg-gray-200"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                >
                    <motion.div
                        className="relative text-white w-[300px] h-[300px] md:w-[400px] md:h-[400px]"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 1.1, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <TransparentVideo mp4Src="/aboutme.mp4" />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export function BootOverlay() {
    const [show, setShow] = useState(true);
    const [fadeOut, setFadeOut] = useState(false);

    useEffect(() => {
        // Start fade out after initial display
        const fadeTimer = setTimeout(() => {
            setFadeOut(true);
        }, 800);

        // Remove from DOM after fade
        const removeTimer = setTimeout(() => {
            setShow(false);
        }, 1200);

        return () => {
            clearTimeout(fadeTimer);
            clearTimeout(removeTimer);
        };
    }, []);

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    className="fixed inset-0 z-[500] flex items-center justify-center pointer-events-none bg-gray-200"
                    initial={{ opacity: 1 }}
                    animate={{ opacity: fadeOut ? 0 : 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                >
                    <motion.div
                        className="relative text-white w-[300px] h-[300px] md:w-[400px] md:h-[400px]"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{
                            scale: fadeOut ? 1.1 : 1,
                            opacity: fadeOut ? 0 : 1
                        }}
                        transition={{ duration: 0.4 }}
                    >
                        <TransparentVideo mp4Src="/aboutme.mp4" />
                    </motion.div>

                    {/* Loading bar */}
                    <motion.div
                        className="absolute bottom-20 left-1/2 -translate-x-1/2 w-32 h-1 bg-black/10 rounded-full overflow-hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: fadeOut ? 0 : 1 }}
                    >
                        <motion.div
                            className="h-full bg-gray-900 rounded-full"
                            initial={{ width: "0%" }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 0.8, ease: "easeInOut" }}
                        />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

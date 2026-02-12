"use client";

import Link from "next/link"
import { pixelify } from "@/app/ui/fonts"
import { House } from "lucide-react"
import { useLoader } from "./LoaderContext"
import { useRef, useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const menuItems = [
    { label: "Home", href: "/" },
    { label: "Projects", href: "/#projects" },
    { label: "About", href: "/aboutme" },
    { label: "Contact", href: "/contactme" },
];

const menuVariants = {
    closed: {
        x: "100%",
        transition: {
            type: "spring" as const,
            stiffness: 500,
            damping: 35
        }
    },
    open: {
        x: 0,
        transition: {
            type: "spring" as const,
            stiffness: 500,
            damping: 35,
            staggerChildren: 0.05,
            delayChildren: 0.05
        }
    }
};

const itemVariants = {
    closed: {
        x: 30,
        opacity: 0,
        transition: { duration: 0.2 }
    },
    open: {
        x: 0,
        opacity: 1,
        transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] as const }
    }
};

const overlayVariants = {
    closed: { opacity: 0 },
    open: { opacity: 1 }
};

export default function NavBar() {
    const { show, hide } = useLoader();
    const navbarRef = useRef<HTMLDivElement | null>(null);
    const [navSee, setNavSee] = useState(true);
    const pathname = usePathname();
    const isHome = pathname === "/";
    const aboutMe = pathname === "/aboutme"
    const [open, setOpen] = useState(false);

    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "";
        return () => {
            document.body.style.overflow = ""
        }
    }, [open]);

    useEffect(() => {
        if (!navbarRef.current) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setNavSee(entry.isIntersecting);
            },
            { threshold: 0 }
        )

        observer.observe(navbarRef.current);

        return () => observer.disconnect();
    }, [])

    const handleNavClick = () => {
        setOpen(false);
        show();
        setTimeout(hide, 800);
    };

    return (
        <div>
            {/* Mobile Menu Button */}
            <motion.button
                aria-label="Open menu"
                onClick={() => setOpen(true)}
                className="md:hidden fixed top-8 right-6 z-[100]"
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
            >
                <div className="bg-black/80 backdrop-blur-sm p-3.5 text-white rounded-full shadow-lg border border-white/10">
                    <Menu size={22} />
                </div>
            </motion.button>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        onClick={() => setOpen(false)}
                        className="fixed inset-0 z-[90] bg-black/50 md:hidden"
                        variants={overlayVariants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                    />
                )}
            </AnimatePresence>

            {/* Mobile Menu Card */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        className="fixed top-24 right-4 z-[100] md:hidden"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                    >
                        {/* Card Container */}
                        <div className="relative w-[70vw] max-w-[260px] rounded-2xl shadow-xl bg-[#1a1a1a]/95 border border-white/10">

                            {/* Content */}
                            <motion.div
                                className="relative py-3"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.05, duration: 0.15 }}
                            >

                                {/* Menu Items */}
                                <nav className={`${pixelify.className} uppercase`}>
                                    {menuItems.map((item, index) => (
                                        <motion.div
                                            key={item.href}
                                            initial={{ opacity: 0, x: 15 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.05 + index * 0.04 }}
                                        >
                                            <Link
                                                href={item.href}
                                                onClick={handleNavClick}
                                                className="group flex items-center justify-between px-5 py-4 text-white/80 hover:text-white hover:bg-white/10 transition-all duration-150"
                                            >
                                                <span className="text-xl">{item.label}</span>
                                                <span className="text-white/30 group-hover:text-blue-400 text-sm transition-colors duration-150">
                                                    0{index + 1}
                                                </span>
                                            </Link>
                                        </motion.div>
                                    ))}
                                </nav>

                                {/* Divider */}
                                <div className="mx-5 my-2 h-px bg-white/10" />

                                {/* Close Button */}
                                <motion.button
                                    aria-label="Close menu"
                                    onClick={() => setOpen(false)}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                    className={`${pixelify.className} w-full px-5 py-3 text-white/40 hover:text-white/70 text-sm uppercase tracking-wider text-left hover:bg-white/5 transition-all duration-150`}
                                >
                                    Close
                                </motion.button>

                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Desktop Header */}
            <header className="hidden md:flex bg-black px-3 md:px-3 py-[1vh] flex-col md:flex-row justify-between w-full px-2 md:px-12 py-[3vh] gap-[2vh]">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <Link
                        href="/"
                        className="text-white/60 hover:text-white transition-all z-20 ml-auto md:ml-0 hover:scale-110 inline-block"
                        onClick={() => { show(); setTimeout(hide, 800) }}
                    >
                        <House />
                    </Link>
                </motion.div>
                <nav
                    ref={navbarRef}
                    className={`flex md:flex-row flex-col text-xl gap-[2vw] z-10 text-right uppercase ${pixelify.className} text-white`}
                >
                    {["projects", "about me", "get in touch"].map((item, index) => {
                        const href = item === "projects" ? "/#projects" : item === "about me" ? "/aboutme" : "/contactme";
                        return (
                            <motion.div
                                key={item}
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 + index * 0.1 }}
                            >
                                <Link
                                    href={href}
                                    className="opacity-60 hover:opacity-100 transition-all duration-300 relative group"
                                    onClick={() => { show(); setTimeout(hide, 800) }}
                                >
                                    {item}
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300" />
                                </Link>
                            </motion.div>
                        );
                    })}
                </nav>
            </header>

            {/* Floating Home Button (non-home pages) */}
            {!isHome && (
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{
                        scale: !navSee ? 1 : 0,
                        opacity: !navSee ? 1 : 0
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    className="fixed bottom-8 right-8 z-[100] hidden md:block"
                >
                    <Link
                        href="/"
                        onClick={() => { show(); setTimeout(hide, 800) }}
                        className="bg-black/80 backdrop-blur-sm p-3 text-white shadow-lg rounded-full hover:bg-black hover:scale-110 transition-all block border border-white/10"
                    >
                        <House size={20} />
                    </Link>
                </motion.div>
            )}
        </div>
    )
}

export function Footer() {
    const { show, hide } = useLoader();

    return (
        <motion.footer
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-black flex flex-col md:flex-row justify-between items-center p-6 md:p-10 gap-4 md:gap-0 border-t border-white/5"
        >
            <span className={`text-white opacity-50 text-sm md:text-base ${pixelify.className}`}>
                © coded by akin tewe
            </span>
            <Link
                href="/contactme"
                className={`text-white/60 text-base md:text-xl hover:text-white transition-all ${pixelify.className} group`}
                onClick={() => { show(); setTimeout(hide, 800) }}
            >
                contact me
                <span className="block h-0.5 w-0 bg-white group-hover:w-full transition-all duration-300" />
            </Link>
        </motion.footer>
    )
}

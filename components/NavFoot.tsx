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
            stiffness: 400,
            damping: 40
        }
    },
    open: {
        x: 0,
        transition: {
            type: "spring" as const,
            stiffness: 400,
            damping: 40,
            staggerChildren: 0.07,
            delayChildren: 0.1
        }
    }
};

const itemVariants = {
    closed: { x: 50, opacity: 0 },
    open: { x: 0, opacity: 1 }
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
                        className="fixed inset-0 z-[90] bg-black/60 backdrop-blur-sm md:hidden"
                        variants={overlayVariants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                    />
                )}
            </AnimatePresence>

            {/* Mobile Menu Sidebar */}
            <AnimatePresence>
                {open && (
                    <motion.aside
                        className={`${pixelify.className} uppercase fixed top-0 right-0 z-[100] h-dvh w-[85vw] max-w-sm bg-black/95 backdrop-blur-lg shadow-2xl md:hidden text-3xl text-white`}
                        variants={menuVariants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                    >
                        {/* Close Button */}
                        <div className="flex items-center justify-between p-6 border-b border-white/10">
                            <motion.span
                                className="font-medium text-xl text-white/70"
                                variants={itemVariants}
                            >
                                Menu
                            </motion.span>
                            <motion.button
                                aria-label="Close menu"
                                onClick={() => setOpen(false)}
                                className="p-2 hover:bg-white/10 rounded-full transition-colors"
                                whileTap={{ scale: 0.9 }}
                            >
                                <X size={24} />
                            </motion.button>
                        </div>

                        {/* Menu Items */}
                        <nav className="p-6 flex flex-col">
                            {menuItems.map((item, index) => (
                                <motion.div key={item.href} variants={itemVariants}>
                                    <Link
                                        href={item.href}
                                        onClick={handleNavClick}
                                        className="block py-5 border-b border-white/10 hover:text-blue-400 hover:pl-4 transition-all duration-300"
                                    >
                                        <span className="text-white/40 text-sm mr-4">0{index + 1}</span>
                                        {item.label}
                                    </Link>
                                </motion.div>
                            ))}
                        </nav>

                        {/* Footer */}
                        <motion.div
                            className="absolute bottom-0 left-0 right-0 p-6 border-t border-white/10"
                            variants={itemVariants}
                        >
                            <p className="text-white/40 text-sm normal-case">
                                UX Engineer / Product Designer
                            </p>
                        </motion.div>
                    </motion.aside>
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

"use client";

import Link from "next/link"
import { pixelify } from "@/app/ui/fonts"
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { motion, AnimatePresence, useInView } from "framer-motion";

const menuItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "/aboutme" },
    { label: "Contact", href: "/contactme" },
];

const overlayVariants = {
    closed: { opacity: 0 },
    open: { opacity: 1 }
};

export default function NavBar() {
    const pathname = usePathname();
    const isActive = (href: string) => {
        if (href === '/') return pathname === '/';
        if (href.includes('#')) {
            const basePath = href.split('#')[0] || '/';
            return pathname === basePath;
        }
        return pathname === href || pathname.startsWith(href + '/');
    };
    const [open, setOpen] = useState(false);

    const preventCursorFlash = (e: React.MouseEvent) => { e.preventDefault(); };

    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "";
        return () => {
            document.body.style.overflow = ""
        }
    }, [open]);

    const handleNavClick = () => {
        setOpen(false);
    };

    const handleHashNavigation = (e: React.MouseEvent, href: string) => {
        if (!href.includes('#')) return;

        const [path, hash] = href.split('#');
        const targetPath = path || '/';

        if (pathname === targetPath) {
            e.preventDefault();
            const element = document.getElementById(hash);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
            setOpen(false);
        }
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
                        transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
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
                                                onMouseDown={preventCursorFlash}
                                                onClick={(e) => {
                                                    handleHashNavigation(e, item.href);
                                                    if (!item.href.includes('#') || pathname !== (item.href.split('#')[0] || '/')) {
                                                        handleNavClick();
                                                    } else {
                                                        setOpen(false);
                                                    }
                                                }}
                                                className={`group flex items-center justify-between px-5 py-4 transition-all duration-150 ${
                                                    isActive(item.href)
                                                        ? 'text-white bg-white/10'
                                                        : 'text-white/40 hover:text-white hover:bg-white/10'
                                                }`}
                                            >
                                                <span className="text-xl">{item.label}</span>
                                                <span className={`text-sm transition-colors duration-150 ${
                                                    isActive(item.href) ? 'text-white/60' : 'text-white/30 group-hover:text-blue-400'
                                                }`}>
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

            {/* Desktop Floating Pill Nav */}
            <motion.div
                className="hidden md:flex fixed top-6 left-1/2 -translate-x-1/2 z-[60]
                 bg-black/80 backdrop-blur-lg rounded-full px-10 py-3.5
                 items-center gap-7 border border-white/15 shadow-lg shadow-black/20"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}>

                <Link
                    href="/"
                    className={`${pixelify.className} text-sm tracking-wider transition-colors duration-200 ${
                        isActive('/') ? 'text-white' : 'text-white/50 hover:text-white'
                    }`}
                    onMouseDown={preventCursorFlash}
                >
                    AKIN TEWE
                </Link>

                <div className="w-px h-4 bg-white/15" />

                <nav className={`${pixelify.className} flex items-center gap-5 text-xs tracking-wider uppercase`}>
                    {[
                        { label: "About", href: "/aboutme" },
                        { label: "Contact", href: "/contactme" },
                    ].map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`transition-colors duration-200 ${
                                isActive(item.href) ? 'text-white' : 'text-white/50 hover:text-white'
                            }`}
                            onMouseDown={preventCursorFlash}
                            onClick={(e) => {
                                handleHashNavigation(e, item.href);
                            }}
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>
            </motion.div>
        </div>
    )
}

export function Footer() {
    const footerRef = useRef(null);
    const footerInView = useInView(footerRef, { once: true, margin: "-40px" });

    return (
        <motion.footer
            ref={footerRef}
            className="px-6 md:px-[clamp(4rem,10vw,11rem)] py-8"
            initial={{ opacity: 0, y: 12 }}
            animate={footerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
            <div className="flex flex-col items-center gap-1 md:flex-row md:justify-between md:items-end relative">
                <span className={`${pixelify.className} text-black/25 text-base tracking-wider`}>
                    © {new Date().getFullYear()}
                </span>
                <a
                    href="https://github.com/akin-tewe/portfoliosite"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${pixelify.className} underline text-black/25 hover:text-black/50 text-base tracking-wider transition-colors uppercase md:absolute md:left-1/2 md:-translate-x-1/2`}
                >
                    Changelog
                </a>
                <span className={`${pixelify.className} text-black/25 text-base tracking-wider`}>
                    designed & developed by akin tewe
                </span>
            </div>
        </motion.footer>
    )
}

"use client";
import { useEffect, useState, useCallback } from "react";
import { roboto } from "@/app/ui/fonts";

interface SidebarSection {
    id: string;
    label: string;
}

interface CaseStudySidebarProps {
    sections: SidebarSection[];
}

export default function CaseStudySidebar({ sections }: CaseStudySidebarProps) {
    const [activeId, setActiveId] = useState<string>("");

    useEffect(() => {
        const observers: IntersectionObserver[] = [];
        const visibleSections = new Map<string, number>();

        sections.forEach((section) => {
            const el = document.getElementById(section.id);
            if (!el) return;

            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            visibleSections.set(section.id, entry.intersectionRatio);
                        } else {
                            visibleSections.delete(section.id);
                        }
                    });

                    // Pick the first visible section in document order
                    for (const s of sections) {
                        if (visibleSections.has(s.id)) {
                            setActiveId(s.id);
                            break;
                        }
                    }
                },
                {
                    rootMargin: "-128px 0px -40% 0px",
                    threshold: [0, 0.1],
                }
            );

            observer.observe(el);
            observers.push(observer);
        });

        return () => {
            observers.forEach((obs) => obs.disconnect());
        };
    }, [sections]);

    const handleClick = useCallback((id: string) => {
        const el = document.getElementById(id);
        if (!el) return;

        const navOffset = 128;
        const top = el.getBoundingClientRect().top + window.scrollY - navOffset;
        window.scrollTo({ top, behavior: "smooth" });
    }, []);

    return (
        <nav className="hidden lg:block sticky top-32 self-start pl-8 pt-8 md:pt-10">
            <ul className="flex flex-col gap-3">
                {sections.map((section) => (
                    <li key={section.id}>
                        <button
                            onClick={() => handleClick(section.id)}
                            className={`${roboto.className} text-base text-left transition-colors duration-300 ${
                                activeId === section.id
                                    ? "text-gray-800 font-medium"
                                    : "text-gray-400 font-light"
                            }`}
                        >
                            {section.label}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

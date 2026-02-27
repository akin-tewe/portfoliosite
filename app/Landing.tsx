"use client";
import { pixelify, roboto } from "@/app/ui/fonts";
import { ChevronDown } from "lucide-react";
import projectsdata, { projectminis } from "@/data/ProjectThumbData";
import { usePathname } from "next/navigation"
import Link from "next/link"
import { useLoader } from "@/components/LoaderContext";
import { MainVideo } from "@/components/SplashVideo";
import { AboutButton } from "@/components/MagneticButton";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

// Animated section wrapper
function AnimatedSection({ children, className = "", delay = 0 }: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}


function ScrambleText({ text, delay = 0 }: { text: string; delay?: number }) {
  const [display, setDisplay] = useState(text.replace(/[^ ]/g, '#'));
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&';

  useEffect(() => {
    const timeout = setTimeout(() => {
      let iteration = 0;
      const interval = setInterval(() => {
        setDisplay(
          text.split('').map((char, i) => {
            if (char === ' ') return ' ';
            if (i < iteration) return text[i];
            return chars[Math.floor(Math.random() * chars.length)];
          }).join('')
        );
        iteration += 1/3;
        if (iteration >= text.length) clearInterval(interval);
      }, 40);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timeout);
  }, []);

  return <span>{display}</span>;
}

export default function Landing() {
  const { show, hide } = useLoader();
  const pathname = usePathname();
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-[50vh] md:min-h-0 md:h-[32vh] bg-gray-200 overflow-visible"
      >
        {/* Two-column content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isHeroInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col md:flex-row items-center md:items-center justify-center gap-8 md:gap-[16rem] max-w-6xl mx-auto px-6 md:px-10 pt-12 md:pt-0 md:h-full relative z-10"
        >
          {/* LEFT: scramble text + credits */}
          <div className="text-center md:text-left md:w-[22rem] md:flex-shrink-0">
            <h2 className={`${pixelify.className} text-2xl md:text-5xl text-gray-800 uppercase whitespace-nowrap`}>
              <ScrambleText text="UX ENGINEER" delay={500} />
            </h2>
            <div className="w-12 h-px bg-black/15 mx-auto md:mx-0 my-3" />
            <h2 className={`${pixelify.className} text-2xl md:text-5xl text-gray-800 uppercase whitespace-nowrap`}>
              <ScrambleText text="PRODUCT DESIGNER" delay={800} />
            </h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={isHeroInView ? { opacity: 1 } : {}}
              transition={{ duration: 1, delay: 2 }}
              className={`${roboto.className} text-black/35 text-[11px] md:text-sm uppercase tracking-[0.15em] mt-4`}
            >
              <span className="text-black/35">Worked with </span><span className="text-black/80">Sprite · True Religion · Higround</span><span className="text-black/35"> + more</span>
            </motion.p>
          </div>

        </motion.div>

        {/* Hero Name - Mobile */}
        <motion.span
          initial={{ opacity: 0, y: 50 }}
          animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          className={`md:hidden ${pixelify.className} relative text-8xl sm:text-9xl text-gray-900 text-right pb-28 pr-5 mt-auto leading-none block`}
        >
          akin tewe
        </motion.span>

        {/* Splash Video - Desktop */}
        <div key={pathname} className="absolute hidden md:block bottom-0 left-[47%] -translate-x-1/2 w-full max-w-[1600px] aspect-[1600/560] translate-y-[25%] z-50 pointer-events-none overflow-visible">
          <MainVideo webmSrc="/blacksplashW.webm" mp4Src="/blacksplashM.mp4" />
        </div>

        {/* Bio text — next to splash video */}
        <p className={`${roboto.className} absolute hidden md:block bottom-1 right-[27%] text-black/50 text-base font-light leading-relaxed max-w-m z-40`}>
          Product Designer creating interfaces that<br />emphasize the user and add a touch of childhood wonder.
        </p>

        {/* Scroll indicator - Mobile */}
        <motion.div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 md:hidden z-30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex flex-col items-center gap-1"
          >
            <ChevronDown className="text-black/30 w-6 h-6" />
          </motion.div>
        </motion.div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="relative px-6 md:px-[8rem] pt-16 md:pt-24 -mt-12 md:-mt-20 pb-16">
        {/* Main Projects — 2 column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projectsdata.map((project, i) => (
            <AnimatedSection key={project.id} delay={i * 0.1}>
              <Link
                href={project.link}
                onClick={() => { show(); setTimeout(hide, 800); }}
                className="group block"
              >
                <div className="relative bg-gray-900 rounded-xl overflow-hidden transition-all duration-300 ease-out
                                group-hover:-translate-y-2 group-hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.4)]">
                  {/* Image placeholder */}
                  <div className="w-full aspect-[16/10] bg-gray-800 group-hover:bg-gray-700 transition-colors duration-300" />

                  {/* Card info */}
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <h3 className={`${pixelify.className} text-white text-xl md:text-2xl uppercase`}>
                        {project.title}
                      </h3>
                      <span className={`${pixelify.className} text-green-400 text-[10px] tracking-wider uppercase`}>
                        {project.tag}
                      </span>
                    </div>
                    <p className={`${roboto.className} text-white/40 text-xs mt-1.5 font-light`}>
                      {project.body}
                    </p>
                  </div>

                  {/* Hover accent line — slides in from left */}
                  <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-green-400 group-hover:w-full transition-all duration-500 ease-out" />
                </div>
              </Link>
            </AnimatedSection>
          ))}
        </div>

        {/* Mini Projects — 3 column row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {projectminis.map((mini, i) => (
            <AnimatedSection key={mini.id} delay={0.4 + i * 0.1}>
              <Link
                href={mini.link}
                onClick={() => { show(); setTimeout(hide, 800); }}
                className="group block"
              >
                <div className="relative bg-gray-900 rounded-xl overflow-hidden transition-all duration-300 ease-out
                                group-hover:-translate-y-2 group-hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.4)]">
                  {/* Smaller image placeholder */}
                  <div className="w-full aspect-[3/1] bg-gray-800 group-hover:bg-gray-700 transition-colors duration-300" />

                  {/* Card info */}
                  <div className="p-3.5">
                    <div className="flex items-center justify-between">
                      <h3 className={`${pixelify.className} text-white text-base md:text-lg uppercase`}>
                        {mini.title}
                      </h3>
                      <span className={`${pixelify.className} text-green-400 text-[9px] tracking-wider uppercase`}>
                        {mini.tag}
                      </span>
                    </div>
                    <p className={`${roboto.className} text-white/40 text-[11px] mt-1 font-light`}>
                      {mini.desc}
                    </p>
                  </div>

                  {/* Hover accent line */}
                  <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-green-400 group-hover:w-full transition-all duration-500 ease-out" />
                </div>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </section>
    </div>
  );
}

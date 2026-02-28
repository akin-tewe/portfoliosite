"use client";
import { pixelify, roboto } from "@/app/ui/fonts";

import projectsdata from "@/data/ProjectThumbData";
import { usePathname } from "next/navigation"
import Link from "next/link"
import { useLoader } from "@/components/LoaderContext";
import { MainVideo } from "@/components/SplashVideo";
import { AboutButton } from "@/components/MagneticButton";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import { calcModalPosition } from "@/lib/calcModalPosition";
import { ShaderGradientCanvas, ShaderGradient } from 'shadergradient';

// Animated section wrapper
function AnimatedSection({ children, className = "", delay = 0 }: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
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

// Cursor-following hover modal wrapper
function HoverCard({ children, modal, href, onClick }: {
  children: React.ReactNode;
  modal: React.ReactNode;
  href: string;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const rafId = useRef(0);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const cx = e.clientX;
    const cy = e.clientY;

    cancelAnimationFrame(rafId.current);
    rafId.current = requestAnimationFrame(() => {
      const el = modalRef.current;
      if (!el) return;

      const { x, y } = calcModalPosition({
        cursorX: cx,
        cursorY: cy,
        modalWidth: el.offsetWidth || 300,
        modalHeight: el.offsetHeight || 200,
        viewportWidth: window.innerWidth,
        viewportHeight: window.innerHeight,
      });

      el.style.left = `${x}px`;
      el.style.top = `${y}px`;
    });
  }, []);

  // Clean up rAF on unmount
  useEffect(() => () => cancelAnimationFrame(rafId.current), []);

  return (
    <Link
      href={href}
      onClick={onClick}
      className="group relative block"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
      <div
        ref={modalRef}
        className="fixed z-50 pointer-events-none transition-opacity duration-150"
        style={{
          left: -9999,
          top: -9999,
          opacity: hovered ? 1 : 0,
        }}
      >
        {modal}
      </div>
    </Link>
  );
}

const TAG_COLORS: Record<string, string> = {
  "UI/UX Design": "bg-sky-500/20 text-sky-300",
  "Built with Claude": "bg-orange-500/20 text-orange-300",
  "Production Ready": "bg-emerald-500/20 text-emerald-300",
  "Front End": "bg-violet-500/20 text-violet-300",
  "UX Research": "bg-rose-500/20 text-rose-300",
  "Interviews": "bg-amber-500/20 text-amber-300",
  "Commission": "bg-yellow-500/20 text-yellow-300",
  "3D Animation": "bg-cyan-500/20 text-cyan-300",
  "Branding": "bg-pink-500/20 text-pink-300",
  "Graphic Design": "bg-purple-500/20 text-purple-300",
  "Product Launch": "bg-lime-500/20 text-lime-300",
};

export default function Landing() {
  const { show, hide } = useLoader();
  const pathname = usePathname();
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });

  return (
    <div className="overflow-x-clip">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-fit md:min-h-[350px] md:h-[32vh] bg-gray-200 overflow-visible"
      >
        {/* Two-column content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isHeroInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col md:flex-row items-start md:items-center justify-center gap-8 md:gap-[clamp(4rem,10vw,16rem)] px-6 md:pl-[clamp(2rem,6vw,8rem)] md:pr-[clamp(1rem,3vw,2.5rem)] pt-12 md:pt-0 md:h-full relative z-10"
        >
          {/* LEFT: scramble text + credits */}
          <div className="text-left md:w-[22rem] md:flex-shrink-0">
            <h2 className={`${pixelify.className} text-2xl md:text-5xl text-gray-800 uppercase whitespace-nowrap`}>
              <ScrambleText text="UX ENGINEER" delay={500} />
            </h2>
            <div className="w-12 h-px bg-black/15 my-3" />
            <h2 className={`${pixelify.className} text-2xl md:text-5xl text-gray-800 uppercase whitespace-nowrap`}>
              <ScrambleText text="PRODUCT DESIGNER" delay={800} />
            </h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={isHeroInView ? { opacity: 1 } : {}}
              transition={{ duration: 1, delay: 2 }}
              className={`${roboto.className} text-black/35 text-[11px] md:text-sm uppercase tracking-[0.15em] mt-4 max-w-[200px]`}
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
          className={`md:hidden ${pixelify.className} relative text-8xl text-gray-900 text-right pb-2 pr-5 mt-auto pt-4 leading-none block`}
        >
          akin<br />tewe
        </motion.span>

        {/* Splash Video - Desktop */}
        <div key={pathname} className="absolute hidden md:block bottom-0 left-[47%] -translate-x-1/2 w-full max-w-[1600px] aspect-[1600/560] translate-y-[25%] z-50 pointer-events-none overflow-visible">
          <MainVideo webmSrc="/blacksplashW.webm" mp4Src="/blacksplashM.mp4" />

          {/* Bio text — positioned relative to splash video container */}
          <p className={`${roboto.className} absolute hidden 2xl:block bottom-[25%] right-[13%] text-black/50 text-base font-light leading-relaxed max-w-md`}>
            Product Designer creating interfaces that<br />emphasize the user and add a touch of childhood wonder.
          </p>
        </div>

      </section>

      {/* Projects Section */}
      <section id="projects" className="relative px-6 md:px-[clamp(4rem,10vw,11rem)] pt-20 md:pt-28 -mt-12 md:-mt-20 pb-6 md:pb-[clamp(2rem,4vw,4rem)]">
        {/* Main Projects — 2 column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
          {projectsdata.map((project, i) => (
            <AnimatedSection key={project.id} delay={i * 0.1}>
              <HoverCard
                href={project.link}
                onClick={() => { show(); setTimeout(hide, 800); }}
                modal={
                  <div className="bg-gray-900 rounded-2xl shadow-xl p-6 max-w-[280px]">
                    <h4 className={`${pixelify.className} text-white text-xl uppercase tracking-wide`}>
                      {project.title}
                    </h4>
                    <p className={`${roboto.className} text-white/60 text-base font-light leading-relaxed mt-2`}>
                      {project.body}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {project.tags.map((tag: string) => (
                        <span key={tag} className={`${pixelify.className} text-sm uppercase tracking-wider ${TAG_COLORS[tag] || "text-white/50 bg-white/10"} rounded-full px-3 py-1.5`}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                }
              >
                {/* Card */}
                <div
                  className={`relative ${project.gradient ? '' : project.color} rounded-2xl overflow-hidden transition-all duration-300 ease-out
                              group-hover:-translate-y-2 aspect-[9/5]`}
                  style={{ boxShadow: 'none' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = `0 20px 50px -12px ${project.shadow}`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  {/* Shader gradient background — pixelated */}
                  {project.gradient && (
                    <div className="absolute inset-0 overflow-hidden">
                      <ShaderGradientCanvas
                        style={{
                          position: 'absolute',
                          top: '-10%',
                          left: '-10%',
                          width: '120%',
                          height: '120%',
                          pointerEvents: 'none',
                          imageRendering: 'pixelated',
                          transform: 'scale(5)',
                          transformOrigin: 'center',
                        }}
                        pixelDensity={0.25}
                      >
                        <ShaderGradient {...project.gradient as any} />
                      </ShaderGradientCanvas>
                    </div>
                  )}

                  {/* Project image overlay — centered */}
                  {project.image && (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="absolute inset-0 m-auto max-w-[60%] max-h-[60%] object-contain z-10 pointer-events-none"
                    />
                  )}

                  {/* Unified pill label — bottom left */}
                  <div className="absolute bottom-4 left-4 flex items-center bg-black/80 backdrop-blur-lg rounded-full shadow-sm px-4 py-2 gap-3 whitespace-nowrap">
                    <span className={`${pixelify.className} text-white text-sm tracking-wider uppercase`}>
                      {project.title}
                    </span>
                    <div className="w-px h-4 bg-white/20 hidden lg:block" />
                    <span className={`${pixelify.className} text-white/50 text-xs tracking-wider uppercase hidden lg:inline`}>
                      {project.tag}
                    </span>
                  </div>
                </div>
              </HoverCard>
            </AnimatedSection>
          ))}
        </div>
      </section>
    </div>
  );
}

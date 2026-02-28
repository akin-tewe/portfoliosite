"use client";
import { pixelify, roboto } from "@/app/ui/fonts";

import projectsdata from "@/data/ProjectThumbData";
import { usePathname } from "next/navigation"
import Link from "next/link"
import { useLoader } from "@/components/LoaderContext";
import { MainVideo } from "@/components/SplashVideo";
import { AboutButton } from "@/components/MagneticButton";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useCursor } from "@/components/CursorContext";
import { ShaderGradientCanvas, ShaderGradient } from 'shadergradient';
import { ClockAlert } from "lucide-react";

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

export default function Landing() {
  const { show, hide } = useLoader();
  const { setCursor, resetCursor } = useCursor();
  const pathname = usePathname();
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });
  const [slideshowIndex, setSlideshowIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideshowIndex(prev => prev + 1);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

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
              {project.locked ? (
                <div
                  className="group relative block cursor-default"
                  onMouseEnter={() => setCursor("project", { title: "", body: "Article coming soon.", tags: [] })}
                  onMouseLeave={() => resetCursor()}
                >
                  <div
                    className="relative bg-neutral-300 rounded-2xl overflow-hidden aspect-[9/5]"
                  >
                    <div className="absolute inset-0 flex items-center justify-center z-10">
                      <ClockAlert size={85} strokeWidth={1} className="text-black/20" />
                    </div>

                    <div className="absolute bottom-4 left-4 z-20 flex items-center bg-black/80 backdrop-blur-lg rounded-full shadow-sm px-4 py-2 gap-3 whitespace-nowrap">
                      <span className={`${pixelify.className} text-white/50 text-sm tracking-wider uppercase`}>
                        {project.title}
                      </span>
                      <div className="w-px h-4 bg-white/20 hidden lg:block" />
                      <span className={`${pixelify.className} text-white/30 text-xs tracking-wider uppercase hidden lg:inline`}>
                        {project.tag}
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  href={project.link}
                  onClick={() => { show(); setTimeout(hide, 800); }}
                  className="group relative block"
                  data-cursor="project"
                  onMouseEnter={() => setCursor("project", { title: project.title, body: project.body, tags: project.tags })}
                  onMouseLeave={() => resetCursor()}
                >
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

                    {project.image && (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="absolute inset-0 m-auto max-w-[60%] max-h-[60%] object-contain z-10 pointer-events-none"
                      />
                    )}

                    {project.video && (
                      <video
                        src={project.video}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover z-10 pointer-events-none"
                      />
                    )}

                    {project.slideshow && (
                      <div className="absolute inset-0 z-10 overflow-hidden">
                        <div
                          className="flex flex-col w-full transition-transform duration-1000 ease-in-out"
                          style={{
                            height: `${project.slideshow.length * 100}%`,
                            transform: `translateY(-${(slideshowIndex % project.slideshow.length) * (100 / project.slideshow.length)}%)`,
                          }}
                        >
                          {project.slideshow.map((src: string) => (
                            <img
                              key={src}
                              src={src}
                              alt=""
                              className="w-full flex-shrink-0 object-cover"
                              style={{ height: `${100 / project.slideshow.length}%` }}
                            />
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="absolute bottom-4 left-4 z-20 flex items-center bg-black/80 backdrop-blur-lg rounded-full shadow-sm px-4 py-2 gap-3 whitespace-nowrap">
                      <span className={`${pixelify.className} text-white text-sm tracking-wider uppercase`}>
                        {project.title}
                      </span>
                      <div className="w-px h-4 bg-white/20 hidden lg:block" />
                      <span className={`${pixelify.className} text-white/50 text-xs tracking-wider uppercase hidden lg:inline`}>
                        {project.tag}
                      </span>
                    </div>
                  </div>
                </Link>
              )}
            </AnimatedSection>
          ))}
        </div>
      </section>
    </div>
  );
}

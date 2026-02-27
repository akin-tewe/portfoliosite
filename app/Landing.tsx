"use client";
import { pixelify, roboto } from "@/app/ui/fonts";
import { ChevronDown } from "lucide-react";
import Projects from "@/components/Projects";
import TransparentVideo from "@/components/SplashVideo"
import ExtraProjects from "@/components/ExtraProjects"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { useLoader } from "@/components/LoaderContext";
import { MainVideo } from "@/components/SplashVideo";
import { AboutButton, MagneticWrapper } from "@/components/MagneticButton";
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
        className="relative flex flex-col md:flex-row h-[100vh] items-center md:h-[50vh] bg-gray-100"
      >
        {/* Role Declaration - Scramble Decode */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isHeroInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="absolute top-1/3 md:top-1/2 left-1/2 -translate-x-1/2 md:-translate-y-1/2 text-center z-10 pointer-events-none"
        >
          <h2 className={`${pixelify.className} text-2xl md:text-5xl text-gray-800 uppercase`}>
            <ScrambleText text="UX ENGINEER" delay={500} />
          </h2>
          <div className="w-12 h-px bg-black/15 mx-auto my-3" />
          <h2 className={`${pixelify.className} text-2xl md:text-5xl text-gray-800 uppercase`}>
            <ScrambleText text="PRODUCT DESIGNER" delay={800} />
          </h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isHeroInView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 2 }}
            className={`${roboto.className} text-black/35 text-[11px] md:text-sm uppercase tracking-[0.15em] mt-6`}
          >
            Commissioned by Sprite · True Religion · Higround + more
          </motion.p>
        </motion.div>

        {/* Hero Name - Mobile */}
        <motion.span
          initial={{ opacity: 0, y: 50 }}
          animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          className={`md:hidden ${pixelify.className} relative text-8xl sm:text-9xl text-gray-900 text-right pb-28 pr-5 mt-auto leading-none`}
        >
          akin tewe
        </motion.span>

        {/* Splash Video - Desktop */}
        <div key={pathname} className="absolute hidden md:block bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[1600px] aspect-[1600/560] translate-y-[22%] z-50 pointer-events-none overflow-visible">
          <MainVideo webmSrc="/splashvideo.webm" mp4Src="/safarisplash.mp4" />
        </div>

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

      {/* About Section */}
      <section className="flex flex-col md:h-[45vh] items-center bg-white md:px-20">
        <AnimatedSection className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-30 py-16 md:py-24 md:border-b-gray-200 md:border-b w-full max-w-6xl mx-auto px-6">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={`relative text-black text-lg md:text-xl md:max-w-xl mb-15 md:mb-0 ${roboto.className} font-light leading-relaxed`}
          >
            Product Designer positioned in UI/UX development creating interfaces that emphasize
            the user and add a touch of childhood wonder. I build experiences that bring people back to the joy they grew up with.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link className="text-center block" href="/aboutme" onClick={() => { show(); setTimeout(hide, 800) }}>
              <AboutButton parameter="w-36 h-36 md:w-40 md:h-40 bg-gray-900 z-40" text="About Me" />
            </Link>
          </motion.div>
        </AnimatedSection>

        {/* Projects CTA Button */}
        <MagneticWrapper>
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="my-10 md:my-12 inline-flex relative gap-4 justify-center items-center text-xl text-black group px-6 py-4"
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className={`text-lg md:text-xl text-gray-700 z-10 group-hover:text-white transition-colors duration-300 ${pixelify.className}`}>
              PROJECTS
            </div>
            <ChevronDown className="text-gray-700 z-10 group-hover:text-white transition-colors duration-300" />
            <span className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2
            -translate-y-1/2 bg-gray-900 w-48 h-16 rounded-full -z-0 scale-0
            group-hover:scale-100 transition-transform duration-300 ease-out">
            </span>
          </motion.button>
        </MagneticWrapper>
      </section>

      {/* Projects Section */}
      <section id="projects" className="relative flex flex-col items-center justify-center h-auto">
        <div className="relative justify-center items-center w-full">
          {/* Projects Carousel */}
          <AnimatedSection className="relative flex md:mt-10 mt-5">
            <Projects />
          </AnimatedSection>

          {/* Mini Projects Indicator - Mobile */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="md:hidden flex flex-row opacity-70 justify-self-center mt-8 justify-between w-full px-8"
          >
            <p className={`${pixelify.className} uppercase text-black/50 flex items-center gap-2`}>
              <span className="w-6 h-px bg-black/30" />
              mini projects below
            </p>
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ChevronDown className="text-black/40" />
            </motion.div>
          </motion.div>
        </div>

        {/* Walking Animation */}
        <div className="relative w-full md:h-[550px] h-[300px] z-5">
          <TransparentVideo mp4Src="/walkingprojects.mp4" />
        </div>

        {/* Mini Projects Label - Desktop */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.7 }}
          viewport={{ once: true }}
          className={`${pixelify.className} hidden md:flex items-center gap-4 text-black/50 uppercase py-10`}
        >
          <span className="w-12 h-px bg-black/20" />
          mini projects below
          <span className="w-12 h-px bg-black/20" />
        </motion.p>

        {/* Extra Projects */}
        <ExtraProjects />
      </section>
    </div>
  );
}

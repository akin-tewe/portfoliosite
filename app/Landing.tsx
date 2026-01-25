"use client";
import Image from "next/image";
import { pixelify, roboto } from "@/app/ui/fonts";
import { ChevronDown } from "lucide-react";
import Projects from "@/components/Projects";
import TransparentVideo from "@/components/SplashVideo"
import ExtraProjects from "@/components/ExtraProjects"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { useLoader } from "@/components/LoaderContext";
import { MainVideo } from "@/components/SplashVideo";
import { AboutButton } from "@/components/MagneticButton";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

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
        className="relative flex flex-col md:flex-row h-[100vh] items-center md:h-[50vh] bg-blue-500"
      >
        {/* Role badge - Desktop */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={isHeroInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className={`flex flex-col text-xl pl-5 mt-20 md:mt-0 mr-auto md:mr-60 md:ml-auto text-white z-10 ${pixelify.className}`}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={isHeroInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.3, delay: 0.5 }}
          >
            <Image
              src="/Pointer.png"
              alt="Pointer Image"
              width="15"
              height="15"
              className="mb-3"
            />
          </motion.div>
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.6 }}
          >
            UX Engineer
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.7 }}
          >
            Product Designer
          </motion.span>
        </motion.div>

        {/* Hero Name - Mobile */}
        <motion.span
          initial={{ opacity: 0, y: 50 }}
          animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          className={`md:hidden ${pixelify.className} relative text-8xl sm:text-9xl text-white text-right pb-28 pr-5 mt-auto leading-none`}
        >
          akin tewe
        </motion.span>

        {/* Splash Video - Desktop */}
        <div key={pathname} className="absolute hidden md:block bottom-0 inset-0 z-50 translate-y-2/9 pointer-events-none">
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
            <ChevronDown className="text-white/50 w-6 h-6" />
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
              <AboutButton parameter="w-36 h-36 md:w-40 md:h-40 bg-blue-500 z-40" text="About Me" />
            </Link>
          </motion.div>
        </AnimatedSection>

        {/* Projects CTA Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="my-10 md:my-12 inline-flex relative gap-4 justify-center items-center text-xl text-black group px-6"
          onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className={`text-lg md:text-xl text-blue-500 z-10 group-hover:text-white transition-colors duration-300 ${pixelify.className}`}>
            PROJECTS
          </div>
          <ChevronDown className="text-blue-500 z-10 group-hover:text-white transition-colors duration-300" />
          <span className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2
          -translate-y-1/2 bg-blue-500 w-48 h-16 rounded-full -z-0 scale-0
          group-hover:scale-100 transition-transform duration-300 ease-out">
          </span>
        </motion.button>
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
            <p className={`${pixelify.className} uppercase text-white flex items-center gap-2`}>
              <span className="w-6 h-px bg-white/50" />
              mini projects below
            </p>
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ChevronDown className="text-white" />
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
          className={`${pixelify.className} hidden md:flex items-center gap-4 text-white uppercase py-10`}
        >
          <span className="w-12 h-px bg-white/30" />
          mini projects below
          <span className="w-12 h-px bg-white/30" />
        </motion.p>

        {/* Extra Projects */}
        <ExtraProjects />
      </section>
    </div>
  );
}

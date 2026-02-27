"use client";
import { ReactNode, useRef } from "react";
import { pixelify } from "@/app/ui/fonts";
import { motion, useSpring, useMotionValue } from "framer-motion";

type Props = {
  text: string;
  parameter: string;
  icon: ReactNode;
}

type Prop2 = {
  text: string;
  parameter: string;
}

// Spring config: bouncy but subtle
const springConfig = { stiffness: 200, damping: 15, mass: 0.5 };

export default function MagnetButton({text, parameter, icon}: Props) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMovement = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;

    const strength = 0.15;
    const maxOffset = 10;

    const clampedX = Math.max(-maxOffset, Math.min(maxOffset, deltaX * strength));
    const clampedY = Math.max(-maxOffset, Math.min(maxOffset, deltaY * strength));

    x.set(clampedX);
    y.set(clampedY);
  }

  const handleMovementExit = () => {
    x.set(0);
    y.set(0);
  }

  return (
    <div
        className="relative group inset-0"
        onMouseMove={handleMovement}
        onMouseLeave={handleMovementExit}
    >
        <motion.span
            className={`hidden relative md:inline-block pointer-events-none text-white text-2xl uppercase z-100 ${pixelify.className}`}
            style={{ x: springX, y: springY }}
        >
            {text}
        </motion.span>
        {icon}
        <motion.div
            className={`${parameter} scale-100 absolute rounded-full left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
            group-hover:scale-105 transition-transform z-10`}
            style={{ x: springX, y: springY }}
        />
    </div>
  )
}

export function MagneticWrapper({ children }: { children: ReactNode }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMovement = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;

    const strength = 0.15;
    const maxOffset = 10;

    const clampedX = Math.max(-maxOffset, Math.min(maxOffset, deltaX * strength));
    const clampedY = Math.max(-maxOffset, Math.min(maxOffset, deltaY * strength));

    x.set(clampedX);
    y.set(clampedY);
  }

  const handleMovementExit = () => {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
        className="inline-block"
        onMouseMove={handleMovement}
        onMouseLeave={handleMovementExit}
        style={{ x: springX, y: springY }}
    >
        {children}
    </motion.div>
  )
}

export function AboutButton({ text, parameter }: Prop2) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMovement = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;

    const strength = 0.15;
    const maxOffset = 10;

    const clampedX = Math.max(-maxOffset, Math.min(maxOffset, deltaX * strength));
    const clampedY = Math.max(-maxOffset, Math.min(maxOffset, deltaY * strength));

    x.set(clampedX);
    y.set(clampedY);
  }

  const handleMovementExit = () => {
    x.set(0);
    y.set(0);
  }

  return (
    <div
        className="relative group inset-0 flex items-center justify-center"
        onMouseMove={handleMovement}
        onMouseLeave={handleMovementExit}
    >
        <motion.span
            className={`relative md:inline-block pointer-events-none text-white text-2xl uppercase z-50 text-center ${pixelify.className}`}
            style={{ x: springX, y: springY }}
        >
            {text}
        </motion.span>
        <motion.div
            className={`${parameter} scale-100 absolute rounded-full left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
            group-hover:scale-105 transition-transform z-10`}
            style={{ x: springX, y: springY }}
        />
    </div>
  )
}

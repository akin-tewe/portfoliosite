"use client";
import { useState } from "react";
import { pixelify } from "@/app/ui/fonts";

type Props = {
  text: string
  parameter: string
}


export default function MagnetButton({text, parameter}: Props) {
  const [offset, setOffset] = useState({ x: 0, y: 0});

  const handleMovement = (e: React.MouseEvent<HTMLElement>, power: number) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;

    const strength = power;
    const maxOffset = 20;

    let x = deltaX * strength;
    let y = deltaY * strength;

    /* Clamping */

    x = Math.max(-maxOffset, Math.min(maxOffset, x));
    y = Math.max(-maxOffset, Math.min(maxOffset, y));

    setOffset({ x,y });
  }

  const handleMovementExit = () => {
    setOffset({ x: 0, y: 0})
  }

  return (
    <div
        className="relative group inset-0"
        onMouseMove={(e) => handleMovement(e, 0.3)}
        onMouseLeave={handleMovementExit}
    >
        <span className={`relative inline-block pointer-events-none text-white text-xl uppercase z-30 duration-100 ease-out ${pixelify.className}`} style={{transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,}}>{text}</span>
        <div className={`${parameter} scale-100 absolute rounded-full left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
        group-hover:scale-110 transition-transform z-10 duration-100 ease-out`} style={{transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,}}></div>
    </div>
  )
}
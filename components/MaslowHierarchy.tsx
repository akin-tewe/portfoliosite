"use client";
import { pixelify, roboto } from "@/app/ui/fonts";

const levels = [
  {
    title: "Self-Actualization",
    body: "Balancing pioneering one's own brand while simultaneously providing their audience with reliable art is key for artists to feel autonomy.",
    color: "bg-purple-400",
    dots: [[0, 0]], // 1 dot, top-left
  },
  {
    title: "Self-Esteem",
    body: "How artists fulfill self-esteem needs provokes a conversation about human's need for adversity. feeling inferior fuels their creative process.",
    color: "bg-sky-400",
    dots: [[0, 0], [1, 1]], // 2 dots diagonal
  },
  {
    title: "Social",
    body: "Socializing is a crucial part of daily life. constant collaboration and a network of artists create a safe space for healthy competition.",
    color: "bg-lime-400",
    dots: [[0, 0], [0, 1], [1, 0]], // 3 dots
  },
  {
    title: "Safety",
    body: "Feeling safe to create means feeling safe to live. Technology has additionally allowed artists more freedom in a creative space.",
    color: "bg-yellow-400",
    dots: [[0, 0], [0, 1], [1, 0], [1, 1]], // 4 dots 2x2
  },
  {
    title: "Physiological",
    body: "Artists need a space/studio to exist in. New tech has allowed their work to become condensed to a single computer, allowing for additional mobility.",
    color: "bg-red-400",
    dots: [[0, 0], [0, 1], [1, 0], [1, 1], [2, 0], [2, 1]], // 6 dots 3x2
  },
];

function DotGrid({ dots }: { dots: number[][] }) {
  return (
    <div className="flex flex-col gap-1.5">
      {/* Build rows from dot positions */}
      {Array.from(new Set(dots.map((d) => d[0])))
        .sort()
        .map((row) => (
          <div key={row} className="flex gap-1.5">
            {dots
              .filter((d) => d[0] === row)
              .map((_, i) => (
                <div
                  key={i}
                  className="w-2.5 h-2.5 md:w-3 md:h-3 bg-white rounded-full"
                />
              ))}
          </div>
        ))}
    </div>
  );
}

export default function MaslowHierarchy() {
  return (
    <div className="flex gap-4 md:gap-6 max-w-xl py-6 md:py-10">
      {/* Color bar with dots */}
      <div className="flex flex-col w-16 md:w-20 flex-shrink-0 rounded-lg overflow-hidden">
        {levels.map((level, i) => (
          <div
            key={i}
            className={`${level.color} flex-1 flex items-center justify-center px-2 py-6 md:py-8`}
          >
            <DotGrid dots={level.dots} />
          </div>
        ))}
      </div>

      {/* Text content */}
      <div className="flex flex-col">
        {levels.map((level, i) => (
          <div key={i} className="flex-1 flex flex-col justify-center py-2 md:py-3">
            <h3
              className={`${pixelify.className} text-blue-500 text-base md:text-xl uppercase tracking-wide mb-1`}
            >
              {level.title}
            </h3>
            <p
              className={`${roboto.className} text-gray-700 text-xs md:text-sm font-light leading-relaxed`}
            >
              {level.body}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

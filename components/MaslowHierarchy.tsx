"use client";
import { pixelify, roboto } from "@/app/ui/fonts";

const levels = [
  {
    title: "Self-Actualization",
    body: "Balancing pioneering one's own brand while simultaneously providing their audience with reliable art is key for artists to feel autonomy.",
    color: "bg-purple-400",
    count: 1,
  },
  {
    title: "Self-Esteem",
    body: "How artists fulfill self-esteem needs provokes a conversation about human's need for adversity. feeling inferior fuels their creative process.",
    color: "bg-sky-400",
    count: 2,
  },
  {
    title: "Social",
    body: "Socializing is a crucial part of daily life. constant collaboration and a network of artists create a safe space for healthy competition.",
    color: "bg-lime-400",
    count: 3,
  },
  {
    title: "Safety",
    body: "Feeling safe to create means feeling safe to live. Technology has additionally allowed artists more freedom in a creative space.",
    color: "bg-yellow-400",
    count: 4,
  },
  {
    title: "Physiological",
    body: "Artists need a space/studio to exist in. New tech has allowed their work to become condensed to a single computer, allowing for additional mobility.",
    color: "bg-red-400",
    count: 5,
  },
];

const DOT = "w-2.5 h-2.5 md:w-3 md:h-3 bg-white rounded-full";
const DOT_INVIS = "w-2.5 h-2.5 md:w-3 md:h-3 bg-transparent rounded-full";

function DotPattern({ count }: { count: number }) {
  switch (count) {
    case 1:
      return (
        <div className="flex justify-center">
          <div className={DOT} />
        </div>
      );
    case 2:
      return (
        <div className="flex flex-col gap-1.5 items-center">
          <div className={DOT} />
          <div className={DOT} />
        </div>
      );
    case 3:
      // Diagonal staircase: right, center-left, left
      return (
        <div className="flex flex-col gap-1.5">
          <div className="flex gap-1.5">
            <div className={DOT_INVIS} />
            <div className={DOT} />
          </div>
          <div className="flex gap-1.5 justify-center">
            <div className={DOT} />
          </div>
          <div className="flex gap-1.5">
            <div className={DOT} />
            <div className={DOT_INVIS} />
          </div>
        </div>
      );
    case 4:
      // 2x2 grid
      return (
        <div className="flex flex-col gap-1.5 items-center">
          <div className="flex gap-1.5">
            <div className={DOT} />
            <div className={DOT} />
          </div>
          <div className="flex gap-1.5">
            <div className={DOT} />
            <div className={DOT} />
          </div>
        </div>
      );
    case 5:
      // 2-1-2 pattern: 2 top, 1 centered middle, 2 bottom
      return (
        <div className="flex flex-col gap-1.5 items-center">
          <div className="flex gap-1.5">
            <div className={DOT} />
            <div className={DOT} />
          </div>
          <div className="flex justify-center">
            <div className={DOT} />
          </div>
          <div className="flex gap-1.5">
            <div className={DOT} />
            <div className={DOT} />
          </div>
        </div>
      );
    default:
      return null;
  }
}

export default function MaslowHierarchy() {
  return (
    <div className="flex gap-4 md:gap-6 max-w-xl mx-auto py-6 md:py-10">
      {/* Color bar with dots */}
      <div className="flex flex-col w-16 md:w-20 flex-shrink-0 rounded-lg overflow-hidden">
        {levels.map((level, i) => (
          <div
            key={i}
            className={`${level.color} flex-1 flex items-center justify-center px-2 py-6 md:py-8`}
          >
            <DotPattern count={level.count} />
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

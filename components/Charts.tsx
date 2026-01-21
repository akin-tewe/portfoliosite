"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

// Color palette matching the original PNG charts
const CHART_COLORS = [
  "#F44336", // Red
  "#F96B4B", // Orange-red
  "#F9A846", // Orange
  "#FACE3E", // Yellow
  "#D1E231", // Lime-yellow
  "#7FFF00", // Chartreuse/lime
];

interface BarData {
  label: string;
  value: number;
  color?: string;
}

interface ChartProps {
  data: BarData[];
  title?: string;
  showLabels?: boolean;
  className?: string;
  maxValue?: number;
}

// Horizontal Bar Chart Component
export function HorizontalBarChart({
  data,
  title,
  showLabels = true,
  className = "",
  maxValue
}: ChartProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const max = maxValue || Math.max(...data.map(d => d.value));

  return (
    <div ref={ref} className={`w-full ${className}`}>
      {title && (
        <motion.h3
          className="text-white/60 text-sm md:text-base mb-4 font-light"
          initial={{ opacity: 0, y: -10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          {title}
        </motion.h3>
      )}
      <div className="flex flex-col gap-3 md:gap-4">
        {data.map((item, index) => (
          <div key={index} className="flex flex-col gap-1">
            {showLabels && (
              <motion.span
                className="text-white/70 text-xs md:text-sm"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: index * 0.08 }}
              >
                {item.label}
              </motion.span>
            )}
            <div className="relative h-6 md:h-8 bg-white/10 rounded-sm overflow-hidden">
              <motion.div
                className="absolute left-0 top-0 h-full rounded-sm"
                style={{ backgroundColor: item.color || CHART_COLORS[index % CHART_COLORS.length] }}
                initial={{ width: 0 }}
                animate={isInView ? { width: `${(item.value / max) * 100}%` } : {}}
                transition={{
                  duration: 0.8,
                  delay: index * 0.1,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
              />
              <motion.span
                className="absolute right-2 top-1/2 -translate-y-1/2 text-white/80 text-xs md:text-sm font-medium"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.3, delay: index * 0.1 + 0.5 }}
              >
                {item.value}%
              </motion.span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Vertical Bar Chart Component
export function VerticalBarChart({
  data,
  title,
  showLabels = true,
  className = "",
  maxValue
}: ChartProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const max = maxValue || Math.max(...data.map(d => d.value));

  return (
    <div ref={ref} className={`w-full ${className}`}>
      {title && (
        <motion.h3
          className="text-white/60 text-sm md:text-base mb-4 font-light text-center"
          initial={{ opacity: 0, y: -10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          {title}
        </motion.h3>
      )}
      <div className="flex items-end justify-center gap-2 md:gap-4 h-40 md:h-52 lg:h-64">
        {data.map((item, index) => (
          <div key={index} className="flex flex-col items-center gap-2 flex-1 max-w-16 md:max-w-20">
            <motion.span
              className="text-white/80 text-xs md:text-sm font-medium"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.3, delay: index * 0.1 + 0.5 }}
            >
              {item.value}%
            </motion.span>
            <div className="relative w-full h-full bg-white/10 rounded-t-sm overflow-hidden flex items-end">
              <motion.div
                className="w-full rounded-t-sm"
                style={{ backgroundColor: item.color || CHART_COLORS[index % CHART_COLORS.length] }}
                initial={{ height: 0 }}
                animate={isInView ? { height: `${(item.value / max) * 100}%` } : {}}
                transition={{
                  duration: 0.8,
                  delay: index * 0.12,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
              />
            </div>
            {showLabels && (
              <motion.span
                className="text-white/60 text-[10px] md:text-xs text-center leading-tight h-8 flex items-start"
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: index * 0.08 }}
              >
                {item.label}
              </motion.span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// Donut Chart Component
interface DonutData {
  label: string;
  value: number;
  color?: string;
}

interface DonutChartProps {
  data: DonutData[];
  title?: string;
  size?: number;
  className?: string;
}

export function DonutChart({
  data,
  title,
  size = 200,
  className = ""
}: DonutChartProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const total = data.reduce((sum, item) => sum + item.value, 0);
  const strokeWidth = size * 0.18;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  let cumulativePercentage = 0;

  return (
    <div ref={ref} className={`flex flex-col md:flex-row items-center gap-6 md:gap-10 ${className}`}>
      <div className="relative" style={{ width: size, height: size }}>
        {title && (
          <motion.h3
            className="absolute inset-0 flex items-center justify-center text-white/60 text-xs md:text-sm font-light text-center px-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {title}
          </motion.h3>
        )}
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="transform -rotate-90"
        >
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth={strokeWidth}
          />
          {/* Data segments */}
          {data.map((item, index) => {
            const percentage = item.value / total;
            const strokeDasharray = `${circumference * percentage} ${circumference}`;
            const strokeDashoffset = -circumference * cumulativePercentage;
            cumulativePercentage += percentage;

            return (
              <motion.circle
                key={index}
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke={item.color || CHART_COLORS[index % CHART_COLORS.length]}
                strokeWidth={strokeWidth}
                strokeDasharray={strokeDasharray}
                strokeLinecap="butt"
                initial={{ strokeDashoffset: circumference, opacity: 0 }}
                animate={isInView ? {
                  strokeDashoffset: strokeDashoffset,
                  opacity: 1
                } : {}}
                transition={{
                  duration: 1,
                  delay: index * 0.15,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
                style={{
                  transformOrigin: 'center',
                }}
              />
            );
          })}
        </svg>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap md:flex-col gap-2 md:gap-3 justify-center">
        {data.map((item, index) => (
          <motion.div
            key={index}
            className="flex items-center gap-2"
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4, delay: index * 0.1 + 0.5 }}
          >
            <div
              className="w-3 h-3 md:w-4 md:h-4 rounded-sm flex-shrink-0"
              style={{ backgroundColor: item.color || CHART_COLORS[index % CHART_COLORS.length] }}
            />
            <span className="text-white/70 text-xs md:text-sm whitespace-nowrap">
              {item.label} ({Math.round((item.value / total) * 100)}%)
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// Chart data for Instagram project
export const chartData = {
  // Mobile Search ease - vertical bar chart
  mobileSearch: [
    { label: "Very Hard", value: 5, color: "#F44336" },
    { label: "Hard", value: 65, color: "#F96B4B" },
    { label: "Neutral", value: 75, color: "#F9A846" },
    { label: "Easy", value: 50, color: "#FACE3E" },
    { label: "Very Easy", value: 20, color: "#7FFF00" },
  ],

  // Web Search ease - vertical bar chart
  webSearch: [
    { label: "Very Hard", value: 70, color: "#F44336" },
    { label: "Hard", value: 80, color: "#F96B4B" },
    { label: "Neutral", value: 35, color: "#F9A846" },
    { label: "Easy", value: 45, color: "#FACE3E" },
    { label: "Very Easy", value: 25, color: "#7FFF00" },
  ],

  // Mobile Use frequency - horizontal bar chart
  mobileUse: [
    { label: "Multiple times daily", value: 85, color: "#F44336" },
    { label: "Once daily", value: 70, color: "#F96B4B" },
    { label: "Few times weekly", value: 25, color: "#F9A846" },
    { label: "Once weekly", value: 40, color: "#FACE3E" },
    { label: "Rarely", value: 15, color: "#D1E231" },
    { label: "Never", value: 10, color: "#7FFF00" },
  ],

  // Web Use frequency - horizontal bar chart
  webUse: [
    { label: "Multiple times daily", value: 68, color: "#F44336" },
    { label: "Once daily", value: 50, color: "#F96B4B" },
    { label: "Few times weekly", value: 85, color: "#F9A846" },
    { label: "Once weekly", value: 35, color: "#FACE3E" },
    { label: "Rarely", value: 25, color: "#D1E231" },
    { label: "Never", value: 35, color: "#7FFF00" },
  ],

  // Use frequency comparison - vertical bar chart (ascending)
  useFrequency: [
    { label: "Never", value: 8, color: "#F44336" },
    { label: "Rarely", value: 15, color: "#F96B4B" },
    { label: "Weekly", value: 35, color: "#F9A846" },
    { label: "Daily", value: 55, color: "#FACE3E" },
    { label: "Multiple", value: 85, color: "#7FFF00" },
  ],

  // Web Interaction level - vertical bar chart
  webInteraction: [
    { label: "None", value: 15, color: "#F44336" },
    { label: "Low", value: 10, color: "#F96B4B" },
    { label: "Medium", value: 90, color: "#F9A846" },
    { label: "High", value: 30, color: "#FACE3E" },
    { label: "Very High", value: 5, color: "#7FFF00" },
  ],

  // Web Messaging ease - vertical bar chart
  webMessaging: [
    { label: "Very Hard", value: 35, color: "#F44336" },
    { label: "Hard", value: 85, color: "#F96B4B" },
    { label: "Neutral", value: 50, color: "#F9A846" },
    { label: "Easy", value: 8, color: "#FACE3E" },
  ],

  // Frustrations - horizontal bar chart
  frustrations: [
    { label: "Poor navigation", value: 90, color: "#F44336" },
    { label: "Cluttered interface", value: 78, color: "#F96B4B" },
    { label: "Hidden features", value: 25, color: "#F9A846" },
    { label: "Slow performance", value: 45, color: "#FACE3E" },
    { label: "Missing features", value: 15, color: "#D1E231" },
    { label: "Messaging issues", value: 30, color: "#D1E231" },
    { label: "Hard to find content", value: 72, color: "#7FFF00" },
    { label: "Other", value: 12, color: "#7FFF00" },
  ],

  // Improvements - donut chart
  improvements: [
    { label: "Better navigation", value: 40, color: "#F44336" },
    { label: "Improved messaging", value: 30, color: "#7FFF00" },
    { label: "Cleaner UI", value: 15, color: "#FACE3E" },
    { label: "Enhanced search", value: 10, color: "#F9A846" },
    { label: "Other", value: 5, color: "#F96B4B" },
  ],
};

// Chart data for 3D Research project
export const researchChartData = {
  // Maslow's Hierarchy adapted for creative labor
  maslowCreative: [
    { label: "Self-Actualization", value: 15, color: "#7FFF00" },
    { label: "Esteem", value: 25, color: "#D1E231" },
    { label: "Social Belonging", value: 35, color: "#FACE3E" },
    { label: "Security", value: 55, color: "#F9A846" },
    { label: "Physiological", value: 70, color: "#F44336" },
  ],

  // Artist concerns distribution
  artistConcerns: [
    { label: "Financial Stability", value: 85, color: "#F44336" },
    { label: "Platform Dependence", value: 72, color: "#F96B4B" },
    { label: "Impostor Syndrome", value: 68, color: "#F9A846" },
    { label: "AI Disruption", value: 45, color: "#FACE3E" },
    { label: "Work-Life Balance", value: 58, color: "#D1E231" },
    { label: "Creative Burnout", value: 62, color: "#7FFF00" },
  ],

  // Freedom vs Stability tension
  freedomStability: [
    { label: "Full Freedom", value: 25, color: "#7FFF00" },
    { label: "Mostly Free", value: 40, color: "#D1E231" },
    { label: "Balanced", value: 55, color: "#FACE3E" },
    { label: "Mostly Stable", value: 35, color: "#F9A846" },
    { label: "Full Stability", value: 15, color: "#F44336" },
  ],

  // Technology perception
  techPerception: [
    { label: "Blender (Positive)", value: 92, color: "#7FFF00" },
    { label: "Social Media", value: 58, color: "#FACE3E" },
    { label: "AI Tools", value: 35, color: "#F44336" },
  ],

  // Interview themes distribution
  interviewThemes: [
    { label: "Creative Freedom", value: 30, color: "#7FFF00" },
    { label: "Financial Reality", value: 28, color: "#F44336" },
    { label: "Platform Experience", value: 22, color: "#F9A846" },
    { label: "Community Impact", value: 12, color: "#D1E231" },
    { label: "Future Outlook", value: 8, color: "#FACE3E" },
  ],
};

// Comparison Chart - Two charts side by side
interface ComparisonChartProps {
  leftData: BarData[];
  rightData: BarData[];
  leftTitle: string;
  rightTitle: string;
  type: "horizontal" | "vertical";
  className?: string;
}

export function ComparisonChart({
  leftData,
  rightData,
  leftTitle,
  rightTitle,
  type,
  className = ""
}: ComparisonChartProps) {
  const ChartComponent = type === "horizontal" ? HorizontalBarChart : VerticalBarChart;

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 ${className}`}>
      <ChartComponent data={leftData} title={leftTitle} />
      <ChartComponent data={rightData} title={rightTitle} />
    </div>
  );
}

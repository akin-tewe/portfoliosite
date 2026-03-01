"use client";
import { useEffect, useRef, useState } from "react";

const CHAT_MESSAGES = [
  { user: "rustykc", color: "#bf94ff", text: "YOOOOO" },
  { user: "DoNotCall", color: "#00b8ff", text: "THIS INTRO IS CRAZY" },
  { user: "xolortie", color: "#ff6b9d", text: "W W W W W" },
  { user: "kroniks__", color: "#ffb636", text: "who made this??" },
  { user: "TitoHut", color: "#1ef07d", text: "the animation is insane" },
  { user: "hardstuckstepsis", color: "#ff4d4d", text: "RAGE GOT THE BEST INTRO ON TWITCH" },
  { user: "gaurev7156", color: "#c9b2ff", text: "brooo the 3D" },
  { user: "Chamboras", color: "#00d4aa", text: "NEW INTRO HYPE" },
  { user: "harrys4nders", color: "#ffcc44", text: "actual movie quality" },
  { user: "chikooooo", color: "#ff69b4", text: "chat we are so back" },
  { user: "skeepsy", color: "#87ceeb", text: "the legs LMAOOO" },
  { user: "Zamboss1337", color: "#ff6347", text: "WWWWWWWWWW" },
  { user: "UltraChrisJay", color: "#daa520", text: "this goes dummy hard" },
  { user: "duckducksmiler", color: "#98fb98", text: "replay it" },
  { user: "IlBananas", color: "#ff8c00", text: "MYHEART MYHEART" },
  { user: "nt_bladeoh", color: "#7fffd4", text: "rage looks so fire in this" },
  { user: "Wizzy_B", color: "#ff69ff", text: "the mechanical legs ????" },
  { user: "GambersFailacy", color: "#6495ed", text: "bro that transition" },
  { user: "stakenight", color: "#ffa07a", text: "how much did this cost" },
  { user: "rustykc", color: "#bf94ff", text: "play it again" },
  { user: "xolortie", color: "#ff6b9d", text: "best intro on the platform no cap" },
  { user: "kroniks__", color: "#ffb636", text: "the chase scene tho" },
  { user: "TitoHut", color: "#1ef07d", text: "PLAY IT BACK" },
  { user: "chikooooo", color: "#ff69b4", text: "whoever animated this W" },
  { user: "Chamboras", color: "#00d4aa", text: "LEGENDARY" },
];

export default function TwitchChat() {
  const [visibleMessages, setVisibleMessages] = useState<typeof CHAT_MESSAGES>([]);
  const msgIndex = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Start with a few messages
    setVisibleMessages(CHAT_MESSAGES.slice(0, 4));
    msgIndex.current = 4;

    const interval = setInterval(() => {
      const next = CHAT_MESSAGES[msgIndex.current % CHAT_MESSAGES.length];
      msgIndex.current++;
      setVisibleMessages(prev => {
        const updated = [...prev, next];
        // Keep last 12 messages visible
        if (updated.length > 12) return updated.slice(-12);
        return updated;
      });
    }, 800 + Math.random() * 400);

    return () => clearInterval(interval);
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [visibleMessages]);

  return (
    <div
      style={{
        width: 280,
        height: 320,
        backgroundColor: "#18181b",
        borderRadius: 8,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        fontFamily: "Inter, Helvetica Neue, Helvetica, Arial, sans-serif",
        fontSize: 13,
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "8px 12px",
          borderBottom: "1px solid #2f2f35",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <span style={{ color: "#efeff1", fontWeight: 600, fontSize: 12, letterSpacing: "0.02em" }}>
          STREAM CHAT
        </span>
      </div>

      {/* Messages */}
      <div
        ref={containerRef}
        style={{
          flex: 1,
          overflowY: "hidden",
          padding: "8px 12px",
          display: "flex",
          flexDirection: "column",
          gap: 4,
        }}
      >
        {visibleMessages.map((msg, i) => (
          <div
            key={`${msg.user}-${i}-${msgIndex.current}`}
            style={{
              lineHeight: 1.4,
              animation: "twitchFadeIn 0.2s ease-out",
            }}
          >
            <span style={{ color: msg.color, fontWeight: 600 }}>
              {msg.user}
            </span>
            <span style={{ color: "#adadb8" }}>: </span>
            <span style={{ color: "#efeff1" }}>{msg.text}</span>
          </div>
        ))}
      </div>

      {/* Input bar */}
      <div
        style={{
          padding: "8px 12px",
          borderTop: "1px solid #2f2f35",
          flexShrink: 0,
        }}
      >
        <div
          style={{
            backgroundColor: "#3b3b44",
            borderRadius: 4,
            padding: "6px 10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span style={{ color: "#7a7a85", fontSize: 12 }}>
            Send a message
          </span>
          <span
            style={{
              backgroundColor: "#9147ff",
              color: "#fff",
              fontSize: 11,
              fontWeight: 600,
              padding: "3px 10px",
              borderRadius: 4,
            }}
          >
            Chat
          </span>
        </div>
      </div>

      <style jsx>{`
        @keyframes twitchFadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

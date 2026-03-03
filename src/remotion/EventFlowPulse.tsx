import {
  AbsoluteFill,
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

import { type Locale } from "@/lib/site-content";

const text = {
  he: {
    top: "EVENTFLOW",
    title: "האירוע מתקדם",
    lines: ["יוצרים", "שולחים לינק", "רואים מי מגיע", "מסמנים ביום האירוע"],
    score: "מוכנות 82%",
    chipA: "רשימה פנימית",
    chipB: "מה מביאים",
    chipC: "צ'ק-אין",
  },
  en: {
    top: "EVENTFLOW",
    title: "The event is moving",
    lines: ["Create", "Share", "Track attendance", "Check-in on event day"],
    score: "82% ready",
    chipA: "Private list",
    chipB: "Bring list",
    chipC: "Check-in",
  },
} as const;

export function EventFlowPulse({ locale = "he" }: { locale?: Locale }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const copy = text[locale];

  const reveal = spring({
    fps,
    frame,
    config: {
      damping: 200,
      mass: 0.8,
      stiffness: 120,
    },
  });

  const drift = interpolate(frame, [0, 180], [-18, 18], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.ease),
  });

  const pulse = interpolate(frame % 90, [0, 45, 90], [0.82, 1, 0.82], {
    easing: Easing.inOut(Easing.ease),
  });

  return (
    <AbsoluteFill
      style={{
        overflow: "hidden",
        background:
          "radial-gradient(circle at 20% 15%, rgba(251, 191, 36, 0.24), transparent 24%), radial-gradient(circle at 85% 20%, rgba(244, 114, 182, 0.18), transparent 26%), linear-gradient(180deg, #111111 0%, #1f1b18 100%)",
        color: "#fff7ed",
        fontFamily: "var(--font-body), sans-serif",
      }}
    >
      <AbsoluteFill
        style={{
          transform: `translateY(${drift}px)`,
          background:
            "radial-gradient(circle at 50% 50%, rgba(251, 191, 36, 0.18), transparent 30%)",
          filter: "blur(30px)",
          opacity: pulse,
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 24,
          borderRadius: 32,
          border: "1px solid rgba(255,255,255,0.12)",
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03))",
          padding: 28,
          boxShadow: "0 20px 60px rgba(0,0,0,0.24)",
          transform: `scale(${0.92 + reveal * 0.08})`,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              borderRadius: 999,
              background: "rgba(255,255,255,0.08)",
              padding: "10px 14px",
              fontSize: 17,
              letterSpacing: "0.24em",
            }}
          >
            <span
              style={{
                display: "inline-flex",
                width: 10,
                height: 10,
                borderRadius: 999,
                background: "#fbbf24",
                boxShadow: "0 0 18px rgba(251,191,36,0.8)",
              }}
            />
            {copy.top}
          </div>
          <div
            style={{
              borderRadius: 999,
              background: "rgba(255,255,255,0.1)",
              padding: "10px 14px",
              fontSize: 18,
              color: "#fde68a",
            }}
          >
            {copy.score}
          </div>
        </div>

        <div
          style={{
            marginTop: 26,
            display: "grid",
            gap: 24,
            gridTemplateColumns: "1.05fr 0.95fr",
            alignItems: "end",
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "var(--font-display), serif",
                fontSize: 66,
                lineHeight: 0.95,
                letterSpacing: "-0.05em",
                transform: `translateY(${28 - reveal * 28}px)`,
                opacity: reveal,
              }}
            >
              {copy.title}
            </div>

            <div
              style={{
                display: "flex",
                gap: 10,
                flexWrap: "wrap",
                marginTop: 22,
              }}
            >
              {[copy.chipA, copy.chipB, copy.chipC].map((chip, index) => (
                <div
                  key={chip}
                  style={{
                    borderRadius: 999,
                    border: "1px solid rgba(255,255,255,0.12)",
                    background: "rgba(255,255,255,0.06)",
                    padding: "10px 14px",
                    fontSize: 18,
                    opacity: interpolate(frame, [index * 8, 24 + index * 8], [0, 1], {
                      extrapolateLeft: "clamp",
                      extrapolateRight: "clamp",
                    }),
                    transform: `translateY(${interpolate(
                      frame,
                      [index * 8, 24 + index * 8],
                      [18, 0],
                      {
                        extrapolateLeft: "clamp",
                        extrapolateRight: "clamp",
                      },
                    )}px)`,
                  }}
                >
                  {chip}
                </div>
              ))}
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gap: 12,
            }}
          >
            {copy.lines.map((line, index) => {
              const lineReveal = interpolate(frame, [10 + index * 9, 34 + index * 9], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              });

              return (
                <div
                  key={line}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 12,
                    borderRadius: 22,
                    background:
                      index === 2
                        ? "linear-gradient(135deg, rgba(251,191,36,0.18), rgba(255,255,255,0.08))"
                        : "rgba(255,255,255,0.06)",
                    padding: "14px 16px",
                    opacity: lineReveal,
                    transform: `translateX(${(1 - lineReveal) * 26}px)`,
                  }}
                >
                  <span style={{ fontSize: 20 }}>{line}</span>
                  <span
                    style={{
                      width: 12,
                      height: 12,
                      borderRadius: 999,
                      background: index < 3 ? "#fbbf24" : "rgba(255,255,255,0.22)",
                      boxShadow:
                        index < 3 ? "0 0 18px rgba(251,191,36,0.7)" : "0 0 0 transparent",
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
}

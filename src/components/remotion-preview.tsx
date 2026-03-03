"use client";

import { Player } from "@remotion/player";

import { type Locale } from "@/lib/site-content";
import { EventFlowPulse } from "@/remotion/EventFlowPulse";

export function RemotionPreview({ locale }: { locale: Locale }) {
  return (
    <div className="motion-preview-shell">
      <Player
        acknowledgeRemotionLicense
        autoPlay
        clickToPlay={false}
        component={EventFlowPulse}
        controls={false}
        durationInFrames={180}
        fps={30}
        inputProps={{ locale }}
        loop
        compositionHeight={720}
        compositionWidth={1280}
        className="motion-preview-player"
        style={{
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  );
}

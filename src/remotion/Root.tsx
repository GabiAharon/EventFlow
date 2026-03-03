import { Composition } from "remotion";

import { EventFlowPulse } from "@/remotion/EventFlowPulse";

export const RemotionRoot = () => {
  return (
    <>
      <Composition
        id="EventFlowPulseHe"
        component={EventFlowPulse}
        defaultProps={{ locale: "he" }}
        durationInFrames={180}
        fps={30}
        height={720}
        width={1280}
      />
      <Composition
        id="EventFlowPulseEn"
        component={EventFlowPulse}
        defaultProps={{ locale: "en" }}
        durationInFrames={180}
        fps={30}
        height={720}
        width={1280}
      />
    </>
  );
};

import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "EventFlow",
    short_name: "EventFlow",
    description:
      "Bilingual event PWA for event creation, attendance confirmations, recommendations, and offline-ready check-in.",
    start_url: "/",
    display: "standalone",
    background_color: "#f7efe5",
    theme_color: "#171717",
    lang: "he",
    orientation: "portrait",
    icons: [
      {
        src: "/icons/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: "/icons/icon-maskable.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "maskable",
      },
    ],
  };
}

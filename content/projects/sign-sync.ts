import type { ProjectEntry } from "../../lib/types";

const entry: ProjectEntry = {
  id: "project-sign-sync",
  slug: "sign-sync",

  title: "Sign Sync",
  timeframe: "January 2025 – Present",

  description:
    "Developed an Android application to support communication accessibility by connecting deaf users with ASL interpreters via real-time video calls and on-device sign recognition. Built with structured architecture and scalable backend services for user data and session management.",

  tags: [
    "Android Studio",
    "MVVM",
    "Firebase",
    "Jitsi Meet SDK",
    "OpenCV",
    "TensorFlow",
    "ASL Recognition",
    "Mobile Development",
    "GitHub",
  ],

  links: [
    // Links not available yet — keep empty for now, but preserve Details route for your internal page
    { label: "Details", href: "/projects/sign-sync", kind: "details" },
  ],

  image: {
    // public/images/projects/sign-sync.png -> /images/projects/sign-sync.png
    src: "/images/projects/sign-sync.png",
    alt: "Sign Sync project background",
  },

  details:
    "Highlights:\n" +
    "• Built an Android app in Android Studio using MVVM to keep UI, state, and data flows clean and maintainable.\n" +
    "• Integrated Firebase for data storage and user/session management; added Jitsi Meet SDK for real-time video calls between deaf users and ASL interpreters.\n" +
    "• Implemented an ASL recognition module with OpenCV + TensorFlow for real-time sign translation to better support accessibility use cases.",

  chronology: { kind: "year", year: 2026, order: 2 },
};

export default entry;

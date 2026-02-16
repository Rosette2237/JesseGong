export type TechSkill = {
  id: string;
  name: string;
  proficiency: "Beginner" | "Intermediate" | "Advanced" | "Expert" | "Proficient";
  iconSrc?: string; // /images/skills/icons/...
};

export type SoftSkill = {
  id: string;
  name: string;
  avatarSrc?: string; // /images/skills/avatars/...
};

const P = "Proficient" as const;

// TECH STACK (all proficient, per your instruction)
export const technicalStack: TechSkill[] = [
  { id: "python", name: "Python", proficiency: P, iconSrc: "/images/skills/icons/python.png" },
  { id: "sql", name: "SQL", proficiency: P, iconSrc: "/images/skills/icons/sql.png" },
  { id: "java", name: "Java", proficiency: P, iconSrc: "/images/skills/icons/java.png" },
  { id: "react", name: "React.js", proficiency: P, iconSrc: "/images/skills/icons/react.png" },
  { id: "express", name: "Express.js", proficiency: P, iconSrc: "/images/skills/icons/express.png" },
  { id: "node", name: "Node.js", proficiency: P, iconSrc: "/images/skills/icons/node.png" },
  { id: "html", name: "HTML", proficiency: P, iconSrc: "/images/skills/icons/html.png" },
  { id: "css", name: "CSS", proficiency: P, iconSrc: "/images/skills/icons/css.png" },
  { id: "mongodb", name: "MongoDB", proficiency: P, iconSrc: "/images/skills/icons/mongodb.png" },
  { id: "firebase", name: "Firebase", proficiency: P, iconSrc: "/images/skills/icons/firebase.png" },
  { id: "git", name: "Git", proficiency: P, iconSrc: "/images/skills/icons/git.png" },
  { id: "linux", name: "Linux", proficiency: P, iconSrc: "/images/skills/icons/linux.png" },
  { id: "r", name: "R", proficiency: P, iconSrc: "/images/skills/icons/r.png" },
  { id: "django", name: "Django", proficiency: P, iconSrc: "/images/skills/icons/django.png" },
  { id: "c-cpp", name: "C/C++", proficiency: P, iconSrc: "/images/skills/icons/cpp.png" },
  { id: "matlab", name: "MATLAB", proficiency: P, iconSrc: "/images/skills/icons/matlab.png" },
  { id: "pytorch", name: "PyTorch", proficiency: P, iconSrc: "/images/skills/icons/pytorch.png" },
];

// SKILLS (avatars optional; you’ll add images later)
export const skills: SoftSkill[] = [
  { id: "math-modeling", name: "Mathematics Modelling", avatarSrc: "/images/skills/avatars/math-modeling.png" },
  { id: "optimization", name: "Optimization", avatarSrc: "/images/skills/avatars/optimization.png" },
  { id: "problem-solving", name: "Problem Solving", avatarSrc: "/images/skills/avatars/problem-solving.png" },
  { id: "system-design", name: "System Design", avatarSrc: "/images/skills/avatars/system-design.png" },
  { id: "public-speaking", name: "Public Speaking", avatarSrc: "/images/skills/avatars/public-speaking.png" },
  { id: "meeting-minutes", name: "Meeting Minutes", avatarSrc: "/images/skills/avatars/meeting-minutes.png" },
  { id: "case-studies", name: "Case Studies", avatarSrc: "/images/skills/avatars/case-studies.png" },
  { id: "research", name: "Research", avatarSrc: "/images/skills/avatars/research.png" },
];

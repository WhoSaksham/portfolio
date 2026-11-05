export const person = {
  name: "Saksham Agarwal",
  role: "Full Stack Engineer",
  location: "Bangalore, India",
  links: {
    email: "sakshamag.work@gmail.com",
    phone: "+91 8869070495",
    github: "https://github.com/WhoSaksham",
    linkedin: "https://www.linkedin.com/in/saksham-agarwal7",
    resume: "/Saksham_Agarwal_FullStack_4.5Yrs.pdf",
  },
  summary:
    "Full Stack Engineer with 4.5+ years of experience designing, developing, and delivering scalable web and mobile applications using React.js, Next.js, Node.js, Express.js, Java, Spring Boot and modern JavaScript technologies.",
} as const;

export const stats = [
  { value: "4.5+", label: "years building web, mobile & backend" },
  { value: "100K+", label: "daily active users served" },
  { value: "~30%", label: "faster page loads" },
  { value: "~40%", label: "fewer unnecessary re-renders" },
  { value: "5", label: "companies shipped at" },
] as const;

export type Role = {
  company: string;
  title: string;
  location: string;
  start: string;
  end: string;
  highlights: readonly string[];
  tech: readonly string[];
};

export const experience: readonly Role[] = [
  {
    company: "Codilar Technologies",
    title: "Software Engineer",
    location: "Bangalore, India",
    start: "Jun 2025",
    end: "Present",
    highlights: [
      "Developed and optimized enterprise-scale eCommerce solutions serving 100K+ daily active users, improving customer experience across high-traffic purchase journeys.",
      "Owned business-critical commerce workflows including cart, checkout, recommendation widgets, and customer interactions using Akinon Commerce Platform.",
      "Architected reusable React.js and Next.js components with SSR-friendly rendering patterns, reducing implementation duplication and improving maintainability, SEO, and page performance.",
      "Collaborated with product, backend, QA, and international stakeholders within Agile delivery cycles to ship reliable production releases and maintain high engineering standards.",
      "Leveraged AI-assisted development tools for implementation, debugging, code refactoring, and productivity improvements while maintaining code quality.",
      "Mentored junior developers through reviews, pairing, and architecture guidance, improving consistency across the codebase.",
      "Built a Core Product Dashboard (plug-and-play scripts with minimal configuration) capable of collecting performance metrics and integrating recommendation capabilities, designed to integrate across multiple stacks (e.g., JavaScript, Django).",
      "Contributed to the development of an AI-powered conversational commerce chatbot, integrating end-to-end shopping capabilities across product discovery, cart, and checkout journeys.",
    ],
    tech: ["React.js", "React Native", "Next.js", "TypeScript", "Akinon", "SSR", "AI Agents"],
  },
  {
    company: "Ultimez Technology",
    title: "Frontend Developer",
    location: "Remote, India",
    start: "Dec 2024",
    end: "May 2025",
    highlights: [
      "Developed scalable web experiences using React.js and Next.js, and built cross-platform mobile app features using Ionic React + Capacitor.",
      "Improved UX and responsiveness by identifying performance bottlenecks and systematically reducing UI lag and heavy renders.",
      "Implemented optimizations such as code splitting, caching strategies, lazy loading, tree shaking, and component-level refactors, achieving ~30% faster page load speed and ~40% reduction in unnecessary re-renders.",
      "Eliminated ~35% unused/low-value code and simplified flows to reduce complexity, increase maintainability, and improve long-term development velocity.",
      "Worked closely with design, QA, backend teams and stakeholders to deliver consistent UI behavior across devices and ensure smooth release cycles.",
    ],
    tech: ["React.js", "Next.js", "Ionic React", "Capacitor", "Performance"],
  },
  {
    company: "Appringer LLP",
    title: "Full Stack Developer",
    location: "Remote, India",
    start: "Dec 2023",
    end: "Nov 2024",
    highlights: [
      "Led frontend development for multiple client applications, driving delivery predictability and improving sprint execution through strong collaboration and ownership.",
      "Delivered scalable web and mobile applications using React.js, React Native, Node.js, and modern UI architectures.",
      "Built reusable component libraries and frontend architecture that improved development speed and consistency across projects.",
      "Improved page performance by approximately 35% through rendering optimizations, reusable design patterns, and efficient state management.",
      "Participated in technical planning, sprint execution, and engineering discussions to align technical solutions with business goals.",
    ],
    tech: ["React.js", "React Native", "Node.js", "Component Libraries"],
  },
  {
    company: "Mag Cloud Solutions",
    title: "Full Stack Developer",
    location: "Agra, India",
    start: "Jun 2023",
    end: "Dec 2023",
    highlights: [
      "Developed full-stack applications using the MERN stack, delivering end-to-end features across frontend and backend.",
      "Built cross-platform mobile applications using Flutter and shipped production builds to the Google Play Store.",
      "Worked independently on end-to-end delivery for multiple projects, including development, iteration, testing, and release readiness.",
    ],
    tech: ["MERN", "Flutter", "MongoDB", "Express.js"],
  },
  {
    company: "Madrid Software",
    title: "Full Stack Developer",
    location: "Delhi, India",
    start: "Jun 2022",
    end: "May 2023",
    highlights: [
      "Developed and maintained MERN-stack applications, implementing responsive interfaces, REST API integrations, authentication, and database-backed business workflows.",
      "Worked in high-ownership mode across UI, API integration, and database-backed functionality to meet business timelines.",
    ],
    tech: ["MERN", "REST APIs", "Auth", "MongoDB"],
  },
];

export type Project = {
  name: string;
  kind: string;
  bullets: readonly string[];
  tags: readonly string[];
  link?: string;
};

export const projects: readonly Project[] = [
  {
    name: "EMR / HMS",
    kind: "Electronic Medical Records / Hospital Management System",
    bullets: [
      "Built key UI modules and workflows with React.js for operational and clinical use cases.",
      "Worked across teams to ship reliable, role-oriented interfaces and improve usability under real-world constraints.",
    ],
    tags: ["React.js", "Healthcare", "Role-based UI"],
    link: "https://bharatopd.com/",
  },
  {
    name: "Coinpedia",
    kind: "Crypto News / Events / Information Platform",
    bullets: [
      "Built responsive web and hybrid mobile experiences with a strong focus on performance and user experience.",
      "Improved application speed by implementing lazy loading, caching, tree shaking, and code splitting.",
      "Reduced unnecessary rendering and simplified component architecture for long-term scalability.",
    ],
    tags: ["Next.js", "Ionic", "Capacitor", "Performance"],
    link: "https://coinpedia.org/",
  },
  {
    name: "TrueTalent",
    kind: "End-to-End Job Board Platform",
    bullets: [
      "Developed recruitment workflows for recruiters and job seekers.",
      "Built reusable frontend architecture supporting multiple business modules while improving maintainability and user experience.",
    ],
    tags: ["React.js", "Workflows", "Architecture"],
    link: "https://truetalent.io/",
  },
  {
    name: "Propagator",
    kind: "Social Platform (Free-Speech)",
    bullets: [
      "Developed core UI and product flows using modern frontend tooling and patterns.",
      "Prioritized performance and user experience through iterative refinement and component reuse.",
      "Built & managed a queue-based video transcoding workflow using RabbitMQ that generates multiple resolution variants, improving playback reliability across different network conditions.",
    ],
    tags: ["React.js", "RabbitMQ", "Video", "Performance"],
  },
  {
    name: "Core Product Dashboard",
    kind: "Metrics + Recommendations (Plug-and-Play)",
    bullets: [
      "Built a reusable dashboard solution for performance metrics collection and recommendation system enablement.",
      "Designed for minimal configuration and compatibility across multiple stacks (e.g., JavaScript, Django), enabling adoption by multiple brands.",
      "Collaborated on product decisions and implementation details to balance flexibility, ease of integration, and maintainability.",
    ],
    tags: ["JavaScript", "Django", "Observability", "Recommendations"],
  },
];

export type SkillGroupKey = "languages" | "frontend" | "backend" | "mobile" | "databases" | "cloud" | "ai";

export type SkillGroup = {
  key: SkillGroupKey;
  label: string;
  items: ReadonlyArray<{ name: string; strong?: boolean }>;
};

export const skillGroups: readonly SkillGroup[] = [
  {
    key: "languages",
    label: "Programming Languages",
    items: [
      { name: "JavaScript", strong: true },
      { name: "TypeScript", strong: true },
      { name: "Java", strong: true },
      { name: "Python" },
      { name: "HTML" },
      { name: "CSS" },
    ],
  },
  {
    key: "frontend",
    label: "Frontend",
    items: [
      { name: "React.js", strong: true },
      { name: "Next.js", strong: true },
      { name: "Redux", strong: true },
      { name: "Tailwind CSS", strong: true },
      { name: "React Query" },
      { name: "Bootstrap" },
      { name: "Angular" },
      { name: "jQuery" },
    ],
  },
  {
    key: "backend",
    label: "Backend",
    items: [
      { name: "Node.js", strong: true },
      { name: "Express.js", strong: true },
      { name: "REST APIs", strong: true },
      { name: "Spring Boot", strong: true },
      { name: "GraphQL" },
    ],
  },
  {
    key: "mobile",
    label: "Mobile",
    items: [{ name: "React Native", strong: true }, { name: "Ionic React" }, { name: "Capacitor" }, { name: "Flutter" }],
  },
  {
    key: "databases",
    label: "Databases",
    items: [{ name: "MongoDB", strong: true }, { name: "MySQL" }, { name: "PostgreSQL" }],
  },
  {
    key: "cloud",
    label: "Cloud & DevOps",
    items: [{ name: "AWS", strong: true }, { name: "Docker", strong: true }, { name: "CI/CD" }, { name: "Git/GitHub" }],
  },
  {
    key: "ai",
    label: "AI",
    items: [{ name: "AI Agents", strong: true }, { name: "LangChain" }, { name: "LangGraph" }, { name: "RAG" }],
  },
];

export const education = {
  degree: "Bachelor of Vocation — Internet of Things (IoT)",
  institute: "Dayalbagh Educational Institute",
  location: "Agra, India",
  start: "Jul 2019",
  end: "May 2022",
  score: "CGPA 8/10",
} as const;

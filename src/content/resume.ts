export const person = {
  name: "Saksham Agarwal",
  role: "Full Stack Engineer",
  tagline: "React • Next.js • Node.js • Performance • UX",
  location: "India",
  links: {
    email: "sakshamag.work@gmail.com",
    phone: "+91 8869070495",
    github: "https://github.com/WhoSaksham",
    linkedin: "https://www.linkedin.com/in/saksham-agarwal7",
    resume: "/Saksham's_Resume_FullStack_4Yrs.pdf",
  },
  summary:
    "Full Stack Engineer with 4+ years of experience building and shipping customer-facing web and mobile applications using React.js, Next.js, Node.js, and the MERN stack. Strong focus on performance optimization, UX, and end-to-end feature ownership.",
} as const;

export const experience = [
  {
    company: "Codilar Technologies",
    title: "Software Engineer",
    location: "Bangalore, India",
    start: "Jun 2025",
    end: "Present",
    highlights: [
      "Contributed to a large eCommerce platform serving 50K+ daily active users, improving customer experience across high-traffic journeys.",
      "Owned complex eCommerce flows end-to-end (cart, checkout) using Akinon commerce solutions; partnered with product and backend teams to deliver reliable releases.",
      "Built and optimized features using React.js and Next.js with a strong focus on maintainability, performance, and SEO-friendly rendering patterns.",
      "Leveraged AI-assisted development to accelerate implementation, debugging, and refactoring while maintaining code quality.",
      "Collaborated with distributed teams, participated in code reviews and technical decision-making, and mentored junior developers.",
      "Helped build a plug-and-play Core Product Dashboard for performance metrics collection and recommendation capabilities, designed for integration across multiple stacks (JavaScript, Django).",
    ],
    tech: ["React", "Next.js", "TypeScript", "Akinon", "Node.js", "REST", "Performance"],
  },
  {
    company: "Ultimez Technology",
    title: "Frontend Developer",
    location: "Remote, India",
    start: "Dec 2024",
    end: "May 2025",
    highlights: [
      "Built scalable web experiences using React.js and Next.js; shipped cross-platform mobile app features using Ionic React + Capacitor.",
      "Improved UX and responsiveness by profiling bottlenecks and reducing UI lag and heavy renders.",
      "Implemented code splitting, caching strategies, lazy loading, and tree shaking to achieve ~30% faster page loads and ~40% fewer unnecessary re-renders.",
      "Removed ~35% unused/low-value code and refactored core flows to improve maintainability and developer velocity.",
    ],
    tech: ["React", "Next.js", "Ionic React", "Capacitor", "Performance", "Caching", "Code Splitting"],
  },
  {
    company: "AppRinger LLP",
    title: "Full Stack Developer",
    location: "Remote, India",
    start: "Dec 2023",
    end: "Nov 2024",
    highlights: [
      "Led a front-end team building scalable applications with React.js, improving sprint execution and delivery predictability.",
      "Developed several client-facing products from scratch (TrueTalent, EMR/HMS, CMS, InvoMate) and enhanced existing platforms using React.js, React Native, and Node.js.",
      "Applied performance improvements and reusable component architecture, achieving ~35% improvement in page load speed and increased engagement.",
      "Collaborated cross-functionally on requirements, prioritization, and technical decisions to align engineering outcomes with product goals.",
    ],
    tech: ["React", "React Native", "Node.js", "Express", "MongoDB", "TypeScript"],
  },
  {
    company: "Mag Cloud Solutions",
    title: "Full Stack Developer",
    location: "Agra, India",
    start: "Jun 2023",
    end: "Dec 2023",
    highlights: [
      "Delivered MERN stack applications (React.js, Node.js, Express.js, MongoDB) with end-to-end ownership across frontend and backend.",
      "Built cross-platform mobile apps using Flutter and shipped production builds to the Google Play Store.",
      "Worked independently across multiple projects, handling development, iteration, and release readiness.",
    ],
    tech: ["MERN", "Flutter", "MongoDB", "Express", "Git"],
  },
  {
    company: "Madrid Software",
    title: "Full Stack Developer",
    location: "Delhi, India",
    start: "Jun 2022",
    end: "May 2023",
    highlights: [
      "Built and maintained client-facing applications using the MERN stack, owning features end-to-end from development to delivery.",
      "Handled UI, API integrations, and database-backed functionality in a high-ownership environment.",
    ],
    tech: ["MERN", "React", "Node.js", "MongoDB"],
  },
] as const;

export const projects = [
  {
    name: "eCommerce Brand (Confidential)⁠",
    description:
      "Customer-facing web & mobile commerce experience at scale (50K+ daily active users) with end-to-end ownership of cart and checkout flows using Akinon-based commerce solutions.",
    tags: ["Next.js", "React", "Akinon", "Checkout", "Performance"],
    link:'#projects'
  },
  {
    name: "Core Product Dashboard",
    description:
      "Plug-and-play dashboard for performance metrics collection and recommendation capabilities with minimal configuration; designed to integrate across multiple stacks (JavaScript, Django).",
    tags: ["JavaScript", "Observability", "Recommendations", "Dashboard"],
     link:'#projects'
  },
  {
    name: "Coinpedia",
    description:
      "Crypto news/events/information platform across web and mobile. Delivered significant performance wins using code splitting, caching strategies, lazy loading, and refactoring to reduce UI lag.",
    tags: ["Next.js", "React", "Ionic", "Capacitor", "Performance"],
     link:'https://coinpedia.org/'
  },
  {
    name: "TrueTalent",
    description:
      "End-to-end job board platform for job seekers and recruiters with reusable UI architecture and performance-focused frontend development.",
    tags: ["React", "UI Systems", "Product Flows"],
     link:'https://truetalent.io/'
  },
  {
    name: "EMR / HMS",
    description:
      "Electronic Medical Records / Hospital Management System with role-oriented workflows and reliable UI modules under real-world constraints.",
    tags: ["React", "Healthcare", "Workflow"],
    link:'https://bharatopd.com/'
  },
  {
    name: "Propagator",
    description:
      "Social platform focused on free-speech with iterative UI refinement, performance tuning, and reusable component patterns.",
    tags: ["React", "Performance", "UX"],
     link:'#projects'
  },
  {
    name: "ATS Platform (Confidential)⁠",
    description:
      "Recruiter-facing internal platform supporting end-to-end hiring workflows with usability and maintainability focus.",
    tags: ["React", "Workflows", "Internal Tools"],
     link:'#projects'
  },
  {
    name: "Event Management System (Confidential)⁠",
    description:
      "Event lifecycle and ticketing platform with online booking, digital ticket entry, and operational distribution workflows.",
    tags: ["React", "Ticketing", "Operations"],
     link:'#projects'
  },
] as const;

export const skills = {
  frontend: [
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "Redux",
    "Tailwind CSS",
    "React Native",
    "Ionic React (Capacitor)",
  ],
  backend: ["Node.js", "Express.js", "REST APIs", "GraphQL"],
  cloud: ["AWS (S3, EC2, CloudFront, Lambda)"],
  testing: ["Jest", "React Testing Library"],
  databases: ["MongoDB", "MySQL"],
  tooling: ["Git", "GitHub", "CI-friendly workflows", "Code reviews"],
} as const;

export const education = {
  degree: "Bachelor of Vocation (Internet of Things - IoT)",
  institute: "Dayalbagh Educational Institute",
  location: "Agra, India",
  start: "Jul 2019",
  end: "May 2022",
  score: "CGPA: 8/10",
} as const;


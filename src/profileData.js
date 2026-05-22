import {
  BookOpen,
  Braces,
  Cloud,
  Code2,
  Database,
  GraduationCap,
  MapPinned,
  Presentation,
  Rocket,
  Server,
  Smartphone,
  Workflow,
} from 'lucide-react';

export const contactLinks = {
  email: 'mailto:me@ericsayer.com',
  github: 'https://github.com/sayex',
  linkedin: 'https://www.linkedin.com/in/ericsayer',
  resume: '/Eric_Sayer_Software_Resume.pdf',
};

export const navItems = [
  ['Work', '#work'],
  ['Stack', '#stack'],
  ['GitHub', '#github'],
  ['Contact', '#contact'],
];

export const signatureStats = [
  { value: '7+', label: 'years building full-stack software' },
  { value: '5+', label: 'years teaching MERN developers' },
  { value: '120+', label: 'stores supported through reporting systems' },
];

export const capabilities = [
  {
    icon: Code2,
    title: 'Frontend systems',
    copy: 'React, JavaScript, TypeScript, Tailwind, Material UI, Bootstrap, responsive interfaces, and production-ready component flows.',
  },
  {
    icon: Smartphone,
    title: 'Mobile delivery',
    copy: 'React Native and Expo work across app architecture, deep links, push notifications, build workflows, and release planning.',
  },
  {
    icon: Server,
    title: 'Backend APIs',
    copy: 'Node.js, Express, REST, GraphQL, OAuth, authentication, third-party integrations, and debugging across browser and server layers.',
  },
  {
    icon: Database,
    title: 'Data modeling',
    copy: 'MongoDB, Mongoose, PostgreSQL, MySQL, Microsoft SQL Server, reporting dashboards, and practical operational analytics.',
  },
  {
    icon: Cloud,
    title: 'Cloud operations',
    copy: 'GitHub, GitHub Actions, AWS EC2, Nginx, PM2, Cloudflare, EAS Build, domains, SSL, and deployment workflows.',
  },
  {
    icon: GraduationCap,
    title: 'Developer mentoring',
    copy: 'Code reviews, technical explanation, debugging labs, requirements translation, documentation, and student/team readiness.',
  },
];

export const workHighlights = [
  {
    period: '2026 - Present',
    role: 'Co-Owner / Full-Stack Developer',
    company: 'Avryq: Real-Time Events',
    icon: Rocket,
    points: [
      'Co-founded and leads development for a real-time event discovery platform focused on local events, maps, businesses, and community engagement.',
      'Architects mobile app features, backend APIs, database models, authentication, deployment, and environment management.',
      'Builds with React Native, Expo, Node.js, Express, MongoDB, Mongoose, REST APIs, Mapbox, push notifications, and deep links.',
    ],
  },
  {
    period: '2019 - Present',
    role: 'Full-Stack Developer',
    company: 'Self-Employed',
    icon: Braces,
    points: [
      'Builds custom web apps, APIs, dashboards, prototypes, and internal tools for product and business needs.',
      'Develops React interfaces and Node/Express services with MongoDB and SQL databases.',
      'Translates stakeholder goals into implementation plans, GitHub workflows, and maintainable code.',
    ],
  },
  {
    period: '2019 - 2025',
    role: 'Instructor / Senior Tutor / Teaching Assistant',
    company: 'edX / Trilogy Education',
    icon: Presentation,
    points: [
      'Taught full-stack MERN development across React, Node.js, Express, MongoDB, SQL, APIs, Git, and deployment.',
      'Mentored developers through debugging, project architecture, code reviews, and deployment decisions.',
      'Led labs on data structures, MVC patterns, authentication, agile teamwork, and professional project delivery.',
    ],
  },
  {
    period: '2006 - 2018',
    role: 'Technical Consulting, Support, and Operations',
    company: 'ADP Lightspeed, Toys R Us, Unisys',
    icon: Workflow,
    points: [
      'Delivered software training, technical troubleshooting, account support, reporting, and process documentation.',
      'Built daily reporting workflows for sales, fulfillment, payroll hours, inventory, and project execution.',
      'Supported leadership, district managers, stores, and enterprise clients with practical technical problem solving.',
    ],
  },
];

export const projects = [
  {
    name: 'Avryq Real-Time Events',
    type: 'Product build',
    icon: MapPinned,
    description:
      'A real-time event discovery platform covering local events, maps, businesses, authentication, deployment, and community engagement workflows.',
    stack: ['React Native', 'Expo', 'Node.js', 'MongoDB', 'Mapbox'],
  },
  {
    name: '9th & 9th Street Fair Vendor System',
    type: 'Volunteer software',
    icon: BookOpen,
    description:
      'Vendor application, payment workflow, and reporting dashboard built to help organizers track vendors, payments, and event operations.',
    stack: ['Web apps', 'Payments', 'Dashboards', 'Reporting'],
  },
  {
    name: 'GreenLight',
    type: 'GitHub project',
    icon: Code2,
    description:
      'A JavaScript API project using music and live-event data, OAuth, AJAX, Node.js, and collaborative frontend delivery.',
    stack: ['JavaScript', 'jQuery', 'Spotify API', 'OAuth'],
    href: 'https://github.com/sayex/Green-Light',
  },
  {
    name: 'Movie Mate',
    type: 'GitHub project',
    icon: Server,
    description:
      'A collaborative full-stack bootcamp application built around React, Node.js, MySQL, APIs, MVC patterns, and backend design practice.',
    stack: ['React', 'Node.js', 'MySQL', 'APIs'],
    href: 'https://github.com/sayex/MovieMate',
  },
  {
    name: 'Milliways',
    type: 'GitHub project',
    icon: Rocket,
    description:
      'A full-stack collaborative project from the University of Utah program, focused on practical application architecture and team delivery.',
    stack: ['Full-stack', 'MVC', 'APIs', 'Team delivery'],
    href: 'https://github.com/sayex/Milliways',
  },
];

export const githubRepos = [
  { name: 'Green-Light', url: 'https://github.com/sayex/Green-Light' },
  { name: 'MovieMate', url: 'https://github.com/sayex/MovieMate' },
  { name: 'Milliways', url: 'https://github.com/sayex/Milliways' },
  { name: 'rendershowcase', url: 'https://github.com/sayex/rendershowcase' },
];

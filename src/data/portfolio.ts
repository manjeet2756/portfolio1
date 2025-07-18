import { Project, Experience, Achievement } from '../types';

export const projects: Project[] = [
  {
    id: '1',
    title: 'CI&CT Automation System',
    description: 'A CI&CT automation system built for continuous integration & testing in scalable DevOps pipelines.',
    technologies: ['GitHub Actions', 'Docker', 'Kubernetes', 'Jenkins'],
    type: 'DevOps',
    image: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg',
    github: 'https://github.com/manjeet2756',
    featured: true,
  },
  {
    id: '2',
    title: 'ML + DevOps Pipeline',
    description: 'End-to-end ML lifecycle automation using DevOps pipelines and MLOps standards.',
    technologies: ['Python', 'AWS S3', 'Docker', 'FastAPI'],
    type: 'DevOps',
    image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg',
    github: 'https://github.com/manjeet2756',
    featured: true,
  },
  {
    id: '3',
    title: 'Agentic AIops System',
    description: 'A powerful agentic AIops system to monitor and auto-resolve cloud infrastructure using LLMs.',
    technologies: ['OpenAI', 'LangGraph', 'Terraform', 'Streamlit'],
    type: 'GenAI',
    image: 'https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg',
    github: 'https://github.com/manjeet2756',
    featured: true,
  },
  {
    id: '4',
    title: 'Streamlit AI Dashboard',
    description: 'Real-time AI-based data dashboard for cloud monitoring with interactive visualizations.',
    technologies: ['Streamlit', 'Python', 'OpenAI', 'Pandas'],
    type: 'GenAI',
    image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg',
    github: 'https://github.com/manjeet2756',
    featured: false,
  },
  {
    id: '5',
    title: 'AutoInfra Bot',
    description: 'LLM-powered chatbot to automate cloud infrastructure via Terraform and Python scripts.',
    technologies: ['OpenAI', 'Terraform', 'Python', 'LangChain'],
    type: 'GenAI',
    image: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg',
    github: 'https://github.com/manjeet2756',
    featured: false,
  },
  {
    id: '6',
    title: 'TakeToMake Cloud CMS',
    description: 'A cloud-hosted CMS with multi-role access, alerts, and workflow automation for teams.',
    technologies: ['React', 'Node.js', 'MongoDB', 'Docker', 'GitHub Actions'],
    type: 'Fullstack',
    image: 'https://images.pexels.com/photos/1181233/pexels-photo-1181233.jpeg',
    github: 'https://github.com/manjeet2756',
    featured: false,
  },
  {
    id: '7',
    title: 'Accident Response System',
    description: 'Real-time accident detection and response system built for Inter-University Hackathon',
    technologies: ['Python', 'TensorFlow', 'OpenCV', 'Flask', 'MongoDB'],
    type: 'GenAI',
    image: 'https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg',
    github: 'https://github.com/manjeet2756',
    featured: false,
  },
  {
    id: '8',
    title: 'Virtual University Admin System',
    description: 'Fullstack project for academic operations management',
    technologies: ['React', 'Node.js', 'MySQL', 'Express', 'Bootstrap'],
    type: 'Fullstack',
    image: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg',
    github: 'https://github.com/manjeet2756',
    featured: false,
  },
];

export const experiences: Experience[] = [
  {
    id: '1',
    company: 'LinuxWorld Informatics Pvt Ltd',
    role: 'Multi-Tech Intern',
    duration: '2 months',
    location: 'Mansarovar, Jaipur',
    description: 'Built multiple AI-integrated projects and gained hands-on experience in DevOps, Cloud technologies, and AI/ML implementations.',
    website: 'https://www.lwindia.com',
  },
];

export const achievements: Achievement[] = [
  {
    id: '1',
    title: 'Jaipur Hackathon 2023',
    description: '2nd Place - Built practical solutions during 1st year of BCA',
    year: '2023',
    category: 'hackathon',
  },
  {
    id: '2',
    title: 'Inter-University Hackathon 2024',
    description: '3rd Place - Created accident alert IoT device that notifies family, police & hospitals',
    year: '2024',
    category: 'hackathon',
  },
  {
    id: '3',
    title: 'Virtual University System',
    description: 'Developed a complete online admin platform for digital university operations',
    year: '2024',
    category: 'project',
  },
  {
    id: '4',
    title: 'Volleyball Champion',
    description: '1st Place, Inter-University',
    year: '2023',
    category: 'sports',
  },
];

export const skills = {
  DevOps: [
    'Jenkins', 'Docker', 'Kubernetes', 'Terraform', 'AWS', 'GitHub Actions',
    'Ansible', 'Prometheus', 'Grafana', 'Linux', 'Bash Scripting'
  ],
  GenAI: [
    'OpenAI API', 'LangChain', 'TensorFlow', 'PyTorch', 'Hugging Face',
    'Streamlit', 'FastAPI', 'Python', 'Machine Learning', 'NLP'
  ],
  Fullstack: [
    'React', 'Next.js', 'Node.js', 'Express', 'MongoDB', 'PostgreSQL',
    'TypeScript', 'JavaScript', 'Redux', 'Tailwind CSS'
  ],
  Cloud: [
    'AWS', 'Azure', 'Google Cloud', 'Lambda', 'S3', 'EC2', 'RDS',
    'CloudFormation', 'VPC', 'IAM', 'Route53'
  ],
};

export const blogPosts = [
  {
    id: '1',
    title: 'CI/CD Pipeline with Jenkins & Kubernetes — Full Automation Guide',
    description: 'Complete guide to setting up automated CI/CD pipelines using Jenkins and Kubernetes for scalable deployments.',
    platform: 'Hashnode',
    url: '#',
    publishedAt: '2024-01-15',
    tags: ['DevOps', 'Jenkins', 'Kubernetes'],
  },
  {
    id: '2',
    title: 'Integrating GenAI with DevOps Workflows',
    description: 'How to leverage Generative AI to enhance DevOps processes and automate infrastructure management.',
    platform: 'Dev.to',
    url: '#',
    publishedAt: '2024-02-10',
    tags: ['GenAI', 'DevOps', 'Automation'],
  },
  {
    id: '3',
    title: 'How Agentic AI is Reshaping Cloud Monitoring',
    description: 'Exploring the future of cloud infrastructure monitoring with autonomous AI agents and LLMs.',
    platform: 'Notion',
    url: '#',
    publishedAt: '2024-03-05',
    tags: ['AI', 'Cloud', 'Monitoring'],
  },
];

export const socialLinks = {
  linkedin: 'https://www.linkedin.com/in/manjeet-kumar-8b3657343',
  github: 'https://github.com/manjeet2756',
  email: 'mkdas62999@gmail.com',
  phone: '8757119995',
  telegram: 'https://t.me/manjeet_mjk',
  whatsapp: 'https://wa.me/918757119995',
};
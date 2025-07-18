export interface Theme {
  name: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    border: string;
  };
  font: string;
  gradients: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  type: 'DevOps' | 'GenAI' | 'Fullstack' | 'Cloud';
  image: string;
  github: string;
  linkedin?: string;
  demo?: string;
  featured: boolean;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  duration: string;
  location: string;
  description: string;
  website?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  year: string;
  category: 'hackathon' | 'sports' | 'project' | 'other';
}
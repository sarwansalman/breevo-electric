export interface Testimonial {
  id: string;
  author: string;
  role: string;
  location: string;
  rating: number;
  content: string;
  date: string;
  verified: boolean;
}

export interface Service {
  id: string;
  title: string;
  slug: string;
  iconName: string; // Used to dynamic map to Lucide icons safely
  shortDescription: string;
  longDescription: string;
  features: string[];
  category: 'residential' | 'commercial' | 'industrial' | 'specialty';
  startingPrice: string;
  testimonial: {
    quote: string;
    author: string;
    location: string;
  };
}

export interface Project {
  id: string;
  title: string;
  category: string;
  location: string;
  description: string;
  imageUrl: string;
  completionYear: string;
  scope: string[];
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'services' | 'pricing' | 'safety' | 'specialty';
}

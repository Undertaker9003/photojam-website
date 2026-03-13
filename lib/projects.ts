// lib/projects.ts

export type ProjectImage = {
  url: string;
  alt: string;
  caption?: string;
};

export type Project = {
  slug: string;        // The URL path (e.g., photojam.com/gallery/poilam-workshop)
  title: string;
  description: string;
  thumbnail: string;   // The image shown on the main gallery grid
  index: number;
  externalLink?: string; // Keeping your Drive links just in case
  images: ProjectImage[]; // This is where you'll list the photos for the individual page
};

export const projects: Project[] = [
  {
    slug: "poilam-workshop",
    title: "Photojam x PoiLam workshop",
    description: "Capturing the essence of stage show through bold perspectives",
    thumbnail: "/poilam workshop thumbnail.JPG",
    externalLink: "https://drive.google.com/drive/folders/1KH35rDOEpwIt3QbiUtnOcf71FeAYRcJQ?usp=sharing",
    index: 1,
    images: [],
  },
  {
    slug: "setiawan-klpf-trip",
    title: "Setiawan KLPF trip",
    description: "Stories told through the human connection and emotion",
    thumbnail: "/setiawan thumbnail.JPG",
    externalLink: "https://drive.google.com/drive/u/5/folders/1RgorYjfZnZDeeAdulXvOGQ1Bm9CBbkYr",
    index: 2,
    images: [], // Future images go here
  },
  {
    slug: "pulau-ketam",
    title: "Pulau Ketam through lens",
    description: "Discovering untamed beauty of Pulau Ketam",
    thumbnail: "/pulau ketam thumbnail.JPG",
    externalLink: "https://drive.google.com/drive/folders/1dGFDVeXdqHaUB5uIbgGVDsFp1NwydOvG?usp=sharing",
    index: 3,
    images: [],
  },
  {
    slug: "kuala-sepetang",
    title: "Kuala Sepetang Trip",
    description: "Discovering untamed beauty of Kuala Sepetang",
    thumbnail: "/kualasepetangthumbnail.JPG",
    externalLink: "https://drive.google.com/drive/folders/1rOeBn_t_MmCsSPvOox_oTpD8hTWFUGM7?usp=sharing",
    index: 4,
    images: [],
  },
];

export function getProjects(limit?: number): Project[] {
  return limit ? projects.slice(0, limit) : projects;
}
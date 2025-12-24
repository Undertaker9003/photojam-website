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
    externalLink: "https://drive.google.com/drive/u/5/folders/13ZR2ha0jz555fm_ChVAdvj3t1FevsX7_",
    index: 1,
    images: [
      { url: "/images/poilam/photo1.jpg", alt: "Stage show perspective 1" },
      { url: "/images/poilam/photo2.jpg", alt: "Stage show perspective 2" },
      // Add more local images here as you upload them to your public folder
    ],
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
    externalLink: "https://drive.google.com/drive/u/5/folders/16jdc2e2P-atxACN_euNyN3-hydTF7f91",
    index: 3,
    images: [],
  },
  {
    slug: "kuala-sepetang",
    title: "Kuala Sepetang Trip",
    description: "Coming Soon",
    thumbnail: "/coming_soon_landscape-1.png",
    externalLink: "#",
    index: 4,
    images: [],
  },
];
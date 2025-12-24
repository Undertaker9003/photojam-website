// lib/getGallery.ts
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const galleryDirectory = path.join(process.cwd(), 'content/gallery');

export function getGalleryData() {
  // 1. Get file names under /content/gallery
  if (!fs.existsSync(galleryDirectory)) {
    return [];
  }
  
  const fileNames = fs.readdirSync(galleryDirectory);
  
  const allGalleryData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get slug
    const slug = fileName.replace(/\.md$/, '');

    // Read markdown file as string
    const fullPath = path.join(galleryDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the slug
    return {
      slug,
      ...(matterResult.data as { 
        title: string; 
        description: string; 
        image: string; 
        link: string; 
        index: number 
      }),
    };
  });

  // Sort by index (ascending)
  return allGalleryData.sort((a, b) => (a.index > b.index ? 1 : -1));
}
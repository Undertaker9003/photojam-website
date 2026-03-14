import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

async function fixOrientation() {
  const filePath = 'public/setiawan thumbnail.JPG';
  const fullPath = path.resolve(process.cwd(), filePath);
  
  if (!fs.existsSync(fullPath)) {
    console.log(`File not found: ${filePath}`);
    return;
  }

  console.log(`Fixing orientation for ${filePath}...`);
  try {
    const inputBuffer = fs.readFileSync(fullPath);
    // Rotate 90 degrees CW
    const image = sharp(inputBuffer).rotate(90);
    
    const buffer = await image.jpeg({ quality: 90 }).toBuffer();
    
    fs.writeFileSync(fullPath, buffer);
    console.log(`Successfully fixed orientation for ${filePath}`);
  } catch (error) {
    console.error(`Error fixing ${filePath}:`, error);
  }
}

fixOrientation();

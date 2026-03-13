import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const filesToCompress = [
  'public/kualasepetangthumbnail.JPG',
  'public/poilam workshop thumbnail.JPG',
  'public/pulau ketam thumbnail.JPG',
  'public/setiawan thumbnail.JPG'
];

const maxWidth = 1200;
const quality = 75;

async function compressImages() {
  for (const filePath of filesToCompress) {
    const fullPath = path.resolve(process.cwd(), filePath);
    
    if (!fs.existsSync(fullPath)) {
      console.log(`File not found: ${filePath}`);
      continue;
    }

    console.log(`Compressing ${filePath}...`);
    try {
      const inputBuffer = fs.readFileSync(fullPath);
      const image = sharp(inputBuffer);
      const metadata = await image.metadata();

      let pipeline = image;
      if (metadata.width && metadata.width > maxWidth) {
        pipeline = pipeline.resize(maxWidth);
      }
      
      const buffer = await pipeline
        .jpeg({ quality, force: false }) // Use force: false to keep original format if possible, otherwise map to jpeg
        .toBuffer();
      
      fs.writeFileSync(fullPath, buffer);
      console.log(`Successfully compressed ${filePath}`);
    } catch (error) {
      console.error(`Error compressing ${filePath}:`, error);
    }
  }
}

compressImages();

// Imágenes por defecto para compartir en redes (Open Graph / Twitter) y logo para datos estructurados.
// Genera public/og-default.png (1200x630) y public/logo-casa-scout.png a partir del logo y de un render.
// Uso: node scripts/make-social-images.mjs
import sharp from 'sharp';
import { readFileSync } from 'node:fs';

const logoSvg = readFileSync('src/assets/logo-casa-scout.svg');

// Logo en PNG (los datos estructurados piden un logo raster).
await sharp(logoSvg, { density: 300 }).resize({ width: 600 }).png().toFile('public/logo-casa-scout.png');

// Imagen para compartir: logo a la izquierda sobre blanco, render del kit a la derecha.
const W = 1200;
const H = 630;
const photoW = 640;
const photo = await sharp('src/assets/img/kit.webp')
  .resize({ width: photoW, height: H, fit: 'cover', position: 'right' })
  .toBuffer();
const logo = await sharp(logoSvg, { density: 300 }).resize({ width: 440 }).png().toBuffer();
const logoMeta = await sharp(logo).metadata();

await sharp({ create: { width: W, height: H, channels: 3, background: '#FFFFFF' } })
  .composite([
    { input: photo, left: W - photoW, top: 0 },
    { input: logo, left: Math.round((W - photoW - logoMeta.width) / 2), top: Math.round((H - logoMeta.height) / 2) },
  ])
  .png({ compressionLevel: 9 })
  .toFile('public/og-default.png');

console.log('ok');

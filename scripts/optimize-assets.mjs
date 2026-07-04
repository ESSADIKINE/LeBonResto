// LeBonResto marketing — asset optimization pipeline (sharp WebP batch).
//
// Walks public/assets/landing recursively, and for every .jpg/.jpeg/.png over
// 100 KB it emits a resized (max 1920px) WebP sibling at ~78 quality. WebP
// files that are already fresher than their source are skipped, so this can be
// re-run cheaply.
//
// NEXT STEPS FOR DEVELOPERS:
// Consumers should switch to <picture> with WebP + JPEG fallback OR use
// next/image which auto-negotiates format via the Accept header. The original
// JPEG/PNG files are intentionally kept on disk as fallbacks and as sources
// for future re-encodes (do not delete them).
//
// Usage: node scripts/optimize-assets.mjs
import sharp from 'sharp';
import { promises as fs } from 'node:fs';
import path from 'node:path';

const ROOT = 'public/assets/landing';
const MAX_WIDTH = 1920;
const JPEG_Q = 78;
const WEBP_Q = 78;

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) files.push(...await walk(full));
    else if (/\.(jpe?g|png)$/i.test(e.name)) files.push(full);
  }
  return files;
}

const files = await walk(ROOT);
let saved = 0;
for (const f of files) {
  const stat = await fs.stat(f);
  const kb = stat.size / 1024;
  if (kb < 100) continue; // skip tiny SVG-adjacent assets

  const webpOut = f.replace(/\.(jpe?g|png)$/i, '.webp');
  // Skip if webp already exists and is fresher than source
  try {
    const wstat = await fs.stat(webpOut);
    if (wstat.mtimeMs >= stat.mtimeMs) continue;
  } catch {}

  const before = stat.size;
  const info = await sharp(f)
    .resize({ width: MAX_WIDTH, withoutEnlargement: true, fit: 'inside' })
    .webp({ quality: WEBP_Q, effort: 6 })
    .toFile(webpOut);
  const after = info.size;
  saved += Math.max(0, before - after);
  console.log(`${f} → ${webpOut}  ${(before/1024).toFixed(0)}KB → ${(after/1024).toFixed(0)}KB`);
}
console.log(`Total saved: ${(saved/1024/1024).toFixed(1)} MB`);

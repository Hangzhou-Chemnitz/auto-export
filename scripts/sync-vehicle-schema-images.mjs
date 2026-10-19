#!/usr/bin/env node

import { existsSync, readFileSync, readdirSync, writeFileSync } from "node:fs";

const origin = "https://hzchemnitz.cn/";
const catalog = readFileSync("models.html", "utf8");
const cardPattern = /<div class="model-card"[\s\S]*?<div class="card-img" style="background-image:url\('([^']+)'\)"[\s\S]*?<a href="(vehicle-config-[^"?]+\.html)/g;
const imageByPage = new Map();
let match;

while ((match = cardPattern.exec(catalog))) {
  if (!imageByPage.has(match[2])) imageByPage.set(match[2], match[1]);
}

// Both Sylphy configuration pages represent the same model family.
imageByPage.set("vehicle-config-sylphy-2026.html", "images/thumbs/nissan/sylphy/1.webp");

const pages = readdirSync(".").filter((name) => /^vehicle-config-.*\.html$/.test(name));

for (const page of pages) {
  const imagePath = imageByPage.get(page);
  if (!imagePath || !existsSync(imagePath)) {
    throw new Error(`No local model image found for ${page}`);
  }

  const canonical = `${origin}${page}`;
  const imageUrl = `${origin}${imagePath}`;
  let html = readFileSync(page, "utf8");

  if (/\s+"image":\s*"[^"]+",/.test(html)) {
    html = html.replace(/(\s+)"image":\s*"[^"]+",/, `$1"image": "${imageUrl}",`);
  } else {
    const urlLine = `      "url": "${canonical}",\n`;
    if (!html.includes(urlLine)) throw new Error(`Vehicle schema URL not found in ${page}`);
    html = html.replace(urlLine, `${urlLine}      "image": "${imageUrl}",\n`);
  }

  if (/<meta property="og:image"/.test(html)) {
    html = html.replace(/<meta property="og:image" content="[^"]+">/, `<meta property="og:image" content="${imageUrl}">`);
  } else {
    html = html.replace(
      `<meta property="og:url" content="${canonical}">`,
      `<meta property="og:url" content="${canonical}">\n  <meta property="og:image" content="${imageUrl}">`,
    );
  }

  html = html.replace(
    '<meta name="twitter:card" content="summary">',
    '<meta name="twitter:card" content="summary_large_image">',
  );
  if (/<meta name="twitter:image"/.test(html)) {
    html = html.replace(/<meta name="twitter:image" content="[^"]+">/, `<meta name="twitter:image" content="${imageUrl}">`);
  } else {
    html = html.replace(
      '<meta name="twitter:card" content="summary_large_image">',
      `<meta name="twitter:card" content="summary_large_image">\n  <meta name="twitter:image" content="${imageUrl}">`,
    );
  }

  writeFileSync(page, html);
}

console.log(`Updated ${pages.length} vehicle pages with schema and social images.`);

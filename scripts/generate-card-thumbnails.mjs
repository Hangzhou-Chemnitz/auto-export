#!/usr/bin/env node

import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { dirname, extname, join } from "node:path";

const rootFiles = ["index.html", "es.html", "fr.html", "ru.html", "ar.html"];
const catalogFiles = readdirSync(".").filter((name) => /^models.*\.html$/.test(name));
const files = [...rootFiles, ...catalogFiles].filter(existsSync);
const magick = process.env.MAGICK_BIN || "magick";
const cardImagePattern = /(<div class="(?:card-img|special-visual)" style="background-image:url\(')([^']+)('\)")/g;
const generated = new Map();

function thumbnailPath(sourcePath) {
  const relative = sourcePath.replace(/^images\//, "");
  return join("images", "thumbs", relative).replace(new RegExp(`${extname(relative)}$`), ".webp");
}

for (const file of files) {
  const source = readFileSync(file, "utf8");
  const updated = source.replace(cardImagePattern, (match, prefix, rawPath, suffix) => {
    if (rawPath.startsWith("images/thumbs/")) return match;

    const originalPath = rawPath.split("?")[0];
    if (!originalPath.startsWith("images/") || !existsSync(originalPath)) {
      throw new Error(`Missing card image referenced by ${file}: ${originalPath}`);
    }

    const outputPath = thumbnailPath(originalPath);
    if (!generated.has(originalPath)) {
      mkdirSync(dirname(outputPath), { recursive: true });
      execFileSync(magick, [
        originalPath,
        "-auto-orient",
        "-strip",
        "-thumbnail",
        "640x640>",
        "-quality",
        "74",
        "-define",
        "webp:method=6",
        outputPath,
      ]);
      generated.set(originalPath, outputPath);
    }

    return `${prefix}${outputPath}${suffix}`;
  });

  if (updated !== source) writeFileSync(file, updated);
}

const beforeBytes = [...generated.keys()].reduce((sum, path) => sum + statSync(path).size, 0);
const afterBytes = [...generated.values()].reduce((sum, path) => sum + statSync(path).size, 0);
console.log(JSON.stringify({
  filesUpdated: files.length,
  thumbnailsGenerated: generated.size,
  beforeBytes,
  afterBytes,
  reductionPercent: beforeBytes ? Number((100 - (afterBytes / beforeBytes) * 100).toFixed(1)) : 0,
}, null, 2));

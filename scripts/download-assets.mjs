import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const extract = JSON.parse(
  await readFile(path.join(root, "docs/research/original-extract.json"), "utf8"),
);

const urls = new Set();

for (const image of extract.assets.images) {
  if (image.src) urls.add(image.src);
}

for (const link of extract.head.links) {
  if (
    link.href &&
    (link.rel?.includes("icon") ||
      link.as === "font" ||
      link.as === "image" ||
      /\.(png|jpe?g|webp|svg|woff2?)(\?|$)/i.test(link.href))
  ) {
    urls.add(link.href);
  }
}

const outDir = path.join(root, "public/zafira-assets");
await mkdir(outDir, { recursive: true });

function filenameFor(url, index) {
  const parsed = new URL(url);
  const base = path.basename(parsed.pathname) || `asset-${index}`;
  const ext = path.extname(base) || ".bin";
  const clean = base
    .replace(ext, "")
    .replace(/[^a-z0-9._-]+/gi, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 70);
  return `${String(index).padStart(2, "0")}-${clean || "asset"}${ext}`;
}

const manifest = [];
let index = 0;

for (const url of urls) {
  index += 1;
  const filename = filenameFor(url, index);
  const filePath = path.join(outDir, filename);
  try {
    const response = await fetch(url, {
      headers: {
        "user-agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
      },
    });
    if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
    const bytes = Buffer.from(await response.arrayBuffer());
    await writeFile(filePath, bytes);
    manifest.push({ url, file: `/zafira-assets/${filename}`, bytes: bytes.length });
  } catch (error) {
    manifest.push({ url, error: error.message });
  }
}

await writeFile(
  path.join(outDir, "manifest.json"),
  JSON.stringify(manifest, null, 2),
);

const ok = manifest.filter((item) => item.file).length;
const failed = manifest.length - ok;
console.log(`Downloaded ${ok} assets; ${failed} failed.`);

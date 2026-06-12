import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const outDir = path.join(root, "public");
const sourcePath = process.argv[2] || "/tmp/zafira-original.html";
let html = await readFile(sourcePath, "utf8");

html = html
  .replaceAll('href="//', 'href="https://')
  .replaceAll('src="//', 'src="https://')
  .replaceAll('srcset="//', 'srcset="https://')
  .replaceAll("url(//", "url(https://")
  .replaceAll('href="/cdn/', 'href="https://www.zafiraorganics.com/cdn/')
  .replaceAll('src="/cdn/', 'src="https://www.zafiraorganics.com/cdn/')
  .replaceAll('srcset="/cdn/', 'srcset="https://www.zafiraorganics.com/cdn/')
  .replaceAll("url(/cdn/", "url(https://www.zafiraorganics.com/cdn/")
  .replaceAll('href="/cart', 'href="https://www.zafiraorganics.com/cart')
  .replaceAll('action="/cart', 'action="https://www.zafiraorganics.com/cart')
  .replaceAll('href="/products/', 'href="https://www.zafiraorganics.com/products/')
  .replaceAll('href="/policies/', 'href="https://www.zafiraorganics.com/policies/')
  .replaceAll('href="/pages/', 'href="https://www.zafiraorganics.com/pages/')
  .replaceAll('href="/collections/', 'href="https://www.zafiraorganics.com/collections/');

html = html.replace(
  "</head>",
  `<style>
    html, body { margin: 0; min-height: 100%; }
    a[href="#product"] { scroll-margin-top: 72px; }
  </style></head>`,
);

await mkdir(outDir, { recursive: true });
await writeFile(path.join(outDir, "zafira-pixel-snapshot.html"), html);
console.log(`Wrote ${html.length} bytes to public/zafira-pixel-snapshot.html`);

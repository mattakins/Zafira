import { cpSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const docsDir = join(root, "docs");
const docsOriginal = join(docsDir, "original");
const docsNew = join(docsDir, "new");
const frameVersion = "20260619-align-fix-1";

const sections = [
  {
    title: "1. The hero now starts with the buyer's actual problem.",
    oldLabel: "Original: product-first",
    oldText: "The original opens like a supplement page. It shows the product and explains Recovery Foundation, but the visitor has to connect that product to the GLP-1 symptoms they are already feeling.",
    newLabel: "New: pain-first",
    newText: "The new page names the felt problem immediately: GLP-1 Flu, nausea, exhaustion, brain fog, flat mood, low motivation, and muscle loss.",
    verdict: "This is a stronger conversion opening because it creates instant recognition before asking for belief. The prospect does not have to decode the offer. The page tells them, directly, that this is for the exact pattern they are experiencing.",
    marker: "top",
    oldMissing: false,
  },
  {
    title: "2. The new hero image makes the problem more emotionally legible.",
    oldLabel: "Original: product beauty shot",
    oldText: "The original hero is clean, branded, and visually pleasant, but it is more product-display than customer-state.",
    newLabel: "New: human symptom context",
    newText: "The new hero image shows a woman in the moment of discomfort. It makes the GLP-1 side-effect promise feel concrete instead of abstract.",
    verdict: "For this audience, the emotional job is not to admire the bottle. It is to feel understood. The new image does that faster.",
    marker: "hero-image",
    oldMissing: false,
  },
  {
    title: "3. The science section fills the biggest strategic gap.",
    oldLabel: "Original: alignment placeholder",
    oldText: "The old column now includes a grey placeholder here because the original page has no equivalent problem-scale proof section.",
    newLabel: "New: problem quantified",
    newText: "The new section adds market scale, symptom incidence, and survey framing before introducing the solution.",
    verdict: "This is the highest-leverage addition. It makes the problem feel real, widespread, and measurable. That gives the product a reason to exist beyond ordinary supplement positioning.",
    marker: "science-problem",
    oldMissing: true,
  },
  {
    title: "4. The rewrite creates a clearer 'missing solution' argument.",
    oldLabel: "Original: alignment placeholder",
    oldText: "The old column now includes a grey placeholder here because the original page does not have an equivalent solution-gap section.",
    newLabel: "New: category gap",
    newText: "The new copy explains why GLP-1 symptoms are connected and why no single symptom patch is enough.",
    verdict: "This lets Zafira own a more specific market position: not just another wellness supplement, but the protocol built for the multi-system disruption GLP-1 users are dealing with.",
    marker: "science-gap",
    oldMissing: true,
  },
  {
    title: "5. The Recovery Foundation section now has a stronger proof image.",
    oldLabel: "Original: abstract illustration",
    oldText: "The original support section explains the product with a softer illustrated visual.",
    newLabel: "New: person, bottle, ingredients, benefits",
    newText: "The new image connects the customer, bottle, ingredients, and benefits in one frame.",
    verdict: "That makes the mechanism easier to trust. The page is no longer asking the visitor to hold the science in their head; it visualizes the outcome.",
    marker: "foundation",
    oldMissing: false,
  },
  {
    title: "6. The offer now sells continuity, not just quantity.",
    oldLabel: "Original: quantity selector",
    oldText: "The original buy box feels like a typical bundle selector: buy one, buy two, buy three.",
    newLabel: "New: subscription offer architecture",
    newText: "The new buy box presents a 3-month best-value autoship and a 1-month autoship, with clear pricing and delivery cadence.",
    verdict: "That is a better fit for a recovery protocol. It frames the purchase around consistent use, which supports the recommendation that customers need several months of use.",
    marker: "offer",
    oldMissing: false,
  },
  {
    title: "7. The close is more objection-aware.",
    oldLabel: "Original: trust elements inside a standard flow",
    oldText: "The original contains trust material, but it is attached to a more generic purchase experience.",
    newLabel: "New: offer, then reassurance",
    newText: "The new sequence keeps the recommendation, counterfeit warning, testimonial, and FAQ directly below the offer cards.",
    verdict: "This is the right order: make the offer, reduce anxiety, then answer the questions that could stop the purchase.",
    marker: "post-offer",
    oldMissing: false,
  },
  {
    title: "8. The new page keeps the original proof stack, but gives it a better job.",
    oldLabel: "Original: strong supporting material",
    oldText: "The original already has ingredients, reviews, scientific background, customer proof, and footer content.",
    newLabel: "New: same support, sharper setup",
    newText: "The revised version preserves the downstream proof while front-loading the GLP-1 Flu narrative.",
    verdict: "This matters because the rewrite is not a visual redesign for its own sake. It keeps the useful proof and changes the persuasion sequence above it.",
    marker: "supporting",
    oldMissing: false,
  },
];

function refreshSnapshots() {
  rmSync(docsOriginal, { recursive: true, force: true });
  rmSync(docsNew, { recursive: true, force: true });
  mkdirSync(docsOriginal, { recursive: true });
  mkdirSync(docsNew, { recursive: true });

  cpSync(join(root, "public", "original", "index.html"), join(docsOriginal, "index.html"));
  cpSync(join(root, "public", "new", "index.html"), join(docsNew, "index.html"));
  cpSync(join(root, "public", "new", "assets"), join(docsNew, "assets"), { recursive: true });

  const newIndexPath = join(docsNew, "index.html");
  const newIndex = readFileSync(newIndexPath, "utf8")
    .replaceAll('href="/"', 'href="../new/index.html"')
    .replaceAll('href="/#', 'href="../new/index.html#')
    .replaceAll('src="/new/assets/', 'src="assets/')
    .replaceAll('srcSet="/new/assets/', 'srcSet="assets/')
    .replaceAll('srcset="/new/assets/', 'srcset="assets/')
    .replaceAll('"/new/assets/', '"assets/')
    .replaceAll("'/new/assets/", "'assets/");
  writeFileSync(newIndexPath, newIndex);

  const originalIndexPath = join(docsOriginal, "index.html");
  const originalPlaceholderStyles = `
<style id="zafira-ab-original-placeholders">
  .zafira-ab-missing-section {
    align-items: center;
    background:
      repeating-linear-gradient(-45deg, rgba(3,92,5,0.035), rgba(3,92,5,0.035) 12px, transparent 12px, transparent 24px),
      #f4f6f4;
    border-bottom: 1px dashed rgba(3, 92, 5, 0.2);
    border-top: 1px dashed rgba(3, 92, 5, 0.2);
    color: rgba(3, 92, 5, 0.42);
    display: flex;
    font-family: Inter, Arial, sans-serif;
    justify-content: center;
    min-height: var(--zafira-ab-gap-height, 60px);
    padding: 42px 24px;
    text-align: center;
  }
  .zafira-ab-missing-section[data-zafira-gap="foundation-top"],
  .zafira-ab-missing-section[data-zafira-gap="foundation-bottom"],
  .zafira-ab-missing-section[data-zafira-gap="capsule-image-top"],
  .zafira-ab-missing-section[data-zafira-gap="offer-cards"] {
    padding: 0;
  }
  .zafira-ab-missing-section div {
    max-width: 330px;
  }
  .zafira-ab-missing-section[data-zafira-gap="foundation-top"] div,
  .zafira-ab-missing-section[data-zafira-gap="foundation-bottom"] div,
  .zafira-ab-missing-section[data-zafira-gap="capsule-image-top"] div,
  .zafira-ab-missing-section[data-zafira-gap="offer-cards"] div {
    display: none;
  }
  .zafira-ab-missing-section strong {
    color: #035C05;
    display: block;
    font-size: 0.76rem;
    letter-spacing: 0.12em;
    line-height: 1.1;
    margin-bottom: 12px;
    text-transform: uppercase;
  }
  .zafira-ab-missing-section p {
    font-size: 0.98rem;
    line-height: 1.45;
    margin: 0;
  }
</style>`;
  const originalPlaceholderScript = `
<script id="zafira-ab-original-placeholders-script">
  (function () {
    function makeGap(kind, body) {
      var section = document.createElement("section");
      section.className = "zafira-ab-missing-section";
      section.setAttribute("data-zafira-gap", kind);
      if (body) {
        section.innerHTML = '<div><strong>Missing in old page</strong><p>' + body + '</p></div>';
      } else {
        section.innerHTML = '<div></div>';
      }
      return section;
    }

    function insertGaps() {
      var existingGaps = document.querySelectorAll(".zafira-ab-missing-section");
      var existingKeys = {};
      existingGaps.forEach(function (el) { existingKeys[el.getAttribute("data-zafira-gap")] = true; });
      var allGapIds = [
        "science-problem", "science-side-effects", "science-gap",
        "foundation-top", "foundation-bottom", "capsule-image-top", "offer-cards"
      ];
      var allPresent = allGapIds.every(function (id) { return existingKeys[id]; });
      if (allPresent) return;

      // Remove any existing gaps and re-insert everything cleanly
      existingGaps.forEach(function (el) { el.remove(); });

      // --- Science gaps & foundation-top: before the Why Recovery Foundation section ---
      var foundationSection = document.querySelector('[data-rid="c4c11ad8-6395-4470-aaf5-15c3a2e91e2b"]');
      if (foundationSection && foundationSection.parentNode) {
        foundationSection.parentNode.insertBefore(makeGap("science-problem", "The new page adds a problem-scale science section here."), foundationSection);
        foundationSection.parentNode.insertBefore(makeGap("science-side-effects", "The new page adds a side-effect research section here."), foundationSection);
        foundationSection.parentNode.insertBefore(makeGap("science-gap", "The new page adds a solution-gap section here."), foundationSection);
        foundationSection.parentNode.insertBefore(makeGap("foundation-top", null), foundationSection);
      }

      // --- Foundation-bottom: before the Zafira Capsules wrapper section ---
      var nextSection = document.querySelector('[data-rid="1aaf44f4-8ac4-4ca2-a929-cb3fef4c3720"]');
      if (nextSection && nextSection.parentNode) {
        nextSection.parentNode.insertBefore(makeGap("foundation-bottom", null), nextSection);
      }

      // --- Capsule image top: before the product container (carousel) ---
      var productContainer = document.querySelector('[data-rid="288dac43-67c5-49b0-a277-54e7828bd52f"]');
      if (productContainer && productContainer.parentNode) {
        productContainer.parentNode.insertBefore(makeGap("capsule-image-top", null), productContainer);
      }

      // --- Offer cards: before the counterfeit warning section ---
      var counterfeitSection = document.querySelector('[data-rid="bb485a75-c36d-4870-b1cb-1f133374d3d9"]');
      if (counterfeitSection && counterfeitSection.parentNode) {
        counterfeitSection.parentNode.insertBefore(makeGap("offer-cards", null), counterfeitSection);
      }
    }

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", insertGaps);
    } else {
      insertGaps();
    }
    [100, 600, 1400, 2600].forEach(function (delay) {
      window.setTimeout(insertGaps, delay);
    });
  })();
</script>`;
  // Static HTML fallback for the science gaps (injected by string replacement during build)
  const originalGapMarkup = `
<section class="zafira-ab-missing-section" data-zafira-gap="science-problem"><div><strong>Missing in old page</strong><p>The new page adds a problem-scale science section here.</p></div></section>
<section class="zafira-ab-missing-section" data-zafira-gap="science-side-effects"><div><strong>Missing in old page</strong><p>The new page adds a side-effect research section here.</p></div></section>
<section class="zafira-ab-missing-section" data-zafira-gap="science-gap"><div><strong>Missing in old page</strong><p>The new page adds a solution-gap section here.</p></div></section>
<section class="zafira-ab-missing-section" data-zafira-gap="foundation-top"><div></div></section>`;
  const originalIndex = readFileSync(originalIndexPath, "utf8")
    .replaceAll('href="/"', 'href="../original/index.html"')
    .replaceAll('href="/#', 'href="../original/index.html#')
    .replace(
      '<div data-rid="c4c11ad8-6395-4470-aaf5-15c3a2e91e2b"',
      `${originalGapMarkup}<div data-rid="c4c11ad8-6395-4470-aaf5-15c3a2e91e2b"`,
    )
    // foundation-bottom: after the Triple Depletion section
    .replace(
      '<div data-rid="1aaf44f4-8ac4-4ca2-a929-cb3fef4c3720"',
      `<section class="zafira-ab-missing-section" data-zafira-gap="foundation-bottom"><div></div></section><div data-rid="1aaf44f4-8ac4-4ca2-a929-cb3fef4c3720"`,
    )
    // capsule-image-top: before the product container
    .replace(
      '<div data-rid="288dac43-67c5-49b0-a277-54e7828bd52f"',
      `<section class="zafira-ab-missing-section" data-zafira-gap="capsule-image-top"><div></div></section><div data-rid="288dac43-67c5-49b0-a277-54e7828bd52f"`,
    )
    // offer-cards: after the Add to Cart button element
    .replace(
      '<div data-rid="bb485a75-c36d-4870-b1cb-1f133374d3d9"',
      `<section class="zafira-ab-missing-section" data-zafira-gap="offer-cards"><div></div></section><div data-rid="bb485a75-c36d-4870-b1cb-1f133374d3d9"`,
    )
    .replace("</body>", `${originalPlaceholderStyles}${originalPlaceholderScript}</body>`);
  writeFileSync(originalIndexPath, originalIndex);
}

function pageHtml() {
  const sectionJson = JSON.stringify(sections, null, 2);
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Zafira Lander A/B Comparison</title>
  <style>
    :root {
      --bg: #101510;
      --panel: #172117;
      --line: rgba(213, 245, 211, 0.18);
      --text: #f6fff4;
      --muted: #b6c8b4;
      --green: #7be277;
      --phone: 370px;
    }

    * { box-sizing: border-box; }

    body {
      margin: 0;
      background: #101510;
      color: var(--text);
      font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    }

    button, input { font: inherit; }

    .gate {
      align-items: center;
      background: var(--bg);
      display: none;
      inset: 0;
      justify-content: center;
      padding: 24px;
      position: fixed;
      z-index: 10;
    }

    .gate.is-visible { display: flex; }

    .gate-card {
      background: var(--panel);
      border: 1px solid var(--line);
      border-radius: 16px;
      max-width: 420px;
      padding: 24px;
      width: 100%;
    }

    .gate h1 {
      font-family: Georgia, serif;
      font-size: 2rem;
      line-height: 1;
      margin: 0 0 10px;
    }

    .gate p {
      color: var(--muted);
      line-height: 1.5;
      margin: 0 0 18px;
    }

    .gate-row {
      display: flex;
      gap: 10px;
    }

    .gate input {
      background: #0c120c;
      border: 1px solid var(--line);
      border-radius: 10px;
      color: var(--text);
      min-width: 0;
      padding: 12px;
      width: 100%;
    }

    .gate button {
      background: var(--green);
      border: 0;
      border-radius: 999px;
      color: #061006;
      cursor: pointer;
      font-weight: 800;
      padding: 12px 16px;
    }

    .gate-note {
      color: #81917f;
      font-size: 0.78rem;
      margin-top: 14px;
    }

    .app { display: none; }
    .app.is-visible { display: block; }

    .compare-grid {
      display: grid;
      gap: 12px;
      grid-template-columns: var(--phone) var(--phone) minmax(420px, 1fr);
      padding: 12px;
      align-items: start;
    }

    .site-column { position: relative; }

    .column-label {
      align-items: baseline;
      background: linear-gradient(#101510 72%, rgba(16, 21, 16, 0));
      display: flex;
      justify-content: space-between;
      margin: 0 4px 8px;
      padding-bottom: 10px;
      position: sticky;
      top: 0;
      z-index: 2;
    }

    .column-label strong { font-size: 0.95rem; }
    .column-label span {
      color: var(--muted);
      font-size: 0.78rem;
    }

    .phone {
      background: #050805;
      border: 1px solid rgba(255,255,255,0.18);
      border-radius: 28px;
      box-shadow: 0 24px 70px rgba(0,0,0,0.42);
      padding: 10px;
      width: var(--phone);
    }

    .screen {
      background: #eef4ee;
      border-radius: 20px;
      min-height: 100vh;
      overflow: clip;
      position: relative;
    }

    iframe {
      border: 0;
      display: block;
      min-height: 100vh;
      pointer-events: none;
      width: 100%;
    }

    .editorial {
      position: sticky;
      top: 12px;
    }

    .editorial-panel {
      background: var(--panel);
      border: 1px solid var(--line);
      border-radius: 18px;
      padding: clamp(22px, 4vw, 46px);
      transition: opacity 120ms ease;
    }

    .editorial-panel h2 {
      font-family: Georgia, serif;
      font-size: clamp(1.55rem, 2.3vw, 2.75rem);
      line-height: 1.05;
      margin: 0 0 18px;
      max-width: 900px;
    }

    .notes {
      display: grid;
      gap: 14px;
      grid-template-columns: 1fr 1fr;
      margin-bottom: 22px;
    }

    .note {
      background: rgba(255,255,255,0.055);
      border: 1px solid var(--line);
      border-radius: 14px;
      padding: 16px;
    }

    .note strong {
      color: var(--green);
      display: block;
      font-size: 0.78rem;
      letter-spacing: 0.11em;
      margin-bottom: 8px;
      text-transform: uppercase;
    }

    .note.old strong { color: #c0c8c0; }

    .note p,
    .verdict {
      color: var(--muted);
      font-size: clamp(1rem, 1.35vw, 1.28rem);
      line-height: 1.55;
      margin: 0;
    }

    .verdict {
      color: var(--text);
      max-width: 980px;
    }

    @media (max-width: 1180px) {
      .compare-grid {
        grid-template-columns: minmax(330px, 1fr) minmax(330px, 1fr);
      }

      .editorial {
        grid-column: 1 / -1;
        position: static;
      }

      .phone {
        width: min(100%, var(--phone));
      }
    }

    @media (max-width: 760px) {
      .compare-grid {
        grid-template-columns: 1fr;
        padding: 12px;
      }

      .site-column {
        position: static;
      }

      .screen {
        min-height: 0;
      }

      .notes {
        grid-template-columns: 1fr;
      }

      .editorial-card {
        min-height: 0;
      }
    }
  </style>
</head>
<body>
  <div class="gate is-visible" id="gate">
    <form class="gate-card" id="gateForm">
      <h1>Zafira A/B Review</h1>
      <p>Enter the review password.</p>
      <div class="gate-row">
        <input id="passwordInput" type="password" autocomplete="current-password" placeholder="Password">
        <button type="submit">Open</button>
      </div>
      <div class="gate-note">Static GitHub Pages only supports a soft client-side gate.</div>
    </form>
  </div>

  <div class="app" id="app">
    <main class="compare-grid">
      <section class="site-column">
        <div class="column-label"><strong>Old Version</strong><span>iPhone Pro width</span></div>
        <div class="phone">
          <div class="screen">
            <iframe id="oldFrame" src="original/index.html?v=${frameVersion}" title="Old Zafira page" scrolling="no"></iframe>
          </div>
        </div>
      </section>

      <section class="site-column">
        <div class="column-label"><strong>New Version</strong><span>iPhone Pro width</span></div>
        <div class="phone">
          <div class="screen">
            <iframe id="newFrame" src="new/index.html?v=${frameVersion}" title="New Zafira page" scrolling="no"></iframe>
          </div>
        </div>
      </section>

      <section class="editorial">
        <article class="editorial-panel" id="editorial"></article>
      </section>
    </main>
  </div>

  <script>
    const PASSWORD = "zafira-client";
    const STORAGE_KEY = "zafira-ab-authed";
    const sections = ${sectionJson};
    const state = { active: 0 };
    let ticking = false;

    const gate = document.getElementById("gate");
    const app = document.getElementById("app");
    const editorial = document.getElementById("editorial");
    const oldFrame = document.getElementById("oldFrame");
    const newFrame = document.getElementById("newFrame");

    function unlock() {
      gate.classList.remove("is-visible");
      app.classList.add("is-visible");
      sessionStorage.setItem(STORAGE_KEY, "true");
      setActive(0);
      requestLayoutUpdate();
    }

    if (sessionStorage.getItem(STORAGE_KEY) === "true") unlock();

    document.getElementById("gateForm").addEventListener("submit", (event) => {
      event.preventDefault();
      const input = document.getElementById("passwordInput");
      if (input.value.trim() === PASSWORD) {
        unlock();
      } else {
        input.value = "";
        input.placeholder = "Try again";
      }
    });

    function setActive(index) {
      state.active = index;
      const section = sections[index];
      editorial.innerHTML = \`
        <h2>\${section.title}</h2>
        <div class="notes">
          <div class="note old">
            <strong>\${section.oldLabel}</strong>
            <p>\${section.oldText}</p>
          </div>
          <div class="note">
            <strong>\${section.newLabel}</strong>
            <p>\${section.newText}</p>
          </div>
        </div>
        <p class="verdict">\${section.verdict}</p>
      \`;
    }

    function frameScrollHeight(frame) {
      const doc = frame.contentDocument;
      if (!doc) return window.innerHeight;
      return Math.max(
        doc.documentElement?.scrollHeight || 0,
        doc.body?.scrollHeight || 0,
        window.innerHeight
      );
    }

    function elementsContainingText(doc, pattern) {
      if (!doc || !doc.body) return [];
      return Array.from(doc.body.querySelectorAll("section, div, main, article")).filter((el) => {
        const text = (el.textContent || "").replace(/\\s+/g, " ").trim();
        return pattern.test(text);
      });
    }

    function smallestTextElement(doc, pattern) {
      const matches = elementsContainingText(doc, pattern);
      return matches.sort((a, b) => (a.getBoundingClientRect().height || 99999) - (b.getBoundingClientRect().height || 99999))[0] || null;
    }

    function yInFrame(frame, element) {
      if (!element) return 0;
      const frameRect = frame.getBoundingClientRect();
      const rect = element.getBoundingClientRect();
      return window.scrollY + frameRect.top + rect.top;
    }

    function markerY(section) {
      const doc = newFrame.contentDocument;
      if (!doc || !doc.body) return window.scrollY + window.innerHeight;
      if (section.marker === "top") return yInFrame(newFrame, doc.body);
      if (section.marker === "hero-image") {
        return yInFrame(newFrame, doc.body) + 620;
      }
      if (section.marker === "science-problem") {
        return yInFrame(newFrame, smallestTextElement(doc, /The Numbers Behind the Problem/i));
      }
      if (section.marker === "science-gap") {
        return yInFrame(newFrame, smallestTextElement(doc, /Why No Solution Existed/i));
      }
      if (section.marker === "foundation") {
        return yInFrame(newFrame, smallestTextElement(doc, /Why Recovery Foundation\\?/i));
      }
      if (section.marker === "offer") {
        return yInFrame(newFrame, doc.getElementById("ordering") || smallestTextElement(doc, /Best Value|Autoship|Recovery Foundation Capsules/i));
      }
      if (section.marker === "post-offer") {
        const offer = doc.getElementById("ordering") || smallestTextElement(doc, /Best Value|Autoship/i);
        return yInFrame(newFrame, offer) + Math.round(window.innerHeight * 0.9);
      }
      if (section.marker === "supporting") {
        return yInFrame(newFrame, smallestTextElement(doc, /Ingredients|Customer Reviews|Let customers speak/i));
      }
      return 0;
    }

    function syncFrameHeights() {
      newFrame.style.height = frameScrollHeight(newFrame) + "px";
      oldFrame.style.height = frameScrollHeight(oldFrame) + "px";
    }

    function syncGapHeights() {
      const newDoc = newFrame.contentDocument;
      const oldDoc = oldFrame.contentDocument;
      if (!newDoc || !oldDoc) return;

      // 1. Sync Science Gaps (static height matching corresponding new page sections)
      const scienceSections = Array.from(newDoc.querySelectorAll(".sci-body"));
      const scienceGaps = [
        oldDoc.querySelector('[data-zafira-gap="science-problem"]'),
        oldDoc.querySelector('[data-zafira-gap="science-side-effects"]'),
        oldDoc.querySelector('[data-zafira-gap="science-gap"]')
      ];
      scienceGaps.forEach((gap, index) => {
        const section = scienceSections[index];
        if (gap && section) {
          gap.style.setProperty("--zafira-ab-gap-height", Math.ceil(section.getBoundingClientRect().height) + "px");
        }
      });

      // 2. Sync Alignment Gaps (dynamic height alignment based on visual anchor offsets)
      const alignments = [
        { gap: "foundation-top", anchor: '[data-rid="c4c11ad8-6395-4470-aaf5-15c3a2e91e2b"]' },
        { gap: "foundation-bottom", anchor: '[data-rid="1aaf44f4-8ac4-4ca2-a929-cb3fef4c3720"]' },
        { gap: "capsule-image-top", anchor: '[data-rid="288dac43-67c5-49b0-a277-54e7828bd52f"]' },
        { gap: "offer-cards", anchor: '[data-rid="bb485a75-c36d-4870-b1cb-1f133374d3d9"]' }
      ];

      alignments.forEach(({ gap: gapId, anchor: selector }) => {
        const gap = oldDoc.querySelector(\`[data-zafira-gap="\${gapId}"]\`);
        const oldAnchor = oldDoc.querySelector(selector);
        const newAnchor = newDoc.querySelector(selector);
        
        if (gap && oldAnchor && newAnchor) {
          const oldRect = oldAnchor.getBoundingClientRect();
          const newRect = newAnchor.getBoundingClientRect();
          
          const gapRect = gap.getBoundingClientRect();
          const currentGapHeight = gapRect.height;
          
          const diff = newRect.top - oldRect.top;
          let targetHeight = currentGapHeight + diff;
          if (targetHeight < 0) targetHeight = 0;
          
          gap.style.setProperty("--zafira-ab-gap-height", Math.ceil(targetHeight) + "px");
        }
      });

      oldFrame.style.height = frameScrollHeight(oldFrame) + "px";
    }

    function updateActiveCommentary() {
      const probeY = window.scrollY + 160;
      let activeIndex = 0;
      for (let i = 0; i < sections.length; i += 1) {
        if (probeY >= markerY(sections[i]) - 40) activeIndex = i;
      }
      if (activeIndex !== state.active || !editorial.innerHTML) setActive(activeIndex);
    }

    function requestLayoutUpdate() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        syncGapHeights();
        syncFrameHeights();
        updateActiveCommentary();
      });
    }

    window.addEventListener("scroll", requestLayoutUpdate, { passive: true });
    window.addEventListener("resize", requestLayoutUpdate);
    oldFrame.addEventListener("load", requestLayoutUpdate);
    newFrame.addEventListener("load", requestLayoutUpdate);
    setInterval(requestLayoutUpdate, 600);
    requestLayoutUpdate();
  </script>
</body>
</html>`;
}

refreshSnapshots();
writeFileSync(join(docsDir, "index.html"), pageHtml());
console.log("Built docs/index.html A/B comparison");

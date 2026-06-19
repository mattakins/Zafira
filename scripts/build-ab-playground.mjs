import { cpSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const docsDir = join(root, "docs");
const docsOriginal = join(docsDir, "original");
const docsNew = join(docsDir, "new");
const frameVersion = "20260619-interactive-5";

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
    marker: "hero-symptoms",
    oldMissing: false,
  },
  {
    title: "3. The science section fills the biggest strategic gap.",
    oldLabel: "Original: Nothing",
    oldText: "The original page has no equivalent problem-scale proof section.",
    newLabel: "New: problem quantified",
    newText: "The new section adds market scale, symptom incidence, and survey framing before introducing the solution.",
    verdict: "This is the highest-leverage addition. It makes the problem feel real, widespread, and measurable. That gives the product a reason to exist beyond ordinary supplement positioning.",
    marker: "science-problem",
    oldMissing: true,
  },
  {
    title: "4. The page explains why this needs a protocol, not a patch.",
    oldLabel: "Original: no mechanism gap",
    oldText: "The original page explains ingredients and benefits, but it does not first explain why ordinary symptom-by-symptom supplements are insufficient.",
    newLabel: "New: mechanism gap",
    newText: "The new page explains that nausea, fatigue, mood changes, digestion issues, and nutrient depletion are connected effects of the GLP-1 cascade.",
    verdict: "That makes the offer feel necessary. Instead of selling a random wellness supplement, the page creates the logic for a bundled recovery protocol before asking the customer to believe the product.",
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
    endMarker: "triple-depletion-image",
    oldMissing: false,
  },
  {
    title: "6. Header shop now button anchors to product image, not title.",
    oldLabel: "Original: title-first anchor",
    oldText: "The original jump lands closer to the product title and purchase controls.",
    newLabel: "New: product image first",
    newText: "The revised page anchors the header Shop Now button to the Zafira Recovery Foundation product image.",
    verdict: "That is the better handoff. The visitor clicks from a problem-aware hero and lands on the physical product first, which makes the purchase section feel more tangible before the offer mechanics appear.",
    marker: "product-image",
    oldMissing: false,
  },
  {
    title: "7. The offer now sells continuity, not just quantity.",
    oldLabel: "Original: quantity selector",
    oldText: "The original buy box feels like a typical bundle selector: buy one, buy two, buy three. It adds in a confusing refill checkbox which can end up with the customer receiving multi-month supplies every month.",
    newLabel: "New: subscription offer architecture",
    newText: "The new buy box presents a 3-month best-value autoship and a 1-month autoship, with clear pricing and delivery cadence.",
    verdict: "That is a better fit for a recovery protocol. It frames the purchase around consistent use, which supports the recommendation that customers need several months of use. Leading brands like IM8 and Primal Queen are leaning into 90 day subscription models to drive consistent MRR.",
    marker: "offer-after-product-image",
    endMarker: "one-month-offer-end",
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

  const frameInteractionScript = `
<script id="zafira-ab-frame-interactions">
  (function () {
    function post(type, payload) {
      if (!window.parent || window.parent === window) return;
      window.parent.postMessage(Object.assign({ type: type }, payload || {}), "*");
    }

    function scrollParent(deltaY, deltaX) {
      post("zafira-ab-frame-scroll", {
        deltaX: deltaX || 0,
        deltaY: deltaY || 0
      });
    }

    function isComparisonFrame() {
      return !!window.frameElement;
    }

    window.addEventListener("wheel", function (event) {
      if (event.ctrlKey) return;
      if (!isComparisonFrame()) return;
      event.preventDefault();
      scrollParent(event.deltaY, event.deltaX);
    }, { passive: false });

    var lastTouchY = null;
    var lastTouchX = null;
    window.addEventListener("touchstart", function (event) {
      if (!event.touches || !event.touches.length) return;
      lastTouchY = event.touches[0].clientY;
      lastTouchX = event.touches[0].clientX;
    }, { passive: true });

    window.addEventListener("touchmove", function (event) {
      if (!event.touches || !event.touches.length || lastTouchY === null) return;
      if (!isComparisonFrame()) return;
      var touch = event.touches[0];
      var deltaY = lastTouchY - touch.clientY;
      var deltaX = lastTouchX - touch.clientX;
      lastTouchY = touch.clientY;
      lastTouchX = touch.clientX;
      event.preventDefault();
      scrollParent(deltaY, deltaX);
    }, { passive: false });

    window.addEventListener("touchend", function () {
      lastTouchY = null;
      lastTouchX = null;
    }, { passive: true });

    function targetForHash(hash) {
      if (!hash || hash === "#") return null;
      try {
        return document.querySelector(hash);
      } catch {
        return document.getElementById(hash.slice(1));
      }
    }

    function productTarget() {
      return document.getElementById("ordering") ||
        document.querySelector('[data-rid="288dac43-67c5-49b0-a277-54e7828bd52f"]') ||
        document.querySelector("[data-replo-product-container]");
    }

    function sendScrollTo(target) {
      if (!target) return false;
      post("zafira-ab-frame-scroll-to", {
        y: target.getBoundingClientRect().top
      });
      return true;
    }

    document.addEventListener("click", function (event) {
      var offerButton = event.target.closest && event.target.closest(".zafira-offer-button");
      if (offerButton) {
        event.preventDefault();
        event.stopImmediatePropagation();
        post("zafira-ab-offer-selected", {
          label: offerButton.getAttribute("data-offer-label") || "Offer"
        });
        return;
      }

      var link = event.target.closest && event.target.closest("a[href]");
      if (link) {
        var href = link.getAttribute("href") || "";
        var hash = "";
        try {
          hash = new URL(href, window.location.href).hash;
        } catch {}
        var hashTarget = targetForHash(hash);
        if (hashTarget) {
          event.preventDefault();
          sendScrollTo(hashTarget);
          return;
        }
      }

      var action = event.target.closest && event.target.closest("button, [role='link'], a");
      if (!action) return;
      var text = (action.textContent || "").replace(/\\s+/g, " ").trim();
      if (/^(shop now|buy now|order now|shop recovery foundation)$/i.test(text)) {
        event.preventDefault();
        sendScrollTo(productTarget());
      }
    }, true);
  })();
</script>`;

  const newIndexPath = join(docsNew, "index.html");
  const newIndex = readFileSync(newIndexPath, "utf8")
    .replaceAll('href="/"', 'href="../new/index.html"')
    .replaceAll('href="/#', 'href="../new/index.html#')
    .replaceAll('src="/new/assets/', 'src="assets/')
    .replaceAll('srcSet="/new/assets/', 'srcSet="assets/')
    .replaceAll('srcset="/new/assets/', 'srcset="assets/')
    .replaceAll('"/new/assets/', '"assets/')
    .replaceAll("'/new/assets/", "'assets/")
    .replace("</body>", `${frameInteractionScript}</body>`);
  writeFileSync(newIndexPath, newIndex);

  const originalIndexPath = join(docsOriginal, "index.html");
  const originalPlaceholderStyles = `
<style id="zafira-ab-original-placeholders">
  .zafira-ab-missing-section {
    align-items: center;
    background:
      repeating-linear-gradient(-45deg, rgba(3,92,5,0.075), rgba(3,92,5,0.075) 14px, rgba(255,255,255,0.22) 14px, rgba(255,255,255,0.22) 28px),
      #eff8ef;
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
    .replace("</body>", `${originalPlaceholderStyles}${originalPlaceholderScript}${frameInteractionScript}</body>`);
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
      --bg: #f4f8ef;
      --panel: #ffffff;
      --line: rgba(31, 104, 27, 0.16);
      --text: #173217;
      --muted: #60715d;
      --green: #1f681b;
      --soft-green: #e8f4e3;
      --phone: 370px;
    }

    * { box-sizing: border-box; }

    body {
      margin: 0;
      background:
        linear-gradient(180deg, rgba(232, 244, 227, 0.8), rgba(255, 255, 255, 0) 360px),
        var(--bg);
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

    .gate-subtitle {
      color: var(--green);
      font-size: 1rem;
      font-weight: 700;
      margin: -2px 0 18px;
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
      background: #ffffff;
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
      color: #ffffff;
      cursor: pointer;
      font-weight: 800;
      padding: 12px 16px;
    }

    .gate-note {
      color: #7d8b79;
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
      align-items: center;
      background: linear-gradient(rgba(244, 248, 239, 0.98) 72%, rgba(244, 248, 239, 0));
      display: flex;
      justify-content: space-between;
      margin: 0 4px 8px;
      min-height: 36px;
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

    .column-title small {
      color: var(--muted);
      font-size: 0.82rem;
      font-weight: 500;
    }

    .column-title {
      align-items: center;
      display: inline-flex;
      gap: 8px;
    }

    .external-link {
      align-items: center;
      background: rgba(255, 255, 255, 0.76);
      border: 1px solid var(--line);
      border-radius: 999px;
      color: var(--muted);
      display: inline-flex;
      height: 26px;
      justify-content: center;
      text-decoration: none;
      transition: background 120ms ease, color 120ms ease, border-color 120ms ease;
      width: 26px;
    }

    .external-link:hover {
      background: var(--soft-green);
      border-color: rgba(31, 104, 27, 0.38);
      color: var(--green);
    }

    .external-link svg {
      height: 15px;
      width: 15px;
    }

    .phone {
      background: #ffffff;
      border: 1px solid rgba(31, 104, 27, 0.18);
      border-radius: 28px;
      box-shadow: 0 18px 50px rgba(31, 65, 28, 0.16);
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
      width: 100%;
    }

    .editorial {
      min-height: var(--comparison-height, 100vh);
      padding-top: 76px;
      position: relative;
    }

    .editorial-shell {
      align-items: start;
      display: grid;
      gap: 14px;
      grid-template-columns: 46px minmax(0, 1fr);
      min-height: calc(var(--comparison-height, 100vh) - 76px);
      position: relative;
    }

    .timeline {
      height: 100vh;
      min-height: 620px;
      position: sticky;
      top: 0;
    }

    .timeline::before {
      background: linear-gradient(180deg, rgba(31, 104, 27, 0.12), rgba(31, 104, 27, 0.34));
      border-radius: 999px;
      content: "";
      inset: 0 auto 0 50%;
      position: absolute;
      transform: translateX(-50%);
      width: 3px;
    }

    .timeline-progress {
      background: var(--green);
      border-radius: 999px;
      left: 50%;
      position: absolute;
      top: 0;
      transform: translateX(-50%);
      width: 3px;
      z-index: 1;
    }

    .timeline-notch {
      align-items: center;
      background: #ffffff;
      border: 2px solid rgba(31, 104, 27, 0.38);
      border-radius: 999px;
      color: var(--green);
      cursor: pointer;
      display: flex;
      font-size: 0.7rem;
      font-weight: 800;
      height: 28px;
      justify-content: center;
      left: 50%;
      padding: 0;
      position: absolute;
      transform: translate(-50%, -50%);
      transition: background 120ms ease, color 120ms ease, transform 120ms ease, border-color 120ms ease;
      width: 28px;
      z-index: 2;
    }

    .timeline-notch:hover,
    .timeline-notch.is-active {
      background: var(--green);
      border-color: var(--green);
      color: #ffffff;
      transform: translate(-50%, -50%) scale(1.12);
    }

    .editorial-panel {
      background: var(--panel);
      border: 1px solid var(--line);
      border-radius: 18px;
      box-shadow: 0 18px 48px rgba(31, 65, 28, 0.12);
      padding: clamp(22px, 4vw, 46px);
      position: sticky;
      top: 0;
      transition: opacity 120ms ease;
    }

    .editorial-panel.is-empty {
      opacity: 0;
      pointer-events: none;
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
      background: #f8fbf4;
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

    .note.old strong { color: #667461; }

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

    .playground-modal {
      align-items: center;
      background: rgba(6, 16, 6, 0.64);
      display: none;
      height: 100vh;
      justify-content: center;
      left: 0;
      padding: 24px;
      position: absolute;
      right: 0;
      top: 0;
      z-index: 30;
    }

    .playground-modal.is-visible { display: flex; }

    .playground-modal__panel {
      background: #f8fff4;
      border: 1px solid rgba(3, 92, 5, 0.2);
      border-radius: 18px;
      box-shadow: 0 24px 80px rgba(0,0,0,0.38);
      color: #123413;
      max-width: 360px;
      padding: 28px;
      position: relative;
      text-align: center;
      width: min(100%, 360px);
    }

    .playground-modal__close {
      align-items: center;
      background: #1f681b;
      border: 0;
      border-radius: 999px;
      color: white;
      cursor: pointer;
      display: flex;
      font-size: 1.1rem;
      height: 34px;
      justify-content: center;
      position: absolute;
      right: 12px;
      top: 12px;
      width: 34px;
    }

    .playground-modal__eyebrow {
      color: #1f681b;
      font-size: 0.75rem;
      font-weight: 800;
      letter-spacing: 0.12em;
      margin: 0 0 10px;
      text-transform: uppercase;
    }

    .playground-modal h3 {
      font-family: Georgia, serif;
      font-size: 1.8rem;
      line-height: 1.05;
      margin: 0 0 12px;
    }

    .playground-modal__message {
      color: #315130;
      line-height: 1.45;
      margin: 0;
    }

    .playground-confetti {
      height: 100vh;
      left: 0;
      pointer-events: none;
      position: absolute;
      right: 0;
      top: 0;
      z-index: 31;
    }

    @media (max-width: 1180px) {
      .compare-grid {
        grid-template-columns: minmax(330px, 1fr) minmax(330px, 1fr);
      }

      .editorial {
        grid-column: 1 / -1;
        padding-top: 0;
        position: static;
      }

      .editorial-shell {
        grid-template-columns: 1fr;
        position: static;
      }

      .timeline {
        display: none;
      }

      .editorial-panel {
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

      .editorial-panel {
        min-height: 0;
        position: static;
      }
    }
  </style>
</head>
<body>
  <div class="gate is-visible" id="gate">
    <form class="gate-card" id="gateForm">
      <h1>Zafira New Landing Page</h1>
      <div class="gate-subtitle">by Matt Akins</div>
      <div class="gate-row">
        <input id="passwordInput" type="password" autocomplete="current-password" autocapitalize="off" autocorrect="off" spellcheck="false" placeholder="Password">
        <button type="submit">Open</button>
      </div>
    </form>
  </div>

  <div class="app" id="app">
    <main class="compare-grid">
      <section class="site-column">
        <div class="column-label">
          <span class="column-title">
            <strong>Old Version</strong>
            <a class="external-link" href="original/index.html" target="_blank" rel="noopener" aria-label="Open full old page">
              <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M15 3h6v6"></path>
                <path d="M10 14 21 3"></path>
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
              </svg>
            </a>
          </span>
          <span>iPhone Pro width</span>
        </div>
        <div class="phone">
          <div class="screen">
            <iframe id="oldFrame" src="original/index.html?v=${frameVersion}" title="Old Zafira page" scrolling="no"></iframe>
          </div>
        </div>
      </section>

      <section class="site-column">
        <div class="column-label">
          <span class="column-title">
            <strong>New Version</strong>
            <small>by Matt Akins</small>
            <a class="external-link" href="new/index.html" target="_blank" rel="noopener" aria-label="Open full new page">
              <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M15 3h6v6"></path>
                <path d="M10 14 21 3"></path>
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
              </svg>
            </a>
          </span>
          <span>iPhone Pro width</span>
        </div>
        <div class="phone">
          <div class="screen" id="newScreen">
            <iframe id="newFrame" src="new/index.html?v=${frameVersion}" title="New Zafira page" scrolling="no"></iframe>
            <div class="playground-modal" id="offerModal" aria-hidden="true" role="dialog" aria-modal="true" aria-labelledby="offerModalTitle">
              <div class="playground-modal__panel">
                <button class="playground-modal__close" id="offerModalClose" type="button" aria-label="Close">×</button>
                <p class="playground-modal__eyebrow">Demo checkout</p>
                <h3 id="offerModalTitle">Offer selected</h3>
                <p class="playground-modal__message">In production this would redirect directly to the Shopify checkout page.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="editorial">
        <div class="editorial-shell">
          <div class="timeline" id="timeline" aria-label="Critique scroll points">
            <div class="timeline-progress" id="timelineProgress"></div>
          </div>
          <article class="editorial-panel" id="editorial"></article>
        </div>
      </section>
    </main>
  </div>

  <script>
    const PASSWORD = "2cNy<4!sS6J1";
    const STORAGE_KEY = "zafira-ab-authed";
    const sections = ${sectionJson};
    const state = { active: 0 };
    let ticking = false;

    const gate = document.getElementById("gate");
    const app = document.getElementById("app");
    const editorial = document.getElementById("editorial");
    const editorialColumn = document.querySelector(".editorial");
    const timeline = document.getElementById("timeline");
    const timelineProgress = document.getElementById("timelineProgress");
    const oldFrame = document.getElementById("oldFrame");
    const newScreen = document.getElementById("newScreen");
    const newFrame = document.getElementById("newFrame");
    const offerModal = document.getElementById("offerModal");
    const offerModalTitle = document.getElementById("offerModalTitle");
    const offerModalClose = document.getElementById("offerModalClose");

    function unlock() {
      gate.classList.remove("is-visible");
      app.classList.add("is-visible");
      sessionStorage.setItem(STORAGE_KEY, "true");
      buildTimeline();
      setActive(0);
      requestLayoutUpdate();
    }

    if (sessionStorage.getItem(STORAGE_KEY) === "true") unlock();

    const passwordInput = document.getElementById("passwordInput");

    function applyPasswordPaste(event) {
      const text = event.clipboardData?.getData("text");
      if (!text) return;
      event.preventDefault();
      passwordInput.value = text.trim();
      passwordInput.focus();
    }

    passwordInput.addEventListener("paste", applyPasswordPaste);
    gate.addEventListener("paste", (event) => {
      if (event.target === passwordInput) return;
      applyPasswordPaste(event);
    });

    document.getElementById("gateForm").addEventListener("submit", (event) => {
      event.preventDefault();
      const input = passwordInput;
      if (input.value.trim() === PASSWORD) {
        unlock();
      } else {
        input.value = "";
        input.placeholder = "Try again";
      }
    });

    function setActive(index) {
      state.active = index;
      updateTimelineActive();
      if (index < 0) {
        editorial.classList.add("is-empty");
        editorial.innerHTML = "";
        return;
      }
      editorial.classList.remove("is-empty");
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

    function buildTimeline() {
      if (!timeline || timeline.dataset.ready === "true") return;
      sections.forEach((section, index) => {
        const button = document.createElement("button");
        button.className = "timeline-notch";
        button.type = "button";
        button.textContent = String(index + 1);
        button.title = section.title;
        button.setAttribute("aria-label", "Jump to critique " + (index + 1) + ": " + section.title);
        button.dataset.index = String(index);
        button.addEventListener("click", () => {
          const target = Math.max(0, markerY(section) - 150);
          window.scrollTo({ top: target, behavior: "smooth" });
        });
        timeline.appendChild(button);
      });
      timeline.dataset.ready = "true";
    }

    function updateTimelineActive() {
      if (!timeline) return;
      timeline.querySelectorAll(".timeline-notch").forEach((notch) => {
        notch.classList.toggle("is-active", Number(notch.dataset.index) === state.active);
      });
    }

    function updateTimelinePositions() {
      if (!timeline || timeline.dataset.ready !== "true") return;
      const trackTop = 0;
      const trackHeight = Math.max(1, timeline.clientHeight);
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      timeline.querySelectorAll(".timeline-notch").forEach((notch) => {
        const index = Number(notch.dataset.index);
        const marker = Math.max(0, Math.min(maxScroll, markerY(sections[index]) - 150));
        const pct = marker / maxScroll;
        notch.style.top = trackTop + (pct * trackHeight) + "px";
      });
      if (timelineProgress) {
        const progress = Math.max(0, Math.min(1, window.scrollY / maxScroll));
        timelineProgress.style.height = (progress * trackHeight) + "px";
      }
      updateTimelineActive();
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

    function markerY(sectionOrMarker) {
      const marker = typeof sectionOrMarker === "string" ? sectionOrMarker : sectionOrMarker.marker;
      const doc = newFrame.contentDocument;
      if (!doc || !doc.body) return window.scrollY + window.innerHeight;
      if (marker === "top") return yInFrame(newFrame, doc.body);
      if (marker === "hero-symptoms") {
        const symptoms = smallestTextElement(doc, /Nausea\\. Exhaustion\\. Brain fog\\. Flat mood\\. No motivation\\. Muscle loss\\./i);
        const symptomY = yInFrame(newFrame, symptoms);
        const heroImage = doc.querySelector(".zafira-hero-media") || doc.querySelector('[data-rid="1b363c0e-64ee-40e3-aecd-9acc21542448"]');
        const heroY = yInFrame(newFrame, heroImage);
        if (symptoms && heroImage && heroY > symptomY) return symptomY + Math.round((heroY - symptomY) * 0.5);
        return symptomY + 180;
      }
      if (marker === "hero-image") {
        return yInFrame(newFrame, doc.body) + 620;
      }
      if (marker === "science-problem") {
        return yInFrame(newFrame, smallestTextElement(doc, /The Numbers Behind the Problem/i));
      }
      if (marker === "science-gap") {
        return yInFrame(newFrame, smallestTextElement(doc, /Why No Solution Existed/i));
      }
      if (marker === "foundation") {
        return yInFrame(newFrame, smallestTextElement(doc, /Why Recovery Foundation\\?/i));
      }
      if (marker === "triple-depletion-image") {
        return yInFrame(newFrame, doc.querySelector('[data-rid="72752fff-f2c3-4be4-a70c-b9be534b133a"]') || smallestTextElement(doc, /The Triple Depletion Complex/i));
      }
      if (marker === "product-image") {
        return yInFrame(newFrame, doc.querySelector('[data-rid="288dac43-67c5-49b0-a277-54e7828bd52f"]') || smallestTextElement(doc, /Zafira Recovery Foundation Capsules/i));
      }
      if (marker === "offer-after-product-image") {
        const productImage = doc.querySelector('[data-rid="288dac43-67c5-49b0-a277-54e7828bd52f"]');
        if (productImage) {
          const rect = productImage.getBoundingClientRect();
          return yInFrame(newFrame, productImage) + Math.min(520, Math.round(rect.height * 0.72));
        }
        return yInFrame(newFrame, doc.getElementById("ordering") || smallestTextElement(doc, /Best Value|Autoship|Recovery Foundation Capsules/i));
      }
      if (marker === "one-month-offer-end") {
        const oneMonth = doc.querySelector('[data-offer="one-month"]');
        if (oneMonth) {
          return yInFrame(newFrame, oneMonth) + oneMonth.getBoundingClientRect().height;
        }
        return Number.POSITIVE_INFINITY;
      }
      if (marker === "offer") {
        return yInFrame(newFrame, doc.getElementById("ordering") || smallestTextElement(doc, /Best Value|Autoship|Recovery Foundation Capsules/i));
      }
      if (marker === "post-offer") {
        const offer = doc.getElementById("ordering") || smallestTextElement(doc, /Best Value|Autoship/i);
        return yInFrame(newFrame, offer) + Math.round(window.innerHeight * 0.9);
      }
      if (marker === "supporting") {
        return yInFrame(newFrame, smallestTextElement(doc, /What Our Customers Are Saying|Customer Reviews|Let customers speak/i));
      }
      return 0;
    }

    function syncFrameHeights() {
      const newHeight = frameScrollHeight(newFrame);
      const oldHeight = frameScrollHeight(oldFrame);
      newFrame.style.height = newHeight + "px";
      oldFrame.style.height = oldHeight + "px";
      if (editorialColumn) {
        editorialColumn.style.setProperty("--comparison-height", Math.max(newHeight, oldHeight, window.innerHeight) + "px");
      }
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
      let activeIndex = -1;
      for (let i = 0; i < sections.length; i += 1) {
        const section = sections[i];
        const startY = markerY(section);
        const nextSection = sections[i + 1];
        const endY = section.endMarker ? markerY(section.endMarker) : (nextSection ? markerY(nextSection) : Number.POSITIVE_INFINITY);
        if (probeY >= startY - 40 && probeY < endY - 40) activeIndex = i;
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
        updateTimelinePositions();
      });
    }

    function visibleTopInNewScreen() {
      const screenTop = window.scrollY + newScreen.getBoundingClientRect().top;
      return Math.max(0, window.scrollY - screenTop);
    }

    function positionOfferLayer(element) {
      if (!element) return;
      element.style.top = visibleTopInNewScreen() + "px";
      element.style.height = Math.min(window.innerHeight, newScreen.clientHeight) + "px";
    }

    function showConfetti() {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const dpr = window.devicePixelRatio || 1;
      const colors = ["#ff4d6d", "#ffd166", "#06d6a0", "#118ab2", "#9b5de5", "#f15bb5", "#035C05", "#F7B456"];
      const pieces = [];
      const duration = 2300;
      const start = performance.now();

      canvas.className = "playground-confetti";
      positionOfferLayer(canvas);
      newScreen.appendChild(canvas);

      function resize() {
        canvas.width = Math.floor(newScreen.clientWidth * dpr);
        canvas.height = Math.floor(canvas.getBoundingClientRect().height * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      }

      resize();

      for (let i = 0; i < 170; i += 1) {
        pieces.push({
          x: Math.random() * newScreen.clientWidth,
          y: -40 - Math.random() * canvas.getBoundingClientRect().height * 0.5,
          w: 5 + Math.random() * 8,
          h: 7 + Math.random() * 12,
          vx: -1.1 + Math.random() * 2.2,
          vy: 2.2 + Math.random() * 3.5,
          rotation: Math.random() * Math.PI,
          spin: -0.18 + Math.random() * 0.36,
          color: colors[i % colors.length],
          opacity: 0.82 + Math.random() * 0.18,
        });
      }

      function draw(now) {
        const elapsed = now - start;
        ctx.clearRect(0, 0, newScreen.clientWidth, canvas.getBoundingClientRect().height);
        pieces.forEach((piece) => {
          piece.x += piece.vx;
          piece.y += piece.vy;
          piece.rotation += piece.spin;
          piece.vy += 0.018;
          const fade = elapsed > duration - 900 ? Math.max(0, (duration - elapsed) / 900) : 1;
          ctx.save();
          ctx.globalAlpha = piece.opacity * fade;
          ctx.translate(piece.x, piece.y);
          ctx.rotate(piece.rotation);
          ctx.fillStyle = piece.color;
          ctx.fillRect(-piece.w / 2, -piece.h / 2, piece.w, piece.h);
          ctx.restore();
        });

        if (elapsed < duration) {
          requestAnimationFrame(draw);
        } else {
          canvas.remove();
        }
      }

      window.addEventListener("resize", resize, { once: true });
      requestAnimationFrame(draw);
    }

    function openOfferModal(label) {
      if (offerModalTitle) offerModalTitle.textContent = (label || "Offer") + " selected";
      if (offerModal) {
        positionOfferLayer(offerModal);
        offerModal.classList.add("is-visible");
        offerModal.setAttribute("aria-hidden", "false");
      }
    }

    function closeOfferModal() {
      if (!offerModal) return;
      offerModal.classList.remove("is-visible");
      offerModal.setAttribute("aria-hidden", "true");
    }

    offerModalClose.addEventListener("click", closeOfferModal);
    offerModal.addEventListener("click", (event) => {
      if (event.target === offerModal) closeOfferModal();
    });
    window.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeOfferModal();
    });

    window.addEventListener("message", (event) => {
      if (!event.data || typeof event.data.type !== "string") return;
      const sourceFrame =
        event.source === oldFrame.contentWindow ? oldFrame :
        event.source === newFrame.contentWindow ? newFrame :
        null;
      if (!sourceFrame) return;

      if (event.data.type === "zafira-ab-frame-scroll") {
        window.scrollBy({
          left: Number(event.data.deltaX) || 0,
          top: Number(event.data.deltaY) || 0,
          behavior: "auto",
        });
        requestLayoutUpdate();
      }

      if (event.data.type === "zafira-ab-frame-scroll-to") {
        const frameTop = window.scrollY + sourceFrame.getBoundingClientRect().top;
        const targetY = frameTop + (Number(event.data.y) || 0) - 12;
        window.scrollTo({ top: Math.max(0, targetY), behavior: "smooth" });
        window.setTimeout(requestLayoutUpdate, 260);
      }

      if (event.data.type === "zafira-ab-offer-selected") {
        showConfetti();
        window.setTimeout(() => openOfferModal(event.data.label), 700);
      }
    });

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

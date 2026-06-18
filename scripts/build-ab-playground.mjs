import { cpSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const docsDir = join(root, "docs");
const docsOriginal = join(docsDir, "original");
const docsNew = join(docsDir, "new");

const sections = [
  {
    id: "hero",
    title: "Hero Message",
    oldSelector: "body",
    newSelector: "body",
    oldNote: "Product-led wellness page. It explains the supplement, but it asks the visitor to infer why they need it.",
    newNote: "Problem-led GLP-1 Flu hook. It names nausea, exhaustion, brain fog, flat mood, no motivation, and muscle loss immediately.",
    critique: "The new hero wins because it starts where the prospect is already hurting. It turns a vague supplement claim into a specific, recognizable GLP-1 symptom pattern.",
    highlight: "New headline, symptom line, subhead, and hero image.",
    oldMissing: false,
    newMissing: false,
    oldY: 0,
    newY: 0,
  },
  {
    id: "press",
    title: "Press Credibility",
    oldSelector: "body",
    newSelector: "body",
    oldNote: "Press logos appear, but they support a broader product story.",
    newNote: "Press logos now reinforce a sharper symptom-relief promise directly under the GLP-1 Flu hero.",
    critique: "Same credibility asset, stronger placement. The new page uses borrowed trust after a more urgent hook, so the proof lands with more force.",
    highlight: "Context change rather than layout change.",
    oldMissing: false,
    newMissing: false,
    oldY: 620,
    newY: 570,
  },
  {
    id: "science-problem",
    title: "Science: Problem Scale",
    oldSelector: null,
    newSelector: "#glp1-flu-science",
    oldNote: "Missing. The original jumps from product positioning into mechanism without first proving the size and seriousness of the GLP-1 side-effect problem.",
    newNote: "Adds the market-size setup, side-effect incidence, and survey framing before explaining the solution.",
    critique: "This is the most important strategic addition. It makes the problem feel common, measurable, and under-addressed before asking the client to believe in the product.",
    highlight: "New section: The Numbers Behind the Problem.",
    oldMissing: true,
    newMissing: false,
    oldY: 760,
    newY: 680,
  },
  {
    id: "science-gap",
    title: "Science: Solution Gap",
    oldSelector: null,
    newSelector: "#glp1-flu-science",
    oldNote: "Missing. The original does not clearly articulate why existing advice feels incomplete.",
    newNote: "Explains the disconnect between what users are told and what they actually experience.",
    critique: "This creates the opening for Zafira. The new page does not just say side effects exist; it explains why the category has a missing solution.",
    highlight: "New sections: What GLP-1 Users Are Actually Saying and Why No Solution Existed.",
    oldMissing: true,
    newMissing: false,
    oldY: 980,
    newY: 1220,
  },
  {
    id: "foundation",
    title: "Why Recovery Foundation",
    oldSelector: "body",
    newSelector: "body",
    oldNote: "Original explains the mechanism, but uses a more generic illustration style.",
    newNote: "New version uses a more concrete benefits image with a woman, bottle, ingredients, and outcome claims.",
    critique: "The new image makes the mechanism feel more tangible. It connects the supplement to real user outcomes instead of relying on abstract explanation alone.",
    highlight: "Image change and clearer visual proof.",
    oldMissing: false,
    newMissing: false,
    oldY: 760,
    newY: 2100,
  },
  {
    id: "product",
    title: "Product And Offer",
    oldSelector: "#ordering",
    newSelector: "#ordering",
    oldNote: "Original uses quantity-style bundle choices that feel like a store widget.",
    newNote: "New version reframes the purchase as two subscription offers: 3-month best value and 1-month autoship.",
    critique: "The new offer architecture is stronger because it sells continuity, not just quantity. That better matches a recovery protocol that needs consistent use.",
    highlight: "Offer-card replacement, product images, final price placement, and demo checkout behavior.",
    oldMissing: false,
    newMissing: false,
    oldY: 2350,
    newY: 2950,
  },
  {
    id: "warning-proof",
    title: "Risk Reversal And Proof",
    oldSelector: "#ordering",
    newSelector: "#ordering",
    oldNote: "Original includes trust elements but they sit inside a more generic buying flow.",
    newNote: "New page keeps the warning, recommendation, testimonial, and FAQ below the offer cards.",
    critique: "The new sequence is more client-ready: make the offer, reduce purchase anxiety, then answer objections.",
    highlight: "Post-offer trust sequence.",
    oldMissing: false,
    newMissing: false,
    oldY: 3300,
    newY: 4100,
  },
  {
    id: "rest",
    title: "Supporting Content",
    oldSelector: "body",
    newSelector: "body",
    oldNote: "Original has ingredients, reviews, scientific background, customer wall, and footer.",
    newNote: "New page preserves the downstream proof stack while front-loading the GLP-1 Flu argument.",
    critique: "This matters because the rewrite is additive, not a teardown. The new page keeps the existing trust base and adds the missing problem-aware narrative above it.",
    highlight: "Existing support sections retained.",
    oldMissing: false,
    newMissing: false,
    oldY: 4400,
    newY: 5200,
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
  const originalIndex = readFileSync(originalIndexPath, "utf8")
    .replaceAll('href="/"', 'href="../original/index.html"')
    .replaceAll('href="/#', 'href="../original/index.html#');
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
      --panel-2: #203120;
      --line: rgba(212, 241, 211, 0.18);
      --text: #f5fff4;
      --muted: #aec3ad;
      --green: #7be277;
      --green-dark: #035c05;
      --gold: #f7b456;
      --bad: #767f78;
      --phone: 390px;
    }

    * { box-sizing: border-box; }
    html { scroll-behavior: smooth; }
    body {
      margin: 0;
      background:
        radial-gradient(circle at top left, rgba(123, 226, 119, 0.18), transparent 32rem),
        linear-gradient(180deg, #101510 0%, #0b100b 100%);
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
      z-index: 100;
    }

    .gate.is-visible { display: flex; }

    .gate-card {
      background: linear-gradient(180deg, rgba(32, 49, 32, 0.98), rgba(18, 26, 18, 0.98));
      border: 1px solid var(--line);
      border-radius: 18px;
      box-shadow: 0 24px 90px rgba(0,0,0,0.42);
      max-width: 420px;
      padding: 26px;
      width: 100%;
    }

    .gate-card h1 {
      font-family: Georgia, serif;
      font-size: 2.1rem;
      line-height: 1;
      margin: 0 0 10px;
    }

    .gate-card p {
      color: var(--muted);
      line-height: 1.5;
      margin: 0 0 18px;
    }

    .gate-row {
      display: flex;
      gap: 10px;
    }

    .gate input {
      background: #0d130d;
      border: 1px solid var(--line);
      border-radius: 10px;
      color: var(--text);
      min-width: 0;
      padding: 12px 13px;
      width: 100%;
    }

    .gate button,
    .control-button,
    .copy-button,
    .mode-button {
      background: var(--green);
      border: 0;
      border-radius: 999px;
      color: #061006;
      cursor: pointer;
      font-weight: 800;
      padding: 11px 16px;
    }

    .gate-note {
      color: #7f927e;
      font-size: 0.78rem;
      margin-top: 14px;
    }

    .app { display: none; }
    .app.is-visible { display: block; }

    .topbar {
      align-items: center;
      backdrop-filter: blur(16px);
      background: rgba(16, 21, 16, 0.86);
      border-bottom: 1px solid var(--line);
      display: grid;
      gap: 16px;
      grid-template-columns: 1fr auto;
      left: 0;
      padding: 14px clamp(16px, 4vw, 42px);
      position: sticky;
      right: 0;
      top: 0;
      z-index: 20;
    }

    .brand {
      display: grid;
      gap: 3px;
    }

    .brand strong {
      color: var(--green);
      font-family: Georgia, serif;
      font-size: clamp(1.35rem, 2vw, 2rem);
      font-weight: 700;
    }

    .brand span {
      color: var(--muted);
      font-size: 0.88rem;
    }

    .top-actions {
      align-items: center;
      display: flex;
      gap: 10px;
    }

    .mode-switch {
      background: rgba(255,255,255,0.06);
      border: 1px solid var(--line);
      border-radius: 999px;
      display: flex;
      padding: 4px;
    }

    .mode-button {
      background: transparent;
      color: var(--muted);
      padding: 8px 13px;
    }

    .mode-button.is-active {
      background: var(--green);
      color: #061006;
    }

    .layout {
      display: grid;
      gap: 22px;
      grid-template-columns: 280px minmax(0, 1fr);
      padding: 22px clamp(16px, 3vw, 36px) 40px;
    }

    .sidebar {
      align-self: start;
      background: rgba(23, 33, 23, 0.9);
      border: 1px solid var(--line);
      border-radius: 16px;
      padding: 14px;
      position: sticky;
      top: 86px;
    }

    .sidebar h2 {
      font-size: 0.78rem;
      letter-spacing: 0.12em;
      margin: 2px 0 10px;
      text-transform: uppercase;
      color: var(--muted);
    }

    .nav-item {
      background: transparent;
      border: 1px solid transparent;
      border-radius: 12px;
      color: var(--text);
      cursor: pointer;
      display: block;
      line-height: 1.25;
      margin: 3px 0;
      padding: 10px;
      text-align: left;
      width: 100%;
    }

    .nav-item small {
      color: var(--muted);
      display: block;
      font-size: 0.72rem;
      margin-top: 3px;
    }

    .nav-item.is-active {
      background: rgba(123, 226, 119, 0.12);
      border-color: rgba(123, 226, 119, 0.44);
      color: var(--green);
    }

    .main {
      display: grid;
      gap: 18px;
      min-width: 0;
    }

    .intro {
      background: rgba(23, 33, 23, 0.74);
      border: 1px solid var(--line);
      border-radius: 18px;
      display: grid;
      gap: 16px;
      grid-template-columns: minmax(0, 1fr) 320px;
      padding: clamp(18px, 3vw, 28px);
    }

    .intro h1 {
      font-family: Georgia, serif;
      font-size: clamp(2rem, 4vw, 4.8rem);
      line-height: 0.98;
      margin: 0 0 12px;
      max-width: 820px;
    }

    .intro p {
      color: var(--muted);
      font-size: 1.02rem;
      line-height: 1.55;
      margin: 0;
      max-width: 820px;
    }

    .verdict {
      background: #d7f5d5;
      border-radius: 14px;
      color: #073d08;
      padding: 18px;
    }

    .verdict strong {
      display: block;
      font-size: 0.76rem;
      letter-spacing: 0.12em;
      margin-bottom: 8px;
      text-transform: uppercase;
    }

    .verdict p {
      color: #073d08;
      font-size: 0.98rem;
      line-height: 1.45;
    }

    .comparison {
      display: grid;
      gap: 18px;
      grid-template-columns: minmax(0, 1fr) 360px;
      align-items: start;
    }

    .phones {
      display: grid;
      gap: 16px;
      grid-template-columns: repeat(2, minmax(0, var(--phone)));
      justify-content: center;
      min-width: 0;
    }

    .phone-shell {
      background: #050805;
      border: 1px solid rgba(255,255,255,0.14);
      border-radius: 32px;
      box-shadow: 0 24px 70px rgba(0,0,0,0.45);
      padding: 12px;
      position: relative;
      transition: border-color 180ms ease, box-shadow 180ms ease, transform 180ms ease;
      width: min(100%, var(--phone));
    }

    .phone-shell.is-active {
      border-color: rgba(123, 226, 119, 0.72);
      box-shadow: 0 0 0 3px rgba(123, 226, 119, 0.12), 0 28px 80px rgba(0,0,0,0.52);
    }

    .phone-label {
      align-items: center;
      display: flex;
      justify-content: space-between;
      padding: 3px 6px 10px;
    }

    .phone-label strong { font-size: 0.9rem; }
    .phone-label span {
      color: var(--muted);
      font-size: 0.75rem;
    }

    .phone-screen {
      background: #eef4ee;
      border-radius: 22px;
      height: min(76vh, 760px);
      overflow: hidden;
      position: relative;
    }

    iframe {
      border: 0;
      height: 100%;
      pointer-events: none;
      width: 100%;
    }

    .missing-block {
      align-items: center;
      background:
        repeating-linear-gradient(-45deg, rgba(255,255,255,0.08), rgba(255,255,255,0.08) 10px, transparent 10px, transparent 20px),
        #d2d7d2;
      color: #2f382f;
      display: none;
      inset: 46px 16px 16px;
      justify-content: center;
      padding: 28px;
      position: absolute;
      text-align: center;
      z-index: 4;
    }

    .missing-block.is-visible { display: flex; }

    .missing-block strong {
      display: block;
      font-size: 1.15rem;
      margin-bottom: 8px;
    }

    .highlight-ribbon {
      background: rgba(123, 226, 119, 0.94);
      border-radius: 0 0 14px 14px;
      color: #061006;
      display: none;
      font-size: 0.8rem;
      font-weight: 900;
      left: 18px;
      padding: 8px 12px;
      position: absolute;
      right: 18px;
      text-align: center;
      top: 12px;
      z-index: 5;
    }

    .highlight-ribbon.is-visible { display: block; }

    .critique-panel {
      background: rgba(23, 33, 23, 0.92);
      border: 1px solid var(--line);
      border-radius: 16px;
      padding: 18px;
      position: sticky;
      top: 86px;
    }

    .critique-panel .kicker {
      color: var(--green);
      font-size: 0.76rem;
      font-weight: 900;
      letter-spacing: 0.12em;
      text-transform: uppercase;
    }

    .critique-panel h2 {
      font-family: Georgia, serif;
      font-size: 2rem;
      line-height: 1;
      margin: 8px 0 12px;
    }

    .critique-panel p {
      color: var(--muted);
      line-height: 1.5;
      margin: 0 0 14px;
    }

    .diff-grid {
      display: grid;
      gap: 10px;
      margin-top: 14px;
    }

    .diff-card {
      background: rgba(255,255,255,0.055);
      border: 1px solid var(--line);
      border-radius: 12px;
      padding: 12px;
    }

    .diff-card strong {
      display: block;
      font-size: 0.75rem;
      letter-spacing: 0.1em;
      margin-bottom: 6px;
      text-transform: uppercase;
    }

    .diff-card.old strong { color: #b8beb9; }
    .diff-card.new strong { color: var(--green); }
    .diff-card p {
      color: var(--text);
      font-size: 0.9rem;
      margin: 0;
    }

    .story {
      display: grid;
      gap: 14px;
    }

    .story-card {
      background: rgba(23, 33, 23, 0.72);
      border: 1px solid var(--line);
      border-radius: 16px;
      cursor: pointer;
      padding: 16px;
      transition: border-color 180ms ease, background 180ms ease;
    }

    .story-card.is-active {
      background: rgba(123, 226, 119, 0.12);
      border-color: rgba(123, 226, 119, 0.5);
    }

    .story-card h3 {
      font-family: Georgia, serif;
      font-size: 1.5rem;
      margin: 0 0 8px;
    }

    .story-card p {
      color: var(--muted);
      line-height: 1.5;
      margin: 0;
    }

    .prompt-box {
      background: #0d130d;
      border: 1px solid var(--line);
      border-radius: 16px;
      padding: 16px;
    }

    .prompt-head {
      align-items: center;
      display: flex;
      justify-content: space-between;
      gap: 12px;
      margin-bottom: 10px;
    }

    .prompt-head strong {
      color: var(--muted);
      font-size: 0.78rem;
      letter-spacing: 0.12em;
      text-transform: uppercase;
    }

    .copy-button {
      padding: 8px 12px;
    }

    pre {
      color: #dff5de;
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace;
      font-size: 0.86rem;
      line-height: 1.55;
      margin: 0;
      white-space: pre-wrap;
    }

    .mobile-toggle {
      display: none;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
      margin-bottom: 12px;
    }

    .mobile-toggle button {
      background: rgba(255,255,255,0.08);
      border: 1px solid var(--line);
      border-radius: 999px;
      color: var(--muted);
      cursor: pointer;
      padding: 10px 12px;
      font-weight: 800;
    }

    .mobile-toggle button.is-active {
      background: var(--green);
      color: #061006;
    }

    @media (max-width: 1220px) {
      .layout { grid-template-columns: 1fr; }
      .sidebar {
        position: static;
      }
      .sidebar-list {
        display: flex;
        gap: 8px;
        overflow-x: auto;
        padding-bottom: 4px;
      }
      .nav-item {
        min-width: 180px;
      }
    }

    @media (max-width: 980px) {
      .topbar {
        grid-template-columns: 1fr;
      }
      .top-actions {
        justify-content: space-between;
      }
      .intro {
        grid-template-columns: 1fr;
      }
      .comparison {
        grid-template-columns: 1fr;
      }
      .critique-panel {
        position: static;
      }
    }

    @media (max-width: 840px) {
      .phones {
        grid-template-columns: 1fr;
        justify-items: center;
      }
      .mobile-toggle { display: grid; }
      .phone-shell[data-pane="original"],
      .phone-shell[data-pane="new"] {
        display: none;
      }
      body[data-mobile-pane="original"] .phone-shell[data-pane="original"],
      body[data-mobile-pane="new"] .phone-shell[data-pane="new"] {
        display: block;
      }
      .phone-screen {
        height: 640px;
      }
    }

    @media (max-width: 520px) {
      .layout {
        padding-left: 10px;
        padding-right: 10px;
      }
      .phone-shell {
        border-radius: 24px;
        padding: 8px;
        width: min(100%, 390px);
      }
      .phone-screen {
        border-radius: 18px;
        height: 610px;
      }
      .intro h1 {
        font-size: 2.2rem;
      }
    }
  </style>
</head>
<body data-mobile-pane="new">
  <div class="gate is-visible" id="gate">
    <form class="gate-card" id="gateForm">
      <h1>Zafira Lander Review</h1>
      <p>Client-facing A/B comparison. Enter the review password to continue.</p>
      <div class="gate-row">
        <input id="passwordInput" type="password" autocomplete="current-password" placeholder="Password">
        <button type="submit">Open</button>
      </div>
      <div class="gate-note">Static GitHub Pages can only provide a soft client-side gate. Do not use this for sensitive information.</div>
    </form>
  </div>

  <div class="app" id="app">
    <header class="topbar">
      <div class="brand">
        <strong>Zafira Lander A/B Comparison</strong>
        <span>Client review tool: original homepage vs GLP-1 Flu rewrite</span>
      </div>
      <div class="top-actions">
        <div class="mode-switch" aria-label="View mode">
          <button class="mode-button is-active" data-mode="critique">Critique</button>
          <button class="mode-button" data-mode="clean">Clean</button>
        </div>
        <button class="control-button" id="resetButton">Restart</button>
      </div>
    </header>

    <div class="layout">
      <aside class="sidebar">
        <h2>Section Map</h2>
        <div class="sidebar-list" id="navList"></div>
      </aside>

      <main class="main">
        <section class="intro">
          <div>
            <h1>The new page is the stronger sales argument.</h1>
            <p>The original has useful product proof, but the revised version is better aligned to a GLP-1 user who already feels nausea, fatigue, brain fog, flat mood, low motivation, or muscle loss. The rewrite makes the pain specific, proves the problem is widespread, then positions Recovery Foundation as the missing protocol.</p>
          </div>
          <div class="verdict">
            <strong>Executive read</strong>
            <p>The new version is not just prettier. It changes the persuasion sequence from "here is our supplement" to "here is the exact GLP-1 side-effect pattern you are experiencing, why it happens, and why this formula exists."</p>
          </div>
        </section>

        <section class="comparison" aria-label="Interactive page comparison">
          <div>
            <div class="mobile-toggle">
              <button data-mobile-pane="original">Original</button>
              <button class="is-active" data-mobile-pane="new">New</button>
            </div>
            <div class="phones">
              <div class="phone-shell" data-pane="original">
                <div class="phone-label"><strong>Original</strong><span>iPhone Pro width</span></div>
                <div class="phone-screen">
                  <div class="highlight-ribbon" id="oldRibbon">Highlighted difference</div>
                  <div class="missing-block" id="oldMissing"><div><strong>Missing in original</strong><span></span></div></div>
                  <iframe id="oldFrame" src="original/index.html" title="Original Zafira page"></iframe>
                </div>
              </div>
              <div class="phone-shell is-active" data-pane="new">
                <div class="phone-label"><strong>New</strong><span>iPhone Pro width</span></div>
                <div class="phone-screen">
                  <div class="highlight-ribbon" id="newRibbon">Highlighted difference</div>
                  <div class="missing-block" id="newMissing"><div><strong>Missing in new</strong><span></span></div></div>
                  <iframe id="newFrame" src="new/index.html" title="New Zafira page"></iframe>
                </div>
              </div>
            </div>
          </div>

          <aside class="critique-panel" id="critiquePanel">
            <div class="kicker">Active critique</div>
            <h2 id="critiqueTitle"></h2>
            <p id="critiqueBody"></p>
            <div class="diff-grid">
              <div class="diff-card old"><strong>Original</strong><p id="oldNote"></p></div>
              <div class="diff-card new"><strong>New</strong><p id="newNote"></p></div>
            </div>
          </aside>
        </section>

        <section class="story" id="story"></section>

        <section class="prompt-box">
          <div class="prompt-head">
            <strong>Shareable Editorial Summary</strong>
            <button class="copy-button" id="copyButton">Copy</button>
          </div>
          <pre id="promptOutput"></pre>
        </section>
      </main>
    </div>
  </div>

  <script>
    const PASSWORD = "zafira-client";
    const STORAGE_KEY = "zafira-ab-authed";
    const sections = ${sectionJson};
    const state = { active: 0, mode: "critique", mobilePane: "new" };
    let suppressObserverUntil = 0;

    const gate = document.getElementById("gate");
    const app = document.getElementById("app");
    const gateForm = document.getElementById("gateForm");
    const passwordInput = document.getElementById("passwordInput");
    const navList = document.getElementById("navList");
    const story = document.getElementById("story");
    const oldFrame = document.getElementById("oldFrame");
    const newFrame = document.getElementById("newFrame");
    const oldMissing = document.getElementById("oldMissing");
    const newMissing = document.getElementById("newMissing");
    const oldRibbon = document.getElementById("oldRibbon");
    const newRibbon = document.getElementById("newRibbon");
    const critiqueTitle = document.getElementById("critiqueTitle");
    const critiqueBody = document.getElementById("critiqueBody");
    const oldNote = document.getElementById("oldNote");
    const newNote = document.getElementById("newNote");
    const promptOutput = document.getElementById("promptOutput");
    const copyButton = document.getElementById("copyButton");

    function unlock() {
      gate.classList.remove("is-visible");
      app.classList.add("is-visible");
      sessionStorage.setItem(STORAGE_KEY, "true");
      updateAll();
      setTimeout(() => jumpToSection(0, false), 450);
    }

    if (sessionStorage.getItem(STORAGE_KEY) === "true") unlock();

    gateForm.addEventListener("submit", (event) => {
      event.preventDefault();
      if (passwordInput.value.trim() === PASSWORD) {
        unlock();
      } else {
        passwordInput.value = "";
        passwordInput.placeholder = "Try again";
        passwordInput.focus();
      }
    });

    function buildNav() {
      navList.innerHTML = sections.map((section, index) => \`
        <button class="nav-item" data-index="\${index}">
          \${index + 1}. \${section.title}
          <small>\${section.highlight}</small>
        </button>
      \`).join("");
      navList.querySelectorAll("button").forEach((button) => {
        button.addEventListener("click", () => {
          jumpToSection(Number(button.dataset.index), true);
        });
      });
    }

    function buildStory() {
      story.innerHTML = sections.map((section, index) => \`
        <article class="story-card" data-index="\${index}">
          <h3>\${section.title}</h3>
          <p>\${section.critique}</p>
        </article>
      \`).join("");
      story.querySelectorAll(".story-card").forEach((card) => {
        card.addEventListener("click", () => {
          jumpToSection(Number(card.dataset.index), true);
        });
      });
    }

    function frameScroll(frame, section, side) {
      const y = side === "old" ? section.oldY : section.newY;
      try {
        frame.contentWindow.scrollTo({ top: y, behavior: "smooth" });
      } catch {
        frame.contentWindow.scrollTo(0, y);
      }
    }

    function jumpToSection(index, scrollCard) {
      state.active = Math.max(0, Math.min(sections.length - 1, index));
      if (scrollCard) suppressObserverUntil = Date.now() + 900;
      const section = sections[state.active];
      frameScroll(oldFrame, section, "old");
      frameScroll(newFrame, section, "new");
      updateAll();
      if (scrollCard) {
        const activeCard = story.querySelector(\`[data-index="\${state.active}"]\`);
        if (activeCard) activeCard.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }

    function updateCritique() {
      const section = sections[state.active];
      critiqueTitle.textContent = section.title;
      critiqueBody.textContent = section.critique;
      oldNote.textContent = section.oldNote;
      newNote.textContent = section.newNote;
    }

    function updateHighlights() {
      const section = sections[state.active];
      document.querySelectorAll(".nav-item, .story-card").forEach((el) => {
        el.classList.toggle("is-active", Number(el.dataset.index) === state.active);
      });

      const critiqueOn = state.mode === "critique";
      oldRibbon.classList.toggle("is-visible", critiqueOn && !section.oldMissing);
      newRibbon.classList.toggle("is-visible", critiqueOn && !section.newMissing);
      oldRibbon.textContent = section.highlight;
      newRibbon.textContent = section.highlight;

      oldMissing.classList.toggle("is-visible", critiqueOn && section.oldMissing);
      newMissing.classList.toggle("is-visible", critiqueOn && section.newMissing);
      oldMissing.querySelector("span").textContent = section.oldNote;
      newMissing.querySelector("span").textContent = section.newNote;

      document.querySelectorAll(".phone-shell").forEach((shell) => {
        shell.classList.toggle("is-active", shell.dataset.pane === "new");
      });
    }

    function updatePrompt() {
      const section = sections[state.active];
      promptOutput.textContent = \`Client editorial direction: Present the revised Zafira landing page as the stronger conversion path because it reframes the page around GLP-1 Flu symptoms before selling the supplement. In the active section, "\${section.title}", emphasize this point: \${section.critique} The original should be described as useful but less direct: \${section.oldNote} The new version should be positioned as clearer and more persuasive: \${section.newNote}\`;
    }

    function updateMobilePaneButtons() {
      document.body.dataset.mobilePane = state.mobilePane;
      document.querySelectorAll("[data-mobile-pane]").forEach((button) => {
        button.classList.toggle("is-active", button.dataset.mobilePane === state.mobilePane);
      });
    }

    function updateAll() {
      updateCritique();
      updateHighlights();
      updatePrompt();
      updateMobilePaneButtons();
    }

    document.querySelectorAll("[data-mode]").forEach((button) => {
      button.addEventListener("click", () => {
        state.mode = button.dataset.mode;
        document.querySelectorAll("[data-mode]").forEach((modeButton) => {
          modeButton.classList.toggle("is-active", modeButton.dataset.mode === state.mode);
        });
        updateAll();
      });
    });

    document.querySelectorAll("[data-mobile-pane]").forEach((button) => {
      button.addEventListener("click", () => {
        state.mobilePane = button.dataset.mobilePane;
        updateAll();
      });
    });

    document.getElementById("resetButton").addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
      jumpToSection(0, false);
    });

    copyButton.addEventListener("click", async () => {
      await navigator.clipboard.writeText(promptOutput.textContent);
      copyButton.textContent = "Copied";
      setTimeout(() => { copyButton.textContent = "Copy"; }, 1200);
    });

    const observer = new IntersectionObserver((entries) => {
      if (Date.now() < suppressObserverUntil) return;
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      const index = Number(visible.target.dataset.index);
      if (index !== state.active) jumpToSection(index, false);
    }, { rootMargin: "-34% 0px -48% 0px", threshold: [0.2, 0.45, 0.7] });

    buildNav();
    buildStory();
    story.querySelectorAll(".story-card").forEach((card) => observer.observe(card));
    updateAll();

    oldFrame.addEventListener("load", () => jumpToSection(state.active, false));
    newFrame.addEventListener("load", () => jumpToSection(state.active, false));
  </script>
</body>
</html>`;
}

refreshSnapshots();
writeFileSync(join(docsDir, "index.html"), pageHtml());
console.log("Built docs/index.html A/B playground");

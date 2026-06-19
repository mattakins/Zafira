import { readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const newPagePath = path.join(root, "public/new/index.html");
const sciencePath = "/tmp/zafira-science.html";
const stableScienceFallback = `
<!-- THE NUMBERS -->
<section class="sci-body">
  <div class="sci-container">
    <h2 class="sci-section-heading">The Numbers Behind the Problem</h2>
    <div class="sci-image"><img src="/new/assets/science-image-2.png" alt="GLP-1 research statistics"></div>
    <p>As of late 2025, approximately <strong>15.5 million Americans</strong> are currently prescribed GLP-1 receptor agonist medications — semaglutide (Ozempic, Wegovy), tirzepatide (Mounjaro, Zepbound), and related compounds.</p>
    <p>Industry projections estimate this number will exceed 30 million by 2030 as access expands and new formulations enter the market.</p>
    <p>These medications represent one of the most significant pharmaceutical developments in metabolic health in decades. They work. The clinical data is undeniable.</p>
    <p><strong>But the side effect data is equally undeniable.</strong></p>
    <div class="sci-callout">
      <p>According to published research and real-world reporting:</p>
    </div>
    <ul class="sci-list">
      <li>Up to <strong>44%</strong> of GLP-1 users report persistent nausea beyond the initial adjustment period</li>
      <li>Up to <strong>24%</strong> report significant constipation requiring intervention</li>
      <li>Up to <strong>39%</strong> report fatigue that doesn't resolve with rest</li>
      <li>Emerging psychiatric data suggests a <strong>substantially elevated risk</strong> of depression and anhedonia in long-term users</li>
    </ul>
    <p>Yet when we surveyed over 2,400 GLP-1 users across the United States, we found something more concerning than the side effects themselves:</p>
    <div class="sci-stat">
      <div class="sci-stat__number">73%</div>
      <div class="sci-stat__label">reported that their prescribing physician offered no specific solutions for their side effects beyond "wait it out" or "reduce your dose."</div>
    </div>
    <p><strong>This was the gap we set out to close.</strong></p>
  </div>
</section>

<section class="sci-body">
  <div class="sci-container">
    <h2 class="sci-section-heading">Identifying the 6 Core Side Effects</h2>
    <div class="sci-image"><img src="/new/assets/science-image-3.png" alt="Six side effect categories"></div>
    <p>We spent the first four months of our research phase doing something most supplement companies skip entirely: <strong>listening.</strong></p>
    <p>We conducted structured interviews with <strong>847 GLP-1 users.</strong></p>
    <p>We partnered with three weight loss clinics — in Chicago, Denver, and Sydney — to review anonymized patient feedback. We analyzed over 12,000 forum posts, filtering for recurring language patterns.</p>
    <p>What emerged was remarkably consistent. While individual experiences varied in severity, six distinct side effect categories appeared repeatedly:</p>
    <ul class="sci-list">
      <li><strong>Nausea</strong> — persistent, often daily, frequently worse in mornings</li>
      <li><strong>Reflux &amp; Sulfur Burps</strong> — described as "the worst part" by many users</li>
      <li><strong>Constipation</strong> — unresponsive to standard fiber interventions</li>
      <li><strong>Hair Loss</strong> — typically appearing 3-4 months into treatment</li>
      <li><strong>Fatigue</strong> — described as "bone-deep exhaustion" despite adequate sleep</li>
      <li><strong>Depression, Anhedonia &amp; Emotional Flatness</strong> — the inability to feel pleasure or motivation</li>
    </ul>
    <p>When we asked users which side effects concerned them most, the mental health effects ranked highest — yet were the least discussed by healthcare providers.</p>
  </div>
</section>

<section class="sci-body">
  <div class="sci-container">
    <h2 class="sci-section-heading">Why No Solution Existed</h2>
    <p>This was the question that shaped our entire approach: <strong>If these side effects are so common and so well-documented, why hasn't anyone created a proper solution?</strong></p>
    <p>The answer, we discovered, came down to mechanism.</p>
    <p>Most supplement companies approach side effects symptomatically. Nausea? Here's ginger. Fatigue? Here's B12. Depression? Here's St. John's Wort.</p>
    <p><strong>But GLP-1 side effects don't work that way.</strong></p>
    <p>These medications create a cascade of interconnected disruptions across multiple biological systems — digestive motility, nutrient retention, and neurotransmitter pathway function.</p>
    <p>Addressing one while ignoring the others produces incomplete results. No one had designed a protocol that addressed all six mechanisms simultaneously, using therapeutic doses based on the specific disruptions GLP-1 medications cause.</p>
    <p><strong>Until now.</strong></p>
  </div>
</section>
<!-- INTERSTITIAL -->
`;

let html = await readFile(newPagePath, "utf8");
const science = existsSync(sciencePath)
  ? await readFile(sciencePath, "utf8")
  : stableScienceFallback;

const headlineOld =
  "The First Ever Protocol for You to Take a GLP-1 Drug Without Getting Flat, Exhausted, Anxious, Low Motivation, or Irritable";
const headlineNew = "GLP-1 Flu? Here's What Your Doctor Won’t Tell You...";
const headlineHtml =
  `<strong class="zafira-headline-bold">GLP-1 Flu?</strong> Here's What Your Doctor Won’t Tell You...`;
const symptomLine =
  "Nausea. Exhaustion. Brain fog. Flat mood. No motivation. Muscle loss.";
const subheadOld =
  "Organic Formula designed to address mental and physical health difficulties specifically during rapid weight loss on GLP-1";
const subheadNew =
  "This simple organic formula helps alleviate the mental and physical side effects of GLP-1 so you feel like yourself again — even while losing weight fast.";

html = html.replace(headlineOld, headlineNew);
html = html.replaceAll(
  "GLP-1 Flu? Here's What Your Doctor Doesn’t Tell You...",
  headlineNew,
);
html = html.replaceAll(
  `<strong class="zafira-headline-bold">GLP-1 Flu?</strong> Here's What Your Doctor Doesn’t Tell You...`,
  headlineHtml,
);
html = html.replaceAll("Doctor Doesn’t Tell You", "Doctor Won’t Tell You");
html = html.replaceAll(headlineNew, headlineHtml);
html = html.replace(subheadOld, subheadNew);
html = html.replace(
  "This simple, organic formula can help alleviate the mental and physical side effects of GLP-1 and help you feel like yourself again - even while losing weight fast",
  subheadNew,
);
html = html.replaceAll(
  "This simple organic formula helps alleviate the mental and physical side effects of GLP-1 so you can feel like yourself again — even while losing weight fast.",
  subheadNew,
);
html = html.replaceAll(
  "so you can feel like yourself again",
  "so you feel like yourself again",
);
html = html.replaceAll(
  "Nausea. Exhaustion. Brain fog. Flat mood. No motivation. Muscle going with the fat.",
  symptomLine,
);
html = html.replace(
  /\n?<div class="alchemy-rte zafira-symptom-line">[\s\S]*?<\/div>(?=<div data-rid="8e82714f-7fcc-452a-9be5-04d4b68e9d96")/,
  "",
);
html = html.replace(
  /(<div data-rid="4c006af1-6f51-415f-9f3c-ab275ac1ad21" class="r-sz3gtr alchemy-rte"><span style="width:100%"><h2>[\s\S]*?<\/h2><\/span><\/div>)(?=<div data-rid="8e82714f-7fcc-452a-9be5-04d4b68e9d96")/,
  `$1<div class="alchemy-rte zafira-symptom-line"><span style="width:100%"><h2>${symptomLine}</h2></span></div>`,
);

const heroPictureStart = html.indexOf(
  '<picture data-rid="1b363c0e-64ee-40e3-aecd-9acc21542448"',
);
const heroPictureEnd = html.indexOf("</picture>", heroPictureStart) + "</picture>".length;
if (heroPictureStart === -1 || heroPictureEnd === -1) {
  throw new Error("Hero picture not found");
}

const heroPicture = `<picture data-rid="1b363c0e-64ee-40e3-aecd-9acc21542448" class="r-1lqjytm zafira-hero-media">
<source srcSet="/new/assets/glp-1-flu.png" media="(max-width: 640px)"/>
<source srcSet="/new/assets/glp-1-flu.png" media="(min-width: 641px) and (max-width: 1024px)"/>
<source srcSet="/new/assets/glp-1-flu.png" media="(min-width: 1025px) and (max-width: 2400px)"/>
<img src="/new/assets/glp-1-flu.png" alt="Woman experiencing GLP-1 flu symptoms" class="r-1fm7dxw zafira-hero-image" loading="eager"/>
</picture>`;
html = html.slice(0, heroPictureStart) + heroPicture + html.slice(heroPictureEnd);

const foundationPictureStart = html.indexOf(
  '<picture data-rid="f8a7c6ee-348a-47f2-b07a-02c7da97d94d"',
);
const foundationPictureEnd =
  html.indexOf("</picture>", foundationPictureStart) + "</picture>".length;
if (foundationPictureStart === -1 || foundationPictureEnd === -1) {
  throw new Error("Foundation picture not found");
}

const foundationPicture = `<picture data-rid="f8a7c6ee-348a-47f2-b07a-02c7da97d94d" class="r-f2jgjx">
<source srcSet="/new/assets/recovery-foundation-benefits-woman.png" media="(max-width: 640px)"/>
<source srcSet="/new/assets/recovery-foundation-benefits-woman.png" media="(min-width: 641px) and (max-width: 1024px)"/>
<source srcSet="/new/assets/recovery-foundation-benefits-woman.png" media="(min-width: 1025px) and (max-width: 2400px)"/>
<img src="/new/assets/recovery-foundation-benefits-woman.png" alt="Woman holding Zafira Recovery Foundation with ingredient benefits" class="r-1si3erm" loading="eager"/>
</picture>`;
html =
  html.slice(0, foundationPictureStart) +
  foundationPicture +
  html.slice(foundationPictureEnd);

const numbersStart = science.indexOf("<!-- THE NUMBERS -->");
const afterNoSolutionMarker = science.indexOf("<!-- INTERSTITIAL", numbersStart);
const afterNoSolution =
  afterNoSolutionMarker === -1 ? science.length : afterNoSolutionMarker;
if (numbersStart === -1 || afterNoSolution === -1) {
  throw new Error("Science section range not found");
}

let scienceBlock = science.slice(numbersStart, afterNoSolution).trim();
scienceBlock = scienceBlock
  .replaceAll(
    "../Science%20Page%20-%20Images/SCIENCE%20-%20IMAGE%202.png",
    "/new/assets/science-image-2.png",
  )
  .replaceAll(
    "../Science%20Page%20-%20Images/SCIENCE%20-%20IMAGE%203.png",
    "/new/assets/science-image-3.png",
  )
  .replaceAll('style="padding-top: 0;"', "");

const scienceInsert = `
<section class="zafira-science-insert" data-zafira-science-root>
${scienceBlock}
</section>
`;

const offerInsert = `
<div class="zafira-offer-boxes" data-zafira-offer-root aria-label="Recovery Foundation subscription offers">
  <article class="zafira-offer-card zafira-offer-card--featured" data-offer="three-month">
    <div class="zafira-offer-ribbon">Best Value</div>
    <div class="zafira-offer-content">
      <p class="zafira-offer-kicker">AutoShip &amp; Save</p>
      <h3>3 Month</h3>
      <p class="zafira-offer-subtitle">3 bottles delivered every 3 months</p>
      <img class="zafira-offer-image" src="/new/assets/recovery-foundation-3-bottles.png" alt="Three bottles of Zafira Recovery Foundation">
      <ul class="zafira-offer-list">
        <li><span>✓</span> Biggest savings on Recovery Foundation</li>
        <li><span>✓</span> Mood, energy, digestion &amp; hair support</li>
        <li><span>✓</span> Fewer refill gaps while on GLP-1</li>
        <li><span>✓</span> Free USA shipping</li>
      </ul>
      <div class="zafira-offer-final-price"><s>$164.70</s> <strong>$84.92</strong></div>
      <button class="zafira-offer-button" type="button" data-offer-label="3 Month AutoShip">
        <span>Add To Cart</span>
      </button>
      <div class="zafira-offer-footer">
        <p>Delivered every 3 months</p>
        <p>60-day money back guarantee</p>
        <p>Online portal for easy cancel, skip, or pause.</p>
      </div>
    </div>
  </article>

  <article class="zafira-offer-card" data-offer="one-month">
    <div class="zafira-offer-content">
      <p class="zafira-offer-kicker">AutoShip &amp; Save</p>
      <h3>1 Month</h3>
      <p class="zafira-offer-subtitle">1 bottle delivered monthly</p>
      <img class="zafira-offer-image" src="/new/assets/recovery-foundation-1-bottle.png" alt="One bottle of Zafira Recovery Foundation">
      <ul class="zafira-offer-list">
        <li><span>✓</span> Great starter supply</li>
        <li><span>✓</span> Mood, energy, digestion &amp; hair support</li>
        <li><span>✓</span> Monthly refill convenience</li>
        <li><span>✓</span> Free USA shipping</li>
      </ul>
      <div class="zafira-offer-final-price"><s>$54.90</s> <strong>$43.92</strong></div>
      <button class="zafira-offer-button" type="button" data-offer-label="1 Month AutoShip">
        <span>Add To Cart</span>
      </button>
      <div class="zafira-offer-footer">
        <p>Delivered monthly</p>
        <p>60-day money back guarantee</p>
        <p>Online portal for easy cancel, skip, or pause.</p>
      </div>
    </div>
  </article>
</div>
<div class="zafira-offer-modal" id="zafira-offer-modal" aria-hidden="true" role="dialog" aria-modal="true" aria-labelledby="zafira-offer-modal-title">
  <div class="zafira-offer-modal__backdrop" data-zafira-modal-close></div>
  <div class="zafira-offer-modal__panel">
    <button class="zafira-offer-modal__close" type="button" aria-label="Close" data-zafira-modal-close>×</button>
    <p class="zafira-offer-modal__eyebrow">Demo checkout</p>
    <h3 id="zafira-offer-modal-title">Offer selected</h3>
    <p class="zafira-offer-modal__message">In production this would redirect directly to shopify checkout page</p>
  </div>
</div>
`;

const foundationStart = html.indexOf(
  '<div data-rid="c4c11ad8-6395-4470-aaf5-15c3a2e91e2b"',
);
if (foundationStart === -1) {
  throw new Error("Recovery Foundation insertion point not found");
}
html = html.replace(
  /\n<section class="zafira-science-insert" id="glp1-flu-science">[\s\S]*?<\/section>\s*(?=<div data-rid="c4c11ad8-6395-4470-aaf5-15c3a2e91e2b")/,
  "\n",
);

const customCss = `
<style id="zafira-new-revisions">
  .zafira-hero-media {
    display: block !important;
    justify-content: center !important;
    overflow: visible !important;
    max-width: 720px !important;
    position: relative !important;
  }

  .zafira-hero-image {
    object-fit: contain !important;
    transform: none !important;
    min-width: 100% !important;
    min-height: auto !important;
    max-height: none !important;
  }

  .zafira-headline-bold {
    font-weight: 700 !important;
  }

  [data-rid="8e82714f-7fcc-452a-9be5-04d4b68e9d96"] {
    display: none !important;
  }

  .zafira-symptom-line {
    color: #035C05 !important;
    font-family: Inter, sans-serif !important;
    font-weight: 700 !important;
    line-height: 1.18 !important;
    max-width: 620px !important;
    text-align: center !important;
  }

  .zafira-symptom-line h2 {
    font-family: Inter, sans-serif !important;
    font-size: clamp(1rem, 2.2vw, 1.38rem) !important;
    font-style: italic !important;
    font-weight: 700 !important;
    letter-spacing: 0 !important;
    line-height: 1.18 !important;
    margin: 0 !important;
  }

  .zafira-main-subhead {
    color: #035C05 !important;
    max-width: 640px !important;
    text-align: center !important;
  }

  .zafira-main-subhead h2 {
    letter-spacing: 0 !important;
    margin: 0 !important;
  }

  .zafira-science-insert {
    --z-green: #035C05;
    --z-green-light: #49934B;
    --z-green-bg: rgba(3, 92, 5, 0.05);
    --z-green-bg-strong: rgba(3, 92, 5, 0.10);
    --z-body-text: #035C05;
    --z-border: rgba(3, 92, 5, 0.15);
    --z-font-heading: Jitter, Georgia, serif;
    --z-font-body: Inter, sans-serif;
    --z-radius: 16px;
    background: #fff;
    color: var(--z-body-text);
    font-family: var(--z-font-body);
    line-height: 1.7;
    padding: 30px 0 20px;
  }

  .zafira-science-insert .sci-container {
    max-width: 700px;
    margin: 0 auto;
    padding: 0 20px;
  }

  .zafira-science-insert .sci-body {
    padding: 24px 0;
  }

  .zafira-science-insert .sci-body::after {
    clear: both;
    content: "";
    display: table;
  }

  .zafira-science-insert .sci-body p {
    color: var(--z-body-text);
    font-size: 1rem;
    line-height: 1.68;
    margin: 0 0 18px;
  }

  .zafira-science-insert .sci-body strong {
    color: var(--z-green);
    font-weight: 600;
  }

  .zafira-science-insert .sci-section-heading {
    border-bottom: 0 !important;
    color: var(--z-green);
    font-family: var(--z-font-heading);
    font-size: clamp(2.2rem, 8vw, 3.45rem);
    font-weight: 400;
    line-height: 1.06;
    margin: 0 0 20px;
    padding: 0;
    position: relative;
  }

  .zafira-science-insert .sci-section-heading::before {
    content: none !important;
    display: none !important;
  }

  .zafira-science-insert .sci-divider {
    display: none !important;
  }

  [data-rid="c4c11ad8-6395-4470-aaf5-15c3a2e91e2b"] {
    background: linear-gradient(180deg, #eefbea 0%, #ffffff 100%) !important;
    box-shadow: inset 0 1px 0 rgba(3, 92, 5, 0.08), inset 0 -1px 0 rgba(3, 92, 5, 0.08) !important;
    margin-top: 0 !important;
    padding-bottom: 54px !important;
    padding-top: 54px !important;
  }

  .zafira-science-insert .sci-callout {
    background: var(--z-green-bg);
    border-left: 4px solid var(--z-green);
    border-radius: 0 var(--z-radius) var(--z-radius) 0;
    color: var(--z-green);
    font-size: 0.95rem;
    line-height: 1.75;
    margin: 18px 0 0;
    padding: 22px 28px 12px;
  }

  .zafira-science-insert .sci-callout p {
    color: var(--z-green);
    margin-bottom: 0;
  }

  .zafira-science-insert .sci-list,
  .zafira-science-insert .sci-numbered-list {
    background: var(--z-green-bg);
    border-left: 4px solid var(--z-green);
    border-radius: 0 0 12px 12px;
    border-top: 1px solid rgba(3, 92, 5, 0.08);
    margin: 0 0 18px;
    padding: 12px 22px 18px 42px;
  }

  .zafira-science-insert .sci-list {
    list-style: disc;
  }

  .zafira-science-insert .sci-numbered-list {
    list-style: decimal;
  }

  .zafira-science-insert .sci-list li,
  .zafira-science-insert .sci-numbered-list li {
    color: var(--z-body-text);
    font-size: 0.95rem;
    line-height: 1.7;
    margin-bottom: 10px;
  }

  .zafira-science-insert .sci-image {
    background: var(--z-green-bg-strong);
    border-radius: var(--z-radius);
    margin: 22px auto;
    overflow: hidden;
  }

  .zafira-science-insert .sci-image img {
    display: block;
    height: auto;
    width: 100%;
  }

  .zafira-science-insert .sci-stat {
    background: #035C05;
    border-radius: var(--z-radius);
    color: #fff;
    margin: 22px 0;
    padding: 28px;
    text-align: center;
  }

  .zafira-science-insert .sci-stat__number {
    color: #fff;
    font-family: var(--z-font-heading);
    font-size: clamp(3rem, 13vw, 5rem);
    line-height: 1;
  }

  .zafira-science-insert .sci-stat__label {
    color: rgba(255,255,255,0.9);
    font-size: 1rem;
    line-height: 1.65;
    margin-top: 14px;
  }

  .zafira-offer-boxes {
    display: grid !important;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr)) !important;
    gap: 18px !important;
    margin: 24px auto 18px !important;
    max-width: 760px !important;
    width: 100% !important;
  }

  .zafira-offer-card {
    background: rgba(255, 255, 255, 0.94) !important;
    border: 2px solid rgba(3, 92, 5, 0.55) !important;
    border-radius: 10px !important;
    box-shadow: 0 12px 30px rgba(3, 92, 5, 0.11) !important;
    color: #053d07 !important;
    font-family: Inter, sans-serif !important;
    overflow: hidden !important;
    position: relative !important;
  }

  .zafira-offer-card--featured {
    background: #efffea !important;
    border-color: #035C05 !important;
    box-shadow: 0 0 70px rgba(3, 92, 5, 0.20), 0 16px 34px rgba(3, 92, 5, 0.18) !important;
  }

  .zafira-offer-ribbon {
    background: #035C05 !important;
    color: #fff !important;
    font-size: 0.78rem !important;
    font-weight: 900 !important;
    letter-spacing: 0.08em !important;
    padding: 8px 14px !important;
    text-align: center !important;
    text-transform: uppercase !important;
  }

  .zafira-offer-content {
    display: flex !important;
    flex-direction: column !important;
    min-height: 100% !important;
    padding: 22px 20px 20px !important;
  }

  .zafira-offer-kicker {
    color: #035C05 !important;
    font-size: 0.86rem !important;
    font-weight: 900 !important;
    letter-spacing: 0.08em !important;
    margin: 0 0 8px !important;
    text-align: center !important;
    text-transform: uppercase !important;
  }

  .zafira-offer-card h3 {
    color: #035C05 !important;
    font-family: Jitter, Georgia, serif !important;
    font-size: clamp(2rem, 4vw, 3rem) !important;
    font-weight: 400 !important;
    letter-spacing: 0 !important;
    line-height: 1 !important;
    margin: 0 !important;
    text-align: center !important;
  }

  .zafira-offer-subtitle {
    color: #0f5f12 !important;
    font-size: 0.96rem !important;
    font-weight: 700 !important;
    line-height: 1.3 !important;
    margin: 10px 0 16px !important;
    min-height: 38px !important;
    text-align: center !important;
  }

  .zafira-offer-image {
    aspect-ratio: 1 / 1 !important;
    border-radius: 0 !important;
    display: block !important;
    height: auto !important;
    margin: 0 -20px 14px !important;
    max-width: none !important;
    object-fit: cover !important;
    width: calc(100% + 40px) !important;
  }

  .zafira-offer-list {
    border-top: 1px solid rgba(3, 92, 5, 0.14) !important;
    list-style: none !important;
    margin: 0 !important;
    padding: 0 !important;
  }

  .zafira-offer-list li {
    align-items: flex-start !important;
    border-bottom: 1px solid rgba(3, 92, 5, 0.14) !important;
    color: #143d14 !important;
    display: flex !important;
    font-size: 0.92rem !important;
    font-weight: 700 !important;
    gap: 9px !important;
    line-height: 1.32 !important;
    padding: 12px 0 !important;
  }

  .zafira-offer-list span {
    color: #035C05 !important;
    font-weight: 950 !important;
  }

  .zafira-offer-final-price {
    align-items: center !important;
    background: rgba(3, 92, 5, 0.08) !important;
    border-radius: 8px !important;
    color: #035C05 !important;
    display: flex !important;
    font-size: 1.05rem !important;
    font-weight: 800 !important;
    gap: 10px !important;
    justify-content: center !important;
    margin: 16px 0 12px !important;
    padding: 12px !important;
  }

  .zafira-offer-final-price s {
    color: rgba(3, 92, 5, 0.5) !important;
  }

  .zafira-offer-final-price strong {
    color: #035C05 !important;
    font-size: 1.45rem !important;
    font-weight: 950 !important;
    line-height: 1 !important;
  }

  .zafira-offer-button {
    align-items: center !important;
    background: #035C05 !important;
    border: 0 !important;
    border-radius: 999px !important;
    box-shadow: 0 10px 20px rgba(3, 92, 5, 0.22) !important;
    color: #fff !important;
    cursor: pointer !important;
    display: flex !important;
    font-family: Inter, sans-serif !important;
    font-size: 0.96rem !important;
    font-weight: 950 !important;
    gap: 10px !important;
    justify-content: center !important;
    letter-spacing: 0.04em !important;
    line-height: 1.15 !important;
    min-height: 58px !important;
    overflow: hidden !important;
    padding: 13px 18px !important;
    position: relative !important;
    text-transform: uppercase !important;
    transition: transform 180ms ease, box-shadow 180ms ease !important;
    width: 100% !important;
  }

  .zafira-offer-button:hover {
    box-shadow: 0 14px 24px rgba(3, 92, 5, 0.28) !important;
    transform: translateY(-1px) !important;
  }

  .zafira-offer-footer {
    color: #315331 !important;
    font-size: 0.78rem !important;
    font-weight: 700 !important;
    line-height: 1.35 !important;
    margin-top: 14px !important;
    text-align: center !important;
  }

  .zafira-offer-footer p {
    margin: 4px 0 !important;
  }

  #ordering .zafira-old-cart-hidden,
  #ordering .kaching-bundles__block,
  #ordering kaching-bundles,
  #ordering kaching-bundle {
    display: none !important;
  }

  .zafira-offer-stage {
    display: block !important;
    margin: 24px auto 0 !important;
    max-width: 1120px !important;
    width: 100% !important;
  }

  .zafira-post-offer-info {
    display: block !important;
    margin: 18px auto 0 !important;
    max-width: 920px !important;
    width: 100% !important;
  }

  .zafira-post-offer-info [data-rid="bb485a75-c36d-4870-b1cb-1f133374d3d9"] {
    margin: 22px auto 20px !important;
    max-width: 760px !important;
    text-align: center !important;
  }

  .zafira-post-offer-info [data-rid="bb485a75-c36d-4870-b1cb-1f133374d3d9"] p {
    color: #035C05 !important;
    font-size: 1.08rem !important;
    font-weight: 800 !important;
    line-height: 1.35 !important;
    margin: 0 !important;
  }

  .zafira-confetti-canvas {
    height: 100vh !important;
    inset: 0 !important;
    pointer-events: none !important;
    position: fixed !important;
    width: 100vw !important;
    z-index: 99997 !important;
  }

  .zafira-offer-modal {
    align-items: center !important;
    display: none !important;
    inset: 0 !important;
    justify-content: center !important;
    padding: 24px !important;
    position: fixed !important;
    z-index: 99998 !important;
  }

  .zafira-offer-modal[aria-hidden="false"] {
    display: flex !important;
  }

  .zafira-offer-modal__backdrop {
    background: rgba(0, 30, 2, 0.56) !important;
    inset: 0 !important;
    position: absolute !important;
  }

  .zafira-offer-modal__panel {
    background: #fff !important;
    border: 2px solid #035C05 !important;
    border-radius: 12px !important;
    box-shadow: 0 24px 70px rgba(0, 0, 0, 0.26) !important;
    color: #053d07 !important;
    max-width: 420px !important;
    padding: 28px !important;
    position: relative !important;
    text-align: center !important;
    width: min(100%, 420px) !important;
  }

  .zafira-offer-modal__close {
    background: transparent !important;
    border: 0 !important;
    color: #035C05 !important;
    cursor: pointer !important;
    font-size: 28px !important;
    line-height: 1 !important;
    padding: 4px !important;
    position: absolute !important;
    right: 12px !important;
    top: 10px !important;
  }

  .zafira-offer-modal__eyebrow {
    color: #035C05 !important;
    font-size: 0.78rem !important;
    font-weight: 900 !important;
    letter-spacing: 0.1em !important;
    margin: 0 0 8px !important;
    text-transform: uppercase !important;
  }

  .zafira-offer-modal__panel h3 {
    color: #035C05 !important;
    font-family: Jitter, Georgia, serif !important;
    font-size: 2rem !important;
    font-weight: 400 !important;
    margin: 0 0 12px !important;
  }

  .zafira-offer-modal__message {
    color: #173d17 !important;
    font-size: 1rem !important;
    line-height: 1.5 !important;
    margin: 0 !important;
  }

  @media (min-width: 900px) {
    [data-rid="688d5d8c-b3a3-4427-94b5-0236ea2a0fd7"] {
      align-items: center !important;
      display: grid !important;
      gap: 46px !important;
      grid-template-columns: minmax(430px, 0.82fr) minmax(560px, 1fr) !important;
      margin: 0 auto !important;
      max-width: 1640px !important;
      min-height: 0 !important;
      padding: 14px clamp(48px, 5vw, 88px) 12px !important;
    }

    [data-rid="02c8e31a-8f50-4b9c-ae9f-ef4cd2e96137"] {
      align-items: flex-end !important;
      justify-content: center !important;
      max-width: 680px !important;
      min-height: 0 !important;
      padding-bottom: 20px !important;
      padding-top: 0 !important;
      transform: translateX(clamp(18px, 3vw, 58px)) !important;
    }

    [data-rid="4c006af1-6f51-415f-9f3c-ab275ac1ad21"] {
      max-width: 660px !important;
    }

    [data-rid="4c006af1-6f51-415f-9f3c-ab275ac1ad21"] h2 {
      font-size: clamp(2.45rem, 2.6vw, 3.45rem) !important;
      line-height: 1.12 !important;
      text-align: right !important;
    }

    .zafira-symptom-line,
    .zafira-main-subhead {
      max-width: 640px !important;
      text-align: right !important;
    }

    [data-rid="6986de8f-6bad-4f35-844e-7713d6b54cd5"] {
      align-self: center !important;
      margin-top: 18px !important;
      position: relative !important;
      transform: none !important;
      z-index: 2 !important;
    }

    .zafira-hero-media {
      align-self: center !important;
      height: calc(100% + 24px) !important;
      margin-bottom: -12px !important;
      margin-top: -12px !important;
      max-width: none !important;
      min-height: 0 !important;
      overflow: hidden !important;
      width: 100% !important;
    }

    .zafira-hero-image {
      height: 100% !important;
      object-fit: cover !important;
      object-position: 56% center !important;
      width: 100% !important;
      -webkit-mask-image: linear-gradient(to right, transparent 0%, rgba(0,0,0,0.18) 8%, #000 24%, #000 100%) !important;
      mask-image: linear-gradient(to right, transparent 0%, rgba(0,0,0,0.18) 8%, #000 24%, #000 100%) !important;
    }

    .zafira-science-insert {
      padding: 44px 0 28px;
    }

    .zafira-science-insert .sci-container {
      max-width: 1240px;
      padding: 0 clamp(36px, 6vw, 80px);
    }

    .zafira-science-insert .sci-body {
      padding: 30px 0;
    }

    .zafira-science-insert .sci-section-heading {
      font-size: clamp(3.15rem, 4.2vw, 5.35rem);
      max-width: 760px;
    }

    .zafira-science-insert .sci-image {
      float: right;
      margin: 4px 0 20px 38px;
      max-width: 620px;
      width: 50%;
    }

    .zafira-offer-stage {
      grid-column: 1 / -1 !important;
      order: 3 !important;
    }

    .zafira-offer-boxes {
      grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
      max-width: 1120px !important;
    }

    .zafira-post-offer-info {
      grid-column: 1 / -1 !important;
      order: 4 !important;
    }

    #ordering [data-rid="3eb18ba8-918b-400d-9aa6-2122151f3cc6"] {
      max-width: 720px !important;
    }

    #ordering [data-rid="3eb18ba8-918b-400d-9aa6-2122151f3cc6"],
    #ordering [data-rid="3eb18ba8-918b-400d-9aa6-2122151f3cc6"] span {
      font-size: clamp(3.05rem, 3.25vw, 4.35rem) !important;
      line-height: 1.04 !important;
    }

    #ordering [data-rid="5ce1fec5-bcbf-4df1-8c92-6f01beac48ea"] p {
      font-size: 1.16rem !important;
      line-height: 1.35 !important;
      max-width: 680px !important;
    }

    #ordering [data-rid="8dbe28a9-fe73-4a80-ad88-3d129789d047"] p {
      font-size: 1.05rem !important;
      line-height: 1.42 !important;
    }

    #ordering [data-rid="8dbe28a9-fe73-4a80-ad88-3d129789d047"] svg {
      width: 20px !important;
    }
  }

  @media (max-width: 640px) {
    [data-rid="688d5d8c-b3a3-4427-94b5-0236ea2a0fd7"] {
      padding-left: 14px !important;
      padding-right: 14px !important;
    }

    .zafira-hero-media {
      align-self: center !important;
      background: #d7f5d5 !important;
      display: block !important;
      height: 330px !important;
      margin: 14px calc(50% - 50vw) 0 !important;
      max-width: none !important;
      min-height: 0 !important;
      overflow: hidden !important;
      width: 100vw !important;
    }

    .zafira-hero-image {
      height: 100% !important;
      margin: 0 !important;
      max-width: none !important;
      min-width: 0 !important;
      object-fit: cover !important;
      object-position: 66% center !important;
      width: 100% !important;
      -webkit-mask-image: linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.06) 6%, rgba(0,0,0,0.26) 14%, rgba(0,0,0,0.62) 24%, #000 38%, #000 100%) !important;
      mask-image: linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.06) 6%, rgba(0,0,0,0.26) 14%, rgba(0,0,0,0.62) 24%, #000 38%, #000 100%) !important;
    }

    .zafira-symptom-line {
      max-width: min(420px, calc(100vw - 28px)) !important;
    }

    .zafira-symptom-line h2 {
      font-size: 1rem !important;
      line-height: 1.2 !important;
    }

    .zafira-main-subhead {
      max-width: min(420px, calc(100vw - 28px)) !important;
    }

    .zafira-main-subhead h2 {
      margin: 0 !important;
    }

    [data-rid="6986de8f-6bad-4f35-844e-7713d6b54cd5"] {
      margin-bottom: 8px !important;
      position: relative !important;
      z-index: 3 !important;
    }

    .zafira-science-insert {
      padding-top: 36px;
    }

    #ordering {
      height: auto !important;
      margin-bottom: 0 !important;
      min-height: 0 !important;
      padding-bottom: 0 !important;
    }

    [data-rid="288dac43-67c5-49b0-a277-54e7828bd52f"] {
      margin-bottom: 0 !important;
      padding-bottom: 0 !important;
    }

    #ordering [data-rid="ffe36714-a8ac-4ebd-8ec4-2fee8864290e"],
    #ordering [data-rid="fef050ff-7dfc-4f6e-b765-408dbfba1ba9"] {
      display: none !important;
      height: 0 !important;
      margin: 0 !important;
      min-height: 0 !important;
      padding: 0 !important;
    }

    .zafira-post-offer-info [data-rid="bb485a75-c36d-4870-b1cb-1f133374d3d9"] {
      margin: 8px auto 14px !important;
      padding: 0 12px !important;
    }

    .zafira-post-offer-info [data-rid="bb485a75-c36d-4870-b1cb-1f133374d3d9"] p {
      font-size: 1rem !important;
      line-height: 1.38 !important;
    }

    .zafira-offer-stage {
      margin-top: 0 !important;
      max-width: 420px !important;
      width: calc(100% - 32px) !important;
    }

    .zafira-offer-boxes {
      grid-template-columns: 1fr !important;
      gap: 14px !important;
      margin-bottom: 4px !important;
      margin-top: 0 !important;
      max-width: 100% !important;
    }

    .zafira-post-offer-info {
      margin-top: 0 !important;
      max-width: 420px !important;
      width: calc(100% - 32px) !important;
    }

    .zafira-post-offer-info [data-rid="bd87c70e-6347-4ca2-86cc-e9e2c4e7ba3e"] {
      margin-bottom: 14px !important;
    }

    .zafira-post-offer-info [data-rid="11a4566c-b34f-4a3a-b7bf-5bc56b34d680"] {
      margin-top: 14px !important;
    }

    .zafira-post-offer-info [data-rid="1"] {
      padding-left: 14px !important;
      padding-right: 14px !important;
    }

    .zafira-offer-content {
      padding: 20px 16px 18px !important;
    }

    .zafira-offer-card h3 {
      font-size: 2.35rem !important;
    }

    .zafira-offer-price {
      font-size: 2.35rem !important;
    }

    .zafira-offer-button {
      flex-direction: column !important;
      gap: 4px !important;
    }
  }
</style>
`;

html = html.replace(/\n?<style id="zafira-new-revisions">[\s\S]*?<\/style>\n?/, "\n");
html = html.replace("</head>", `${customCss}</head>`);

const escapedScienceInsert = scienceInsert
  .replace(/<\/script/gi, "<\\/script")
  .replaceAll("`", "\\`")
  .trim();
const escapedOfferInsert = offerInsert
  .replace(/<\/script/gi, "<\\/script")
  .replaceAll("`", "\\`")
  .trim();
const escapedSymptomLine = symptomLine
  .replace(/\\/g, "\\\\")
  .replace(/"/g, '\\"')
  .replace(/<\/script/gi, "<\\/script");
const escapedSubheadNew = subheadNew
  .replace(/\\/g, "\\\\")
  .replace(/"/g, '\\"')
  .replace(/<\/script/gi, "<\\/script");
const mountScript = `
<template id="zafira-science-template">${escapedScienceInsert}</template>
<template id="zafira-offer-template">${escapedOfferInsert}</template>
<script id="zafira-science-mount">
  (function () {
    var symptomLine = "${escapedSymptomLine}";
    var subheadNew = "${escapedSubheadNew}";

    function mountHeroCopy() {
      var headline = document.querySelector('[data-rid="4c006af1-6f51-415f-9f3c-ab275ac1ad21"]');
      var subhead = document.querySelector('[data-rid="8e82714f-7fcc-452a-9be5-04d4b68e9d96"]');
      if (!headline || !headline.parentNode) return;

      var existingSymptom = document.querySelector(".zafira-symptom-line");
      if (!existingSymptom) {
        existingSymptom = document.createElement("div");
        existingSymptom.className = "alchemy-rte zafira-symptom-line";
        existingSymptom.innerHTML = '<span style="width:100%"><h2></h2></span>';
        headline.insertAdjacentElement("afterend", existingSymptom);
      }

      var symptomHeading = existingSymptom.querySelector("h2");
      if (symptomHeading && symptomHeading.textContent !== symptomLine) {
        symptomHeading.textContent = symptomLine;
      }

      var mountedSubhead = document.querySelector(".zafira-main-subhead");
      if (!mountedSubhead) {
        mountedSubhead = document.createElement("div");
        mountedSubhead.className = "r-1uywr3t alchemy-rte zafira-main-subhead";
        mountedSubhead.innerHTML = '<span style="width:100%"><h2></h2></span>';
        existingSymptom.insertAdjacentElement("afterend", mountedSubhead);
      }

      var mountedSubheadHeading = mountedSubhead.querySelector("h2");
      if (mountedSubheadHeading && mountedSubheadHeading.textContent !== subheadNew) {
        mountedSubheadHeading.textContent = subheadNew;
      }

      if (subhead) {
        var subheadHeading = subhead.querySelector("h2");
        if (subheadHeading && subheadHeading.textContent !== subheadNew) {
          subheadHeading.textContent = subheadNew;
        }
      }
    }

    function mountScience() {
      if (document.querySelector('[data-zafira-science-mounted="true"]')) return;
      var target = document.querySelector('[data-rid="c4c11ad8-6395-4470-aaf5-15c3a2e91e2b"]');
      var template = document.getElementById("zafira-science-template");
      if (!target || !template || !target.parentNode) return;
      var fragment = template.content.cloneNode(true);
      var root = fragment.querySelector("[data-zafira-science-root]");
      if (root) {
        root.id = "glp1-flu-science";
        root.dataset.zafiraScienceMounted = "true";
      }
      target.parentNode.insertBefore(fragment, target);
    }

    function mountShopAnchor() {
      var target = document.querySelector('[data-rid="752f8331-6f5b-49d7-90c1-dd9fb0171ff2"]');
      var button = document.querySelector('[data-rid="6986de8f-6bad-4f35-844e-7713d6b54cd5"]');
      if (!target || !button) return;

      target.id = "zafira-product-photo";
      button.setAttribute("aria-label", "Shop Recovery Foundation");
      if (button.dataset.zafiraShopAnchorMounted === "true") return;
      button.dataset.zafiraShopAnchorMounted = "true";
      button.addEventListener("click", function (event) {
        event.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }

    function mountFoundationImage() {
      var picture = document.querySelector('[data-rid="f8a7c6ee-348a-47f2-b07a-02c7da97d94d"]');
      if (!picture) return;
      var asset = "/new/assets/recovery-foundation-benefits-woman.png";
      picture.querySelectorAll("source").forEach(function (source) {
        source.setAttribute("srcset", asset);
      });
      var img = picture.querySelector("img");
      if (img) {
        img.setAttribute("src", asset);
        img.setAttribute("alt", "Woman holding Zafira Recovery Foundation with ingredient benefits");
      }
    }

    function rainConfetti() {
      var canvas = document.createElement("canvas");
      var ctx = canvas.getContext("2d");
      if (!ctx) return;

      var dpr = window.devicePixelRatio || 1;
      var colors = ["#ff4d6d", "#ffd166", "#06d6a0", "#118ab2", "#9b5de5", "#f15bb5", "#035C05", "#F7B456"];
      var pieces = [];
      var duration = 3200;
      var start = performance.now();

      canvas.className = "zafira-confetti-canvas";
      document.body.appendChild(canvas);

      function resize() {
        canvas.width = Math.floor(window.innerWidth * dpr);
        canvas.height = Math.floor(window.innerHeight * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      }

      resize();

      for (var i = 0; i < 210; i += 1) {
        pieces.push({
          x: Math.random() * window.innerWidth,
          y: -60 - Math.random() * window.innerHeight * 1.15,
          w: 6 + Math.random() * 7,
          h: 8 + Math.random() * 12,
          vx: -1.05 + Math.random() * 2.1,
          vy: 2.4 + Math.random() * 3.2,
          rotation: Math.random() * Math.PI,
          spin: -0.18 + Math.random() * 0.36,
          color: colors[i % colors.length],
          opacity: 0.86 + Math.random() * 0.14,
        });
      }

      function draw(now) {
        var elapsed = now - start;
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        pieces.forEach(function (piece) {
          piece.x += piece.vx;
          piece.y += piece.vy;
          piece.rotation += piece.spin;
          piece.vy += 0.018;
          var fade = elapsed > duration - 1300 ? Math.max(0, (duration - elapsed) / 1300) : 1;
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
        } else if (canvas.parentNode) {
          canvas.parentNode.removeChild(canvas);
        }
      }

      window.addEventListener("resize", resize, { once: true });
      requestAnimationFrame(draw);
    }

    function openOfferModal(label) {
      var modal = document.getElementById("zafira-offer-modal");
      if (!modal) return;
      var title = modal.querySelector("#zafira-offer-modal-title");
      if (title && label) title.textContent = label + " selected";
      modal.setAttribute("aria-hidden", "false");
    }

    function closeOfferModal() {
      var modal = document.getElementById("zafira-offer-modal");
      if (modal) modal.setAttribute("aria-hidden", "true");
    }

    function mountOfferBoxes() {
      var ordering = document.getElementById("ordering");
      var template = document.getElementById("zafira-offer-template");
      if (!ordering || !template) return;

      var oldButton = ordering.querySelector('[data-rid="fef050ff-7dfc-4f6e-b765-408dbfba1ba9"]');
      if (oldButton) oldButton.classList.add("zafira-old-cart-hidden");

      document.querySelectorAll("#ordering .kaching-bundles__block, #ordering kaching-bundles, #ordering kaching-bundle").forEach(function (el) {
        el.classList.add("zafira-old-cart-hidden");
      });

      if (!document.querySelector('[data-zafira-offer-mounted="true"]')) {
        var productTop = ordering.closest('[data-rid="288dac43-67c5-49b0-a277-54e7828bd52f"]') || ordering.parentElement;
        var stage = document.createElement("div");
        stage.className = "zafira-offer-stage";
        var fragment = template.content.cloneNode(true);
        var offerRootInFragment = fragment.querySelector("[data-zafira-offer-root]");
        if (offerRootInFragment) {
          offerRootInFragment.id = "zafira-offer-boxes";
          offerRootInFragment.dataset.zafiraOfferMounted = "true";
        }
        stage.appendChild(fragment);
        if (productTop && productTop.parentNode) {
          productTop.parentNode.insertBefore(stage, productTop.nextSibling);
        } else {
          ordering.appendChild(stage);
        }
      }

      var postOfferInfo = document.querySelector(".zafira-post-offer-info");
      if (!postOfferInfo) {
        postOfferInfo = document.createElement("div");
        postOfferInfo.className = "zafira-post-offer-info";
        var stageRoot = document.querySelector(".zafira-offer-stage") || document.querySelector('[data-zafira-offer-mounted="true"]');
        if (stageRoot && stageRoot.parentNode) {
          stageRoot.parentNode.insertBefore(postOfferInfo, stageRoot.nextSibling);
        }
      }

      if (postOfferInfo && oldButton && postOfferInfo.dataset.zafiraInfoMoved !== "true") {
        var next = oldButton.nextElementSibling;
        while (next) {
          var current = next;
          next = next.nextElementSibling;
          postOfferInfo.appendChild(current);
        }
        postOfferInfo.dataset.zafiraInfoMoved = "true";
      }

      var offerRoot = document.getElementById("zafira-offer-boxes");
      if (!offerRoot || offerRoot.dataset.zafiraOfferMounted === "true") return;
      offerRoot.dataset.zafiraOfferMounted = "true";

      offerRoot.querySelectorAll(".zafira-offer-card").forEach(function (card) {
        card.addEventListener("click", function (event) {
          if (event.target.closest(".zafira-offer-button")) return;
          offerRoot.querySelectorAll(".zafira-offer-card").forEach(function (item) {
            item.classList.remove("zafira-offer-card--featured");
          });
          card.classList.add("zafira-offer-card--featured");
        });
      });

      offerRoot.querySelectorAll(".zafira-offer-button").forEach(function (button) {
        button.addEventListener("click", function (event) {
          event.preventDefault();
          event.stopPropagation();
          rainConfetti();
          setTimeout(function () {
            openOfferModal(button.getAttribute("data-offer-label") || "Offer");
          }, 1500);
        });
      });

      document.querySelectorAll("[data-zafira-modal-close]").forEach(function (el) {
        el.addEventListener("click", closeOfferModal);
      });

      document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") closeOfferModal();
      });
    }

    document.addEventListener("DOMContentLoaded", function () {
      setTimeout(mountHeroCopy, 100);
      setTimeout(mountHeroCopy, 800);
      setTimeout(mountHeroCopy, 1600);
      setTimeout(mountScience, 100);
      setTimeout(mountScience, 800);
      setTimeout(mountScience, 1600);
      setTimeout(mountShopAnchor, 100);
      setTimeout(mountShopAnchor, 800);
      setTimeout(mountShopAnchor, 1600);
      setTimeout(mountFoundationImage, 100);
      setTimeout(mountFoundationImage, 800);
      setTimeout(mountFoundationImage, 1600);
      setTimeout(mountOfferBoxes, 100);
      setTimeout(mountOfferBoxes, 800);
      setTimeout(mountOfferBoxes, 1600);
    });
    setTimeout(mountHeroCopy, 100);
    setTimeout(mountScience, 100);
    setTimeout(mountShopAnchor, 100);
    setTimeout(mountFoundationImage, 100);
    setTimeout(mountOfferBoxes, 100);
  })();
</script>
`;

html = html.replace(
  /<template id="zafira-science-template">[\s\S]*?<\/template>\s*(?:<template id="zafira-offer-template">[\s\S]*?<\/template>\s*)?<script id="zafira-science-mount">[\s\S]*?<\/script>\s*/g,
  "",
);
html = html.replace("</body>", `${mountScript}</body>`);

await writeFile(newPagePath, html);
console.log("Updated public/new/index.html");

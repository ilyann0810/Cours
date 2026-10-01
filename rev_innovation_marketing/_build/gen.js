/* Génère la présentation "Innovation & Marketing" — app muscu gamifiée + IA.
   Style : tech / dark moderne, accents néon. 9 slides + grille. */

const pptxgen = require("pptxgenjs");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const sharp = require("sharp");
const path = require("path");
const fa = require("react-icons/fa");

// ---------- Palette (Tech dark / néon) ----------
const C = {
  bg: "0B1020",        // fond principal (bleu nuit quasi noir)
  bgAlt: "111A33",     // panneau légèrement plus clair
  card: "16213E",      // cartes
  cardLine: "243056",  // bordure carte
  text: "E8ECF8",      // texte principal
  muted: "9AA6C7",     // texte secondaire
  neon: "2DE2C5",      // accent principal (turquoise néon)
  neon2: "6C7BFF",     // accent secondaire (violet/bleu)
  pink: "FF4D8D",      // accent chaud (gamification)
  gold: "FFC857",      // stats / highlights
  white: "FFFFFF",
};

const FONT_H = "Trebuchet MS";
const FONT_B = "Calibri";
const FOOTER = "EFREI — Sciences de l'Entreprise · Innovation & Marketing · APFG82 2025-26";

// ---------- Icônes -> PNG base64 ----------
async function icon(IconComponent, color, size = 256) {
  const svg = ReactDOMServer.renderToStaticMarkup(
    React.createElement(IconComponent, { color, size: String(size) })
  );
  const png = await sharp(Buffer.from(svg)).png().toBuffer();
  return "image/png;base64," + png.toString("base64");
}

// ---------- Génère un fond dégradé radial sombre ----------
async function makeBg(file, c1, c2) {
  const w = 1280, h = 720;
  const svg = `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="g" cx="78%" cy="22%" r="95%">
        <stop offset="0%" stop-color="#${c1}"/>
        <stop offset="100%" stop-color="#${c2}"/>
      </radialGradient>
    </defs>
    <rect width="${w}" height="${h}" fill="url(#g)"/>
  </svg>`;
  await sharp(Buffer.from(svg)).png().toFile(path.join(__dirname, "assets", file));
}

(async () => {
  await makeBg("bg_dark.png", "16224A", C.bg);

  // pré-rendu des icônes utilisées
  const I = {
    brain: await icon(fa.FaBrain, "#" + C.neon),
    user: await icon(fa.FaUserNinja, "#" + C.pink),
    shield: await icon(fa.FaShieldAlt, "#" + C.neon),
    users: await icon(fa.FaUsers, "#" + C.neon2),
    gamepad: await icon(fa.FaGamepad, "#" + C.pink),
    dumbbell: await icon(fa.FaDumbbell, "#" + C.neon),
    chart: await icon(fa.FaChartLine, "#" + C.neon),
    bullseye: await icon(fa.FaBullseye, "#" + C.pink),
    coins: await icon(fa.FaCoins, "#" + C.gold),
    leaf: await icon(fa.FaLeaf, "#" + C.neon),
    heart: await icon(fa.FaHeartbeat, "#" + C.pink),
    rocket: await icon(fa.FaRocket, "#" + C.neon2),
    trophy: await icon(fa.FaTrophy, "#" + C.gold),
    store: await icon(fa.FaStore, "#" + C.neon2),
    crown: await icon(fa.FaCrown, "#" + C.gold),
    handshake: await icon(fa.FaHandshake, "#" + C.neon),
  };

  const pres = new pptxgen();
  pres.layout = "LAYOUT_WIDE"; // 13.3 x 7.5
  const W = 13.3, H = 7.5;
  pres.author = "Équipe ING2 — EFREI";
  pres.title = "FORGE — Réseau social muscu gamifié par IA";

  const makeShadow = () => ({ type: "outer", color: "000000", blur: 8, offset: 3, angle: 135, opacity: 0.35 });

  // ---- helpers ----
  function darkBase(slide) {
    slide.background = { path: path.join(__dirname, "assets", "bg_dark.png") };
  }
  function footer(slide, n) {
    slide.addText(FOOTER, { x: 0.6, y: H - 0.45, w: 10.5, h: 0.3, fontFace: FONT_B, fontSize: 9, color: C.muted });
    slide.addText(String(n), { x: W - 0.9, y: H - 0.45, w: 0.5, h: 0.3, fontFace: FONT_B, fontSize: 10, color: C.muted, align: "right" });
  }
  function title(slide, kicker, t) {
    slide.addText(kicker.toUpperCase(), { x: 0.6, y: 0.45, w: 8, h: 0.3, fontFace: FONT_B, fontSize: 12, color: C.neon, charSpacing: 3, bold: true });
    slide.addText(t, { x: 0.6, y: 0.72, w: 12, h: 0.8, fontFace: FONT_H, fontSize: 30, color: C.white, bold: true });
  }
  // carte avec icône
  function iconCard(slide, x, y, w, h, iconData, head, body, accent, compact) {
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w, h, fill: { color: C.card }, line: { color: C.cardLine, width: 1 }, rectRadius: 0.08, shadow: makeShadow() });
    slide.addShape(pres.shapes.OVAL, { x: x + 0.25, y: y + 0.25, w: 0.62, h: 0.62, fill: { color: C.bgAlt }, line: { color: accent || C.neon, width: 1.5 } });
    slide.addImage({ data: iconData, x: x + 0.37, y: y + 0.37, w: 0.38, h: 0.38 });
    if (compact) {
      // head + body both to the right of the icon (for short cards)
      slide.addText(head, { x: x + 1.0, y: y + 0.18, w: w - 1.2, h: 0.35, fontFace: FONT_H, fontSize: 14.5, bold: true, color: C.white, valign: "middle", margin: 0 });
      if (body) slide.addText(body, { x: x + 1.0, y: y + 0.52, w: w - 1.2, h: h - 0.6, fontFace: FONT_B, fontSize: 12, color: C.muted, valign: "top", lineSpacingMultiple: 1.0, margin: 0 });
    } else {
      slide.addText(head, { x: x + 1.0, y: y + 0.22, w: w - 1.2, h: 0.5, fontFace: FONT_H, fontSize: 15, bold: true, color: C.white, valign: "middle" });
      if (body) slide.addText(body, { x: x + 0.28, y: y + 0.95, w: w - 0.55, h: h - 1.1, fontFace: FONT_B, fontSize: 12.5, color: C.muted, valign: "top", lineSpacingMultiple: 1.05 });
    }
  }

  // =========================================================
  // SLIDE 1 — Couverture
  // =========================================================
  let s = pres.addSlide(); darkBase(s);
  // bloc accent à gauche
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 0.18, h: H, fill: { color: C.neon } });
  s.addText("PROJET INNOVATION & MARKETING — ING2 APP", { x: 0.8, y: 1.4, w: 9, h: 0.4, fontFace: FONT_B, fontSize: 14, color: C.neon, charSpacing: 2, bold: true });
  s.addText("FORGE", { x: 0.75, y: 1.9, w: 9, h: 1.5, fontFace: FONT_H, fontSize: 96, bold: true, color: C.white });
  s.addText([
    { text: "Le réseau social de la muscu qui ", options: { color: C.text } },
    { text: "forge ton avatar", options: { color: C.neon, bold: true } },
    { text: " au rythme de tes vraies perfs.", options: { color: C.text } },
  ], { x: 0.8, y: 3.55, w: 8.4, h: 0.8, fontFace: FONT_B, fontSize: 22 });
  s.addText("Coaching par IA · Avatar évolutif · Données vérifiées · Communauté", { x: 0.8, y: 4.45, w: 9, h: 0.4, fontFace: FONT_B, fontSize: 14, color: C.muted });
  // gros avatar/icône à droite
  s.addShape(pres.shapes.OVAL, { x: 9.7, y: 1.7, w: 3.0, h: 3.0, fill: { color: C.bgAlt }, line: { color: C.neon, width: 2 } });
  s.addImage({ data: I.user, x: 10.55, y: 2.55, w: 1.3, h: 1.3 });
  s.addText("Équipe ING2 APP — EFREI", { x: 0.8, y: 6.4, w: 9, h: 0.4, fontFace: FONT_B, fontSize: 13, color: C.muted, italic: true });

  // =========================================================
  // SLIDE 2 — Contexte / Problème
  // =========================================================
  s = pres.addSlide(); darkBase(s);
  title(s, "Contexte", "Un problème de motivation, pas de salles");
  s.addText([
    { text: "La muscu explose, mais l'abandon aussi.", options: { bold: true, color: C.text, breakLine: true, fontSize: 15 } },
    { text: "Les débutants se sentent perdus, intimidés et n'ont pas de coach pour adapter leur programme. La motivation retombe en quelques semaines.", options: { color: C.muted, fontSize: 13.5 } },
  ], { x: 0.6, y: 1.7, w: 6.0, h: 1.6, lineSpacingMultiple: 1.1 });

  // 3 stats callouts
  const stats = [
    ["~50%", "des nouveaux pratiquants abandonnent dans les 6 premiers mois", C.pink],
    ["1 coach", "humain = cher et non scalable pour personnaliser un programme", C.neon],
    ["3 freins", "manque de suivi, d'objectifs clairs et de communauté de soutien", C.neon2],
  ];
  stats.forEach((st, i) => {
    const x = 0.6 + i * 4.05;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y: 3.55, w: 3.8, h: 2.7, fill: { color: C.card }, line: { color: C.cardLine, width: 1 }, rectRadius: 0.08, shadow: makeShadow() });
    s.addText(st[0], { x: x + 0.2, y: 3.8, w: 3.4, h: 0.9, fontFace: FONT_H, fontSize: 44, bold: true, color: st[2] });
    s.addText(st[1], { x: x + 0.25, y: 4.85, w: 3.3, h: 1.3, fontFace: FONT_B, fontSize: 13.5, color: C.muted, valign: "top", lineSpacingMultiple: 1.05 });
  });
  footer(s, 2);

  // =========================================================
  // SLIDE 3 — Données de marché
  // =========================================================
  s = pres.addSlide(); darkBase(s);
  title(s, "Données de marché", "Un marché massif, en croissance, atomisé");
  // chart à gauche
  s.addChart(pres.charts.BAR, [{
    name: "Marché mondial fitness apps (Md$)",
    labels: ["2022", "2024", "2026e", "2028e"],
    values: [11, 15, 21, 28],
  }], {
    x: 0.6, y: 1.75, w: 6.2, h: 4.0, barDir: "col",
    chartColors: [C.neon],
    chartArea: { fill: { color: C.bgAlt } }, plotArea: { fill: { color: C.bgAlt } },
    catAxisLabelColor: C.muted, valAxisLabelColor: C.muted,
    catAxisLabelFontSize: 12, valAxisLabelFontSize: 11,
    valGridLine: { color: C.cardLine, size: 0.5 }, catGridLine: { style: "none" },
    showValue: true, dataLabelPosition: "outEnd", dataLabelColor: C.white, dataLabelFontBold: true,
    showLegend: false, showTitle: true, title: "Marché mondial fitness apps (Md$)", titleColor: C.muted, titleFontSize: 12,
  });
  // points clés à droite
  const md = [
    [I.chart, "Marché en forte croissance", "Fitness apps : ~15 Md$ en 2024, projeté ~28 Md$ en 2028 (≈ +15%/an).", C.neon],
    [I.users, "Structure atomisée", "Beaucoup d'acteurs de niche (Strava, Hevy, Strong, Fitbod) — aucun ne combine IA + avatar + données vérifiées.", C.neon2],
    [I.bullseye, "Segmentation", "Débutants (cœur de cible), pratiquants réguliers, et B2B salles de sport.", C.pink],
  ];
  md.forEach((m, i) => iconCard(s, 7.1, 1.8 + i * 1.42, 5.6, 1.28, m[0], m[1], m[2], m[3], true));
  footer(s, 3);

  // =========================================================
  // SLIDE 4 — Clients cibles
  // =========================================================
  s = pres.addSlide(); darkBase(s);
  title(s, "Clients cibles", "À qui s'adresse FORGE ?");
  const personas = [
    [I.user, "Cœur de cible — Débutants 16-25 ans", "Jeunes qui débutent, sensibles au social et au jeu vidéo. Fort taux d'abandon = forte valeur si on les retient.", C.pink],
    [I.dumbbell, "Pratiquants réguliers", "Veulent tracker, progresser et se mesurer aux autres. Marché plus concurrentiel mais très engagé.", C.neon],
    [I.handshake, "B2B — Salles de sport", "Cherchent à fidéliser leurs membres. FORGE devient un outil de rétention pour les salles partenaires.", C.neon2],
  ];
  personas.forEach((p, i) => iconCard(s, 0.6 + i * 4.05, 1.85, 3.8, 3.9, p[0], p[1], p[2], p[3]));
  s.addText("Profil commun : besoin de motivation, de repères clairs et d'appartenance à une communauté.", { x: 0.6, y: 6.05, w: 12, h: 0.4, fontFace: FONT_B, fontSize: 13.5, italic: true, color: C.muted });
  footer(s, 4);

  // =========================================================
  // SLIDE 5 — La solution
  // =========================================================
  s = pres.addSlide(); darkBase(s);
  title(s, "La solution", "FORGE : 4 piliers qui se renforcent");
  const pillars = [
    [I.brain, "Coaching par IA", "L'IA adapte programme & objectifs selon le niveau, l'ancienneté et la progression. Un coach perso scalable — impossible avant l'IA.", C.neon],
    [I.gamepad, "Avatar évolutif", "Ton personnage virtuel se transforme physiquement au rythme de tes vraies perfs. Gamification qui rend la progression visible.", C.pink],
    [I.shield, "Données vérifiées", "Validation des perfs (binôme, photo/vidéo, capteurs) : on règle le mensonge qui plombe les réseaux fitness. La confiance est notre socle.", C.neon],
    [I.users, "Communauté & défis", "Feed social, défis entre amis, clans et classements. La motivation par le collectif, pour ne plus lâcher seul.", C.neon2],
  ];
  pillars.forEach((p, i) => {
    const x = 0.6 + (i % 2) * 6.15;
    const y = 1.75 + Math.floor(i / 2) * 2.25;
    iconCard(s, x, y, 5.9, 2.05, p[0], p[1], p[2], p[3]);
  });
  footer(s, 5);

  // =========================================================
  // SLIDE 6 — Positionnement
  // =========================================================
  s = pres.addSlide(); darkBase(s);
  title(s, "Positionnement", "Innovation, pas invention : l'IA crée la rupture");
  // mapping 2 axes
  const mapX = 1.4, mapY = 1.9, mapW = 6.6, mapH = 4.0;
  s.addShape(pres.shapes.RECTANGLE, { x: mapX, y: mapY, w: mapW, h: mapH, fill: { color: C.bgAlt }, line: { color: C.cardLine, width: 1 } });
  // axes
  s.addShape(pres.shapes.LINE, { x: mapX, y: mapY + mapH / 2, w: mapW, h: 0, line: { color: C.muted, width: 1 } });
  s.addShape(pres.shapes.LINE, { x: mapX + mapW / 2, y: mapY, w: 0, h: mapH, line: { color: C.muted, width: 1 } });
  s.addText("Personnalisation IA →", { x: mapX, y: mapY + mapH + 0.05, w: mapW, h: 0.3, fontFace: FONT_B, fontSize: 11, color: C.muted, align: "center" });
  s.addText("Gamification + social", { x: mapX - 1.35, y: mapY + mapH / 2 - 0.9, w: 1.3, h: 1.8, fontFace: FONT_B, fontSize: 11, color: C.muted, align: "center", valign: "middle", rotate: 270 });
  // concurrents
  const dots = [
    ["Strong/Hevy", 0.30, 0.30, C.muted],
    ["Strava", 0.34, 0.72, C.muted],
    ["Fitbod", 0.55, 0.30, C.muted],
    ["Habitica", 0.25, 0.82, C.muted],
    ["FORGE", 0.82, 0.85, C.neon],
  ];
  dots.forEach(d => {
    const dx = mapX + d[1] * mapW, dy = mapY + (1 - d[2]) * mapH;
    const big = d[0] === "FORGE";
    s.addShape(pres.shapes.OVAL, { x: dx - (big ? 0.16 : 0.1), y: dy - (big ? 0.16 : 0.1), w: big ? 0.32 : 0.2, h: big ? 0.32 : 0.2, fill: { color: d[3] }, line: { color: C.bg, width: big ? 2 : 1 } });
    s.addText(d[0], { x: dx + 0.18, y: dy - 0.16, w: 1.8, h: 0.3, fontFace: FONT_B, fontSize: big ? 13 : 11, bold: big, color: big ? C.neon : C.muted });
  });
  // argument à droite
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 8.5, y: 1.9, w: 4.2, h: 4.0, fill: { color: C.card }, line: { color: C.cardLine, width: 1 }, rectRadius: 0.08, shadow: makeShadow() });
  s.addText("Pourquoi c'est une innovation", { x: 8.75, y: 2.1, w: 3.8, h: 0.4, fontFace: FONT_H, fontSize: 16, bold: true, color: C.neon });
  s.addText([
    { text: "Le marché existe déjà (preuve : un marché à 28 Md$).", options: { bullet: true, color: C.text, breakLine: true } },
    { text: "Mais combiner IA de personnalisation + avatar miroir + données vérifiées n'était pas possible avant l'IA générative/prédictive.", options: { bullet: true, color: C.text, breakLine: true } },
    { text: "FORGE occupe un espace vide : ultra-personnalisé ET ludique ET fiable.", options: { bullet: true, color: C.text } },
  ], { x: 8.75, y: 2.6, w: 3.7, h: 3.1, fontFace: FONT_B, fontSize: 13, paraSpaceAfter: 8, lineSpacingMultiple: 1.0 });
  footer(s, 6);

  // =========================================================
  // SLIDE 7 — Business model (bonus avant impacts)
  // =========================================================
  s = pres.addSlide(); darkBase(s);
  title(s, "Modèle économique", "Une plateforme, plusieurs revenus = résilience");
  const bm = [
    [I.crown, "Freemium + Premium", "Gratuit à l'usage, abonnement pour stats avancées, programmes IA poussés et personnalisation.", C.gold],
    [I.handshake, "Partenariats salles (B2B)", "Les salles paient pour intégrer FORGE et fidéliser leurs membres.", C.neon],
    [I.store, "Marketplace coachs", "Commission sur la mise en relation et la vente de programmes par des coachs.", C.neon2],
    [I.coins, "Cosmétiques avatar", "Achats in-app de skins/équipements pour le personnage (modèle jeu vidéo).", C.pink],
  ];
  bm.forEach((b, i) => {
    const x = 0.6 + (i % 2) * 6.15;
    const y = 1.75 + Math.floor(i / 2) * 2.1;
    iconCard(s, x, y, 5.9, 1.9, b[0], b[1], b[2], b[3]);
  });
  s.addText("→ La nature de plateforme permet d'activer plusieurs leviers : flexibilité et résilience du modèle.", { x: 0.6, y: 6.05, w: 12, h: 0.4, fontFace: FONT_B, fontSize: 13.5, italic: true, color: C.neon });
  footer(s, 7);

  // =========================================================
  // SLIDE 8 — Impacts (3 dimensions)
  // =========================================================
  s = pres.addSlide(); darkBase(s);
  title(s, "Impacts", "Une vision systémique : 3 dimensions");
  const impacts = [
    [I.coins, "Économique", "Création d'emplois (coachs, dev), valeur pour les salles partenaires, démocratisation d'un coaching jusqu'ici réservé à ceux qui peuvent payer.", C.gold],
    [I.heart, "Social", "Santé publique & lutte contre la sédentarité ; inclusion des débutants intimidés. Vigilance assumée sur les risques : addiction, comparaison toxique, dysmorphie — modération & objectifs sains intégrés.", C.pink],
    [I.leaf, "Environnemental", "Empreinte = data centers & usage IA. Mesures : hébergement bas-carbone, IA frugale. À l'inverse : moins de matériel/déplacements grâce au coaching à domicile.", C.neon],
  ];
  impacts.forEach((m, i) => iconCard(s, 0.6 + i * 4.05, 1.85, 3.8, 4.0, m[0], m[1], m[2], m[3]));
  footer(s, 8);

  // =========================================================
  // SLIDE 9 — Perspectives de développement
  // =========================================================
  s = pres.addSlide(); darkBase(s);
  title(s, "Perspectives", "Une feuille de route en 4 temps");
  const steps = [
    ["An 1", "MVP & niche", "Lancement sur les débutants, app mobile + IA de base + avatar. Bouche-à-oreille campus."],
    ["An 2", "Communauté", "Défis, clans, classements. Premiers partenariats salles pilotes."],
    ["An 3", "Monétisation", "Premium, marketplace coachs, cosmétiques. Validation des données par capteurs."],
    ["An 4+", "Scale & data", "Wearables, internationalisation, IA prédictive de blessures et de progression."],
  ];
  steps.forEach((st, i) => {
    const x = 0.6 + i * 3.12;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y: 2.0, w: 2.85, h: 3.4, fill: { color: C.card }, line: { color: C.cardLine, width: 1 }, rectRadius: 0.08, shadow: makeShadow() });
    s.addShape(pres.shapes.OVAL, { x: x + 0.25, y: 2.25, w: 0.85, h: 0.85, fill: { color: C.bgAlt }, line: { color: C.neon, width: 2 } });
    s.addText(String(i + 1), { x: x + 0.25, y: 2.25, w: 0.85, h: 0.85, fontFace: FONT_H, fontSize: 28, bold: true, color: C.neon, align: "center", valign: "middle" });
    s.addText(st[0], { x: x + 1.2, y: 2.45, w: 1.5, h: 0.5, fontFace: FONT_H, fontSize: 18, bold: true, color: C.white, valign: "middle" });
    s.addText(st[1], { x: x + 0.25, y: 3.3, w: 2.4, h: 0.5, fontFace: FONT_H, fontSize: 15, bold: true, color: C.neon });
    s.addText(st[2], { x: x + 0.25, y: 3.85, w: 2.4, h: 1.4, fontFace: FONT_B, fontSize: 12.5, color: C.muted, valign: "top", lineSpacingMultiple: 1.05 });
    if (i < 3) s.addText("›", { x: x + 2.78, y: 3.3, w: 0.4, h: 0.8, fontFace: FONT_H, fontSize: 28, color: C.neon, align: "center" });
  });
  footer(s, 9);

  // =========================================================
  // SLIDE 10 — Conclusion + slogan
  // =========================================================
  s = pres.addSlide(); darkBase(s);
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 0.18, h: H, fill: { color: C.neon } });
  s.addText("CONCLUSION", { x: 0.8, y: 1.2, w: 9, h: 0.4, fontFace: FONT_B, fontSize: 14, color: C.neon, charSpacing: 3, bold: true });
  s.addText("FORGE", { x: 0.75, y: 1.6, w: 9, h: 1.2, fontFace: FONT_H, fontSize: 72, bold: true, color: C.white });
  s.addText([
    { text: "L'IA transforme un marché saturé d'apps en une expérience ", options: { color: C.text } },
    { text: "personnalisée, ludique et fiable", options: { color: C.neon, bold: true } },
    { text: ". On ne suit plus un programme : on forge un soi meilleur.", options: { color: C.text } },
  ], { x: 0.8, y: 3.0, w: 8.6, h: 1.2, fontFace: FONT_B, fontSize: 20, lineSpacingMultiple: 1.1 });
  // slogan
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.8, y: 4.6, w: 8.0, h: 1.1, fill: { color: C.card }, line: { color: C.neon, width: 1.5 }, rectRadius: 0.1, shadow: makeShadow() });
  s.addText("« FORGE — Chaque rep te façonne. »", { x: 0.8, y: 4.6, w: 8.0, h: 1.1, fontFace: FONT_H, fontSize: 28, bold: true, italic: true, color: C.neon, align: "center", valign: "middle" });
  // icône trophée à droite
  s.addShape(pres.shapes.OVAL, { x: 10.0, y: 2.4, w: 2.6, h: 2.6, fill: { color: C.bgAlt }, line: { color: C.gold, width: 2 } });
  s.addImage({ data: I.trophy, x: 10.75, y: 3.15, w: 1.1, h: 1.1 });
  s.addText("Merci — Questions & échanges", { x: 0.8, y: 6.2, w: 9, h: 0.4, fontFace: FONT_B, fontSize: 15, color: C.muted, italic: true });

  const out = path.join(__dirname, "..", "Innovation_Marketing_FORGE.pptx");
  await pres.writeFile({ fileName: out });
  console.log("written:", out);
})();

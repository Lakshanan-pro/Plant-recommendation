import React, { useState, useMemo } from "react";
import { Leaf, Sun, Droplet, Ruler, Sparkles, ChevronRight, ChevronLeft, RotateCcw, Info } from "lucide-react";

/* ---------------------------------------------------------------
   DATA: specimen catalog
   Each plant carries the content features the engine scores against.
   lightRange is ordinal: 1 = low light, 2 = medium light, 3 = bright.
---------------------------------------------------------------- */
const PLANTS = [
  { id: "snake", name: "Snake Plant", latin: "Dracaena trifasciata", lightRange: [1, 3], water: 1, petSafe: false, size: 2, difficulty: 1, air: true, growth: "slow", tags: ["architectural", "nearly indestructible"], blurb: "Stiff upright leaves that shrug off neglect and low light alike." },
  { id: "pothos", name: "Pothos", latin: "Epipremnum aureum", lightRange: [1, 3], water: 2, petSafe: false, size: 1, difficulty: 1, air: true, growth: "fast", tags: ["trailing", "beginner"], blurb: "A vining classic that forgives missed waterings and grows fast." },
  { id: "zz", name: "ZZ Plant", latin: "Zamioculcas zamiifolia", lightRange: [1, 3], water: 1, petSafe: false, size: 2, difficulty: 1, air: true, growth: "slow", tags: ["glossy", "low-maintenance"], blurb: "Waxy dark leaves that thrive on being left alone." },
  { id: "spider", name: "Spider Plant", latin: "Chlorophytum comosum", lightRange: [1, 3], water: 3, petSafe: true, size: 1, difficulty: 1, air: true, growth: "fast", tags: ["pet-safe", "easy"], blurb: "Arching striped leaves and baby offshoots, safe around curious pets." },
  { id: "calathea", name: "Calathea", latin: "Calathea orbifolia", lightRange: [2, 3], water: 4, petSafe: true, size: 2, difficulty: 4, air: false, growth: "medium", tags: ["patterned leaves", "humidity-loving"], blurb: "Striking striped foliage that asks for steady humidity and attention." },
  { id: "monstera", name: "Monstera", latin: "Monstera deliciosa", lightRange: [2, 3], water: 3, petSafe: false, size: 3, difficulty: 2, air: false, growth: "fast", tags: ["statement", "iconic"], blurb: "Dramatic split leaves that quickly fill a bright corner." },
  { id: "fiddle", name: "Fiddle Leaf Fig", latin: "Ficus lyrata", lightRange: [3, 3], water: 3, petSafe: false, size: 3, difficulty: 4, air: false, growth: "medium", tags: ["statement", "particular"], blurb: "A tall glossy-leaved centerpiece that notices every draft." },
  { id: "fern", name: "Boston Fern", latin: "Nephrolepis exaltata", lightRange: [2, 2], water: 4, petSafe: true, size: 2, difficulty: 3, air: true, growth: "medium", tags: ["humidity-loving", "pet-safe"], blurb: "Feathery fronds that reward a humid bathroom or regular misting." },
  { id: "lily", name: "Peace Lily", latin: "Spathiphyllum wallisii", lightRange: [1, 2], water: 4, petSafe: false, size: 2, difficulty: 2, air: true, growth: "medium", tags: ["flowering", "air-purifying"], blurb: "White blooms and leaves that droop on cue when it's thirsty." },
  { id: "echeveria", name: "Echeveria", latin: "Echeveria elegans", lightRange: [3, 3], water: 1, petSafe: true, size: 1, difficulty: 2, air: false, growth: "slow", tags: ["pet-safe", "sunny windowsill"], blurb: "A tidy rosette succulent built for a sun-drenched sill." },
  { id: "rubber", name: "Rubber Plant", latin: "Ficus elastica", lightRange: [2, 3], water: 2, petSafe: false, size: 3, difficulty: 2, air: true, growth: "medium", tags: ["glossy", "statement"], blurb: "Broad burgundy-green leaves with real architectural presence." },
  { id: "pilea", name: "Chinese Money Plant", latin: "Pilea peperomioides", lightRange: [2, 3], water: 3, petSafe: true, size: 1, difficulty: 2, air: false, growth: "medium", tags: ["pet-safe", "quirky"], blurb: "Coin-shaped leaves on a plant that's easy to share as cuttings." },
  { id: "areca", name: "Areca Palm", latin: "Dypsis lutescens", lightRange: [3, 3], water: 3, petSafe: true, size: 3, difficulty: 3, air: true, growth: "medium", tags: ["pet-safe", "tropical"], blurb: "A feathery indoor palm that brings a sunny room to life." },
  { id: "ivy", name: "English Ivy", latin: "Hedera helix", lightRange: [1, 2], water: 3, petSafe: false, size: 1, difficulty: 3, air: true, growth: "fast", tags: ["trailing", "air-purifying"], blurb: "Fast, cascading growth for a shelf or hanging basket." },
  { id: "birdsnest", name: "Bird's Nest Fern", latin: "Asplenium nidus", lightRange: [1, 2], water: 4, petSafe: true, size: 1, difficulty: 3, air: false, growth: "slow", tags: ["pet-safe", "humidity-loving"], blurb: "Crinkled rosette fronds that prefer shade and steady moisture." },
  { id: "jade", name: "Jade Plant", latin: "Crassula ovata", lightRange: [3, 3], water: 1, petSafe: false, size: 1, difficulty: 1, air: false, growth: "slow", tags: ["easy", "sunny windowsill"], blurb: "Thick glossy leaves that store water and ask for almost nothing." },
];

/* ---------------------------------------------------------------
   QUIZ
---------------------------------------------------------------- */
const QUESTIONS = [
  { id: "light", label: "How much light does the spot get?", icon: Sun, options: [
      { value: 1, label: "Low light, far from windows" },
      { value: 2, label: "Some indirect light" },
      { value: 3, label: "Bright, sunny spot" },
  ]},
  { id: "water", label: "How does watering fit your routine?", icon: Droplet, options: [
      { value: 1, label: "I often forget for weeks" },
      { value: 2, label: "Occasional, low-effort" },
      { value: 3, label: "Weekly check-ins" },
      { value: 4, label: "I enjoy frequent watering" },
      { value: 5, label: "I love a daily plant ritual" },
  ]},
  { id: "size", label: "How much space do you have?", icon: Ruler, options: [
      { value: 1, label: "Small — tabletop or shelf" },
      { value: 2, label: "Medium — floor space nearby" },
      { value: 3, label: "Large — room for a statement plant" },
  ]},
  { id: "experience", label: "How experienced are you with houseplants?", icon: Leaf, options: [
      { value: 1, label: "New to this" },
      { value: 2, label: "Some experience" },
      { value: 3, label: "Comfortable troubleshooting" },
      { value: 4, label: "Very experienced" },
      { value: 5, label: "I already run a small jungle" },
  ]},
  { id: "pets", label: "Any pets that explore your plants?", icon: Info, options: [
      { value: true, label: "Yes, pets roam freely" },
      { value: false, label: "No pets at home" },
  ]},
  { id: "purpose", label: "What matters most to you?", icon: Sparkles, options: [
      { value: "air", label: "Cleaner indoor air" },
      { value: "low", label: "As little upkeep as possible" },
      { value: "statement", label: "A bold, eye-catching piece" },
      { value: "any", label: "Just something nice to look at" },
  ]},
];

/* ---------------------------------------------------------------
   ENGINE — seeded PRNG so the synthetic grower dataset is stable
---------------------------------------------------------------- */
function mulberry32(seed) {
  return function () {
    seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const rand = mulberry32(20260905);

function contentScoreFor(profile, plant) {
  // light: 1 if within range, else distance-based falloff
  const [lo, hi] = plant.lightRange;
  let lightScore;
  if (profile.light >= lo && profile.light <= hi) lightScore = 1;
  else lightScore = Math.max(0, 1 - (Math.min(Math.abs(profile.light - lo), Math.abs(profile.light - hi))) / 2);

  const waterScore = 1 - Math.abs(plant.water - profile.water) / 4;
  const sizeScore = 1 - Math.abs(plant.size - profile.size) / 2;
  const difficultyPenalty = Math.max(0, plant.difficulty - profile.experience);
  const difficultyScore = 1 - difficultyPenalty / 4;

  let purposeScore = 0.5;
  if (profile.purpose === "air") purposeScore = plant.air ? 1 : 0.15;
  else if (profile.purpose === "low") purposeScore = 1 - (plant.difficulty - 1) / 4;
  else if (profile.purpose === "statement") purposeScore = (plant.size === 3 ? 1 : plant.size === 2 ? 0.55 : 0.2) * (plant.growth === "fast" ? 1 : 0.85);
  else purposeScore = 0.6;

  let raw = lightScore * 0.25 + waterScore * 0.2 + difficultyScore * 0.2 + sizeScore * 0.15 + purposeScore * 0.2;
  raw = Math.max(0, Math.min(1, raw));

  let score = raw * 100;
  const petConflict = profile.pets && !plant.petSafe;
  if (petConflict) score *= 0.35;

  return { score, breakdown: { lightScore, waterScore, sizeScore, difficultyScore, purposeScore, petConflict } };
}

function encodeVector(profile) {
  const purposeOneHot = { air: 0, low: 0, statement: 0, any: 0 };
  purposeOneHot[profile.purpose] = 1;
  return [
    profile.light / 3,
    profile.water / 5,
    profile.pets ? 1 : 0,
    profile.size / 3,
    profile.experience / 5,
    purposeOneHot.air, purposeOneHot.low, purposeOneHot.statement, purposeOneHot.any,
  ];
}

function cosineSim(a, b) {
  let dot = 0, na = 0, nb = 0;
  for (let i = 0; i < a.length; i++) { dot += a[i] * b[i]; na += a[i] * a[i]; nb += b[i] * b[i]; }
  if (na === 0 || nb === 0) return 0;
  return dot / (Math.sqrt(na) * Math.sqrt(nb));
}

// Build a synthetic community of past growers with profiles + ratings,
// so the collaborative side has real neighbors to compare against.
function buildCommunity() {
  const archetypes = [];
  const purposes = ["air", "low", "statement", "any"];
  for (let i = 0; i < 30; i++) {
    const profile = {
      light: 1 + Math.floor(rand() * 3),
      water: 1 + Math.floor(rand() * 5),
      size: 1 + Math.floor(rand() * 3),
      experience: 1 + Math.floor(rand() * 5),
      pets: rand() > 0.6,
      purpose: purposes[Math.floor(rand() * purposes.length)],
    };
    const ratings = {};
    PLANTS.forEach((p) => {
      const { score } = contentScoreFor(profile, p);
      const noise = (rand() - 0.5) * 1.4;
      let r = score / 20 + noise; // map ~0-100 -> ~0-5, plus noise
      r = Math.max(1, Math.min(5, Math.round(r * 10) / 10));
      ratings[p.id] = r;
    });
    archetypes.push({ profile, vector: encodeVector(profile), ratings });
  }
  return archetypes;
}
const COMMUNITY = buildCommunity();

function collabScoreFor(profile) {
  const vec = encodeVector(profile);
  const sims = COMMUNITY.map((u) => ({ sim: cosineSim(vec, u.vector), ratings: u.ratings }))
    .filter((u) => u.sim > 0)
    .sort((a, b) => b.sim - a.sim)
    .slice(0, 8);

  const out = {};
  PLANTS.forEach((p) => {
    let num = 0, den = 0;
    sims.forEach((u) => { num += u.sim * u.ratings[p.id]; den += u.sim; });
    const predicted = den > 0 ? num / den : 3;
    out[p.id] = ((predicted - 1) / 4) * 100;
  });
  return out;
}

function reasonsFor(plant, breakdown, profile) {
  const reasons = [];
  if (breakdown.lightScore >= 0.9) reasons.push(`Suited to ${["", "low", "medium", "bright"][profile.light]} light`);
  if (breakdown.waterScore >= 0.85) reasons.push("Matches your watering rhythm");
  if (breakdown.difficultyScore >= 0.9 && plant.difficulty <= 2) reasons.push("Low-fuss for your experience level");
  if (profile.pets && plant.petSafe) reasons.push("Non-toxic to pets");
  if (profile.purpose === "air" && plant.air) reasons.push("Known for air-purifying");
  if (profile.purpose === "statement" && plant.size === 3) reasons.push("Big enough to be a centerpiece");
  if (breakdown.sizeScore >= 0.9) reasons.push("Fits your available space");
  return reasons.slice(0, 3);
}

/* ---------------------------------------------------------------
   UI
---------------------------------------------------------------- */
const FONT_IMPORT = "@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700&family=IBM+Plex+Sans:wght@400;500;600&display=swap');";

const palette = {
  bg: "#EFEDE3",
  card: "#F8F6EE",
  ink: "#20281F",
  sub: "#5B6156",
  line: "#D9D3BE",
  accent: "#A9832E",
  accent2: "#4C6B52",
  warn: "#9C5B45",
};

function ProgressDots({ total, current }) {
  return (
    <div className="flex items-center gap-2 mb-8">
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} style={{
          width: i === current ? 22 : 8, height: 8, borderRadius: 9999,
          background: i <= current ? palette.accent2 : palette.line,
          transition: "width 200ms ease, background 200ms ease",
        }} />
      ))}
    </div>
  );
}

function Bar({ pct, color }) {
  return (
    <div style={{ background: palette.line, height: 6, borderRadius: 9999, overflow: "hidden", flex: 1 }}>
      <div style={{ width: `${Math.max(2, pct)}%`, background: color, height: "100%", borderRadius: 9999, transition: "width 400ms ease" }} />
    </div>
  );
}

export default function PlantRecommender() {
  const [stage, setStage] = useState("intro"); // intro | quiz | results
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [alpha, setAlpha] = useState(0.6);

  const profile = useMemo(() => ({
    light: answers.light ?? 2,
    water: answers.water ?? 3,
    size: answers.size ?? 2,
    experience: answers.experience ?? 2,
    pets: answers.pets ?? false,
    purpose: answers.purpose ?? "any",
  }), [answers]);

  const results = useMemo(() => {
    if (stage !== "results") return [];
    const collab = collabScoreFor(profile);
    return PLANTS.map((p) => {
      const { score: content, breakdown } = contentScoreFor(profile, p);
      const collabScore = collab[p.id];
      const hybrid = alpha * content + (1 - alpha) * collabScore;
      return { plant: p, content, collabScore, hybrid, breakdown, reasons: reasonsFor(p, breakdown, profile) };
    }).sort((a, b) => b.hybrid - a.hybrid).slice(0, 6);
  }, [stage, profile, alpha]);

  function selectAnswer(qid, value) {
    const next = { ...answers, [qid]: value };
    setAnswers(next);
    if (step < QUESTIONS.length - 1) {
      setTimeout(() => setStep(step + 1), 150);
    } else {
      setTimeout(() => setStage("results"), 150);
    }
  }

  function restart() {
    setAnswers({}); setStep(0); setStage("intro");
  }

  return (
    <div style={{ background: palette.bg, color: palette.ink, minHeight: "100%", fontFamily: "'IBM Plex Sans', sans-serif" }} className="w-full min-h-full p-6 sm:p-10">
      <style>{FONT_IMPORT}</style>
      <div className="max-w-2xl mx-auto">

        {/* ---------------- HEADER ---------------- */}
        <div className="flex items-center gap-2 mb-10" style={{ color: palette.accent2 }}>
          <Leaf size={18} />
          <span style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 13, letterSpacing: 0.3 }}>Field Guide No. 7 — Houseplant Matching Engine</span>
        </div>

        {/* ---------------- INTRO ---------------- */}
        {stage === "intro" && (
          <div>
            <h1 style={{ fontFamily: "'Fraunces', serif", fontWeight: 600, fontSize: 42, lineHeight: 1.08 }}>
              Find the plant that already fits your home.
            </h1>
            <p style={{ color: palette.sub, fontSize: 16, lineHeight: 1.6, marginTop: 16, maxWidth: 520 }}>
              Answer six short questions about your light, habits, and space. Underneath, two
              engines compare notes — one reads your conditions directly, the other looks at
              what growers with similar setups actually kept alive.
            </p>
            <button onClick={() => setStage("quiz")}
              style={{ background: palette.ink, color: palette.bg, fontFamily: "'IBM Plex Sans', sans-serif", fontWeight: 500 }}
              className="mt-9 px-6 py-3 rounded-md flex items-center gap-2 hover:opacity-90">
              Begin the consultation <ChevronRight size={16} />
            </button>

            <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                { icon: Leaf, title: "Content-based", body: "Scores every specimen against your light, water, space, and experience." },
                { icon: Sparkles, title: "Collaborative", body: "Finds growers with a similar profile and borrows what worked for them." },
                { icon: Info, title: "Hybrid", body: "Blends both, with a dial you control, into one ranked shortlist." },
              ].map((f, i) => (
                <div key={i} style={{ borderTop: `1px solid ${palette.line}`, paddingTop: 14 }}>
                  <f.icon size={16} style={{ color: palette.accent2 }} />
                  <div style={{ fontFamily: "'Fraunces', serif", fontWeight: 600, fontSize: 17, marginTop: 8 }}>{f.title}</div>
                  <div style={{ color: palette.sub, fontSize: 14, lineHeight: 1.5, marginTop: 4 }}>{f.body}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ---------------- QUIZ ---------------- */}
        {stage === "quiz" && (
          <div>
            <ProgressDots total={QUESTIONS.length} current={step} />
            <div style={{ color: palette.sub, fontSize: 13, marginBottom: 6 }}>Question {step + 1} of {QUESTIONS.length}</div>
            <h2 style={{ fontFamily: "'Fraunces', serif", fontWeight: 600, fontSize: 28, marginBottom: 24 }}>
              {QUESTIONS[step].label}
            </h2>
            <div className="flex flex-col gap-3">
              {QUESTIONS[step].options.map((opt, i) => {
                const selected = answers[QUESTIONS[step].id] === opt.value;
                return (
                  <button key={i} onClick={() => selectAnswer(QUESTIONS[step].id, opt.value)}
                    style={{
                      textAlign: "left", padding: "14px 18px", borderRadius: 8,
                      border: `1px solid ${selected ? palette.accent2 : palette.line}`,
                      background: selected ? palette.accent2 : palette.card,
                      color: selected ? palette.bg : palette.ink,
                      fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 15,
                      transition: "all 150ms ease",
                    }}>
                    {opt.label}
                  </button>
                );
              })}
            </div>
            {step > 0 && (
              <button onClick={() => setStep(step - 1)} style={{ color: palette.sub }} className="mt-8 flex items-center gap-1 text-sm">
                <ChevronLeft size={14} /> Back
              </button>
            )}
          </div>
        )}

        {/* ---------------- RESULTS ---------------- */}
        {stage === "results" && (
          <div>
            <h2 style={{ fontFamily: "'Fraunces', serif", fontWeight: 600, fontSize: 30 }}>Your shortlist</h2>
            <p style={{ color: palette.sub, fontSize: 14, marginTop: 6 }}>Ranked by a blend of your criteria and similar growers' ratings.</p>

            <div className="mt-6 mb-9 p-4 rounded-md" style={{ background: palette.card, border: `1px solid ${palette.line}` }}>
              <div className="flex justify-between items-center mb-2" style={{ fontSize: 13, color: palette.sub }}>
                <span>Trust the crowd</span>
                <span>Match my criteria</span>
              </div>
              <input type="range" min={0} max={1} step={0.05} value={alpha}
                onChange={(e) => setAlpha(parseFloat(e.target.value))}
                style={{ width: "100%", accentColor: palette.accent2 }} />
              <div style={{ fontSize: 12, color: palette.sub, marginTop: 4 }}>
                Weighting: {Math.round(alpha * 100)}% your conditions · {Math.round((1 - alpha) * 100)}% similar growers
              </div>
            </div>

            <div className="flex flex-col gap-4">
              {results.map((r, i) => (
                <div key={r.plant.id} className="p-5 rounded-md" style={{ background: palette.card, border: `1px solid ${palette.line}` }}>
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <div style={{ fontSize: 12, color: palette.accent, fontFamily: "'IBM Plex Sans', sans-serif" }}>No. {i + 1}</div>
                      <div style={{ fontFamily: "'Fraunces', serif", fontWeight: 600, fontSize: 21 }}>{r.plant.name}</div>
                      <div style={{ fontStyle: "italic", color: palette.sub, fontSize: 13 }}>{r.plant.latin}</div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontFamily: "'Fraunces', serif", fontWeight: 600, fontSize: 26, color: palette.accent2 }}>{Math.round(r.hybrid)}</div>
                      <div style={{ fontSize: 11, color: palette.sub }}>match score</div>
                    </div>
                  </div>

                  <p style={{ fontSize: 14, color: palette.sub, marginTop: 10, lineHeight: 1.5 }}>{r.plant.blurb}</p>

                  <div className="flex flex-col gap-1.5 mt-4">
                    <div className="flex items-center gap-2">
                      <span style={{ fontSize: 11, color: palette.sub, width: 108 }}>Your criteria</span>
                      <Bar pct={r.content} color={palette.accent} />
                      <span style={{ fontSize: 11, color: palette.sub, width: 30, textAlign: "right" }}>{Math.round(r.content)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span style={{ fontSize: 11, color: palette.sub, width: 108 }}>Similar growers</span>
                      <Bar pct={r.collabScore} color={palette.accent2} />
                      <span style={{ fontSize: 11, color: palette.sub, width: 30, textAlign: "right" }}>{Math.round(r.collabScore)}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {r.reasons.map((reason, ri) => (
                      <span key={ri} style={{ fontSize: 12, padding: "3px 9px", borderRadius: 9999, background: palette.bg, border: `1px solid ${palette.line}`, color: palette.ink }}>
                        {reason}
                      </span>
                    ))}
                    {r.breakdown.petConflict && (
                      <span style={{ fontSize: 12, padding: "3px 9px", borderRadius: 9999, background: "#F1E6E1", color: palette.warn }}>
                        Toxic if pets chew on it
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <button onClick={restart} style={{ color: palette.sub }} className="mt-10 flex items-center gap-2 text-sm hover:opacity-80">
              <RotateCcw size={14} /> Start over
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

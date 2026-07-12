export default function normalizeSpriteName(name: string): string {
  const normalized = name.trim().toLowerCase().replace(/\s+/g, "-");

  // Mega forms
  // Convert PokeAPI names -> Showdown names
if (normalized === "charizard-mega-x") return "charizard-megax";
if (normalized === "charizard-mega-y") return "charizard-megay";
if (normalized === "mewtwo-mega-x") return "mewtwo-megax";
if (normalized === "mewtwo-mega-y") return "mewtwo-megay";
if (normalized === "meowstic-male") return "meowstic";
if (normalized === "squawkabilly-green-plumage") return "squawkabilly";
if (normalized === "oinkologne-male") return "oinkologne";
if (normalized === "maushold-family-of-four") return "maushold";
if (normalized === "palafin-zero") return "palafin";
if (normalized === "tatsugiri-curly") return "tatsugiri";
if (normalized === "dudunsparce-two-segment") return "dudunsparce";


  if (normalized.startsWith("mega-")) {
    return `${normalized.slice(5)}-mega`;
  }

  // Gigantamax
  if (normalized.startsWith("gmax-")) {
    return `${normalized.slice(5)}-gmax`;
  }

  if (normalized.startsWith("gigantamax-")) {
    return `${normalized.slice(11)}-gmax`;
  }

  return normalized;
}
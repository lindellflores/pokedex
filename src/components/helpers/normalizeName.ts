export default function normalizePokemonName(name: string): string {
  const normalized = name.trim().toLowerCase().replace(/\s+/g, "-");

  // Mega
  if (normalized === "mega-charizard-x") return "charizard-mega-x";
  if (normalized === "mega-charizard-y") return "charizard-mega-y";
  if (normalized === "mega-mewtwo-x") return "mewtwo-mega-x";
  if (normalized === "mega-mewtwo-y") return "mewtwo-mega-y";

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

  const aliases: Record<string, string> = {
    // Forms
    "giratina-origin": "giratina-origin",
    "zygarde-complete": "zygarde-complete",
    "zygarde-10": "zygarde-10",
    "shaymin-sky": "shaymin-sky",

    // Special Pokémon
    "mr-mime": "mr-mime",
    "mime-jr": "mime-jr",
    "mr-rime": "mr-rime",
    "ho-oh": "ho-oh",
    "porygon-z": "porygon-z",
    "type-null": "type-null",
    "jangmo-o": "jangmo-o",
    "hakamo-o": "hakamo-o",
    "kommo-o": "kommo-o",
    farfetchd: "farfetchd",
    sirfetchd: "sirfetchd",

    // Gendered Pokémon
    "nidoran-male": "nidoran-m",
    "nidoran-female": "nidoran-f",
  };

  return aliases[normalized] ?? normalized;
}
